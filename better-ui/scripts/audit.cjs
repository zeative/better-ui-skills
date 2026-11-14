#!/usr/bin/env node
/*
 * better-ui audit: render a page, take screenshots, and measure the things
 * that are easy to get wrong and impossible to see from source code alone.
 *
 *   node audit.cjs <file.html | http://localhost:3000/path> [--out <dir>]
 *                  [--widths 375,768,1440] [--dark] [--setup <file.js>]
 *                  [--json] [--no-shots]
 *
 * --setup runs a JS file inside the page after load and before measuring. Use
 * it to put the UI into the state you want to inspect: seed data, open a
 * dialog, submit an invalid form. An empty app tells you almost nothing.
 *   e.g. setup.js:  localStorage.setItem('todos', JSON.stringify([...]));
 *                   setTimeout(() => location.reload(), 0);   // reloads are waited for
 *
 * Output: screenshots in <out>/ (default ./.ui-audit) and a plain-text report
 * on stdout. Exit code is 0 even when problems are found; the report is input
 * for judgment, not a gate. Exit code 2 means the page could not be rendered.
 *
 * Needs a Chromium that Playwright (or Puppeteer) can drive. If none is
 * installed the script says so and exits 2; fall back to reviewing by hand.
 */
const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const a = { target: null, out: '.ui-audit', widths: [375, 768, 1440], dark: false, json: false, shots: true, setup: null };
  for (let i = 2; i < argv.length; i++) {
    const v = argv[i];
    if (v === '--out') a.out = argv[++i];
    else if (v === '--widths') a.widths = argv[++i].split(',').map(Number).filter(Boolean);
    else if (v === '--dark') a.dark = true;
    else if (v === '--setup') a.setup = argv[++i];
    else if (v === '--json') a.json = true;
    else if (v === '--no-shots') a.shots = false;
    else if (!a.target) a.target = v;
  }
  return a;
}

function loadDriver() {
  for (const name of ['playwright', 'playwright-core', '@playwright/test']) {
    try { const m = require(name); if (m.chromium) return { kind: 'playwright', chromium: m.chromium }; } catch (_) {}
  }
  try { return { kind: 'puppeteer', puppeteer: require('puppeteer') }; } catch (_) {}
  return null;
}

