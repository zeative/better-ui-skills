// Compose a before/after image for the README: the same prompt, built without and with the skill.
// usage: node beforeafter.cjs <before.png> <after.png> <out.jpg-or-png> "<prompt>"
const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const [before, after, out, prompt] = process.argv.slice(2);
  const b64 = (f) => fs.readFileSync(f).toString('base64');
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1600, height: 760 }, deviceScaleFactor: 1 });
  await p.setContent(`<!doctype html><html><head><style>
    body { margin: 0; background: #f4f4f1; font-family: -apple-system, "Segoe UI", Inter, Roboto, sans-serif; color: #17181a; }
    .wrap { padding: 28px 32px 32px; display: grid; gap: 18px; }
    .prompt { font-size: 17px; color: #4b4e54; } .prompt b { color: #17181a; font-weight: 600; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .card { background: #fff; border: 1px solid #e3e3dc; border-radius: 16px; overflow: hidden; }
    .label { display: flex; align-items: center; gap: 8px; padding: 12px 16px; font-size: 15px; font-weight: 600; border-bottom: 1px solid #e3e3dc; }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    img { display: block; width: 100%; aspect-ratio: 4/3; object-fit: cover; }
  </style></head><body><div class="wrap">
    <div class="prompt"><b>Prompt:</b> “${esc(prompt)}”</div>
    <div class="row">
      <div class="card"><div class="label"><span class="dot" style="background:#9aa0a6"></span>Without better-ui</div><img src="data:image/png;base64,${b64(before)}"></div>
      <div class="card"><div class="label"><span class="dot" style="background:#1f8a4c"></span>With better-ui</div><img src="data:image/png;base64,${b64(after)}"></div>
    </div></div></body></html>`);
  await p.waitForFunction(() => [...document.images].every((i) => i.complete));
  const h = await p.evaluate(() => document.querySelector('.wrap').getBoundingClientRect().height);
  await p.setViewportSize({ width: 1600, height: Math.ceil(h) });
  await p.screenshot({ path: out, type: out.endsWith('.png') ? 'png' : 'jpeg', quality: out.endsWith('.png') ? undefined : 84 });
  await b.close();
})();
