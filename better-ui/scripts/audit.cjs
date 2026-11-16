#!/usr/bin/env node
/*
 * better-ui audit: render a page, take screenshots, and measure the things
 * that are easy to get wrong and impossible to see from source code alone.
 *
 *   node audit.cjs <file.html | http://localhost:3000/path> [--out <dir>]
 *                  [--widths 375,768,1440] [--dark] [--setup <file.js>]
 *                  [--register showcase|dense] [--json] [--no-shots]
 *
 * --register showcase is for portfolios, studios, restaurants and other sites
 * led by imagery and type, where cards, shadows and icon chips are not wanted;
 * it turns off the checks that ask for them.
 *
 * --register dense is for professional data tools (terminals, market data,
 * screeners, consoles); it turns off every RICHNESS note, since those tools
 * are judged on density and precision rather than imagery and surfaces.
 *
 * --setup runs a JS file inside the page after load and before measuring. Use
 * it to put the UI into the state you want to inspect: seed data, open a
 * dialog, submit an invalid form. An empty app tells you almost nothing.
 *   e.g. setup.js:  localStorage.setItem('todos', JSON.stringify([...]));
 *                   setTimeout(() => location.reload(), 0);   // reloads are waited for
 *
 * Output: screenshots in <out>/ (default ./.ui-audit) and a plain-text report
 * on stdout. Per width: <w>-fold.png (first screen); for tall pages also
 * <w>-part-N.png (1500px slices) or, at phone width, <w>-sheet-N.png (slices
 * side by side), plus <w>-thumb.png (the whole page, small) at the widest width. Exit code is 0 even when problems are found; the report is input
 * for judgment, not a gate. Exit code 2 means the page could not be rendered.
 *
 * Needs a Chromium that Playwright (or Puppeteer) can drive. If none is
 * installed the script says so and exits 2; fall back to reviewing by hand.
 */