async function launch(driver) {
  const candidates = [undefined, process.env.CHROME_PATH, '/opt/pw-browsers/chromium', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'];
  let lastErr;
  for (const executablePath of candidates) {
    if (executablePath !== undefined && (!executablePath || !fs.existsSync(executablePath))) continue;
    try {
      const opts = { headless: true, args: ['--no-sandbox'] };
      if (executablePath) opts.executablePath = executablePath;
      return driver.kind === 'playwright' ? await driver.chromium.launch(opts) : await driver.puppeteer.launch(opts);
    } catch (e) { lastErr = e; }
  }
  throw lastErr;
}

/* ------------------------------------------------------------------ */
/* Everything in measure() runs inside the page.                       */
/* ------------------------------------------------------------------ */
function measure() {
  const out = {};
  const vw = window.innerWidth, vh = window.innerHeight;
  const isVisible = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width < 3 || r.height < 3) return false; // also skips visually-hidden (sr-only) text
    const s = getComputedStyle(el);
    if (s.clip === 'rect(0px, 0px, 0px, 0px)' || s.clipPath === 'inset(50%)') return false;
    if (s.visibility === 'hidden' || s.display === 'none' || parseFloat(s.opacity) === 0) return false;
    return true;
  };
  const describe = (el) => {
    let d = el.tagName.toLowerCase();
    if (el.id) d += '#' + el.id;
    const cls = (el.getAttribute('class') || '').trim().split(/\s+/).filter(Boolean).slice(0, 2).join('.');
    if (cls) d += '.' + cls;
    const t = (el.innerText || el.getAttribute('aria-label') || el.getAttribute('placeholder') || '').trim().replace(/\s+/g, ' ').slice(0, 36);
    return t ? `${d} "${t}"` : d;
  };
  const parseColor = (str) => {
    if (!str) return null;
    let m = str.match(/rgba?\(([^)]+)\)/);
    if (m) {
      const p = m[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat);
      return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
    }
    m = str.match(/color\(srgb ([^)]+)\)/);
    if (m) {
      const p = m[1].split(/[\s\/]+/).filter(Boolean).map(parseFloat);
      return { r: p[0] * 255, g: p[1] * 255, b: p[2] * 255, a: p.length > 3 ? p[3] : 1 };
    }
    // oklch()/lab() etc: let the browser convert through a canvas.
    try {
      const c = document.createElement('canvas'); c.width = c.height = 1;
      const x = c.getContext('2d'); x.clearRect(0, 0, 1, 1); x.fillStyle = str; x.fillRect(0, 0, 1, 1);
      const d = x.getImageData(0, 0, 1, 1).data;
      return { r: d[0], g: d[1], b: d[2], a: d[3] / 255 };
    } catch (_) { return null; }
  };
  const over = (top, bottom) => ({
    r: top.r * top.a + bottom.r * (1 - top.a), g: top.g * top.a + bottom.g * (1 - top.a), b: top.b * top.a + bottom.b * (1 - top.a), a: 1,
  });
  const lum = (c) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
  const hex = (c) => '#' + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
  const hsl = (c) => {
    const r = c.r / 255, g = c.g / 255, b = c.b / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
    let h = 0, s = 0;
    if (mx !== mn) {
      const d = mx - mn; s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
      h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60;
    }
    return { h, s, l };
  };
  // Effective background behind an element. Returns {color, uncertain}.
  const backgroundOf = (el) => {
    const layers = []; let uncertain = false; let n = el;
    while (n && n.nodeType === 1) {
      const s = getComputedStyle(n);
      if (s.backgroundImage && s.backgroundImage !== 'none') uncertain = true;
      const c = parseColor(s.backgroundColor);
      if (c && c.a > 0) { layers.push(c); if (c.a >= 0.999) break; }
      n = n.parentElement;
    }
    let base = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = layers.length - 1; i >= 0; i--) base = over(layers[i], base);
    return { color: base, uncertain };
  };

  /* ---- overflow -------------------------------------------------- */
  const docW = document.documentElement.scrollWidth;
  out.overflowPx = Math.max(0, docW - vw);
  out.overflowers = [];
  if (out.overflowPx > 1) {
    for (const el of document.querySelectorAll('body *')) {
      if (!isVisible(el)) continue;
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 && r.width <= docW) {
        // keep the deepest offenders only
        if (![...el.children].some((c) => c.getBoundingClientRect().right > vw + 1)) out.overflowers.push(`${describe(el)} (right edge ${Math.round(r.right)}px)`);
      }
      if (out.overflowers.length >= 6) break;
    }
  }

  /* ---- text inventory, contrast, measure ------------------------- */
  const sizes = {}, families = {}, weights = {}, textColors = {}, lowContrast = [], smallText = [], longLines = [], tightLeading = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  let node, textEls = 0;
  while ((node = walker.nextNode())) {
    const txt = node.nodeValue.trim();
    if (txt.length < 2) continue;
    const el = node.parentElement;
    if (!el || seen.has(el) || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'OPTION'].includes(el.tagName) || !isVisible(el)) continue;
    if (el.closest('svg')) continue;
    seen.add(el); textEls++;
    const s = getComputedStyle(el);
    const px = parseFloat(s.fontSize), w = parseInt(s.fontWeight, 10) || 400;
    const chars = txt.length;
    sizes[px] = (sizes[px] || 0) + chars;
    const fam = s.fontFamily.split(',')[0].replace(/["']/g, '').trim();
    families[fam] = (families[fam] || 0) + chars;
    weights[w] = (weights[w] || 0) + chars;
    const fg0 = parseColor(s.color);
    if (!fg0) continue;
    const bg = backgroundOf(el);
    const fg = over({ ...fg0, a: fg0.a * (parseFloat(s.opacity) || 1) }, bg.color);
    textColors[hex(fg)] = (textColors[hex(fg)] || 0) + chars;
    const clipped = (s.webkitBackgroundClip || s.backgroundClip || '').includes('text');
    if (!bg.uncertain && !clipped) {
      const cr = ratio(fg, bg.color);
      const large = px >= 24 || (px >= 18.66 && w >= 700);
      const need = large ? 3 : 4.5;
      const disabled = el.closest('[disabled],[aria-disabled="true"]');
      if (cr < need && !disabled) lowContrast.push({ el: describe(el), ratio: +cr.toFixed(2), need, fg: hex(fg), bg: hex(bg.color), px });
    }
    if (px < 12) smallText.push(`${describe(el)} (${px}px)`);
    // measure: only for real paragraphs
    const r = el.getBoundingClientRect();
    const lh = parseFloat(s.lineHeight);
    const lines = lh ? Math.round(r.height / lh) : 1;
    if (chars > 140 && lines >= 3) {
      const perLine = Math.round(chars / lines);
      if (perLine > 85) longLines.push(`${describe(el)} (~${perLine} chars/line)`);
      if (lh && lh / px < 1.35 && px <= 20) tightLeading.push(`${describe(el)} (line-height ${(lh / px).toFixed(2)})`);
    }
  }
  out.textElements = textEls;
  out.fontSizes = sizes; out.fontFamilies = families; out.fontWeights = weights; out.textColors = textColors;
  out.lowContrast = lowContrast.sort((a, b) => a.ratio - b.ratio).slice(0, 14);
  out.lowContrastCount = lowContrast.length;
  out.smallText = smallText.slice(0, 8); out.longLines = longLines.slice(0, 6); out.tightLeading = tightLeading.slice(0, 6);

  /* ---- surfaces: radius, shadow, fills, borders ------------------ */
  const radii = {}, shadows = {}, fills = {}, hues = {};
  let nestedCards = 0, glass = 0, gradientFills = 0, gradientText = 0, boxed = 0;
  const isBox = (s) => (parseColor(s.backgroundColor) || { a: 0 }).a > 0.02 || parseFloat(s.borderTopWidth) > 0 && s.borderTopStyle !== 'none' || s.boxShadow !== 'none';
  for (const el of document.querySelectorAll('body *')) {
    if (!isVisible(el) || el.closest('svg')) continue;
    const s = getComputedStyle(el), r = el.getBoundingClientRect();
    const rad = s.borderTopLeftRadius;
    const hasSurface = isBox(s);
    if (hasSurface && rad !== '0px' && r.width > 20) radii[rad] = (radii[rad] || 0) + 1;
    if (s.boxShadow !== 'none') shadows[s.boxShadow] = (shadows[s.boxShadow] || 0) + 1;
    if ((s.backdropFilter && s.backdropFilter !== 'none') || (s.webkitBackdropFilter && s.webkitBackdropFilter !== 'none')) glass++;
    if (/gradient\(/.test(s.backgroundImage)) {
      if ((s.webkitBackgroundClip || s.backgroundClip || '').includes('text')) gradientText++; else if (r.width * r.height > 2500) gradientFills++;
    }
    const bgc = parseColor(s.backgroundColor);
    if (bgc && bgc.a > 0.5 && r.width * r.height > 400) {
      fills[hex(bgc)] = (fills[hex(bgc)] || 0) + 1;
      const k = hsl(bgc);
      if (k.s > 0.35 && k.l > 0.15 && k.l < 0.85) { const bucket = Math.round(k.h / 30) * 30 % 360; hues[bucket] = (hues[bucket] || 0) + 1; }
    }
    // "card": a padded, rounded, bordered-or-shadowed box of meaningful size
    const cardish = hasSurface && r.width > 140 && r.height > 70 && parseFloat(rad) >= 6 && (s.boxShadow !== 'none' || parseFloat(s.borderTopWidth) > 0);
    if (cardish) {
      boxed++; el.setAttribute('data-ui-audit-card', '1');
      if (el.parentElement && el.parentElement.closest('[data-ui-audit-card]')) nestedCards++;
    }
  }
  document.querySelectorAll('[data-ui-audit-card]').forEach((e) => e.removeAttribute('data-ui-audit-card'));
  // accent hues used by text too (links, coloured labels)
  for (const [h, n] of Object.entries(textColors)) {
    const c = parseColor(`rgb(${parseInt(h.slice(1, 3), 16)}, ${parseInt(h.slice(3, 5), 16)}, ${parseInt(h.slice(5, 7), 16)})`), k = hsl(c);
    if (k.s > 0.45 && k.l > 0.2 && k.l < 0.8) { const bucket = Math.round(k.h / 30) * 30 % 360; hues[bucket] = (hues[bucket] || 0) + 1; }
  }
  out.radii = radii; out.shadows = shadows; out.fills = fills; out.hues = hues;
  out.cards = boxed; out.nestedCards = nestedCards; out.glass = glass; out.gradientFills = gradientFills; out.gradientText = gradientText;

  /* ---- awkward wraps -------------------------------------------- */
  // (a) short text whose last line is a stub: one small word or unit left alone
  const stubs = [];
  for (const el of seen) {
    const txt = (el.textContent || '').trim();
    if (txt.length < 8 || txt.length > 90 || el.children.length > 2) continue;
    const range = document.createRange(); range.selectNodeContents(el);
    const lines = [];
    for (const r of range.getClientRects()) {
      if (r.width < 1) continue;
      const line = lines.find((l) => Math.abs(l.top - r.top) < r.height * 0.6);
      if (line) { line.left = Math.min(line.left, r.left); line.right = Math.max(line.right, r.right); } else lines.push({ top: r.top, left: r.left, right: r.right });
    }
    if (lines.length < 2 || lines.length > 4) continue;
    lines.sort((p, q) => p.top - q.top);
    const widths = lines.map((l) => l.right - l.left), last = widths[widths.length - 1], longest = Math.max(...widths);
    if (last < longest * 0.28 && last < 70) stubs.push(describe(el));
  }
  out.wrapStubs = stubs.slice(0, 8); out.wrapStubCount = stubs.length;
  // (b) a wrapping row of items that leaves a single item alone on its last line
  const lonely = [];
  for (const el of document.querySelectorAll('body *')) {
    if (el.children.length < 3 || !isVisible(el)) continue;
    const s = getComputedStyle(el);
    if (!(s.display.includes('flex') && s.flexWrap !== 'nowrap')) continue;
    const kids = [...el.children].filter(isVisible); if (kids.length < 3) continue;
    const rows = {}; kids.forEach((k) => { const t = Math.round(k.getBoundingClientRect().top / 4) * 4; (rows[t] = rows[t] || []).push(k); });
    const keys = Object.keys(rows).map(Number).sort((p, q) => p - q);
    if (keys.length >= 2 && rows[keys[keys.length - 1]].length === 1 && rows[keys[0]].length >= 2) {
      const k = rows[keys[keys.length - 1]][0];
      if (k.getBoundingClientRect().width < el.getBoundingClientRect().width * 0.6) lonely.push(`${describe(k)} in ${describe(el).split(' "')[0]}`);
    }
  }
  out.lonelyItems = lonely.slice(0, 5);
  // (c) side-by-side siblings whose main values sit at different heights
  const uneven = [];
  for (const el of document.querySelectorAll('body *')) {
    const kids = [...el.children].filter(isVisible);
    if (kids.length < 2 || kids.length > 8) continue;
    const s = getComputedStyle(el);
    if (!(s.display.includes('flex') || s.display.includes('grid'))) continue;
    const sig = (k) => k.tagName + '.' + (k.getAttribute('class') || '');
    if (!kids.every((k) => sig(k) === sig(kids[0]) && k.children.length >= 2)) continue;
    const tops = kids.map((k) => Math.round(k.getBoundingClientRect().top));
    if (Math.max(...tops) - Math.min(...tops) > 2) continue; // not one row
    const valueTop = (k) => {
      let best = null, size = 0;
      for (const d of k.querySelectorAll('*')) {
        if (!isVisible(d) || ![...d.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim())) continue;
        const px = parseFloat(getComputedStyle(d).fontSize);
        if (px > size) { size = px; best = d; }
      }
      return best ? { y: Math.round(best.getBoundingClientRect().bottom), size } : null;
    };
    const vals = kids.map(valueTop).filter(Boolean);
    if (vals.length !== kids.length || new Set(vals.map((v) => v.size)).size !== 1) continue;
    const spread = Math.max(...vals.map((v) => v.y)) - Math.min(...vals.map((v) => v.y));
    if (spread >= 4) uneven.push(`${describe(el).split(' "')[0]} (${kids.length} items, values ${spread}px apart: "${(kids[0].innerText || '').trim().replace(/\s+/g, ' ').slice(0, 30)}"…)`);
  }
  out.unevenRows = uneven.slice(0, 5);

  /* ---- column edges: where do top-level blocks start? ------------ */
  // Blocks that begin a column (not the page's main left edge). Edges that are
  // close but not equal mean columns were sized per section, not on one grid.
  const edges = {};
  if (vw >= 1000) {
    const blocks = [...document.querySelectorAll('body *')].filter((el) => {
      if (!isVisible(el) || el.closest('svg') || el.closest('table') && el.tagName !== 'TABLE') return false;
      const r = el.getBoundingClientRect();
      if (r.width < 160 || r.height < 40 || r.width > vw * 0.72) return false;
      const disp = getComputedStyle(el).display;
      if (disp.startsWith('inline') && disp !== 'inline-block' && disp !== 'inline-flex') return false;
      const pr = el.parentElement.getBoundingClientRect();
      if (Math.abs(pr.left - r.left) < 1 && pr.width <= vw * 0.72) return false; // parent already starts this column
      return true;
    });
    const mainLeft = Math.min(...blocks.map((el) => el.getBoundingClientRect().left).concat([vw]));
    for (const el of blocks) {
      const r = el.getBoundingClientRect();
      if (r.left < mainLeft + 120) continue;
      // skip anything nested inside another counted block: its offset is that block's padding
      if (blocks.some((o) => o !== el && o.contains(el))) continue;
      const x = Math.round(r.left);
      (edges[x] = edges[x] || []).push(describe(el));
    }
  }
  out.columnEdges = Object.entries(edges).map(([x, els]) => ({ x: +x, n: els.length, eg: els[0] })).sort((p, q) => p.x - q.x);

  /* ---- interactive elements ------------------------------------- */
  const interactive = [...document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea, [role=button], [role=tab], [role=checkbox], [role=switch], [role=menuitem], [tabindex]:not([tabindex="-1"])')].filter(isVisible);
  out.interactiveCount = interactive.length;
  const smallTargets = [], unnamed = [], unlabeled = [];
  for (const el of interactive) {
    const r = el.getBoundingClientRect();
    const inlineLink = el.tagName === 'A' && getComputedStyle(el).display === 'inline' && el.parentElement && el.parentElement.innerText.trim().length > el.innerText.trim().length + 12;
    if (!inlineLink && (r.width < 24 || r.height < 24)) smallTargets.push({ el: describe(el), w: Math.round(r.width), h: Math.round(r.height), hard: true });
    else if (!inlineLink && vw <= 480 && (r.height < 40 || r.width < 40)) smallTargets.push({ el: describe(el), w: Math.round(r.width), h: Math.round(r.height), hard: false });
    const name = (el.innerText || '').trim() || el.getAttribute('aria-label') || el.getAttribute('title') || (el.getAttribute('aria-labelledby') ? 'x' : '') || (el.querySelector && el.querySelector('img[alt]:not([alt=""]), svg title') ? 'x' : '') || el.value;
    if (['BUTTON', 'A'].includes(el.tagName) || el.getAttribute('role') === 'button') { if (!name) unnamed.push(describe(el)); }
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName) && !['submit', 'button', 'reset'].includes(el.type)) {
      const labelled = (el.labels && el.labels.length) || el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.getAttribute('title');
      if (!labelled) unlabeled.push(describe(el) + (el.getAttribute('placeholder') ? ' (placeholder is not a label)' : ''));
    }
  }
  out.smallTargets = smallTargets.slice(0, 10); out.smallTargetCount = smallTargets.length;
  out.unnamed = unnamed.slice(0, 8); out.unlabeled = unlabeled.slice(0, 8);
  out.deadLinks = [...document.querySelectorAll('a[href="#"], a[href=""], a:not([href])')].filter(isVisible).length;

  /* ---- document structure --------------------------------------- */
  const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(isVisible).map((h) => +h.tagName[1]);
  const skips = []; for (let i = 1; i < hs.length; i++) if (hs[i] - hs[i - 1] > 1) skips.push(`h${hs[i - 1]} → h${hs[i]}`);
  out.h1Count = hs.filter((x) => x === 1).length; out.headingSkips = [...new Set(skips)];
  out.lang = document.documentElement.getAttribute('lang'); out.title = document.title;
  out.viewportMeta = !!document.querySelector('meta[name=viewport]');
  out.imgNoAlt = [...document.querySelectorAll('img:not([alt])')].length;
  out.brokenImages = [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.currentSrc).map((i) => i.currentSrc.slice(0, 80));
  out.landmarks = { main: !!document.querySelector('main,[role=main]'), nav: !!document.querySelector('nav,[role=navigation]') };

  /* ---- content smells ------------------------------------------- */
  const bodyText = document.body.innerText || '';
  out.lorem = /lorem ipsum|dolor sit amet/i.test(bodyText);
  const emojiRe = /(\p{Extended_Pictographic})/gu;
  const emojiEls = [];
  for (const el of document.querySelectorAll('h1,h2,h3,h4,button,a,li,span,div,p')) {
    if (!isVisible(el) || el.children.length > 0) continue;
    const t = (el.textContent || '').trim();
    if (t && emojiRe.test(t)) { emojiEls.push(describe(el)); } emojiRe.lastIndex = 0;
  }
  out.emoji = emojiEls.slice(0, 8); out.emojiCount = emojiEls.length;
  out.centeredBlocks = [...document.querySelectorAll('p')].filter((p) => isVisible(p) && getComputedStyle(p).textAlign === 'center' && p.innerText.length > 180).length;
  out.docHeight = document.documentElement.scrollHeight; out.vw = vw; out.vh = vh;
  return out;
}

