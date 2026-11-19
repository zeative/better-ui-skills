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
  return { H, tones, rowHex, rows: rows.length, rowH: rows.length ? Math.round(rows.reduce((a, r) => a + r[1] - r[0], 0) / rows.length) : 0,
    blocks: blocks.filter((b) => b.end - b.start >= 16).map((b) => ({ start: b.start, end: b.end, h: b.end - b.start, top: hex(b.top), bot: hex(b.bot), gradient: b.end - b.start >= 40 && dist(b.top, b.bot) > 36, lab: lab({ r: b.top[0], g: b.top[1], b: b.top[2] }) })) };
}
`;
function roles(p) {
  return p.map((c, i) => ({ ...c, role: i === 0 ? 'canvas' : c.chroma > 25 ? 'accent' : c.L < 35 ? 'text / dark surface' : c.L > 85 ? 'surface' : 'muted / line' }));
}
const dE = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const fmt = (p) => roles(p).map((c) => `  ${c.hex}  ${String(c.share).padStart(5)}%  L${String(Math.round(c.L)).padStart(3)}  C${String(Math.round(c.chroma)).padStart(3)}  ${c.role}`).join('\n');

(async () => {
  if (!['grid', 'palette', 'compare', 'blocks'].includes(cmd) || !pos[0]) { console.error('usage: node match.cjs grid|palette|compare <image> [<page>] [--crop x,y,w,h] [--step 20] [--width 375] [--out file.png]'); process.exit(2); }
  const b = await chromium.launch(); const page = await b.newPage({ viewport: { width: 1600, height: 1000 } });
  await page.setContent('<!doctype html><body style="margin:0"></body>'); await page.addScriptTag({ content: PAGE_LIB });
  const img = path.resolve(pos[0]);
  if (cmd === 'palette') {
    const p = await page.evaluate(async ([src, crop]) => palette(toCanvas(await loadImg(src), crop)), [dataUrl(img), crop]);
    console.log(`Palette of ${pos[0]}${crop ? ' (crop ' + crop.join(',') + ')' : ''}:\n${fmt(p)}`);
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
    const res = await page.evaluate(async ([refSrc, crop, oursSrc, W, crop2]) => {
      const rc = toCanvas(await loadImg(refSrc), crop); const oc = toCanvas(await loadImg(oursSrc), crop2);
      const H = 1000, rw = Math.round(rc.width * H / rc.height), ow = Math.round(oc.width * H / oc.height);
      const o = document.createElement('canvas'); o.width = rw + ow + 60; o.height = H + 40; const g = o.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, o.width, o.height);
      g.font = 'bold 18px system-ui'; g.fillStyle = '#111'; g.fillText('Reference', 10, 24); g.fillText('Yours', rw + 50, 24);
      g.drawImage(rc, 10, 36, rw, H); g.drawImage(oc, rw + 50, 36, ow, H); document.body.innerHTML = ''; document.body.appendChild(o);
      return { size: [o.width, o.height], ref: palette(rc), ours: palette(oc), rs: structure(rc, W), os: structure(oc, W) }; }, [dataUrl(img), crop, dataUrl(shotPath), width, crop2]);
    await page.setViewportSize({ width: res.size[0], height: res.size[1] }); await page.screenshot({ path: out, clip: { x: 0, y: 0, width: res.size[0], height: res.size[1] } });
    const lines = [], lineChroma = [];
    for (const r of roles(res.ref)) { if (r.share < 1.5) continue; lineChroma.push(r.chroma); const best = res.ours.map((o) => ({ o, d: dE(r.lab, o.lab) })).sort((x, y) => x.d - y.d)[0];
      const verdict = best.d < 6 ? 'match' : best.d < 15 ? 'close' : 'MISSING'; lines.push(`  ${r.hex} ${String(r.share).padStart(5)}% ${r.role.padEnd(20)} → ${best.o.hex} ${String(best.o.share).padStart(5)}%  ΔE ${best.d.toFixed(1).padStart(5)}  ${verdict}${verdict !== 'MISSING' && Math.abs(best.o.share - r.share) > 12 ? `  (area ${best.o.share > r.share ? 'too large' : 'too small'})` : ''}`); }
    const extra = roles(res.ours).filter((o) => o.share >= 3 && !res.ref.some((r) => dE(r.lab, o.lab) < 15));
    const fails = [];
    // colour: neutrals must match; the reference's accent may be replaced by the brand, at the same area
    const acc = (p) => p.filter((c) => c.chroma > 18).reduce((a, c) => a + c.share, 0);
    const ra = acc(res.ref), oa = acc(res.ours);
    for (const [i, l] of lines.entries()) if (/MISSING/.test(l) && !(lineChroma[i] > 18)) fails.push('colour missing:' + l.replace(/\s+/g, ' '));
    if (ra >= 3 && (oa < ra * 0.6 || oa > ra * 1.6)) fails.push(`accent/brand area ${oa.toFixed(0)}% vs the reference's ${ra.toFixed(0)}%: make the brand cover about the same area (header band, chips, icons) as the reference's accent`);
    const extraN = extra.filter((e) => !(e.chroma > 18 && ra >= 3)); if (extraN.length) fails.push('colours the reference does not have: ' + extraN.map((e) => e.hex + ' ' + e.share + '%').join(', '));
    // layout: every reference block needs a counterpart at about the same place, size and treatment
    const H = Math.min(res.rs.H, res.os.H); const rb = res.rs.blocks.filter((x) => x.start < H), ob = res.os.blocks.filter((x) => x.start < H);
    const tone = (x) => (Math.hypot(x.lab[1], x.lab[2]) > 18 ? 'colour' : x.lab[0] < 40 ? 'dark' : 'light');
    const blockRow = (x) => `${String(x.start).padStart(4)}–${String(x.end).padEnd(4)} h${String(x.h).padEnd(4)} ${x.top}${x.gradient ? ' → ' + x.bot + ' gradient' : ''}`;
    // where the reference is a coloured band (header, banner) and yours is light, or the other way round
    let t0 = -1;
    for (let y = 0; y <= H; y++) { const diff = y < H && res.rs.tones[y] !== res.os.tones[y];
      if (diff && t0 < 0) t0 = y; if (!diff && t0 >= 0) { if (y - t0 >= 16) fails.push(`layout y${t0}–${y}: the reference is ${res.rs.tones[t0]} here (${res.rs.rowHex[t0 + 4]}), yours is ${res.os.tones[t0]} (${res.os.rowHex[t0 + 4]}): a band, card or section is missing, moved or a different height`); t0 = -1; } }
    for (const r of rb) { const m = ob.find((o) => o.start < r.end && o.end > r.start && tone(o) === tone(r)); if (m && r.gradient !== m.gradient && r.h >= 40) fails.push(`block y${r.start}–${r.end}: the reference is ${r.gradient ? 'a gradient ' + r.top + ' → ' + r.bot : 'flat ' + r.top}, yours is ${m.gradient ? 'a gradient ' + m.top + ' → ' + m.bot : 'flat'}`); }
    // density: lines of content in the same height
    const dens = res.os.rows / Math.max(1, res.rs.rows);
    if (dens < 0.8) fails.push(`density: ${res.os.rows} content rows vs the reference's ${res.rs.rows} in the same height: your type, padding, gaps or components are larger than the reference's (its average row is ${res.rs.rowH}px, yours ${res.os.rowH}px), or a section is missing`);
    if (dens > 1.25) fails.push(`density: ${res.os.rows} content rows vs the reference's ${res.rs.rows}: yours is more crowded than the reference`);
    console.log(`Compare → ${out}  (your render: ${shotPath})\n\nReference palette:\n${fmt(res.ref)}\n\nYours:\n${fmt(res.ours)}\n\nReference colour → your closest:\n${lines.join('\n')}` +
      `\n\nLayout blocks at ${width}px (y start–end, height, colour):\n  reference:\n${rb.map((x) => '    ' + blockRow(x)).join('\n')}\n  yours:\n${ob.map((x) => '    ' + blockRow(x)).join('\n')}\n\nContent rows: reference ${res.rs.rows} (avg ${res.rs.rowH}px), yours ${res.os.rows} (avg ${res.os.rowH}px)` +
      (fails.length ? `\n\nRESULT: FAIL (${fails.length})\n${fails.map((f) => '  - ' + f).join('\n')}\n\nFix these, then run compare again. A difference may stay only when a floor (spec.md), the user's direction or the product's content requires it; list each such one with its reason in the handoff.`
        : `\n\nRESULT: PASS on colour, layout and density.`) +
      `\n\nThe numbers cannot see type, icons and shadows. Look at ${out} and check each: font character and weights, icon style (outline, filled, duotone) and containers, shadow softness and colour, gradients and overlays. Write every difference you see and fix it.`);
    if (fails.length) process.exitCode = 1;
  }
  await b.close();
})();
