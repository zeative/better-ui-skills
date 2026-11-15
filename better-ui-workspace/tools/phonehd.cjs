// usage: node phonehd.cjs <index.html> <outdir> [setup.js]   -> phone-hd-N.png (2x, two columns per sheet)
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
(async () => {
  const [file, out, setup] = process.argv.slice(2);
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const p = await ctx.newPage(); await p.goto('file://' + path.resolve(file), { waitUntil: 'networkidle' });
  if (setup) { await p.evaluate(`(async () => { ${fs.readFileSync(setup, 'utf8')}\n })()`); await p.waitForTimeout(400); await p.waitForLoadState('networkidle'); }
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  const parts = []; const partH = 812;
  for (let y = 0, i = 0; y < h - 60 && i < 8; y += partH, i++) { const f = path.join(out, `_p${i}.png`); await p.screenshot({ path: f, fullPage: true, clip: { x: 0, y, width: 375, height: Math.min(partH, h - y) } }); parts.push(f); }
  const sp = await b.newPage();
  for (let i = 0; i < parts.length; i += 2) {
    const g = parts.slice(i, i + 2);
    await sp.setViewportSize({ width: g.length * 790 + 40, height: 1704 });
    await sp.setContent(`<body style="margin:0;background:#6b6b6b;display:flex;gap:40px;padding:40px;align-items:flex-start">${g.map((f) => `<img src="data:image/png;base64,${fs.readFileSync(f).toString('base64')}" style="width:750px;display:block;border-radius:36px">`).join('')}</body>`);
    await sp.waitForFunction(() => [...document.images].every((im) => im.complete));
    await sp.screenshot({ path: path.join(out, `phone-hd-${i / 2 + 1}.png`) });
  }
  parts.forEach((f) => fs.rmSync(f)); await b.close();
})();