/* Runs in the page: snapshot the styles that normally signal focus. */
function focusSnapshot(el) {
  const s = getComputedStyle(el);
  return [s.outlineStyle, s.outlineWidth, s.outlineColor, s.outlineOffset, s.boxShadow, s.borderTopColor, s.borderBottomColor, s.backgroundColor, s.textDecorationLine, s.color].join('|');
}

async function checkFocus(page) {
  // Tab through the page for real, so :focus-visible applies as it would for a keyboard user.
  const res = { checked: 0, invisible: [] };
  await page.evaluate(`window.__fs = ${focusSnapshot.toString()}; window.__before = new Map(); document.querySelectorAll('a[href],button,input,select,textarea,[tabindex]').forEach(e => window.__before.set(e, window.__fs(e)));`);
  const seen = new Set();
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press('Tab');
    const r = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const before = window.__before.get(el);
      const after = window.__fs(el);
      // a focus ring drawn on a wrapper also counts
      const wrap = el.parentElement ? getComputedStyle(el.parentElement) : null;
      const wrapRing = wrap && (wrap.outlineStyle !== 'none' && parseFloat(wrap.outlineWidth) > 0);
      let d = el.tagName.toLowerCase(); const t = (el.innerText || el.getAttribute('aria-label') || el.getAttribute('placeholder') || '').trim().slice(0, 30);
      if (t) d += ` "${t}"`;
      const key = d + '|' + Math.round(el.getBoundingClientRect().top + window.scrollY);
      return { key, d, changed: before === undefined ? true : before !== after || !!wrapRing };
    });
    if (!r) continue;
    if (seen.has(r.key)) break;
    seen.add(r.key); res.checked++;
    if (!r.changed) res.invisible.push(r.d);
  }
  await page.evaluate(() => { if (document.activeElement) document.activeElement.blur(); window.scrollTo(0, 0); });
  return res;
}