const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const a = { target: null, out: '.ui-audit', widths: [375, 768, 1440], dark: false, json: false, shots: true, setup: null, register: 'product' };
  for (let i = 2; i < argv.length; i++) {
    const v = argv[i];
    if (v === '--out') a.out = argv[++i];
    else if (v === '--widths') a.widths = argv[++i].split(',').map(Number).filter(Boolean);
    else if (v === '--dark') a.dark = true;
    else if (v === '--setup') a.setup = argv[++i];
    else if (v === '--register') a.register = argv[++i];
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
function measure(targetWidth) {
  const out = {};
  // Use the width we asked for, not window.innerWidth: under phone emulation a page that
  // overflows makes the browser widen its layout viewport, which would hide the overflow.
  const vw = targetWidth || window.innerWidth, vh = window.innerHeight;
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
  const docW = Math.max(document.documentElement.scrollWidth, window.innerWidth);
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
  // (b2) a wrapping strip of figures (stats, label-value pairs) that breaks onto ragged lines
  const ragged = [];
  for (const el of document.querySelectorAll('body *')) {
    if (!isVisible(el)) continue;
    const s = getComputedStyle(el);
    if (!(s.display.includes('flex') && s.flexWrap !== 'nowrap')) continue;
    const kids = [...el.children].filter(isVisible); if (kids.length < 4) continue;
    if (kids.filter((k) => /\d/.test(k.textContent)).length < kids.length / 2) continue;
    const rows = {}; kids.forEach((k) => { const t = Math.round(k.getBoundingClientRect().top / 6) * 6; (rows[t] = rows[t] || []).push(k); });
    const keys = Object.keys(rows).map(Number).sort((p, q) => p - q); if (keys.length < 2) continue;
    const lefts0 = rows[keys[0]].map((k) => k.getBoundingClientRect().left);
    const later = keys.slice(1).flatMap((t) => rows[t]);
    const off = later.filter((k) => !lefts0.some((l) => Math.abs(l - k.getBoundingClientRect().left) < 4)).length;
    if (off >= Math.max(1, later.length / 2)) ragged.push(describe(el));
  }
  out.raggedStrips = ragged.slice(0, 5);
  // (b4) numbers in table columns that are not right-aligned
  const leftNums = [];
  for (const t of document.querySelectorAll('table')) {
    if (!isVisible(t)) continue;
    const rows = [...t.querySelectorAll('tbody tr')].slice(0, 12); if (rows.length < 3) continue;
    const n = Math.max(...rows.map((r) => r.cells.length));
    for (let c = 1; c < n; c++) {
      const cells = rows.map((r) => r.cells[c]).filter(Boolean);
      const num = cells.filter((td) => /^[\s+\-−$€£¥₹Rp]*[\d.,]+\s*(%|[kKMBT]|bp|x|×)?\s*$/.test(td.innerText || ''));
      if (num.length < 3 || num.length < cells.length * 0.7) continue;
      const left = num.filter((td) => { const a = getComputedStyle(td).textAlign; const w = td.scrollWidth, r = td.getBoundingClientRect();
        const kid = td.firstElementChild; const ka = kid ? getComputedStyle(kid).textAlign : a;
        return /left|start/.test(a) && /left|start/.test(ka) && !getComputedStyle(td).display.includes('flex'); });
      if (left.length >= num.length * 0.7) leftNums.push(describe(num[0]));
    }
  }
  out.leftNumbers = leftNums.slice(0, 5);
  // (b5) a stat figure barely larger than its own label
  const weakFig = [];
  for (const el of document.querySelectorAll('body *')) {
    if (!isVisible(el) || el.children.length > 3) continue;
    const t = (el.innerText || '').trim(); if (!/^[\s+\-−$€£¥₹Rp]*[\d.,]+\s*(%|[kKMBT])?$/.test(t) || t.length > 14) continue;
    const fs = parseFloat(getComputedStyle(el).fontSize); if (fs < 18) continue;
    const r = el.getBoundingClientRect(); if (r.top > innerHeight * 1.5) continue;
    const box = el.parentElement && el.parentElement.parentElement; if (!box) continue;
    let label = null;
    for (const c of box.querySelectorAll('*')) {
      if (c === el || c.contains(el) || el.contains(c) || !isVisible(c)) continue;
      const ct = [...c.childNodes].filter((n) => n.nodeType === 3).map((n) => n.nodeValue).join('').trim();
      if (!/[A-Za-z]{3,}/.test(ct)) continue;
      const cr = c.getBoundingClientRect(); if (cr.bottom > r.top + 2 || r.top - cr.bottom > 40) continue;
      label = c; break;
    }
    if (!label) continue;
    const lf = parseFloat(getComputedStyle(label).fontSize);
    if (fs / lf < 1.6) weakFig.push(`${describe(el)} (${fs}px over a ${lf}px label)`);
  }
  out.weakFigures = weakFig.slice(0, 5);
  // (b6) large type set with body defaults: loose tracking, loose leading, heavy weight
  const looseHead = [], heavyHead = [];
  for (const el of document.querySelectorAll('body *')) {
    if (!isVisible(el)) continue;
    const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.nodeValue).join('').trim();
    if (own.length < 4 || !/[A-Za-z]{3,}/.test(own)) continue;
    const cs = getComputedStyle(el), fs = parseFloat(cs.fontSize);
    if (fs < 28) continue;
    if (/mono/i.test(cs.fontFamily) || cs.textTransform === 'uppercase' || own === own.toUpperCase()) continue;
    const ls = cs.letterSpacing === 'normal' ? 0 : parseFloat(cs.letterSpacing);
    const lh = cs.lineHeight === 'normal' ? fs * 1.2 : parseFloat(cs.lineHeight);
    const lines = Math.round(el.getBoundingClientRect().height / lh);
    if (fs >= 32 && ls >= 0) looseHead.push(`${describe(el)} (${fs}px, letter-spacing ${cs.letterSpacing})`);
    else if (fs >= 32 && lines >= 2 && lh / fs > 1.3) looseHead.push(`${describe(el)} (${fs}px, line-height ${(lh / fs).toFixed(2)})`);
    if (+cs.fontWeight >= 700) heavyHead.push(`${describe(el)} (${fs}px at ${cs.fontWeight})`);
  }
  out.looseHeadings = looseHead.slice(0, 4); out.heavyHeadings = heavyHead.slice(0, 4);
  // (b7) how many different background tones the large regions of the page use
  const regionSet = new Set();
  for (const el of document.querySelectorAll('body, body *')) {
    const r = el.getBoundingClientRect(); if (r.width < innerWidth * 0.6 || r.height < 160) continue;
    const bg = getComputedStyle(el).backgroundColor;
    if (!bg || /rgba?\(0, 0, 0, 0\)|transparent/.test(bg)) continue;
    const m = bg.match(/[\d.]+/g).map(Number); if (m.length > 3 && m[3] < 0.5) continue;
    regionSet.add(m.slice(0, 3).map((v) => Math.round(v / 6) * 6).join(','));
  }
  out.regionTones = regionSet.size;
  // (b8) copy that does not fit: buttons that wrap, siblings whose text runs very different lengths
  const wrapBtn = [];
  for (const el of document.querySelectorAll('button, a[class*="btn"], a[class*="button"], [role="tab"]')) {
    if (!isVisible(el)) continue; const t = (el.innerText || '').trim(); if (!t || t.length > 40 || t.split(/\s+/).length > 6) continue;
    // a button used as a card (several blocks, an image) wraps by design
    if (el.querySelector('img, picture, video') || [...el.querySelectorAll('*')].filter((x) => !(x instanceof SVGElement)).length > 2 || /\n/.test(el.innerText)) continue;
    const cs = getComputedStyle(el), lh = cs.lineHeight === 'normal' ? parseFloat(cs.fontSize) * 1.25 : parseFloat(cs.lineHeight);
    // count lines of the label's text only, so an icon stacked above it is not a second line
    const tops = [];
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n = walk.nextNode(); n; n = walk.nextNode()) {
      if (!n.nodeValue.trim()) continue; const rg = document.createRange(); rg.selectNodeContents(n);
      for (const r of rg.getClientRects()) if (r.width > 2) tops.push(r.top);
    }
    const lines = new Set(tops.map((t0) => Math.round(t0 / (lh * 0.6)))).size;
    // label text split across separate spans on purpose (a title and a meta line) is not wrapping
    const textNodes = [...el.querySelectorAll('*')].filter((x) => !(x instanceof SVGElement) && [...x.childNodes].some((c) => c.nodeType === 3 && c.nodeValue.trim())).length;
    if (textNodes > 1) continue;
    if (lines >= 2) wrapBtn.push(describe(el));
  }
  out.wrappingButtons = wrapBtn.slice(0, 5);
  const unevenTxt = [];
  for (const el of document.querySelectorAll('body *')) {
    const kids = [...el.children].filter(isVisible); if (kids.length < 3 || kids.length > 6) continue;
    const cs = getComputedStyle(el); if (!(cs.display.includes('grid') || cs.display.includes('flex'))) continue;
    const sig = (k) => k.tagName + '.' + (k.getAttribute('class') || '');
    if (!kids.every((k) => sig(k) === sig(kids[0]))) continue;
    const tops = kids.map((k) => Math.round(k.getBoundingClientRect().top)); if (Math.max(...tops) - Math.min(...tops) > 4) continue;
    const lens = kids.map((k) => { const p = k.querySelector('p'); return p ? (p.innerText || '').trim().length : 0; });
    if (lens.some((l) => l < 30)) continue;
    if (Math.max(...lens) / Math.min(...lens) > 1.8) unevenTxt.push(`${describe(kids[0]).split(' "')[0]} (${Math.min(...lens)} to ${Math.max(...lens)} characters)`);
  }
  out.unevenCopy = unevenTxt.slice(0, 4);
  // (b3) the largest chart on the first screen drawn as plain bars
  let bigSvg = null, bigArea = 0;
  for (const g of document.querySelectorAll('svg')) {
    if (!isVisible(g)) continue; const r = g.getBoundingClientRect(); if (r.top > innerHeight) continue;
    if (r.width * r.height > bigArea) { bigArea = r.width * r.height; bigSvg = g; }
  }
  out.plainBarChart = 0;
  if (bigSvg && bigArea > 400 * 180) {
    const bars = [...bigSvg.querySelectorAll('rect')].filter((x) => { const b = x.getBoundingClientRect(); return b.height > 6 && b.width > 2 && b.width < 80; });
    const curves = [...bigSvg.querySelectorAll('path')].some((p) => { const d = p.getAttribute('d') || ''; return /[CQS]/.test(d) && d.length > 60; });
    const bb = {}, bt = {};
    for (const x of bars) { const r = x.getBoundingClientRect(); const kb = Math.round(r.bottom / 3), kt = Math.round(r.top / 3); bb[kb] = (bb[kb] || 0) + 1; bt[kt] = (bt[kt] || 0) + 1; }
    const svgMirror = Object.keys(bb).some((k) => bb[k] >= 8 && [-1, 0, 1, 2].some((o) => (bt[+k + o] || 0) >= 8));
    if (bars.length >= 8 && !curves && !svgMirror) out.plainBarChart = bars.length;
  }
  // bars drawn as HTML elements: narrow filled boxes without text that share a baseline
  if (!out.plainBarChart) {
    const hasCurve = bigSvg && [...bigSvg.querySelectorAll('path')].some((p) => { const d = p.getAttribute('d') || ''; return /[CQS]/.test(d) && d.length > 60; }) && bigArea > 400 * 180;
    const groups = {}, tops = {};
    for (const el of document.querySelectorAll('body *')) {
      if (el.children.length || (el.textContent || '').trim()) continue;
      const r = el.getBoundingClientRect();
      if (r.top > innerHeight || r.width < 3 || r.width > 80 || r.height < 10 || r.height > 700) continue;
      const cs = getComputedStyle(el);
      const filled = (cs.backgroundColor && !/rgba?\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor)) || cs.backgroundImage !== 'none';
      if (!filled) continue;
      const key = Math.round(r.bottom / 3);
      (groups[key] = groups[key] || []).push(r);
      const tk = Math.round(r.top / 3); (tops[tk] = tops[tk] || []).push(r);
    }
    for (const [k, g] of Object.entries(groups)) {
      if (g.length < 8) continue;
      // a mirrored bar chart (one period above an axis, another hanging below it) is a designed form
      const mirror = [-1, 0, 1, 2].some((o) => (tops[+k + o] || []).length >= 8);
      if (mirror) continue;
      const hs = g.map((r) => r.height), span = Math.max(...g.map((r) => r.right)) - Math.min(...g.map((r) => r.left));
      if (span > 360 && Math.max(...hs) / Math.min(...hs) > 1.3 && !hasCurve) { out.plainBarChart = g.length; break; }
    }
  }
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

  /* ---- finishing: clipped strings, uneven gutters, repeated graphics */
  const clipped = [];
  for (const el of seen) {
    const st = getComputedStyle(el);
    const cuts = st.textOverflow === 'ellipsis' || st.overflowX === 'hidden' || st.overflowX === 'clip' || st.webkitLineClamp !== 'none';
    if (!cuts) continue;
    if (el.scrollWidth > el.clientWidth + 1 || (st.webkitLineClamp !== 'none' && el.scrollHeight > el.clientHeight + 2)) clipped.push(describe(el));
  }
  out.clippedText = clipped.slice(0, 10); out.clippedCount = clipped.length;
  // page gutters: nearest content to the left and right screen edges
  let gl = vw, gr = vw;
  for (const el of seen) {
    const r = el.getBoundingClientRect();
    if (r.width < 8 || r.right < 0 || r.left > vw || getComputedStyle(el).position === 'fixed') continue;
    let box = el, br = r;
    // measure the outermost surface the text sits in, since that is what forms the visual margin
    for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
      const s2 = getComputedStyle(n), q = n.getBoundingClientRect();
      const bgc2 = parseColor(s2.backgroundColor);
      if (q.width < vw - 2 && ((bgc2 && bgc2.a > 0.04) || s2.boxShadow !== 'none' || parseFloat(s2.borderTopWidth) > 0)) { box = n; br = q; }
    }
    if (br.left >= 0 && br.left < gl) gl = br.left;
    if (vw - br.right >= 0 && vw - br.right < gr) gr = vw - br.right;
  }
  out.gutters = [Math.round(gl), Math.round(gr)];
  const repeats = {};
  for (const el of document.querySelectorAll('svg')) {
    if (!isVisible(el) || el.parentElement.closest('svg')) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 28 || r.height < 28 || r.width > 160) continue;
    // compare shapes, not colours: the same drawing recoloured is still the same drawing
    const key2 = el.innerHTML.replace(/\s+/g, ' ').replace(/(fill|stroke|stop-color|style|class|id|opacity|fill-opacity|stroke-opacity)="[^"]*"/g, '').replace(/#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)|var\([^)]*\)|url\([^)]*\)/g, '').trim();
    if (key2.length < 20) continue;
    (repeats[key2] = repeats[key2] || []).push(Math.round(r.width));
  }
  out.repeatedGraphics = Object.values(repeats).filter((v) => v.length >= 4).map((v) => ({ n: v.length, size: v[0] })).sort((p, q) => q.n - p.n).slice(0, 4);
  // people shown as initials on a disc
  let initials = 0;
  for (const el of seen) {
    const t = (el.textContent || '').trim();
    if (!/^[\p{Lu}]{1,3}$/u.test(t)) continue;
    let box = el; const r0 = el.getBoundingClientRect();
    if (r0.width < 16) box = el.parentElement || el;
    const st = getComputedStyle(box), r = box.getBoundingClientRect();
    const round = st.borderTopLeftRadius.endsWith('%') ? parseFloat(st.borderTopLeftRadius) >= 40 : parseFloat(st.borderTopLeftRadius) >= Math.min(r.width, r.height) * 0.4;
    const bgc3 = parseColor(st.backgroundColor);
    if (round && r.width >= 20 && r.width <= 72 && Math.abs(r.width - r.height) < 4 && ((bgc3 && bgc3.a > 0.3) || st.backgroundImage !== 'none')) initials++;
  }
  out.initialAvatars = initials;

  /* ---- boldness: scale, weight and colour commitment -------------- */
  {
    const hueArea = {}, pastel = {}; let foldContrast = 0; const areas = [];
    const pageBg = backgroundOf(document.body).color, pageLum = lum(pageBg), pageHue = hsl(pageBg);
    for (const el of document.querySelectorAll('body *')) {
      if (!isVisible(el) || el.closest('svg')) continue;
      const st = getComputedStyle(el), r = el.getBoundingClientRect(), area = r.width * r.height;
      if (area < 5000 || r.width > vw * 0.98 && r.height > vh * 1.5) continue;
      let c = parseColor(st.backgroundColor);
      // a gradient counts as a fill by its solid stops; a faint glow layered over a dark card is not a colour field
      const stops = st.backgroundImage && /gradient\(/.test(st.backgroundImage) ? (st.backgroundImage.match(/rgba?\([^)]*\)|#[0-9a-f]{3,8}/gi) || []).map(parseColor).filter(Boolean) : [];
      const solid = stops.filter((q) => q.a >= 0.6);
      if ((!c || c.a < 0.5) && solid.length >= 2) c = { r: (solid[0].r + solid[1].r) / 2, g: (solid[0].g + solid[1].g) / 2, b: (solid[0].b + solid[1].b) / 2, a: 1 };
      if (!c || c.a < 0.5) continue;
      const k = hsl(c);
      if (k.s > 0.28 && k.l > 0.2 && k.l < 0.93) { const bkt = Math.round(k.h / 36) * 36 % 360; hueArea[bkt] = (hueArea[bkt] || 0) + area; }
      if (k.s > 0.3 && k.l >= 0.78 && k.l < 0.95 && area < vw * vh * 0.5) { const bkt = Math.round(k.h / 36) * 36 % 360; pastel[bkt] = (pastel[bkt] || 0) + area; }
      // a contrast field: clearly darker or more saturated than the page, and large
      const top0 = r.top + window.scrollY;
      const hueGap = Math.min(Math.abs(k.h - pageHue.h), 360 - Math.abs(k.h - pageHue.h));
      const distinctTint = k.s > 0.3 && k.l > 0.15 && k.l < 0.9 && (pageHue.s < 0.12 || hueGap > 40);
      if (top0 < vh && area > vw * vh * 0.06 && (Math.abs(lum(c) - pageLum) > 0.35 || (k.s > 0.5 && k.l < 0.7 && k.l > 0.15) || distinctTint)) foldContrast = Math.max(foldContrast, area / (vw * vh));
    }
    for (const el of cardEls0()) { const r = el.getBoundingClientRect(); areas.push(r.width * r.height); }
    const tot = Object.values(hueArea).reduce((p, q) => p + q, 0);
    out.fillHues = Object.entries(hueArea).filter(([, v]) => v > tot * 0.035).map(([h]) => +h);
    const ptot = Object.values(pastel).reduce((p, q) => p + q, 0);
    out.pastelHues = Object.entries(pastel).filter(([, v]) => v > ptot * 0.08).map(([h]) => +h);
    out.foldContrast = +foldContrast.toFixed(2);
    areas.sort((p, q) => q - p);
    out.cardAreas = areas.length >= 6 ? { n: areas.length, ratio: +(areas[0] / areas[Math.floor(areas.length / 2)]).toFixed(1) } : null;
  }
  function cardEls0() {
    return [...document.querySelectorAll('body *')].filter((el) => {
      if (!isVisible(el) || el.closest('svg')) return false;
      const r = el.getBoundingClientRect();
      if (r.width < 180 || r.height < 110 || r.width > vw * 0.92 || r.height > vh * 1.6) return false;
      const st = getComputedStyle(el), bg = parseColor(st.backgroundColor);
      const filled = (bg && bg.a > 0.04) || (st.backgroundImage && st.backgroundImage !== 'none');
      if (!(parseFloat(st.borderTopLeftRadius) >= 6 && (filled || st.boxShadow !== 'none' || parseFloat(st.borderTopWidth) > 0))) return false;
      // outermost cards only
      for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
        const ps = getComputedStyle(n), q = n.getBoundingClientRect();
        if (q.width <= vw * 0.92 && q.height <= vh * 1.6 && parseFloat(ps.borderTopLeftRadius) >= 6 && ((parseColor(ps.backgroundColor) || { a: 0 }).a > 0.04 || ps.boxShadow !== 'none')) return false;
      }
      return true;
    });
  }

  /* ---- words that run together: "Yesterday21 orders" ------------- */
  const glued = [];
  const edgeRect = (node, last) => {
    const rg = document.createRange();
    if (node.nodeType === 3) { const t = node.nodeValue; const i = last ? t.replace(/\s+$/, '').length - 1 : t.search(/\S/); if (i < 0) return null; rg.setStart(node, i); rg.setEnd(node, i + 1); }
    else rg.selectNodeContents(node);
    const rs = [...rg.getClientRects()].filter((q) => q.width > 0.5 && q.height > 2);
    return rs.length ? (last ? rs[rs.length - 1] : rs[0]) : null;
  };
  const alnum = /[\p{L}\p{N}]/u;
  for (const par of document.querySelectorAll('body *')) {
    if (glued.length > 12 || par.childNodes.length < 2 || par.closest('svg') || !isVisible(par)) continue;
    const kids = [...par.childNodes].filter((n) => (n.nodeType === 3 && n.nodeValue.trim()) || (n.nodeType === 1 && isVisible(n) && (n.textContent || '').trim() && !n.closest('svg')));
    for (let i = 1; i < kids.length; i++) {
      const a1 = kids[i - 1], b1 = kids[i];
      const ta = (a1.textContent || '').replace(/\s+$/, ''), tb = (b1.textContent || '').replace(/^\s+/, '');
      if (!ta || !tb || !alnum.test(ta.slice(-1)) || !alnum.test(tb[0])) continue;
      // a prefix or unit set at a different size (a small currency sign, "kg") is a deliberate pairing
      const fs1 = parseFloat(getComputedStyle(a1.nodeType === 1 ? a1 : par).fontSize), fs2 = parseFloat(getComputedStyle(b1.nodeType === 1 ? b1 : par).fontSize);
      if (Math.abs(fs1 - fs2) > Math.max(fs1, fs2) * 0.15) continue;
      const ra = edgeRect(a1, true), rb = edgeRect(b1, false);
      if (!ra || !rb) continue;
      const sameLine = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top) > Math.min(ra.height, rb.height) * 0.5;
      const gap = rb.left - ra.right;
      if (sameLine && gap > -1 && gap < Math.max(1.5, parseFloat(getComputedStyle(par).fontSize) * 0.12)) glued.push(`"${ta.slice(-14)}${tb.slice(0, 14)}"`);
    }
  }
  out.gluedWords = [...new Set(glued)].slice(0, 8);

  /* ---- cards: empty bands, near-miss tops, flat shadows ---------- */
  const cardEls = [...document.querySelectorAll('body *')].filter((el) => {
    if (!isVisible(el) || el.closest('svg')) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 220 || r.height < 200 || r.width > vw * 0.92 || r.height > vh * 1.6) return false;
    const st = getComputedStyle(el), bg = parseColor(st.backgroundColor);
    const filled = (bg && bg.a > 0.04) || (st.backgroundImage && st.backgroundImage !== 'none');
    return parseFloat(st.borderTopLeftRadius) >= 6 && (filled || st.boxShadow !== 'none' || parseFloat(st.borderTopWidth) > 0);
  });
  const emptyBands = [];
  for (const card of cardEls) {
    const cr = card.getBoundingClientRect();
    // leaf content inside this card: text lines and graphics
    const boxes = [];
    for (const d of card.querySelectorAll('*')) {
      if (!isVisible(d)) continue;
      const tag = d.tagName.toLowerCase();
      const isLeafGraphic = tag === 'svg' || tag === 'img' || tag === 'canvas' || (d.children.length === 0 && (getComputedStyle(d).backgroundImage !== 'none' || (parseColor(getComputedStyle(d).backgroundColor) || { a: 0 }).a > 0.2));
      const hasText = [...d.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim().length > 0);
      if (!isLeafGraphic && !hasText) continue;
      if (d.closest('svg') && tag !== 'svg') continue;
      const q = d.getBoundingClientRect();
      if (q.height < 2 || q.bottom < cr.top || q.top > cr.bottom) continue;
      boxes.push([Math.max(q.top, cr.top), Math.min(q.bottom, cr.bottom)]);
    }
    if (boxes.length < 3) continue;
    boxes.sort((p, q) => p[0] - q[0]);
    let reach = boxes[0][1], worst = 0;
    for (const [t, btm] of boxes) { if (t - reach > worst) worst = t - reach; if (btm > reach) reach = btm; }
    const tail = cr.bottom - reach;
    if (worst >= 72 && worst >= cr.height * 0.18) emptyBands.push(`${describe(card).split(' "')[0]} "${(card.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 28)}" has a ${Math.round(worst)}px empty band in a ${Math.round(cr.height)}px card`);
    else if (tail >= 110 && tail >= cr.height * 0.25) emptyBands.push(`${describe(card).split(' "')[0]} "${(card.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 28)}" is empty for its last ${Math.round(tail)}px`);
  }
  out.emptyBands = emptyBands.slice(0, 8); out.emptyBandCount = emptyBands.length;
  // sibling cards that sit side by side but start at slightly different heights
  const nearTops = [];
  for (const el of document.querySelectorAll('body *')) {
    const kids = [...el.children].filter((k) => cardEls.includes(k));
    if (kids.length < 2 || kids.length > 6) continue;
    const rs = kids.map((k) => k.getBoundingClientRect());
    // same row: horizontally separate, vertically overlapping
    if (!rs.every((r, i) => i === 0 || r.left >= rs[i - 1].right - 2)) continue;
    const tops = rs.map((r) => Math.round(r.top)), spread = Math.max(...tops) - Math.min(...tops);
    if (spread >= 3 && spread <= 14) nearTops.push(`${describe(el).split(' "')[0]} (${kids.length} cards, tops ${spread}px apart)`);
  }
  out.nearTops = nearTops.slice(0, 5);
  // how many shadows are a single blur?
  let single = 0, layered = 0;
  for (const el of cardEls) {
    const sh = getComputedStyle(el).boxShadow; if (!sh || sh === 'none') continue;
    const layers = sh.replace(/\([^)]*\)/g, '').split(',').length;
    if (layers >= 2) layered++; else single++;
  }
  out.shadowLayers = { single, layered };

  /* ---- covered text: is anything sitting on top of content? ------ */
  const covered = [];
  let probes = 0;
  // decorative layers often have pointer-events: none, which would hide them from hit-testing
  const hitStyle = document.createElement('style'); hitStyle.textContent = '* { pointer-events: auto !important; }'; document.head.appendChild(hitStyle);
  for (const el of seen) {
    if (probes > 700) break;
    const txt = (el.textContent || '').trim();
    if (txt.length < 3 || getComputedStyle(el).position === 'fixed') continue;
    // skip text that is deliberately not showing: inside a faded-out or collapsed ancestor
    let shown = true;
    for (let n = el; n && n !== document.body; n = n.parentElement) {
      const ns = getComputedStyle(n);
      if (parseFloat(ns.opacity) < 0.05 || ns.visibility === 'hidden') { shown = false; break; }
    }
    const det = el.closest('details:not([open])');
    if (det && !el.closest('summary')) shown = false; // content of a closed disclosure
    if (!shown) continue;
    el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' });
    const r = el.getBoundingClientRect();
    if (r.width < 6 || r.height < 6 || r.bottom < 0 || r.top > window.innerHeight) continue;
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    let clippedAway = false;
    for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
      const ns = getComputedStyle(n);
      if (ns.overflowX === 'visible' && ns.overflowY === 'visible') continue;
      const q = n.getBoundingClientRect();
      if (cx < q.left || cx > q.right || cy < q.top || cy > q.bottom) { clippedAway = true; break; }
    }
    if (clippedAway) continue;
    probes++;
    // probe along the text itself (its line boxes), not the element's box, which can be much wider
    const rg = document.createRange(); rg.selectNodeContents(el);
    const lineRects = [...rg.getClientRects()].filter((q) => q.width > 4 && q.height > 4).slice(0, 4);
    let hidden = 0; const pts = [];
    for (const q of lineRects) for (const f of [0.08, 0.3, 0.5, 0.7, 0.92]) pts.push([q.left + q.width * f, q.top + q.height / 2]);
    let by = null;
    for (const [x, y] of pts) {
      if (x < 0 || x >= window.innerWidth) continue;
      const top = document.elementFromPoint(x, y);
      if (!top || top === el || el.contains(top) || top.contains(el)) continue;
      const ts = getComputedStyle(top);
      if (ts.position === 'fixed' || top.closest('[style*="position: fixed"], [data-ui-audit-ignore]')) continue;
      // something unrelated is in front; ignore fixed bars, which only overlap because of scrolling
      let skip = false;
      for (let n = top; n && n !== document.body; n = n.parentElement) {
        const ns = getComputedStyle(n);
        // fixed and sticky bars only overlap because of scrolling; invisible layers (a hidden tooltip) cover nothing
        if (ns.position === 'fixed' || ns.position === 'sticky' || parseFloat(ns.opacity) < 0.05 || ns.visibility === 'hidden') { skip = true; break; }
      }
      if (skip) continue;
      // a see-through layer with no fill of its own (a wrapper, an overlay grid) does not hide text
      const tb = parseColor(ts.backgroundColor);
      const ownText = [...top.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim().length > 1);
      if ((!tb || tb.a < 0.05) && ts.backgroundImage === 'none' && !ownText && !top.closest('svg') && top.tagName !== 'IMG') continue;
      hidden++; by = top;
    }
    if (hidden >= 1) covered.push(`${describe(el)} (under ${describe(by).split(' "')[0]})`);
  }
  // content hidden under fixed or sticky bars at the very top and the very bottom of the page
  const underBars = [];
  const inFixed = (n) => { for (; n && n !== document.body; n = n.parentElement) { const q = getComputedStyle(n).position; if (q === 'fixed' || q === 'sticky') return n; } return null; };
  const flow = [...seen].filter((el) => !inFixed(el) && (el.textContent || '').trim().length > 2);
  const probeEnds = (list, where) => {
    for (const el of list) {
      const rg = document.createRange(); rg.selectNodeContents(el);
      const q = [...rg.getClientRects()].find((x) => x.width > 4 && x.height > 4);
      if (!q || q.bottom < 0 || q.top > window.innerHeight) continue;
      const top = document.elementFromPoint(Math.min(window.innerWidth - 1, Math.max(0, q.left + q.width / 2)), q.top + q.height / 2);
      const bar = top && !el.contains(top) && !top.contains(el) ? inFixed(top) : null;
      if (bar && parseFloat(getComputedStyle(bar).opacity) > 0.05) underBars.push(`${describe(el)} is under ${describe(bar).split(' "')[0]} at the ${where} of the page`);
    }
  };
  window.scrollTo(0, 0); probeEnds(flow.slice(0, 8), 'top');
  window.scrollTo(0, document.documentElement.scrollHeight); probeEnds(flow.slice(-10), 'bottom');
  out.underBars = [...new Set(underBars)].slice(0, 6);
  hitStyle.remove();
  window.scrollTo(0, 0);
  out.coveredText = covered.slice(0, 10); out.coveredCount = covered.length;
  // tone of the page from top to bottom: does the ground ever change?
  const tones = [];
  for (const sec of document.querySelectorAll('body > *, body > main > *, body > div > section, main > section, main > div > section')) {
    if (!isVisible(sec)) continue;
    const r = sec.getBoundingClientRect();
    if (r.height < 260 || r.width < vw * 0.8) continue;
    const bg = backgroundOf(sec);
    tones.push(+lum(bg.color).toFixed(3));
  }
  out.sectionTones = tones;

  /* ---- richness: is there anything to look at? ------------------- */
  const pageH = document.documentElement.scrollHeight;
  const isGraphic = (el) => {
    const t = el.tagName.toLowerCase();
    if (t === 'svg' || t === 'img' || t === 'canvas' || t === 'video' || t === 'picture') return true;
    const bi = getComputedStyle(el).backgroundImage;
    return !!bi && bi !== 'none' && /url\(|gradient\(/.test(bi) && el.children.length === 0;
  };
  const graphics = [];
  for (const el of document.querySelectorAll('body *')) {
    if (!isVisible(el) || !isGraphic(el) || (el.parentElement && el.parentElement.closest('svg'))) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 14 || r.height < 14) continue;
    graphics.push({ top: r.top + window.scrollY, bottom: r.bottom + window.scrollY, w: r.width, h: r.height });
  }
  const surfaceEls = [];
  for (const el of document.querySelectorAll('body *')) {
    if (!isVisible(el) || el.closest('svg')) continue;
    const s = getComputedStyle(el), r = el.getBoundingClientRect();
    if (r.width < 120 || r.height < 48 || r.width * r.height > vw * vh * 1.2) continue;
    const bg = parseColor(s.backgroundColor);
    const filled = (bg && bg.a > 0.04) || (s.backgroundImage && s.backgroundImage !== 'none');
    const edged = s.boxShadow !== 'none' || (parseFloat(s.borderTopWidth) > 0 && parseFloat(s.borderLeftWidth) > 0 && s.borderTopStyle !== 'none');
    if ((filled && (edged || parseFloat(s.borderTopLeftRadius) >= 6)) || (edged && parseFloat(s.borderTopLeftRadius) >= 6)) {
      el.setAttribute('data-ui-audit-surface', '1');
      surfaceEls.push({ top: r.top + window.scrollY, bottom: r.bottom + window.scrollY });
      // a product mock or designed object built from HTML counts as a visual too
      if (r.width >= 280 && r.height >= 180 && el.querySelectorAll('*').length >= 15) graphics.push({ top: r.top + window.scrollY, bottom: r.bottom + window.scrollY, w: r.width, h: r.height, composed: true });
    }
  }
  // how much of the text sits directly on the page, outside any surface
  let onPage = 0, onSurface = 0;
  for (const el of seen) { const n = (el.textContent || '').trim().length; if (el.closest('[data-ui-audit-surface]')) onSurface += n; else onPage += n; }
  document.querySelectorAll('[data-ui-audit-surface]').forEach((e) => e.removeAttribute('data-ui-audit-surface'));
  const bands = [];
  for (let y = 0; y < pageH - 120; y += vh) {
    const y2 = Math.min(pageH, y + vh);
    const g = graphics.filter((q) => q.bottom > y + 10 && q.top < y2 - 10);
    const big = g.filter((q) => q.w >= 120 && q.h >= 80).length, small = g.length - big;
    const surf = surfaceEls.filter((q) => q.bottom > y + 10 && q.top < y2 - 10).length;
    bands.push({ from: Math.round(y), to: Math.round(y2), big, small, surfaces: surf });
  }
  const fold = graphics.filter((q) => q.top < vh);
  const largest = fold.reduce((m, q) => (q.w * q.h > m.w * m.h ? q : m), { w: 0, h: 0 });
  out.richness = { graphics: graphics.length, bigGraphics: graphics.filter((q) => q.w >= 120 && q.h >= 80).length, icons: graphics.filter((q) => q.w <= 44 && q.h <= 44).length,
    surfaces: surfaceEls.length, bands, foldLargest: [Math.round(largest.w), Math.round(largest.h)], textOnPage: onPage, textOnSurface: onSurface };

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
    let r = el.getBoundingClientRect();
    // a checkbox or radio is as tappable as the label that wraps or names it
    if (el.tagName === 'INPUT' && ['checkbox', 'radio'].includes(el.type) && el.labels && el.labels.length) {
      const lr = el.labels[0].getBoundingClientRect();
      const left = Math.min(r.left, lr.left), top = Math.min(r.top, lr.top);
      r = { left, top, width: Math.max(r.right, lr.right) - left, height: Math.max(r.bottom, lr.bottom) - top };
    }
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
    const html = document.documentElement.outerHTML;
    const texture = (html.match(/feTurbulence|fractalNoise/g) || []).length;
    return { texture, hover, focusVisible, focus, reducedMotion, transitionAll, animations, darkScheme, important, containerOrMedia, outlineNone, unreadable };
  });
}

