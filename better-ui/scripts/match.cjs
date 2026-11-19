#!/usr/bin/env node
// Make references measurable, so the build matches them instead of only being inspired by them.
//
//   node match.cjs grid <image> [--crop x,y,w,h] [--step 20] [--out file.png]
//       The image (or a crop of it) with a pixel ruler and grid lines, to read paddings, gaps, heights,
//       radii and type sizes in pixels. Divide by the scale it prints (screen width in the image / 375 for a
//       phone, / 1440 for a desktop page) to get CSS px.
//   node match.cjs palette <image> [--crop x,y,w,h]
//       The dominant colours with their share of the area, and a guess at each one's role (canvas, surface,
//       text, accent).
//   node match.cjs compare <reference image> <your page: file.html, URL or a screenshot> [--crop x,y,w,h] [--crop2 x,y,w,h]
//                          [--width 375|1440] [--out file.png]
//       (--crop2 crops your screenshot to the one screen, without the device frame.)
//       Renders your page at the width, puts it beside the reference at the same height, and compares the
//       palettes, the layout blocks (header bands, cards, sections, gradients) and the density of content.
//       Prints RESULT: PASS or FAIL with each difference in px, and exits 1 on FAIL.
//   node match.cjs map <image> [--brand <hex>] [--crop x,y,w,h] [--width 375] [--out ref-map]
//       The whole reference as a map: ref-map.css (colours mapped to the brand by role, padding, gaps, line and
//       type sizes, block heights), ref-map.png (the reference annotated with them) and ref-map.md (the slice
//       list to fill in). Build from these numbers.
//   node match.cjs recolor <image> --brand <hex> [--crop x,y,w,h] [--out file.png]
//       The reference in the brand's hue at the same lightness and strength, with a colour map from each
//       reference colour to the one to use. compare --brand <hex> compares against this, and then every
//       colour must match.
//   node match.cjs blocks <image> [--crop x,y,w,h] [--width 375]
//       The reference's layout as blocks top to bottom (y, height, colour, gradient) and its content rows:
//       the slice list to build from.
//
// Needs Playwright with Chromium (the same as audit.cjs).

const fs = require('fs');
const path = require('path');