/* Static look at the stylesheet text for things computed styles cannot show. */
async function cssFacts(page) {
  return page.evaluate(() => {
    let hover = 0, focusVisible = 0, focus = 0, reducedMotion = false, transitionAll = 0, animations = 0, darkScheme = false, important = 0, containerOrMedia = 0, outlineNone = 0;
    const visit = (rules) => {
      for (const r of rules) {
        if (r.cssRules && r.media) {
          const m = r.media.mediaText || '';
          if (/prefers-reduced-motion/.test(m)) reducedMotion = true;
          if (/prefers-color-scheme:\s*dark/.test(m)) darkScheme = true;
          if (/width/.test(m)) containerOrMedia++;
        }
        if (r.type === 7 || r.constructor.name === 'CSSKeyframesRule') { animations++; continue; }
        if (r.cssRules) visit(r.cssRules);
        if (r.selectorText) {
          if (/:hover/.test(r.selectorText)) hover++;
          if (/:focus-visible/.test(r.selectorText)) focusVisible++;
          else if (/:focus(?!-within)/.test(r.selectorText)) focus++;
          const t = r.style ? r.style.cssText : '';
          if (/transition[^;]*\ball\b/.test(t)) transitionAll++;
          if (/!important/.test(t)) important++;
          if (/outline(-style)?:\s*(none|0)/.test(t) && /:focus/.test(r.selectorText)) outlineNone++;
        }
      }
    };
    let unreadable = 0;
    for (const sh of document.styleSheets) { try { visit(sh.cssRules); } catch (_) { unreadable++; } }
    return { hover, focusVisible, focus, reducedMotion, transitionAll, animations, darkScheme, important, containerOrMedia, outlineNone, unreadable };
  });
}