function top(obj, n = 8) { return Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n); }

function report(results, facts, focus, runtime, args) {
  const L = []; const P = []; // lines, problems
  const widest = results[results.length - 1].m, narrow = results[0].m;
  const showcase = /^(showcase|editorial)$/.test(args.register || '');
  // checks that ask for surfaces, shadows, icons and colour fields do not apply to image-led editorial sites
  const SKIP = /sits directly on the page background|Very little imagery|Depth is flat|use a single blur|Everything has equal weight|no large confident field|share one background tone|people are shown as initials/;
  // dense professional tools (terminals, market data, consoles) are judged on density and precision, not on imagery and surfaces
  const dense = /^(dense|pro)$/.test(args.register || '');
  const problem = (sev, msg) => { if (showcase && sev === 'RICHNESS' && SKIP.test(msg)) return; if (dense && sev === 'RICHNESS') return; P.push({ sev, msg }); };

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
  if (sizeList.length > 12) problem('CRAFT', `${sizeList.length} distinct font sizes at ${results[results.length - 1].width}px (${sizeList.join(', ')}). Even with a detailed product mock a page rarely needs more than 9–11; near-duplicates (13 and 13.5, 15 and 16) read as accidents.`);
  const fams = Object.keys(widest.fontFamilies);
  if (facts.texture && !showcase) problem('CRAFT', `Noise or texture filters are used (${facts.texture}× feTurbulence). Grain, paper and material textures make product UI look like a themed concept; real products use clean, flat surfaces.`);
  const textFams = fams.filter((f) => !/mono|code|courier|consolas|menlo/i.test(f));
  if (textFams.length > 1 && !showcase) problem('CRAFT', `${textFams.length} text font families in use (${textFams.join(', ')}). Professional product UI uses one sans-serif family and gets hierarchy from size, weight and colour.`);
  const serifs = textFams.filter((f) => /serif|fraunces|playfair|instrument|garamond|lora|merriweather|georgia|times|bodoni|didot|caslon|libre baskerville|newsreader|dm serif|young serif|crimson|spectral/i.test(f) && !/sans/i.test(f));
  if (serifs.length && !showcase) problem('CRAFT', `A serif or display face (${serifs.join(', ')}) is used on product UI. Real apps, dashboards and SaaS pages use a clean sans-serif; serif display type reads as a themed concept.`);
  if (narrow.smallText.length) problem('CRAFT', `Text under 12px: ${narrow.smallText.slice(0, 5).join('; ')}`);
  for (const { width, m } of results) {
    if (m.longLines.length) { problem('CRAFT', `Lines too long to read comfortably at ${width}px (aim for 45–75 characters): ${m.longLines.slice(0, 3).join('; ')}`); break; }
  }
  if (widest.tightLeading.length) problem('CRAFT', `Paragraph line-height under 1.35: ${widest.tightLeading.slice(0, 3).join('; ')}`);
  if (widest.centeredBlocks) problem('CRAFT', `${widest.centeredBlocks} long paragraph(s) are centre-aligned; centred text beyond two or three lines is hard to read.`);
  const rad = top(widest.radii, 12);
  if (rad.length > 7) problem('CRAFT', `${rad.length} different corner radii (${rad.map(([k, v]) => `${k}×${v}`).join(', ')}). Keep to a scale of four or five and nest them concentrically (inner = outer − padding).`);
  const sh = Object.keys(widest.shadows).length;
  if (sh > 9) problem('CRAFT', `${sh} different box-shadows. Use a scale of four or five levels, not one per component.`);
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
  if (widest.leftNumbers && widest.leftNumbers.length) problem('CRAFT', `Numbers in table columns are left-aligned at ${results[results.length - 1].width}px: ${widest.leftNumbers.slice(0, 3).join('; ')}. Right-align numeric columns (and their headers) with tabular figures so digits line up (references/hierarchy.md).`);
  if (widest.weakFigures && widest.weakFigures.length) problem('CRAFT', `Figures barely larger than their labels: ${widest.weakFigures.slice(0, 3).join('; ')}. A figure should be about 2 to 2.5 times its label to lead (references/hierarchy.md).`);
  if (widest.looseHeadings && widest.looseHeadings.length) problem('CRAFT', `Large headings set with body defaults: ${widest.looseHeadings.slice(0, 3).join('; ')}. Tighten tracking (about -0.02em at 32px, -0.025em at 48px) and leading (1.05 to 1.2) as in references/typography.md.`);
  if (widest.heavyHeadings && widest.heavyHeadings.length) problem('CRAFT', `Headings at weight 700 or more: ${widest.heavyHeadings.slice(0, 3).join('; ')}. Large type reads more refined at 500 to 600 (references/typography.md).`);
  if (widest.regionTones > 4) problem('CRAFT', `The large regions of the page use ${widest.regionTones} different background tones. Keep to the canvas, one tinted band and at most one dark band (or canvas, surface and one raised level in an app).`);
  for (const { width, m } of results) { if (m.wrappingButtons && m.wrappingButtons.length) { problem('CRAFT', `Buttons or tabs whose label wraps at ${width}px: ${m.wrappingButtons.slice(0, 4).join('; ')}. Shorten the label (1 to 3 words) rather than letting it break (references/copy.md).`); break; } }
  if (widest.unevenCopy && widest.unevenCopy.length) problem('CRAFT', `Side-by-side cards whose body copy runs very different lengths: ${widest.unevenCopy.slice(0, 3).join('; ')}. Write siblings to within about 20% of each other so the row ends level (references/copy.md).`);
  if (widest.plainBarChart) problem('RICHNESS', `The main chart on the first screen is ${widest.plainBarChart} plain bars. A time series with more than seven points reads better as a smooth line or area with the previous period dashed or mirrored below the axis ("Choosing the main chart" in references/showpiece.md).`);
  for (const { width, m } of results) {
    if (m.raggedStrips && m.raggedStrips.length) { problem('CRAFT', `A strip of figures wraps onto ragged lines at ${width}px (labels and values out of line): ${m.raggedStrips.slice(0, 3).join('; ')}. Use a grid of equal columns or one row that scrolls sideways.`); break; }
    if (m.lonelyItems && m.lonelyItems.length) { problem('CRAFT', `A wrapping row leaves one item alone on its last line at ${width}px: ${m.lonelyItems.slice(0, 3).join('; ')}.`); break; }
  }
  if (facts.transitionAll) problem('CRAFT', `${facts.transitionAll} rules use "transition: all"; name the properties (it animates layout by accident and costs performance).`);
  if (widest.interactiveCount > 3 && facts.hover === 0) problem('CRAFT', 'No :hover rules at all; interactive elements give no feedback.');
  if (widest.deadLinks > 2) problem('CRAFT', `${widest.deadLinks} links go nowhere (href="#"). Fine for a mock, but say so in your handoff.`);

  // --- richness: against the bar, is there enough to look at?
  const R = widest.richness, Rn = narrow.richness;
  if (R) {
    const [fw, fh] = R.foldLargest;
    if (fw * fh < 260 * 180) problem('RICHNESS', `The first desktop screen has no substantial visual (largest graphic or composed surface is ${fw}×${fh}px). Lead with a showpiece: a detailed product visual, chart or illustration (references/showpiece.md).`);
    const thin = R.bands.filter((b, i) => i > 0 && b.big === 0 && b.small < 3);
    if (thin.length) problem('RICHNESS', `${thin.length} of ${R.bands.length} desktop screenfuls have nothing to look at but text (around y=${thin.slice(0, 5).map((b) => b.from).join(', ')}px). Give each section a visual of its own: a mini interface, chart, illustration, thumbnails, icon chips.`);
    const total = R.textOnPage + R.textOnSurface;
    if (total > 400 && R.textOnPage / total > 0.6) problem('RICHNESS', `${Math.round(100 * R.textOnPage / total)}% of the text sits directly on the page background. Put content on surfaces (cards, panels, a shell) so the page has levels; text on a bare page reads as a document.`);
    if (R.icons < 4 && R.bigGraphics < 3) problem('RICHNESS', `Very little imagery: ${R.icons} icon-sized and ${R.bigGraphics} larger graphics on the whole page. Lists of products, places or people want thumbnails or avatars; stat tiles do not need decoration, so ignore this note for data-led screens.`);
    if (Object.keys(widest.shadows).length <= 1 && R.surfaces > 3) problem('RICHNESS', `Depth is flat: ${Object.keys(widest.shadows).length} shadow style across ${R.surfaces} surfaces. On light themes use a small neutral shadow scale (resting, raised); on dark themes depth comes from surface steps and hairlines instead.`);
  }
  if (Rn) {
    const [pw, ph] = Rn.foldLargest, firstTwo = Rn.bands.slice(0, 2);
    if (firstTwo.length && firstTwo.every((b) => b.big === 0)) problem('RICHNESS', `On the phone the first two screens show no substantial visual (largest in the first screen is ${pw}×${ph}px). Recompose the showpiece for narrow screens; do not drop it.`);
  }
  const clipW = results.filter(({ m }) => m.clippedCount).sort((p, q) => q.m.clippedCount - p.m.clippedCount)[0];
  if (clipW) problem('CRAFT', `${clipW.m.clippedCount} text(s) are cut off by their container at ${clipW.width}px: ${clipW.m.clippedText.slice(0, 6).join('; ')}. Widen the column, shorten the text, or allow a second line; showcase work has no truncated strings.`);
  if (narrow.gutters && Math.abs(narrow.gutters[0] - narrow.gutters[1]) > 5 && narrow.overflowPx <= 1) problem('CRAFT', `Uneven page margins at ${results[0].width}px: content starts ${narrow.gutters[0]}px from the left edge and ends ${narrow.gutters[1]}px from the right. Something is wider than its container.`);
  if (widest.repeatedGraphics && widest.repeatedGraphics.length) problem('CRAFT', `The same icon or drawing is repeated (colour changes do not count): ${widest.repeatedGraphics.map((g) => `${g.n}× at ${g.size}px`).join(', ')}. If these mark different items (exercises, categories, accounts), give each its own icon; the same glyph on different things looks like a placeholder.`);
  for (const { width, m } of results) {
    if (m.coveredCount) problem('BROKEN', `${m.coveredCount} piece(s) of text are covered by another element at ${width}px: ${m.coveredText.slice(0, 6).join('; ')}. Floating cards, stamps and tooltips may overlap empty margins and edges, never the content underneath.`);
  }
  for (const { width, m } of results) {
    if (m.underBars && m.underBars.length) { problem('BROKEN', `Content is hidden under a fixed bar at ${width}px: ${m.underBars.slice(0, 4).join('; ')}. Give the page top and bottom padding equal to the bar's height plus a gap, so the first and last content can be seen in full.`); break; }
  }
  const tones = widest.sectionTones || [];
  for (const { width, m } of results) {
    if (m.emptyBandCount) { problem('CRAFT', `${m.emptyBandCount} card(s) are partly empty at ${width}px: ${m.emptyBands.slice(0, 5).join('; ')}. Size the visual to fill its card, add a supporting element, or let the card be smaller; a half-empty tile looks unfinished.`); break; }
  }
  for (const { width, m } of results) {
    if (m.gluedWords && m.gluedWords.length) { problem('BROKEN', `Words run together with no space at ${width}px: ${m.gluedWords.slice(0, 6).join(', ')}. Separate the label and the value with a gap, a line break or real spacing.`); break; }
  }
  if (widest.nearTops && widest.nearTops.length) problem('CRAFT', `Cards in one row start at nearly, but not exactly, the same height: ${widest.nearTops.slice(0, 3).join('; ')}. Align their tops, or offset the featured one decisively (24px or more).`);
  const sl = widest.shadowLayers;
  const maxSize = Math.max(...Object.keys(widest.fontSizes).map(Number));
  const phoneMax = Math.max(...Object.keys(narrow.fontSizes).map(Number));
  if (!showcase && phoneMax > 48) problem('CRAFT', `Oversized type on the phone: the largest text is ${phoneMax}px. In product UI the key figure is 28–36px and titles 20–24px; landing headlines 32–40px on a phone. Huge numerals read as a poster, not a product.`);
  if (!showcase && maxSize > 72) problem('CRAFT', `Oversized type on desktop: the largest text is ${maxSize}px. Landing headlines sit at 40–56px, product figures at 28–36px.`);
  const rainbow = (widest.pastelHues && widest.pastelHues.length >= 3) ? widest.pastelHues : (widest.fillHues && widest.fillHues.length >= 4 ? widest.fillHues : null);
  if (rainbow) problem('RICHNESS', `Colour is spread over ${rainbow.length} hue families in large fills (${rainbow.map((h) => h + '°').join(', ')}): tiles or panels each in a different tint. That reads as a pastel rainbow, not a palette. Commit to a neutral base, one dominant colour in large fields and one hot accent; give kinds of item tints of one or two hues.`);

  // --- output
  L.push(`UI AUDIT  ${args.target}`);
  L.push(`Rendered at ${results.map((r) => `${r.width}px (page height ${r.m.docHeight}px)`).join(', ')}${args.dark ? ' in dark scheme' : ''}${args.setup ? `, after running ${args.setup}` : ''}`);
  if (args.shots) {
    L.push('Screenshots (open every one; tall pages are cut into parts so details stay legible, and *-thumb.png is the whole page small):');
    results.forEach((r) => L.push(`  ${r.width}px: ${r.shots.join('  ')}`));
  }
  L.push('');
  L.push('INVENTORY (what is actually on the page)');
  L.push(`  Font sizes   ${sizeList.map((s) => s + 'px').join('  ')}`);
  L.push(`  Families     ${top(widest.fontFamilies, 5).map(([k]) => k).join(', ')}`);
  L.push(`  Weights      ${Object.keys(widest.fontWeights).sort().join(', ')}`);
  L.push(`  Text colours ${top(widest.textColors, 8).map(([k]) => k).join(' ')}${Object.keys(widest.textColors).length > 8 ? ` (+${Object.keys(widest.textColors).length - 8} more)` : ''}`);
  L.push(`  Fills        ${top(widest.fills, 8).map(([k]) => k).join(' ')}${Object.keys(widest.fills).length > 8 ? ` (+${Object.keys(widest.fills).length - 8} more)` : ''}`);
  L.push(`  Radii        ${rad.map(([k, v]) => `${k}×${v}`).join('  ') || 'none'}`);
  L.push(`  Shadows      ${sh} distinct`);
  if (widest.richness) L.push(`  Visuals      ${widest.richness.bigGraphics} large graphics, ${widest.richness.icons} icons, ${widest.richness.surfaces} surfaces; largest graphic in the first screen ${widest.richness.foldLargest.join('×')}px`);
  L.push(`  Interaction  ${widest.interactiveCount} interactive elements; ${facts.hover} :hover rules, ${facts.focusVisible} :focus-visible rules; reduced-motion ${facts.reducedMotion ? 'handled' : 'not handled'}; dark scheme ${facts.darkScheme ? 'defined' : 'not defined'}`);
  if (facts.unreadable) L.push(`  (${facts.unreadable} cross-origin stylesheet(s) could not be inspected)`);
  L.push('');
  const order = ['BROKEN', 'ACCESS', 'TOUCH', 'RICHNESS', 'CRAFT'];
  const titles = {
    BROKEN: 'BROKEN — fix these, no judgment needed',
    ACCESS: 'ACCESSIBILITY — fix these',
    TOUCH: 'TOUCH — fix unless there is a reason',
    CRAFT: 'CRAFT — measured inconsistencies; fix or be able to say why not',
    RICHNESS: 'RICHNESS — below the bar as measured; a page can pass these and still be plain, so look at the screenshots',
  };
  if (!P.length) L.push('No measurable problems found. That is the floor, not the bar: now critique the screenshots.');
  for (const sev of order) {
    const items = P.filter((p) => p.sev === sev);
    if (!items.length) continue;
    L.push(titles[sev]);
    items.forEach((p) => L.push('  • ' + p.msg));
    L.push('');
  }
  L.push('This report cannot judge whether the design looks like a real, professional product. Open the screenshots and review them with references/critique.md.');
  return { text: L.join('\n'), problems: P };
}