function loadPlaywright() {
  for (const name of ['playwright', 'playwright-core', '@playwright/test']) { try { return require(name); } catch (_) { /* next */ } }
  try { return require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright'); } catch (_) { /* none */ }
  console.error('match: Playwright not found (npm i -D playwright).'); process.exit(2);
}
const { chromium } = loadPlaywright();

const [cmd, ...rest] = process.argv.slice(2);
const opt = (k, d) => { const i = rest.indexOf('--' + k); return i >= 0 ? rest[i + 1] : d; };
const pos = rest.filter((a, i) => !a.startsWith('--') && !(i > 0 && rest[i - 1].startsWith('--')));
const crop = opt('crop') ? opt('crop').split(',').map(Number) : null;
const mime = (f) => (/\.png$/i.test(f) ? 'image/png' : /\.jpe?g$/i.test(f) ? 'image/jpeg' : 'image/webp');
const dataUrl = (f) => `data:${mime(f)};base64,${fs.readFileSync(f).toString('base64')}`;

// runs in the page: load an image, crop it, return pixels via canvas
const PAGE_LIB = `
async function loadImg(src) { const im = new Image(); im.src = src; await im.decode(); return im; }
function toCanvas(im, crop) { const [x, y, w, h] = crop || [0, 0, im.naturalWidth, im.naturalHeight]; const c = document.createElement('canvas'); c.width = w; c.height = h; c.getContext('2d').drawImage(im, x, y, w, h, 0, 0, w, h); return c; }
function palette(c, k = 8) {
  const ctx = c.getContext('2d'); const { width: w, height: h } = c; const d = ctx.getImageData(0, 0, w, h).data;
  const step = Math.max(1, Math.floor(Math.sqrt((w * h) / 60000))); const bins = new Map(); let total = 0;
  for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) { const i = (y * w + x) * 4; if (d[i + 3] < 128) continue;
    const key = (d[i] >> 3) << 10 | (d[i + 1] >> 3) << 5 | (d[i + 2] >> 3); const b = bins.get(key) || { n: 0, r: 0, g: 0, b: 0 }; b.n++; b.r += d[i]; b.g += d[i + 1]; b.b += d[i + 2]; bins.set(key, b); total++; }
  let cols = [...bins.values()].map((b) => ({ r: b.r / b.n, g: b.g / b.n, b: b.b / b.n, n: b.n }));
  // merge near colours (Lab distance under 10)
  const lab = (c) => { const f = (u) => { u /= 255; return u <= 0.04045 ? u / 12.92 : ((u + 0.055) / 1.055) ** 2.4; }; const R = f(c.r), G = f(c.g), B = f(c.b);
    let X = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047, Y = R * 0.2126 + G * 0.7152 + B * 0.0722, Z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883;
    const g = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116); X = g(X); Y = g(Y); Z = g(Z); return [116 * Y - 16, 500 * (X - Y), 200 * (Y - Z)]; };
  cols.sort((a, b) => b.n - a.n); const merged = [];
  for (const c of cols) { const L = lab(c); const m = merged.find((o) => Math.hypot(o.L[0] - L[0], o.L[1] - L[1], o.L[2] - L[2]) < 10); if (m) { const t = m.n + c.n; m.r = (m.r * m.n + c.r * c.n) / t; m.g = (m.g * m.n + c.g * c.n) / t; m.b = (m.b * m.n + c.b * c.n) / t; m.n = t; } else merged.push({ ...c, L }); }
  merged.sort((a, b) => b.n - a.n);
  const hex = (c) => '#' + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
  return merged.slice(0, k).map((c) => { const L = lab(c); const chroma = Math.hypot(L[1], L[2]); return { hex: hex(c), share: +(100 * c.n / total).toFixed(1), L: +L[0].toFixed(1), chroma: +chroma.toFixed(1), lab: L.map((v) => +v.toFixed(1)) }; });
}

function lab(c) { const f = (u) => { u /= 255; return u <= 0.04045 ? u / 12.92 : ((u + 0.055) / 1.055) ** 2.4; }; const R = f(c.r), G = f(c.g), B = f(c.b);
  let X = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047, Y = R * 0.2126 + G * 0.7152 + B * 0.0722, Z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883;
  const g = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116); X = g(X); Y = g(Y); Z = g(Z); return [116 * Y - 16, 500 * (X - Y), 200 * (Y - Z)]; }

// structure: scale to W css px wide, find background blocks (header bands, cards, sections) with their
// gradients, and count content rows (lines of text, icon rows, controls)
function structure(c, W) {
  const H = Math.round(c.height * W / c.width); const s = document.createElement('canvas'); s.width = W; s.height = H; const g = s.getContext('2d'); g.drawImage(c, 0, 0, W, H);
  const d = g.getImageData(0, 0, W, H).data; const px = (x, y) => { const i = (y * W + x) * 4; return [d[i], d[i + 1], d[i + 2]]; };
  const dist = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
  const rowBg = [], ink = [];
  for (let y = 0; y < H; y++) { const bins = new Map();
    for (let x = 0; x < W; x += 2) { const p = px(x, y); const k = (p[0] >> 4) << 8 | (p[1] >> 4) << 4 | (p[2] >> 4); const e = bins.get(k) || [0, 0, 0, 0]; e[0]++; e[1] += p[0]; e[2] += p[1]; e[3] += p[2]; bins.set(k, e); }
    let best = [0]; for (const e of bins.values()) if (e[0] > best[0]) best = e; const bg = [best[1] / best[0], best[2] / best[0], best[3] / best[0]]; rowBg.push(bg);
    let n = 0; for (let x = Math.round(W * .04); x < W * .96; x++) if (dist(px(x, y), bg) > 90) n++; ink.push(n / W); }
  const blocks = []; let st = 0;
  for (let y = 1; y <= H; y++) { if (y === H || dist(rowBg[y], rowBg[y - 1]) > 12) { const last = blocks[blocks.length - 1];
      if (y - st >= 8) { if (last && dist(last.bot, rowBg[st]) < 12) { last.end = y; last.bot = rowBg[y - 1]; } else blocks.push({ start: st, end: y, top: rowBg[st], bot: rowBg[y - 1] }); }
      else if (last) last.end = y; st = y; } }
  const rows = []; let r0 = -1, gap = 0;
  for (let y = 0; y < H; y++) { if (ink[y] > 0.006) { if (r0 < 0) r0 = y; gap = 0; } else if (r0 >= 0 && ++gap >= 3) { if (y - gap - r0 >= 4) rows.push([r0, y - gap]); r0 = -1; gap = 0; } }
  const hex = (c) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
  const tones = rowBg.map((c) => { const L = lab({ r: c[0], g: c[1], b: c[2] }); return Math.hypot(L[1], L[2]) > 18 ? 'colour' : L[0] < 40 ? 'dark' : 'light'; });
  const rowHex = rowBg.map((c) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase());
  const med = (a) => { const b = [...a].sort((x, y) => x - y); return b.length ? b[Math.floor(b.length / 2)] : 0; };
  const rowMed = med(rows.map((r) => r[1] - r[0])), gapMed = med(rows.slice(1).map((r, i) => r[0] - rows[i][1]));
  return { H, tones, rowHex, rowMed, gapMed, rowsList: rows, rows: rows.length, rowH: rows.length ? Math.round(rows.reduce((a, r) => a + r[1] - r[0], 0) / rows.length) : 0,
    blocks: blocks.filter((b) => b.end - b.start >= 16).map((b) => ({ start: b.start, end: b.end, h: b.end - b.start, top: hex(b.top), bot: hex(b.bot), gradient: b.end - b.start >= 40 && dist(b.top, b.bot) > 36, lab: lab({ r: b.top[0], g: b.top[1], b: b.top[2] }) })) };
}

// OKLab / OKLCH for recolouring the reference into the brand's hue at the same lightness and strength
const lin = (u) => { u /= 255; return u <= 0.04045 ? u / 12.92 : ((u + 0.055) / 1.055) ** 2.4; };
const gam = (u) => 255 * (u <= 0.0031308 ? 12.92 * u : 1.055 * u ** (1 / 2.4) - 0.055);
function toOk(r, g, b) { r = lin(r); g = lin(g); b = lin(b);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, A = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, B = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;
  return [L, Math.hypot(A, B), (Math.atan2(B, A) * 180 / Math.PI + 360) % 360]; }
function fromOk(L, C, H) { const a = C * Math.cos(H * Math.PI / 180), b = C * Math.sin(H * Math.PI / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3, m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3, s = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s]; }
function okRgb(L, C, H) { let lo = 0, hi = C, rgb = fromOk(L, C, H); const inG = (v) => v.every((x) => x >= -0.0005 && x <= 1.0005);
  if (!inG(rgb)) { for (let i = 0; i < 8; i++) { const mid = (lo + hi) / 2; if (inG(fromOk(L, mid, H))) lo = mid; else hi = mid; } rgb = fromOk(L, lo, H); }
  return rgb.map((x) => Math.max(0, Math.min(255, Math.round(gam(Math.max(0, Math.min(1, x))))))); }
// rotate every pixel within 45° of the reference's accent hue (and its tinted neutrals) to the brand hue
function recolor(c, brand) { const g = c.getContext('2d'); const im = g.getImageData(0, 0, c.width, c.height); const d = im.data;
  const hue = new Float64Array(36); for (let i = 0; i < d.length; i += 16) { const [L, C, H] = toOk(d[i], d[i + 1], d[i + 2]); if (C > 0.04) hue[Math.floor(H / 10)] += C; }
  let hb = 0; for (let i = 1; i < 36; i++) if (hue[i] > hue[hb]) hb = i; const refH = hb * 10 + 5; const bH = toOk(...brand)[2]; const cache = new Map();
  for (let i = 0; i < d.length; i += 4) { const key = d[i] << 16 | d[i + 1] << 8 | d[i + 2]; let o = cache.get(key);
    if (!o) { const [L, C, H] = toOk(d[i], d[i + 1], d[i + 2]); const dh = Math.abs(((H - refH + 540) % 360) - 180); o = C > 0.004 && dh < 45 ? okRgb(L, C, (H + bH - refH + 360) % 360) : [d[i], d[i + 1], d[i + 2]]; cache.set(key, o); }
    d[i] = o[0]; d[i + 1] = o[1]; d[i + 2] = o[2]; }
  g.putImageData(im, 0, 0); return { refHue: refH, brandHue: Math.round(bH) }; }
function mapHex(hex, refH, bH) { const v = hex.replace('#', '').match(/../g).map((h) => parseInt(h, 16)); const [L, C, H] = toOk(...v); const dh = Math.abs(((H - refH + 540) % 360) - 180);
  const o = C > 0.004 && dh < 45 ? okRgb(L, C, (H + bH - refH + 360) % 360) : v; return '#' + o.map((x) => x.toString(16).padStart(2, '0')).join('').toUpperCase(); }
// horizontal measures: where surfaces (cards, fields) start, where text starts, line heights and gaps
function measures(c, W) {
  const H = Math.round(c.height * W / c.width); const s = document.createElement('canvas'); s.width = W; s.height = H; const g = s.getContext('2d'); g.drawImage(c, 0, 0, W, H);
  const d = g.getImageData(0, 0, W, H).data; const px = (x, y) => { const i = (y * W + x) * 4; return [d[i], d[i + 1], d[i + 2]]; };
  const dist = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
  const surf = new Map(), text = new Map(); const bump = (m, k) => m.set(k, (m.get(k) || 0) + 1);
  for (let y = 0; y < H; y++) { const edge = px(1, y); let sx = -1, tx = -1;
    for (let x = 2; x < W / 2; x++) { const p = px(x, y); const dd = dist(p, edge); if (sx < 0 && dd > 14 && dd <= 90) sx = x; if (dd > 90) { tx = x; break; } }
    if (sx > 0 && (tx < 0 || sx < tx)) bump(surf, sx); if (tx > 0) bump(text, tx); }
  const mode = (m, min) => { let best = -1, n = 0; for (const [k, v] of m) if (v > n && k >= min) { n = v; best = k; } return n >= H * 0.06 ? best : -1; };
  const top3 = (m) => [...m].filter(([k]) => k >= 4).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k, v]) => k + ':' + v).join(' ');
  return { surfaceInset: mode(surf, 4), textInset: mode(text, 4), dbg: top3(surf) + ' | ' + top3(text) };
}

// the map: the reference (in the brand's hue) with its blocks, text rows and paddings drawn on it
function drawMap(c, W, st, ms) {
  const H = st.H; const o = document.createElement('canvas'); const pad = 150; o.width = W * 2 + pad * 2; o.height = H * 2; const g = o.getContext('2d');
  g.fillStyle = '#fff'; g.fillRect(0, 0, o.width, o.height); g.drawImage(c, pad, 0, W * 2, H * 2); g.font = '600 15px system-ui'; g.textBaseline = 'middle';
  st.blocks.forEach((b, i) => { g.strokeStyle = 'rgba(255,0,110,.9)'; g.lineWidth = 2; g.strokeRect(pad + 1, b.start * 2 + 1, W * 2 - 2, b.h * 2 - 2);
    g.fillStyle = '#ff006e'; g.textAlign = 'right'; g.fillText(\`B\${i + 1}  y\${b.start}\`, pad - 8, b.start * 2 + 12); g.fillText(\`h\${b.h}\`, pad - 8, b.start * 2 + 30); });
  g.textAlign = 'left'; st.rowsList.forEach(([a, b]) => { const h = b - a; const fs = Math.round(h * 1.25); g.fillStyle = 'rgba(0,120,255,.16)'; g.fillRect(pad, a * 2, W * 2, h * 2);
    g.fillStyle = '#0060d0'; g.fillText(h > 22 ? \`\${h}px: icon or several lines\` : \`\${h}px ink ≈ \${fs}px type\`, pad + W * 2 + 8, (a + h / 2) * 2); });
  if (ms.textInset > 0) { g.strokeStyle = 'rgba(0,160,90,.9)'; g.setLineDash([6, 6]); g.beginPath(); g.moveTo(pad + ms.textInset * 2, 0); g.lineTo(pad + ms.textInset * 2, H * 2); g.moveTo(pad + (W - ms.textInset) * 2, 0); g.lineTo(pad + (W - ms.textInset) * 2, H * 2); g.stroke(); g.setLineDash([]); }
  return o; }

// content signature: for each 40px window, how much ink there is and how many items sit side by side
function signature(c, W, win) {
  const H = Math.round(c.height * W / c.width); const s = document.createElement('canvas'); s.width = W; s.height = H; const g = s.getContext('2d'); g.drawImage(c, 0, 0, W, H);
  const d = g.getImageData(0, 0, W, H).data; const px = (x, y) => { const i = (y * W + x) * 4; return [d[i], d[i + 1], d[i + 2]]; };
  const dist = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
  const out = []; const x0 = Math.round(W * .04), x1 = Math.round(W * .96);
  for (let y0 = 0; y0 + win <= H; y0 += win / 2) { const col = new Uint8Array(W); let ink = 0;
    for (let y = y0; y < y0 + win; y++) { const bins = new Map(); for (let x = 0; x < W; x += 3) { const p = px(x, y); const k = (p[0] >> 4) << 8 | (p[1] >> 4) << 4 | (p[2] >> 4); bins.set(k, (bins.get(k) || 0) + 1); }
      let bk = 0, n = 0; for (const [k, v] of bins) if (v > n) { n = v; bk = k; } const bg = [((bk >> 8) & 15) * 16 + 8, ((bk >> 4) & 15) * 16 + 8, (bk & 15) * 16 + 8];
      for (let x = x0; x < x1; x++) if (dist(px(x, y), bg) > 100) { col[x] = 1; ink++; } }
    let items = 0, gap = 99, w = 0; for (let x = x0; x < x1; x++) { if (col[x]) { if (gap >= 10) { items++; } gap = 0; w++; } else gap++; }
    out.push({ y: y0, ink: ink / ((x1 - x0) * win), items }); }
  return out; }
`;
function roles(p) {
  return p.map((c, i) => ({ ...c, role: i === 0 ? 'canvas' : c.chroma > 25 ? 'accent' : c.L < 35 ? 'text / dark surface' : c.L > 85 ? 'surface' : 'muted / line' }));
}
const dE = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const fmt = (p) => roles(p).map((c) => `  ${c.hex}  ${String(c.share).padStart(5)}%  L${String(Math.round(c.L)).padStart(3)}  C${String(Math.round(c.chroma)).padStart(3)}  ${c.role}`).join('\n');

(async () => {
  if (!['grid', 'palette', 'compare', 'blocks', 'recolor', 'map'].includes(cmd) || !pos[0]) { console.error('usage: node match.cjs grid|palette|compare <image> [<page>] [--crop x,y,w,h] [--step 20] [--width 375] [--out file.png]'); process.exit(2); }
  const b = await chromium.launch(); const page = await b.newPage({ viewport: { width: 1600, height: 1000 } });
  await page.setContent('<!doctype html><body style="margin:0"></body>'); await page.addScriptTag({ content: PAGE_LIB });
  const img = path.resolve(pos[0]);
  if (cmd === 'palette') {
    const p = await page.evaluate(async ([src, crop]) => palette(toCanvas(await loadImg(src), crop)), [dataUrl(img), crop]);
    console.log(`Palette of ${pos[0]}${crop ? ' (crop ' + crop.join(',') + ')' : ''}:\n${fmt(p)}`);
  }
  if (cmd === 'map') {
    const width = Number(opt('width', 375)); const base = opt('out', 'ref-map'); const brand = opt('brand');
    const brandRgb = brand ? brand.replace('#', '').match(/../g).map((h) => parseInt(h, 16)) : null;
    const r = await page.evaluate(async ([src, crop, brand, W]) => { const c = toCanvas(await loadImg(src), crop); const pal = palette(c, 10); let rec = null; if (brand) rec = recolor(c, brand);
      const st = structure(c, W); const ms = measures(c, W); const o = drawMap(c, W, st, ms); document.body.innerHTML = ''; document.body.appendChild(o);
      const map = (h) => (rec ? mapHex(h, rec.refHue, rec.brandHue) : h); return { w: o.width, h: o.height, pal: pal.map((p) => ({ ...p, to: map(p.hex) })), st: { ...st, blocks: st.blocks.map((b) => ({ ...b, to: b.top, toBot: b.bot })), tones: undefined, rowHex: undefined }, ms, rec }; }, [dataUrl(img), crop, brandRgb, width]);
    await page.setViewportSize({ width: r.w, height: r.h }); await page.screenshot({ path: base + '.png', clip: { x: 0, y: 0, width: r.w, height: r.h } });
    const R = roles(r.pal); const pick = (f) => R.filter(f).sort((a, b) => b.share - a.share);
    const canvas = R[0], acc = pick((c) => c.chroma > 18), light = pick((c) => c.L > 85 && c !== canvas), dark = pick((c) => c.L < 40 && c.chroma <= 18), mid = pick((c) => c.L >= 40 && c.L <= 85 && c.chroma <= 18);
    const hist = new Map(); for (const [a, b] of r.st.rowsList) { const h = b - a; if (h >= 6 && h <= 22) hist.set(h, (hist.get(h) || 0) + 1); }
    const ramp = [...hist].filter(([, n]) => n >= 2).sort((a, b) => b[0] - a[0]).map(([h, n]) => [h, Math.round(h * 1.25), n]).filter((x, i, a) => i === 0 || a[i - 1][1] - x[1] >= 2).slice(0, 6);
    const v = (n, x) => (x ? `  --ref-${n}: ${String(x).replace(/; \/\*/, ' /*').replace(/^(.*?)( \/\*.*)?$/, (m, a, c) => a + ';' + (c || ''))}\n` : '');
    const css = `/* Reference map of ${pos[0]}${crop ? ' (crop ' + crop.join(',') + ')' : ''} at ${width}px${brand ? ', recoloured to ' + brand : ''}.\n   Generated by match.cjs map: the measured starting point. Map these onto the kit's variables; change a value\n   only for a floor (44px hit areas, 16px input text, 4.5:1 contrast), and meet floors without changing what is seen. */\n:root {\n` +
      v('canvas', canvas.to) + acc.map((c, i) => v(`accent-${i + 1}`, `${c.to}; /* ${c.share}% of the area, L${Math.round(c.L)} C${Math.round(c.chroma)} */`)).join('') +
      light.map((c, i) => v(`surface-${i + 1}`, `${c.to}; /* ${c.share}% */`)).join('') + dark.map((c, i) => v(`ink-${i + 1}`, c.to)).join('') + mid.map((c, i) => v(`muted-${i + 1}`, c.to)).join('') +
      v('pad', r.ms.textInset > 0 ? r.ms.textInset + 'px; /* screen edge to text and icons */' : '') + v('inset', r.ms.surfaceInset > 0 ? r.ms.surfaceInset + 'px; /* screen edge to cards and fields */' : '') +
      v('row-gap', r.st.gapMed + 'px; /* typical gap between lines of content */') + v('line', r.st.rowMed + 'px; /* typical ink height of a text line */') +
      ramp.map(([h, fs, n], i) => v(`type-${i + 1}`, `${fs}px; /* ${n} lines with ${h}px ink height; confirm on the grid */`)).join('') +
      r.st.blocks.map((b, i) => v(`b${i + 1}-h`, `${b.h}px; /* y${b.start}, ${b.to}${b.gradient ? ' → ' + b.toBot + ' gradient' : ''} */`)).join('') + '}\n';
    fs.writeFileSync(base + '.css', css);
    const md = `# Slice list: ${pos[0]}\n\nFill in what each block holds, then build the same blocks in this order at these heights, with this product's content. Reference map image: ${base}.png\n\n| Block | y | Height | Colour | Holds (fill in) | Becomes in the build |\n|:---|:---|:---|:---|:---|:---|\n` +
      r.st.blocks.map((b, i) => `| B${i + 1} | ${b.start} | ${b.h} | ${b.to}${b.gradient ? ' → ' + b.toBot : ''} | | |`).join('\n') + '\n';
    fs.writeFileSync(base + '.md', md);
    console.log(`Reference map → ${base}.png (blocks, text rows with estimated type size, padding lines), ${base}.css (tokens), ${base}.md (slice list to fill in)\n\n${css}`);
  }
  if (cmd === 'recolor') {
    const brand = opt('brand'); if (!brand) { console.error('recolor needs --brand <hex>'); process.exit(2); } const out = opt('out', img.replace(/\.[a-z]+$/i, '') + '-brand.png');
    const brandRgb = brand.replace('#', '').match(/../g).map((h) => parseInt(h, 16));
    const r = await page.evaluate(async ([src, crop, brand]) => { const c = toCanvas(await loadImg(src), crop); const before = palette(c, 10); const rec = recolor(c, brand); const after = before.map((p) => ({ hex: mapHex(p.hex, rec.refHue, rec.brandHue) }));
      document.body.innerHTML = ''; document.body.appendChild(c); return { w: c.width, h: c.height, before, after, rec }; }, [dataUrl(img), crop, brandRgb]);
    await page.setViewportSize({ width: r.w, height: r.h }); await page.screenshot({ path: out, clip: { x: 0, y: 0, width: r.w, height: r.h } });
    console.log(`Reference in the brand's hue (${r.rec.refHue}° → ${r.rec.brandHue}°, same lightness and strength) → ${out}\n\nColour map (reference → build), with share of the area:\n${r.before.map((c, i) => `  ${c.hex} → ${r.after[i] ? r.after[i].hex : c.hex}  ${String(c.share).padStart(5)}%  L${Math.round(c.L)} C${Math.round(c.chroma)}`).join('\n')}\n\nUse these as the colour tokens of the build (headers, cards, tints, text, icons) and keep the exact brand colour for the logo and the primary button only where the reference also uses its strongest accent. Compare against this image with: compare <ref> <page> --brand ${brand}`);
  }
  if (cmd === 'blocks') {
    const width = Number(opt('width', 375));
    const st = await page.evaluate(async ([src, crop, W]) => structure(toCanvas(await loadImg(src), crop), W), [dataUrl(img), crop, width]);
    console.log(`Blocks of ${pos[0]} at ${width}px wide (height ${st.H}):\n${st.blocks.map((x) => `  ${String(x.start).padStart(4)}–${String(x.end).padEnd(4)} h${String(x.h).padEnd(4)} ${x.top}${x.gradient ? ' → ' + x.bot + '  gradient' : ''}`).join('\n')}\nContent rows: ${st.rows}, average ${st.rowH}px tall.\nWrite the slice list from this: each block, what it holds, and its height; build the same blocks in the same order.`);
  }
  if (cmd === 'grid') {
    const step = Number(opt('step', 20)); const out = opt('out', img.replace(/\.[a-z]+$/i, '') + '-grid.png');
    const size = await page.evaluate(async ([src, crop, step]) => {
      const c = toCanvas(await loadImg(src), crop); const W = c.width, H = c.height, pad = 34; const o = document.createElement('canvas'); o.width = W + pad; o.height = H + pad; const g = o.getContext('2d');
      g.fillStyle = '#fff'; g.fillRect(0, 0, o.width, o.height); g.drawImage(c, pad, pad); g.font = '10px monospace'; g.textBaseline = 'top';
      for (let x = 0; x <= W; x += step) { const major = x % (step * 5) === 0; g.strokeStyle = major ? 'rgba(255,0,80,.55)' : 'rgba(255,0,80,.18)'; g.beginPath(); g.moveTo(pad + x + .5, pad); g.lineTo(pad + x + .5, pad + H); g.stroke(); if (major) { g.fillStyle = '#c00040'; g.fillText(String(x), pad + x + 2, 4); } }
      for (let y = 0; y <= H; y += step) { const major = y % (step * 5) === 0; g.strokeStyle = major ? 'rgba(255,0,80,.55)' : 'rgba(255,0,80,.18)'; g.beginPath(); g.moveTo(pad, pad + y + .5); g.lineTo(pad + W, pad + y + .5); g.stroke(); if (major) { g.fillStyle = '#c00040'; g.fillText(String(y), 2, pad + y + 2); } }
      document.body.appendChild(o); return [W, H, o.width, o.height]; }, [dataUrl(img), crop, step]);
    await page.setViewportSize({ width: size[2], height: size[3] }); await page.screenshot({ path: out, clip: { x: 0, y: 0, width: size[2], height: size[3] } });
    console.log(`Grid (${step}px, labels every ${step * 5}px) for ${size[0]}×${size[1]}px → ${out}\nScale: measure the screen's width in the image (phone screen edge to edge, or the page width) and divide every measurement by (that width / 375) for a phone or (that width / 1440) for a desktop page.`);
  }
  if (cmd === 'compare') {
    const target = pos[1]; if (!target) { console.error('compare needs <reference image> <your page>'); process.exit(2); }
    const width = Number(opt('width', 375)); const out = opt('out', 'match-compare.png');
    let shotPath = out.replace(/\.png$/, '') + '-yours.png'; const crop2 = opt('crop2') ? opt('crop2').split(',').map(Number) : null;
    if (/\.(png|jpe?g|webp)$/i.test(target)) shotPath = path.resolve(target);
    else { const ours = await b.newPage({ viewport: { width, height: width < 800 ? 812 : 900 }, deviceScaleFactor: 2 });
      await ours.goto(/^https?:/.test(target) ? target : 'file://' + path.resolve(target), { waitUntil: 'networkidle' }).catch(() => {});
      await ours.waitForTimeout(1200); await ours.screenshot({ path: shotPath }); }
    const brandRgb = opt('brand') ? opt('brand').replace('#', '').match(/../g).map((h) => parseInt(h, 16)) : null;
    const res = await page.evaluate(async ([refSrc, crop, oursSrc, W, crop2, brand]) => {
      const rc = toCanvas(await loadImg(refSrc), crop); const oc = toCanvas(await loadImg(oursSrc), crop2); const rec = brand ? recolor(rc, brand) : null;
      const H = 1000, rw = Math.round(rc.width * H / rc.height), ow = Math.round(oc.width * H / oc.height);
      const o = document.createElement('canvas'); o.width = rw + ow + 60; o.height = H + 40; const g = o.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, o.width, o.height);
      g.font = 'bold 18px system-ui'; g.fillStyle = '#111'; g.fillText('Reference', 10, 24); g.fillText('Yours', rw + 50, 24);
      g.drawImage(rc, 10, 36, rw, H); g.drawImage(oc, rw + 50, 36, ow, H); document.body.innerHTML = ''; document.body.appendChild(o);
      return { size: [o.width, o.height], ref: palette(rc), ours: palette(oc), rs: structure(rc, W), os: structure(oc, W), rm: measures(rc, W), om: measures(oc, W), rsig: signature(rc, W, 40), osig: signature(oc, W, 40), rec }; }, [dataUrl(img), crop, dataUrl(shotPath), width, crop2, brandRgb]);
    await page.setViewportSize({ width: res.size[0], height: res.size[1] }); await page.screenshot({ path: out, clip: { x: 0, y: 0, width: res.size[0], height: res.size[1] } });
    const lines = [], lineChroma = [];
    for (const r of roles(res.ref)) { if (r.share < 1.5) continue; lineChroma.push(r.chroma); const best = res.ours.map((o) => ({ o, d: dE(r.lab, o.lab) })).sort((x, y) => x.d - y.d)[0];
      const verdict = best.d < 6 ? 'match' : best.d < 15 ? 'close' : 'MISSING'; lines.push(`  ${r.hex} ${String(r.share).padStart(5)}% ${r.role.padEnd(20)} → ${best.o.hex} ${String(best.o.share).padStart(5)}%  ΔE ${best.d.toFixed(1).padStart(5)}  ${verdict}${verdict !== 'MISSING' && Math.abs(best.o.share - r.share) > 12 ? `  (area ${best.o.share > r.share ? 'too large' : 'too small'})` : ''}`); }
    const extra = roles(res.ours).filter((o) => o.share >= 3 && !res.ref.some((r) => dE(r.lab, o.lab) < 15));
    const fails = [];
    // colour: neutrals must match; the reference's accent may be replaced by the brand, at the same area
    const acc = (p) => p.filter((c) => c.chroma > 18).reduce((a, c) => a + c.share, 0);
    const ra = acc(res.ref), oa = acc(res.ours);
    for (const [i, l] of lines.entries()) if (/MISSING/.test(l) && (brandRgb || !(lineChroma[i] > 18))) fails.push('colour missing:' + l.replace(/\s+/g, ' '));
    if (ra >= 3 && (oa < ra * 0.6 || oa > ra * 1.6)) fails.push(`accent/brand area ${oa.toFixed(0)}% vs the reference's ${ra.toFixed(0)}%: make the brand cover about the same area (header band, chips, icons) as the reference's accent`);
    // the brand takes the reference accent's tone: about the same lightness and strength, in its own hue
    const top = (p) => p.filter((c) => c.chroma > 18).sort((a, b) => b.share - a.share)[0];
    const rA = top(res.ref), oA = top(res.ours);
    if (rA && oA && rA.share >= 3 && (Math.abs(oA.L - rA.L) > 10 || oA.chroma > rA.chroma * 1.6 || oA.chroma < rA.chroma / 1.6)) fails.push(`accent tone: the reference's main accent ${rA.hex} is L${Math.round(rA.L)} C${Math.round(rA.chroma)}, yours ${oA.hex} is L${Math.round(oA.L)} C${Math.round(oA.chroma)}: for the large areas use the brand step closest in lightness (palette.cjs), muted or deepened toward the reference's strength; keep the exact brand colour for the logo and the primary button`);
    const extraN = extra.filter((e) => brandRgb || !(e.chroma > 18 && ra >= 3)); if (extraN.length) fails.push('colours the reference does not have: ' + extraN.map((e) => e.hex + ' ' + e.share + '%').join(', '));
    // layout: every reference block needs a counterpart at about the same place, size and treatment
    const H = Math.min(res.rs.H, res.os.H); const rb = res.rs.blocks.filter((x) => x.start < H), ob = res.os.blocks.filter((x) => x.start < H);
    const tone = (x) => (Math.hypot(x.lab[1], x.lab[2]) > 18 ? 'colour' : x.lab[0] < 40 ? 'dark' : 'light');
    const blockRow = (x) => `${String(x.start).padStart(4)}–${String(x.end).padEnd(4)} h${String(x.h).padEnd(4)} ${x.top}${x.gradient ? ' → ' + x.bot + ' gradient' : ''}`;
    // where the reference is a coloured band (header, banner) and yours is light, or the other way round
    let t0 = -1;
    for (let y = 0; y <= H; y++) { const diff = y < H && res.rs.tones[y] !== res.os.tones[y];
      if (diff && t0 < 0) t0 = y; if (!diff && t0 >= 0) { if (y - t0 >= 16) fails.push(`layout y${t0}–${y}: the reference is ${res.rs.tones[t0]} here (${res.rs.rowHex[t0 + 4]}), yours is ${res.os.tones[t0]} (${res.os.rowHex[t0 + 4]}): a band, card or section is missing, moved or a different height`); t0 = -1; } }
    for (const r of rb) { const m = ob.find((o) => o.start < r.end && o.end > r.start && tone(o) === tone(r)); if (m && r.gradient !== m.gradient && r.h >= 40) fails.push(`block y${r.start}–${r.end}: the reference is ${r.gradient ? 'a gradient ' + r.top + ' → ' + r.bot : 'flat ' + r.top}, yours is ${m.gradient ? 'a gradient ' + m.top + ' → ' + m.bot : 'flat'}`); }
    // content per window: the same kind of content at about the same place (±24px)
    { let run = null; const flush = () => { if (run) { fails.push(`content y${run.a}–${run.b + 40}: the reference has ${run.r}, yours has ${run.o}. A block of the slice list is missing, replaced or a different size here; build the reference's block (with this product's content)`); run = null; } };
      const desc = (w) => (w.ink < 0.004 ? 'nothing (space)' : w.items >= 3 ? `${w.items} items side by side` : w.items === 2 ? 'two items (e.g. a label and an action)' : 'one item (a line, a field, a single card)');
      for (const r of res.rsig) { if (r.y < 44) continue; if (r.y + 40 > H) break; const cands = res.osig.filter((o) => Math.abs(o.y - r.y) <= 24);
        const okw = cands.some((o) => (r.ink < 0.004) === (o.ink < 0.004) && Math.abs(o.items - r.items) <= (r.items >= 3 ? 1 : 1));
        if (okw) { flush(); continue; } const o = cands.sort((a, b) => Math.abs(a.y - r.y) - Math.abs(b.y - r.y))[0];
        const rd = desc(r), od = o ? desc(o) : 'nothing'; if (run && run.r === rd) run.b = r.y; else { flush(); run = { a: r.y, b: r.y, r: rd, o: od }; } }
      flush(); }
    // padding and sizing, in px at this width
    const mrow = (name, r, o, tol, hint) => { if (r > 0 && o > 0 && Math.abs(o - r) > tol) fails.push(`${name}: reference ${r}px, yours ${o}px (${o > r ? '+' : ''}${o - r}): ${hint}`); };
    mrow('surface inset (screen edge to cards, fields, banners)', res.rm.surfaceInset, res.om.surfaceInset, 2, 'set the screen padding to the reference value');
    mrow('text inset (screen edge to the first text or icon)', res.rm.textInset, res.om.textInset, 3, 'screen padding plus the card padding should equal the reference');
    mrow('typical line height (text and icon rows)', res.rs.rowMed, res.os.rowMed, 2, 'type size or icon size differs from the reference; match its body and label sizes');
    mrow('typical gap between rows', res.rs.gapMed, res.os.gapMed, 3, 'line spacing, item padding or gaps differ from the reference');
    // density: lines of content in the same height
    const dens = res.os.rows / Math.max(1, res.rs.rows);
    if (dens < 0.8) fails.push(`density: ${res.os.rows} content rows vs the reference's ${res.rs.rows} in the same height: your type, padding, gaps or components are larger than the reference's (its average row is ${res.rs.rowH}px, yours ${res.os.rowH}px), or a section is missing`);
    if (dens > 1.25) fails.push(`density: ${res.os.rows} content rows vs the reference's ${res.rs.rows}: yours is more crowded than the reference`);
    console.log(`Compare → ${out}  (your render: ${shotPath})\n\nReference palette:\n${fmt(res.ref)}\n\nYours:\n${fmt(res.ours)}\n\nReference colour → your closest:\n${lines.join('\n')}` +
      `\n\nMeasures at ${width}px (reference → yours): surface inset ${res.rm.surfaceInset} → ${res.om.surfaceInset}, text inset ${res.rm.textInset} → ${res.om.textInset}, line height ${res.rs.rowMed} → ${res.os.rowMed}, row gap ${res.rs.gapMed} → ${res.os.gapMed}` + (res.rec ? `\nReference recoloured from hue ${res.rec.refHue}° to the brand's ${res.rec.brandHue}° before comparing: every colour must match.` : '') +
      `\n\nLayout blocks at ${width}px (y start–end, height, colour):\n  reference:\n${rb.map((x) => '    ' + blockRow(x)).join('\n')}\n  yours:\n${ob.map((x) => '    ' + blockRow(x)).join('\n')}\n\nContent rows: reference ${res.rs.rows} (avg ${res.rs.rowH}px), yours ${res.os.rows} (avg ${res.os.rowH}px)` +
      (fails.length ? `\n\nRESULT: FAIL (${fails.length}): not done. Do not hand off until each line below is fixed or has a floor, the user or missing content written next to it as the reason.\n${fails.map((f) => '  - ' + f).join('\n')}\n\nFix these, then run compare again. A difference may stay only when a floor requires it (text below 4.5:1 contrast, a hit area below 44px: and meet those without changing what is seen), when the user asked for it, or when the product has no such content; list each with its reason in the handoff. Readability preferences and this skill's defaults (14px body, 16px padding) are not reasons: the reference's size is the design.`
        : `\n\nRESULT: PASS on colour, layout, content, padding, sizes and density.`) +
      `\n\nThe numbers cannot see type, icons and shadows. Look at ${out} and check each: font character and weights, icon style (outline, filled, duotone) and containers, shadow softness and colour, gradients and overlays. Write every difference you see and fix it.`);
    if (fails.length) process.exitCode = 1;
  }
  await b.close();
})();
