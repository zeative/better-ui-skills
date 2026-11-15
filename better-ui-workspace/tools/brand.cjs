// Render the README brand assets: the banner (also the GitHub social preview) and the wordmark.
// usage: node brand.cjs <out-dir> <shots-dir>
//   shots-dir must hold workout-app-after.png, habit-tracker-app-after.png,
//   pos-landing-page-after.png and clinic-dashboard-after.png (from shot.cjs).
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const [out, shots] = process.argv.slice(2);
  const img = (f) => 'data:image/png;base64,' + fs.readFileSync(path.join(shots, f)).toString('base64');
  const logo = fs.readFileSync(path.join(__dirname, '../../docs/brand/logo.svg'), 'utf8');
  const font = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap">`;
  const base = `*{box-sizing:border-box} body{margin:0;font-family:"Plus Jakarta Sans",-apple-system,"Segoe UI",sans-serif;color:#15161A}`;
  const b = await chromium.launch();

  // Banner 1280x640 (GitHub social preview size), rendered at 2x.
  const p = await b.newPage({ viewport: { width: 1280, height: 640 }, deviceScaleFactor: 2 });
  await p.setContent(`<!doctype html><html><head>${font}<style>${base}
    .stage{position:relative;width:1280px;height:640px;overflow:hidden;background:#F3F2EE}
    .glow{position:absolute;inset:auto -120px -260px 420px;height:620px;background:radial-gradient(50% 50% at 50% 50%,rgba(255,107,74,.22),transparent 70%)}
    .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(21,22,26,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(21,22,26,.045) 1px,transparent 1px);background-size:40px 40px;mask-image:linear-gradient(90deg,#000 0,#000 40%,transparent 75%)}
    .copy{position:absolute;left:80px;top:150px;width:470px;display:grid;gap:22px}
    .brand{display:flex;align-items:center;gap:14px}.brand svg{width:52px;height:52px}
    .brand span{font-size:34px;font-weight:800;letter-spacing:-.03em}
    h1{margin:0;font-size:50px;line-height:1.06;letter-spacing:-.035em;font-weight:800}
    h1 em{font-style:normal;color:#FF6B4A}
    p{margin:0;font-size:19px;line-height:1.5;color:#55575E;font-weight:500}
    .pill{display:inline-flex;gap:8px;align-items:center;font-size:14px;font-weight:600;color:#15161A;background:#fff;border:1px solid #E4E2DC;border-radius:999px;padding:8px 14px;justify-self:start}
    .pill i{width:8px;height:8px;border-radius:50%;background:#1F9D55}
    .shot{position:absolute;border-radius:18px;box-shadow:0 30px 60px -24px rgba(21,22,26,.35),0 8px 18px -8px rgba(21,22,26,.18);overflow:hidden;background:#fff}
    .web1{left:640px;top:64px;width:600px;height:375px} .web2{left:700px;top:300px;width:560px;height:350px}
    .shot img{width:100%;height:100%;object-fit:cover;object-position:top left;display:block}
    .ph{position:absolute;border-radius:0;box-shadow:none;background:transparent;overflow:visible}
    .ph img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 30px 40px rgba(21,22,26,.28))}
    .ph1{left:575px;top:238px;width:300px;height:372px} .ph2{left:1075px;top:150px;width:230px;height:285px}
  </style></head><body><div class="stage"><div class="grid"></div><div class="glow"></div>
    <div class="shot web1"><img src="${img('pos-landing-page-after.png')}"></div>
    <div class="shot web2"><img src="${img('clinic-dashboard-after.png')}"></div>
    <div class="shot ph ph1"><img src="${img('workout-app-after.png')}"></div>
    <div class="shot ph ph2"><img src="${img('habit-tracker-app-after.png')}"></div>
    <div class="copy">
      <div class="brand">${logo}<span>better-ui</span></div>
      <h1>AI-built interfaces that look <em>designed</em>.</h1>
      <p>An agent skill that turns a one-line prompt into UI a product team would ship.</p>
      <span class="pill"><i></i>Ranks 1st against popular Dribbble shots in 5 of 7 tests</span>
    </div></div></body></html>`);
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  await p.screenshot({ path: path.join(out, 'banner.png') });

  // Wordmark for dark and light backgrounds.
  for (const [name, fg] of [['wordmark-light.png', '#15161A'], ['wordmark-dark.png', '#F3F2EE']]) {
    const w = await b.newPage({ viewport: { width: 420, height: 100 }, deviceScaleFactor: 2 });
    await w.setContent(`<!doctype html><html><head>${font}<style>${base} body{background:transparent}
      .m{display:flex;align-items:center;gap:16px;padding:14px 10px}.m svg{width:64px;height:64px}
      .m span{font-size:44px;font-weight:800;letter-spacing:-.035em;color:${fg}}</style></head>
      <body><div class="m">${logo}<span>better-ui</span></div></body></html>`);
    await w.evaluate(() => document.fonts.ready); await w.waitForTimeout(300);
    await w.locator('.m').screenshot({ path: path.join(out, name), omitBackground: true });
  }
  await b.close();
})();
