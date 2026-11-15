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
    ? { viewport: { width: 375, height: 765 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
    : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto('file://' + path.resolve(file), { waitUntil: 'networkidle' });
  if (setup) { await p.evaluate(`(async () => { ${fs.readFileSync(setup, 'utf8')}\n })()`); await p.waitForTimeout(400); }
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(600);
  const shots = [];
  const sbg = await p.evaluate(() => { let e = document.elementFromPoint(187, 2); while (e) { const c = getComputedStyle(e).backgroundColor; if (c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c)) return c; e = e.parentElement; } return 'rgb(255,255,255)'; });
  const [r, g, bl] = (sbg.match(/\d+/g) || [255, 255, 255]).map(Number);
  const ink = (0.299 * r + 0.587 * g + 0.114 * bl) > 140 ? '#000' : '#fff';
  if (phone) {
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    const ys = [0, Math.min(700, Math.max(0, h - 765)), Math.min(1400, Math.max(0, h - 765))];
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
    ? `<body style="margin:0;height:900px;background:linear-gradient(160deg,#eef0f3,#dfe2e7);display:flex;align-items:center;justify-content:center;gap:44px;font-family:-apple-system,'SF Pro Text','Inter',sans-serif">${shots.map((s) => `
      <div style="position:relative;width:300px;height:650px;border-radius:48px;background:#1d1d1f;padding:10px;box-shadow:inset 0 0 0 1.5px #3a3a3e,inset 0 0 0 4px #0c0c0e,0 40px 70px -28px rgba(0,0,0,.45),0 8px 20px -8px rgba(0,0,0,.25)">
        <i style="position:absolute;left:-3px;top:120px;width:3px;height:56px;border-radius:2px;background:#2a2a2d"></i><i style="position:absolute;right:-3px;top:150px;width:3px;height:80px;border-radius:2px;background:#2a2a2d"></i>
        <div style="position:relative;width:300px;height:650px;border-radius:39px;overflow:hidden;background:#fff">
          <div id="sb" style="height:38px;display:flex;align-items:center;justify-content:space-between;padding:0 26px 0 30px;font-size:13px;font-weight:600;color:${ink};background:${sbg}">
            <span>9:41</span><svg width="62" height="12" viewBox="0 0 62 12"><g fill="${ink}"><rect x="0" y="7" width="3" height="5" rx="1"/><rect x="5" y="5" width="3" height="7" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="1" width="3" height="11" rx="1"/><path d="M29 3.5a9 9 0 0 1 11 0l-1.3 1.4a7 7 0 0 0-8.4 0zM31.3 6a5.5 5.5 0 0 1 6.4 0l-1.4 1.5a3.4 3.4 0 0 0-3.6 0zM34.5 11l-1.6-1.7a2.3 2.3 0 0 1 3.2 0z"/><rect x="44.5" y=".5" width="15" height="10" rx="3" fill="none" stroke="${ink}" opacity=".4"/><rect x="46" y="2" width="11" height="7" rx="1.6"/><rect x="60.5" y="4" width="1.5" height="3" rx=".7" opacity=".4"/></g></svg></div>
          <div style="position:absolute;left:50%;top:9px;width:92px;height:26px;border-radius:14px;background:#000;transform:translateX(-50%)"></div>
          ${img(s, 'width:300px;height:612px;display:block;object-fit:cover;object-position:top')}
          <div style="position:absolute;left:50%;bottom:7px;width:110px;height:4px;border-radius:3px;background:${ink};opacity:.85;transform:translateX(-50%)"></div>
        </div></div>`).join('')}</body>`
    : `<body style="margin:0;height:900px;background:#eceef1;display:flex;align-items:center;justify-content:center"><div style="width:1100px;border-radius:22px;overflow:hidden;box-shadow:0 30px 70px -25px rgba(0,0,0,.35);background:#fff">${img(shots[0], 'width:1100px;display:block')}</div></body>`;
  await sp.setContent(html);
  await sp.waitForFunction(() => [...document.images].every((i) => i.complete));
  await sp.screenshot({ path: out });
  await b.close();
})();