function top(obj, n = 8) { return Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n); }

function report(results, facts, focus, runtime, args) {
  const L = []; const P = []; // lines, problems
  const widest = results[results.length - 1].m, narrow = results[0].m;
  const problem = (sev, msg) => P.push({ sev, msg });

  // --- things that are simply broken
  for (const { width, m } of results) {
    if (m.overflowPx > 1) problem('BROKEN', `Horizontal overflow of ${m.overflowPx}px at ${width}px wide. Offenders: ${m.overflowers.join('; ') || 'not isolated'}`);
  }
  if (runtime.errors.length) problem('BROKEN', `Console/page errors: ${[...new Set(runtime.errors)].slice(0, 4).join(' | ')}`);
  if (runtime.failed.length) problem('BROKEN', `Failed requests (fonts, images or scripts that never loaded): ${[...new Set(runtime.failed)].slice(0, 5).join(' | ')}`);
  if (widest.brokenImages.length) problem('BROKEN', `Broken images: ${widest.brokenImages.join(', ')}`);
  if (!widest.viewportMeta) problem('BROKEN', 'No <meta name="viewport">; phones will render this at desktop width.');
  if (widest.lorem) problem('BROKEN', 'Lorem ipsum is on the page. Write the real content.');

  // --- accessibility
  const lc = new Map();
  for (const { m } of results) for (const x of m.lowContrast) lc.set(x.el + x.fg + x.bg, x);
  if (lc.size) {
    const list = [...lc.values()].sort((a, b) => a.ratio - b.ratio).slice(0, 10).map((x) => `    ${x.ratio}:1 (needs ${x.need}) ${x.fg} on ${x.bg}, ${x.px}px — ${x.el}`);
    problem('ACCESS', `Text below WCAG AA contrast (${lc.size} elements, worst first):\n${list.join('\n')}`);
  }
  if (focus && focus.invisible.length) problem('ACCESS', `No visible change on keyboard focus for ${focus.invisible.length} of ${focus.checked} tabbed elements: ${focus.invisible.slice(0, 6).join('; ')}`);
  if (facts.outlineNone && !facts.focusVisible) problem('ACCESS', 'Stylesheet removes focus outlines and defines no :focus-visible replacement.');
  if (widest.unnamed.length) problem('ACCESS', `Controls with no accessible name (icon-only without aria-label): ${widest.unnamed.join('; ')}`);
  if (widest.unlabeled.length) problem('ACCESS', `Form fields with no label: ${widest.unlabeled.join('; ')}`);
  if (widest.imgNoAlt) problem('ACCESS', `${widest.imgNoAlt} <img> without an alt attribute (use alt="" if decorative).`);
  const hard = narrow.smallTargets.filter((t) => t.hard), soft = narrow.smallTargets.filter((t) => !t.hard);
  if (hard.length) problem('ACCESS', `Targets under 24px (fails WCAG 2.2 minimum): ${hard.slice(0, 6).map((t) => `${t.el} ${t.w}×${t.h}`).join('; ')}`);
  if (soft.length) problem('TOUCH', `${narrow.smallTargetCount - hard.length} touch targets under 40px at ${results[0].width}px wide, e.g. ${soft.slice(0, 5).map((t) => `${t.el} ${t.w}×${t.h}`).join('; ')}`);
  if (widest.h1Count !== 1) problem('ACCESS', `Page has ${widest.h1Count} visible <h1> elements; it should have exactly one.`);
  if (widest.headingSkips.length) problem('ACCESS', `Heading levels skip: ${widest.headingSkips.join(', ')}`);
  if (!widest.lang) problem('ACCESS', 'No lang attribute on <html>.');
  if (!widest.landmarks.main) problem('ACCESS', 'No <main> landmark.');
  if (facts.animations + facts.transitionAll > 0 && !facts.reducedMotion && facts.animations > 0) problem('ACCESS', 'Animations exist but nothing honours prefers-reduced-motion.');

  // --- craft: these are prompts for judgment, each with the number behind it
  const sizeList = top(widest.fontSizes, 20).map(([k]) => +k).sort((a, b) => a - b);
  const allSizes = new Set(); results.forEach(({ m }) => Object.keys(m.fontSizes).forEach((k) => allSizes.add(+k)));
  if (sizeList.length > 8) problem('CRAFT', `${sizeList.length} distinct font sizes at ${results[results.length - 1].width}px (${sizeList.join(', ')}). A type scale rarely needs more than 6–8; near-duplicates (e.g. 13 and 13.5, 15 and 16) read as accidents.`);
  const fams = Object.keys(widest.fontFamilies);
  if (fams.length > 3) problem('CRAFT', `${fams.length} font families in use (${fams.join(', ')}). More than two or three is usually noise.`);
  if (narrow.smallText.length) problem('CRAFT', `Text under 12px: ${narrow.smallText.slice(0, 5).join('; ')}`);
  for (const { width, m } of results) {
    if (m.longLines.length) { problem('CRAFT', `Lines too long to read comfortably at ${width}px (aim for 45–75 characters): ${m.longLines.slice(0, 3).join('; ')}`); break; }
  }
  if (widest.tightLeading.length) problem('CRAFT', `Paragraph line-height under 1.35: ${widest.tightLeading.slice(0, 3).join('; ')}`);
  if (widest.centeredBlocks) problem('CRAFT', `${widest.centeredBlocks} long paragraph(s) are centre-aligned; centred text beyond two or three lines is hard to read.`);
  const rad = top(widest.radii, 12);
  if (rad.length > 4) problem('CRAFT', `${rad.length} different corner radii (${rad.map(([k, v]) => `${k}×${v}`).join(', ')}). Pick a small set and nest them concentrically (inner = outer − padding).`);
  const sh = Object.keys(widest.shadows).length;
  if (sh > 4) problem('CRAFT', `${sh} different box-shadows. Elevation should be a 2–3 step scale, not per-component.`);
  const hues = Object.keys(widest.hues).length;
  if (hues > 3) problem('CRAFT', `Saturated colour in ${hues} different hue families (${Object.keys(widest.hues).map((h) => h + '°').join(', ')}). Unless each one encodes meaning (status, data series), this reads as decoration.`);
  const ce = widest.columnEdges || [], near = [];
  for (let i = 0; i < ce.length; i++) for (let j = i + 1; j < ce.length; j++) {
    const d = ce[j].x - ce[i].x;
    if (d >= 6 && d <= 56) near.push(`${ce[i].x}px (${ce[i].eg}) vs ${ce[j].x}px (${ce[j].eg})`);
  }
  if (near.length) problem('CRAFT', `Columns in different sections start at nearly, but not exactly, the same x at ${results[results.length - 1].width}px: ${near.slice(0, 4).join('; ')}. Put every section on one shared grid so column edges repeat down the page.`);
  for (const { width, m } of results) {
    if (m.unevenRows && m.unevenRows.length) { problem('CRAFT', `Side-by-side items whose main values do not line up at ${width}px, usually because one label wraps: ${m.unevenRows.slice(0, 3).join('; ')}. Align the values (fixed label height, or values on a shared row).`); break; }
  }
  const stubW = results.filter(({ m }) => m.wrapStubCount).sort((p, q) => q.m.wrapStubCount - p.m.wrapStubCount)[0];
  if (stubW) problem('CRAFT', `${stubW.m.wrapStubCount} short text(s) wrap leaving a stub on the last line at ${stubW.width}px: ${stubW.m.wrapStubs.slice(0, 5).join('; ')}. Widen the column, shorten the text, or keep the last words together (text-wrap: balance, a non-breaking space).`);
  for (const { width, m } of results) {
    if (m.lonelyItems && m.lonelyItems.length) { problem('CRAFT', `A wrapping row leaves one item alone on its last line at ${width}px: ${m.lonelyItems.slice(0, 3).join('; ')}.`); break; }
  }
  if (widest.nestedCards) problem('CRAFT', `${widest.nestedCards} card-inside-card nestings. Group with space or a rule before reaching for another box.`);
  if (widest.cards > 12) problem('CRAFT', `${widest.cards} bordered/shadowed boxes on the page. Ask which of them need a container at all.`);
  if (facts.transitionAll) problem('CRAFT', `${facts.transitionAll} rules use "transition: all"; name the properties (it animates layout by accident and costs performance).`);
  if (widest.interactiveCount > 3 && facts.hover === 0) problem('CRAFT', 'No :hover rules at all; interactive elements give no feedback.');
  if (widest.deadLinks > 2) problem('CRAFT', `${widest.deadLinks} links go nowhere (href="#"). Fine for a mock, but say so in your handoff.`);

  // --- reflexes: not wrong by themselves, but each needs a reason
  if (widest.gradientText) problem('REFLEX', `${widest.gradientText} gradient-filled text element(s).`);
  if (widest.gradientFills > 2) problem('REFLEX', `${widest.gradientFills} gradient-filled surfaces.`);
  if (widest.glass) problem('REFLEX', `${widest.glass} element(s) with backdrop blur.`);
  if (widest.emojiCount) problem('REFLEX', `Emoji used in UI text ${widest.emojiCount}× (${widest.emoji.slice(0, 4).join('; ')}). They render differently per platform and stand in for real icons or real words.`);
  const purple = Object.keys(widest.hues).some((h) => +h >= 240 && +h <= 290);
  if (purple) problem('REFLEX', 'Primary/accent colour sits in the indigo–violet range (240–290°), the most common unchosen default.');
  const defaults = ['Inter', 'Roboto', 'Arial', 'Helvetica', 'system-ui', '-apple-system', 'Space Grotesk', 'Poppins'];
  if (fams.length && fams.every((f) => defaults.includes(f))) problem('REFLEX', `Typeface is ${fams.join(' / ')} only. Perfectly usable, but confirm it was chosen for this product rather than inherited.`);

  // --- output
  L.push(`UI AUDIT  ${args.target}`);
  L.push(`Rendered at ${results.map((r) => `${r.width}px (page height ${r.m.docHeight}px)`).join(', ')}${args.dark ? ' in dark scheme' : ''}${args.setup ? `, after running ${args.setup}` : ''}`);
  if (args.shots) L.push(`Screenshots: ${results.map((r) => r.shots.join(', ')).join(', ')}`);
  L.push('');
  L.push('INVENTORY (what is actually on the page)');
  L.push(`  Font sizes   ${sizeList.map((s) => s + 'px').join('  ')}`);
  L.push(`  Families     ${top(widest.fontFamilies, 5).map(([k]) => k).join(', ')}`);
  L.push(`  Weights      ${Object.keys(widest.fontWeights).sort().join(', ')}`);
  L.push(`  Text colours ${top(widest.textColors, 8).map(([k]) => k).join(' ')}${Object.keys(widest.textColors).length > 8 ? ` (+${Object.keys(widest.textColors).length - 8} more)` : ''}`);
  L.push(`  Fills        ${top(widest.fills, 8).map(([k]) => k).join(' ')}${Object.keys(widest.fills).length > 8 ? ` (+${Object.keys(widest.fills).length - 8} more)` : ''}`);
  L.push(`  Radii        ${rad.map(([k, v]) => `${k}×${v}`).join('  ') || 'none'}`);
  L.push(`  Shadows      ${sh} distinct`);
  L.push(`  Boxes        ${widest.cards} card-like containers, ${widest.nestedCards} nested`);
  L.push(`  Interaction  ${widest.interactiveCount} interactive elements; ${facts.hover} :hover rules, ${facts.focusVisible} :focus-visible rules; reduced-motion ${facts.reducedMotion ? 'handled' : 'not handled'}; dark scheme ${facts.darkScheme ? 'defined' : 'not defined'}`);
  if (facts.unreadable) L.push(`  (${facts.unreadable} cross-origin stylesheet(s) could not be inspected)`);
  L.push('');
  const order = ['BROKEN', 'ACCESS', 'TOUCH', 'CRAFT', 'REFLEX'];
  const titles = {
    BROKEN: 'BROKEN — fix these, no judgment needed',
    ACCESS: 'ACCESSIBILITY — fix these',
    TOUCH: 'TOUCH — fix unless there is a reason',
    CRAFT: 'CRAFT — measured inconsistencies; fix or be able to say why not',
    REFLEX: 'REFLEXES — common unchosen defaults; keep only if you can state the reason it serves this product',
  };
  if (!P.length) L.push('No measurable problems found. That is the floor, not the ceiling: now look at the screenshots.');
  for (const sev of order) {
    const items = P.filter((p) => p.sev === sev);
    if (!items.length) continue;
    L.push(titles[sev]);
    items.forEach((p) => L.push('  • ' + p.msg));
    L.push('');
  }
  L.push('This report cannot judge hierarchy, composition, whether the content is specific, or whether the page has a point of view. Read the screenshots for those.');
  return { text: L.join('\n'), problems: P };
}

