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
//   node match.cjs compare <reference image> <your page: file.html or URL> [--crop x,y,w,h] [--width 375|1440] [--out file.png]
//       Renders your page at the width, puts it beside the reference at the same height, and compares the
//       palettes: matching colours, colours the reference has and you lack, and the colour-area balance.
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
`;
function roles(p) {
  return p.map((c, i) => ({ ...c, role: i === 0 ? 'canvas' : c.chroma > 25 ? 'accent' : c.L < 35 ? 'text / dark surface' : c.L > 85 ? 'surface' : 'muted / line' }));
}
const dE = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const fmt = (p) => roles(p).map((c) => `  ${c.hex}  ${String(c.share).padStart(5)}%  L${String(Math.round(c.L)).padStart(3)}  C${String(Math.round(c.chroma)).padStart(3)}  ${c.role}`).join('\n');

(async () => {
  if (!['grid', 'palette', 'compare'].includes(cmd) || !pos[0]) { console.error('usage: node match.cjs grid|palette|compare <image> [<page>] [--crop x,y,w,h] [--step 20] [--width 375] [--out file.png]'); process.exit(2); }
  const b = await chromium.launch(); const page = await b.newPage({ viewport: { width: 1600, height: 1000 } });
  await page.setContent('<!doctype html><body style="margin:0"></body>'); await page.addScriptTag({ content: PAGE_LIB });
  const img = path.resolve(pos[0]);
  if (cmd === 'palette') {
    const p = await page.evaluate(async ([src, crop]) => palette(toCanvas(await loadImg(src), crop)), [dataUrl(img), crop]);
    console.log(`Palette of ${pos[0]}${crop ? ' (crop ' + crop.join(',') + ')' : ''}:\n${fmt(p)}`);
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
    const ours = await b.newPage({ viewport: { width, height: width < 800 ? 812 : 900 }, deviceScaleFactor: 2 });
    await ours.goto(/^https?:/.test(target) ? target : 'file://' + path.resolve(target), { waitUntil: 'networkidle' }).catch(() => {});
    await ours.waitForTimeout(1200); const shotPath = out.replace(/\.png$/, '') + '-yours.png'; await ours.screenshot({ path: shotPath });
    const res = await page.evaluate(async ([refSrc, crop, oursSrc]) => {
      const rc = toCanvas(await loadImg(refSrc), crop); const oc = toCanvas(await loadImg(oursSrc), null);
      const H = 1000, rw = Math.round(rc.width * H / rc.height), ow = Math.round(oc.width * H / oc.height);
      const o = document.createElement('canvas'); o.width = rw + ow + 60; o.height = H + 40; const g = o.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, o.width, o.height);
      g.font = 'bold 18px system-ui'; g.fillStyle = '#111'; g.fillText('Reference', 10, 24); g.fillText('Yours', rw + 50, 24);
      g.drawImage(rc, 10, 36, rw, H); g.drawImage(oc, rw + 50, 36, ow, H); document.body.innerHTML = ''; document.body.appendChild(o);
      return { size: [o.width, o.height], ref: palette(rc), ours: palette(oc) }; }, [dataUrl(img), crop, dataUrl(shotPath)]);
    await page.setViewportSize({ width: res.size[0], height: res.size[1] }); await page.screenshot({ path: out, clip: { x: 0, y: 0, width: res.size[0], height: res.size[1] } });
    const lines = [];
    for (const r of roles(res.ref)) { if (r.share < 1.5) continue; const best = res.ours.map((o) => ({ o, d: dE(r.lab, o.lab) })).sort((x, y) => x.d - y.d)[0];
      const verdict = best.d < 6 ? 'match' : best.d < 15 ? 'close' : 'MISSING'; lines.push(`  ${r.hex} ${String(r.share).padStart(5)}% ${r.role.padEnd(20)} → ${best.o.hex} ${String(best.o.share).padStart(5)}%  ΔE ${best.d.toFixed(1).padStart(5)}  ${verdict}${verdict !== 'MISSING' && Math.abs(best.o.share - r.share) > 12 ? `  (area ${best.o.share > r.share ? 'too large' : 'too small'})` : ''}`); }
    const extra = roles(res.ours).filter((o) => o.share >= 3 && !res.ref.some((r) => dE(r.lab, o.lab) < 15));
    console.log(`Compare → ${out}  (your render: ${shotPath})\n\nReference palette:\n${fmt(res.ref)}\n\nYours:\n${fmt(res.ours)}\n\nReference colour → your closest:\n${lines.join('\n')}` + (extra.length ? `\n\nColours you use that the reference does not (≥3% area): ${extra.map((e) => e.hex + ' ' + e.share + '%').join(', ')}` : '') + `\n\nNow look at ${out} and list every visible difference in size, spacing, weight, radius, border, shadow and colour area; fix them and run this again.`);
  }
  await b.close();
})();
