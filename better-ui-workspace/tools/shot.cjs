// Present a built page the way a Dribbble shot presents a design, so it can be judged in a line-up
// of real shots without the capture format giving it away.
// usage: node shot.cjs <index.html> <out.png> <phone|web> [setup.js]
//   phone: three 375x812 viewport screens (top, then two scrolled positions) in simple device
//          frames on a soft backdrop, 1200x900.
//   web:   the 1440x900 first screen in a rounded window on a light backdrop, 1200x900.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const [file, out, kind = 'phone', setup] = process.argv.slice(2);
  const b = await chromium.launch();
  const phone = kind === 'phone';
  const ctx = await b.newContext(phone
    ? { viewport: { width: 375, height: 812 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
    : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto('file://' + path.resolve(file), { waitUntil: 'networkidle' });
  if (setup) { await p.evaluate(`(async () => { ${fs.readFileSync(setup, 'utf8')}\n })()`); await p.waitForTimeout(400); }
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(600);
  const shots = [];
  if (phone) {
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    const ys = [0, Math.min(700, Math.max(0, h - 812)), Math.min(1400, Math.max(0, h - 812))];
    for (const y of [...new Set(ys)]) {
      await p.evaluate((y) => window.scrollTo(0, y), y);
      await p.waitForTimeout(350);
      shots.push((await p.screenshot()).toString('base64'));
    }
  } else {
    shots.push((await p.screenshot()).toString('base64'));
  }
  const sp = await b.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 1 });
  const img = (s, style) => `<img src="data:image/png;base64,${s}" style="${style}">`;
  const html = phone
    ? `<body style="margin:0;height:900px;background:#e4e6ea;display:flex;align-items:center;justify-content:center;gap:44px">${shots.map((s) => `<div style="width:300px;height:650px;border-radius:44px;background:#111;padding:9px;box-shadow:0 30px 60px -20px rgba(0,0,0,.35)">${img(s, 'width:300px;height:650px;border-radius:36px;display:block;object-fit:cover')}</div>`).join('')}</body>`
    : `<body style="margin:0;height:900px;background:#eceef1;display:flex;align-items:center;justify-content:center"><div style="width:1100px;border-radius:22px;overflow:hidden;box-shadow:0 30px 70px -25px rgba(0,0,0,.35);background:#fff">${img(shots[0], 'width:1100px;display:block')}</div></body>`;
  await sp.setContent(html);
  await sp.waitForFunction(() => [...document.images].every((i) => i.complete));
  await sp.screenshot({ path: out });
  await b.close();
})();