(async () => {
  const args = parseArgs(process.argv);
  if (!args.target) { console.error('usage: node audit.cjs <file.html | url> [--out dir] [--widths 375,768,1440] [--dark] [--setup file.js] [--json] [--no-shots]'); process.exit(2); }
  const driver = loadDriver();
  if (!driver) {
    console.error('audit: no browser driver found (tried playwright, playwright-core, @playwright/test, puppeteer).\nInstall one with `npm i -D playwright && npx playwright install chromium`, or review by hand using the checklist in SKILL.md.');
    process.exit(2);
  }
  let url = args.target;
  if (!/^https?:\/\//.test(url)) {
    const p = path.resolve(url);
    if (!fs.existsSync(p)) { console.error(`audit: no such file: ${p}`); process.exit(2); }
    url = 'file://' + p;
  }
  let browser;
  try { browser = await launch(driver); } catch (e) { console.error('audit: could not launch Chromium: ' + String(e.message || e).split('\n')[0]); process.exit(2); }
  if (args.shots) fs.mkdirSync(args.out, { recursive: true });
  const results = []; const runtime = { errors: [], failed: [] };
  let facts = null, focus = null;
  let setupSrc = null;
  if (args.setup) {
    if (!fs.existsSync(args.setup)) { console.error(`audit: no such setup file: ${args.setup}`); process.exit(2); }
    setupSrc = fs.readFileSync(args.setup, 'utf8');
  }
  try {
    for (const width of args.widths) {
      const height = width <= 480 ? 812 : width <= 900 ? 1024 : 900;
      let page, ctx;
      if (driver.kind === 'playwright') {
        ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, colorScheme: args.dark ? 'dark' : 'light', hasTouch: width <= 480, isMobile: width <= 480 });
        page = await ctx.newPage();
      } else {
        page = await browser.newPage();
        await page.setViewport({ width, height, deviceScaleFactor: 1, isMobile: width <= 480, hasTouch: width <= 480 });
        if (args.dark) await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
      }
      page.on('pageerror', (e) => runtime.errors.push(String(e.message || e).slice(0, 160)));
      page.on('console', (m) => { if (m.type() === 'error') runtime.errors.push(m.text().slice(0, 160)); });
      page.on('requestfailed', (r) => runtime.failed.push(r.url().slice(0, 100)));
      page.on('response', (r) => { if (r.status() >= 400) runtime.failed.push(`${r.status()} ${r.url().slice(0, 100)}`); });
      await page.goto(url, { waitUntil: driver.kind === 'playwright' ? 'networkidle' : 'networkidle0', timeout: 45000 }).catch(async () => { await page.goto(url, { waitUntil: 'load', timeout: 45000 }); });
      await page.evaluate(() => (document.fonts && document.fonts.ready) || null).catch(() => {});
      await new Promise((r) => setTimeout(r, 600));
      if (setupSrc) {
        await page.evaluate(`(async () => { ${setupSrc}\n })()`).catch((e) => runtime.errors.push('setup script: ' + String(e.message || e).slice(0, 140)));
        // the setup may have reloaded the page (for example after seeding localStorage)
        await new Promise((r) => setTimeout(r, 300));
        if (driver.kind === 'playwright') await page.waitForLoadState('networkidle').catch(() => {});
        await page.evaluate(() => (document.fonts && document.fonts.ready) || null).catch(() => {});
        await new Promise((r) => setTimeout(r, 400));
      }
      // scroll through once so scroll-triggered content is in its settled state
      await page.evaluate(async () => {
        const h = document.documentElement.scrollHeight;
        for (let y = 0; y < h; y += Math.max(300, window.innerHeight * 0.8)) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
        window.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 250));
      }).catch(() => {});
      const m = await page.evaluate(`(${measure.toString()})()`);
      const shots = [];
      if (args.shots) {
        const rel = (p) => { const r = path.relative(process.cwd(), p); return r.startsWith('..') ? p : r; };
        const fold = rel(path.join(args.out, `${width}-fold.png`)), full = rel(path.join(args.out, `${width}-full.png`));
        await page.screenshot({ path: fold });
        shots.push(fold);
        if (m.docHeight > height * 1.15) {
          const clipH = Math.min(m.docHeight, 9000);
          await page.screenshot({ path: full, fullPage: clipH === m.docHeight, ...(clipH === m.docHeight ? {} : { clip: { x: 0, y: 0, width, height: clipH } }) }).catch(() => {});
          if (fs.existsSync(full)) shots.push(full);
        }
      }
      if (width === args.widths[args.widths.length - 1]) {
        facts = await cssFacts(page);
        focus = await checkFocus(page).catch(() => null);
      }
      results.push({ width, m, shots });
      await (ctx ? ctx.close() : page.close());
    }
  } catch (e) {
    console.error('audit: render failed: ' + String(e.message || e).split('\n')[0]);
    await browser.close(); process.exit(2);
  }
  await browser.close();
  const rep = report(results, facts, focus, runtime, args);
  if (args.json) console.log(JSON.stringify({ target: args.target, results, facts, focus, runtime, problems: rep.problems }, null, 2));
  else console.log(rep.text);
})();