(async () => {
  const args = parseArgs(process.argv);
  if (!args.target) { console.error('usage: node audit.cjs <file.html | url> [--out dir] [--widths 375,768,1440] [--dark] [--setup file.js] [--register showcase|dense] [--json] [--no-shots]'); process.exit(2); }
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
      const m = await page.evaluate(`(${measure.toString()})(${width})`);
      const shots = [];
      if (args.shots) {
        const rel = (p) => { const r = path.relative(process.cwd(), p); return r.startsWith('..') ? p : r; };
        const fold = rel(path.join(args.out, `${width}-fold.png`));
        await page.screenshot({ path: fold });
        shots.push(fold);
        // Tall pages are cut into parts that stay legible when viewed; one huge image would be
        // scaled down until its text and details cannot be judged.
        if (m.docHeight > height * 1.15) {
          const isPhone = width <= 480, isWide = width === args.widths[args.widths.length - 1];
          const partH = 1500, shotW = Math.max(width, Math.min(m.overflowPx + width, width * 2));
          const maxParts = isPhone ? 12 : isWide ? 10 : 3, parts = [];
          for (let i = 0, y = 0; y < m.docHeight - 40 && i < maxParts; i++, y += partH) {
            const f = path.join(args.out, `${width}-part-${i + 1}.png`);
            const ok = await page.screenshot({ path: f, fullPage: true, clip: { x: 0, y, width: shotW, height: Math.min(partH, m.docHeight - y) } }).then(() => true, () => false);
            if (ok) parts.push(f);
          }
          if (isPhone && parts.length) {
            // phone parts are narrow: lay them side by side, three to a sheet, reading left to right
            const sheetPage = await (ctx || browser).newPage();
            for (let i = 0; i < parts.length; i += 3) {
              const group = parts.slice(i, i + 3), f = rel(path.join(args.out, `${width}-sheet-${i / 3 + 1}.png`));
              await sheetPage.setViewportSize ? await sheetPage.setViewportSize({ width: group.length * (shotW + 24) + 24, height: partH + 48 }) : await sheetPage.setViewport({ width: group.length * (shotW + 24) + 24, height: partH + 48 });
              await sheetPage.setContent(`<body style="margin:0;background:#777;display:flex;gap:24px;padding:24px;align-items:flex-start">${group.map((g) => `<img src="file://${path.resolve(g)}" style="width:${shotW}px;display:block">`).join('')}</body>`);
              await sheetPage.waitForFunction(() => [...document.images].every((im) => im.complete)).catch(() => {});
              await sheetPage.screenshot({ path: f });
              shots.push(f);
            }
            await sheetPage.close();
            parts.forEach((f) => fs.rmSync(f, { force: true }));
          } else parts.forEach((f) => shots.push(rel(f)));
          if (isWide) {
            // a small whole-page view, for judging the overall shape of the page
            const full = path.join(args.out, `${width}-full.tmp.png`), thumb = rel(path.join(args.out, `${width}-thumb.png`));
            const ok = await page.screenshot({ path: full, fullPage: true }).then(() => true, () => false);
            if (ok) {
              const tp = await (ctx || browser).newPage(), tw = 420, th = Math.min(2400, Math.round(m.docHeight * tw / width));
              await (tp.setViewportSize ? tp.setViewportSize({ width: tw, height: th }) : tp.setViewport({ width: tw, height: th }));
              await tp.setContent(`<body style="margin:0"><img src="file://${path.resolve(full)}" style="width:${tw}px;display:block"></body>`);
              await tp.waitForFunction(() => [...document.images].every((im) => im.complete)).catch(() => {});
              await tp.screenshot({ path: thumb }); await tp.close(); shots.push(thumb);
              fs.rmSync(full, { force: true });
            }
          }
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
