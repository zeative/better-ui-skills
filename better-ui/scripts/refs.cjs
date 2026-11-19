#!/usr/bin/env node
// Find visual references before designing: search design galleries for the topic, download the best
// shots, and lay them out on one board to study. References are for study only; never copy their
// logos, illustrations, photographs or text into the product.
//
// usage:
//   node refs.cjs "clinic app queue" [more queries…] [--n 12] [--out .refs]
//   node refs.cjs --site https://linear.app --site https://stripe.com [--out .refs]
//
//   Each query searches Dribbble (most popular shots for those words) and saves the top --n images.
//   --site screenshots a real, live site (first screen and full page) as a web reference.
//   Writes <out>/<slug>/NN.webp, <out>/<slug>/index.md (title, link) and <out>/<slug>/board.png (a contact sheet).
//
// Needs Playwright with Chromium (the same as audit.cjs). No other dependencies.

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
let n = 12, out = '.refs'; const queries = [], sites = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--n') n = Number(args[++i]) || n;
  else if (args[i] === '--out') out = args[++i];
  else if (args[i] === '--site') sites.push(args[++i]);
  else queries.push(args[i]);
}
if (!queries.length && !sites.length) { console.error('usage: node refs.cjs "<query>" [more…] [--n 12] [--out .refs] [--site <url>]'); process.exit(2); }

function loadPlaywright() {
  const tries = ['playwright', 'playwright-core', '@playwright/test'];
  for (const name of tries) { try { return require(name); } catch (_) { /* next */ } }
  try { return require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright'); } catch (_) { /* none */ }
  console.error('refs: Playwright not found. Install it (npm i -D playwright) or use the references described in references/references.md.'); process.exit(2);
}
const { chromium } = loadPlaywright();
const slug = (s) => s.toLowerCase().replace(/^https?:\/\//, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
const biggest = (srcset) => { if (!srcset) return null; const parts = srcset.split(',').map((x) => x.trim().split(' ')[0]); return parts[parts.length - 1]; };

async function board(page, dir, items, title) {
  const mime = (f) => (/\.png$/.test(f) ? 'image/png' : /\.jpe?g$/.test(f) ? 'image/jpeg' : 'image/webp');
  const cells = items.map((it, i) => `<figure><img src="data:${mime(it.file)};base64,${fs.readFileSync(path.join(dir, it.file)).toString('base64')}"><figcaption>${String(i + 1).padStart(2, '0')} · ${(it.title || '').replace(/</g, '&lt;').slice(0, 70)}</figcaption></figure>`).join('');
  await page.setViewportSize({ width: 1800, height: 1000 });
  await page.setContent(`<!doctype html><style>body{margin:0;padding:24px;background:#111;font:500 13px/1.3 system-ui;color:#ddd}h1{font-size:18px;margin:0 0 16px}main{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}figure{margin:0}img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:6px;background:#222}figcaption{margin-top:6px}</style><h1>${title.replace(/</g, '&lt;')}</h1><main>${cells}</main>`);
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(dir, 'board.png'), fullPage: true });
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  for (const q of queries) {
    const dir = path.join(out, slug(q)); fs.mkdirSync(dir, { recursive: true });
    const url = `https://dribbble.com/search/${encodeURIComponent(q.trim().replace(/\s+/g, '-'))}`;
    let shots = [];
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(2500);
      shots = await page.evaluate(() => [...document.querySelectorAll('li.shot-thumbnail, li[id^="screenshot"]')].map((li) => {
        const img = li.querySelector('img'); const a = li.querySelector('a[href*="/shots/"]');
        return { title: (img && img.alt) || '', href: a && a.href, srcset: img && (img.getAttribute('data-srcset') || img.getAttribute('srcset')), src: img && img.src };
      }).filter((s) => s.href && (s.srcset || s.src)));
    } catch (e) { console.log(`refs: could not search "${q}" (${String(e).slice(0, 80)})`); }
    const items = [];
    for (const s of shots.slice(0, n)) {
      const src = biggest(s.srcset) || s.src; let file = String(items.length + 1).padStart(2, '0') + '.webp';
      try {
        const res = await page.request.get(src, { timeout: 30000 });
        if (!res.ok()) continue;
        const ct = res.headers()['content-type'] || ''; if (/png/.test(ct)) file = file.replace('.webp', '.png'); else if (/jpe?g/.test(ct)) file = file.replace('.webp', '.jpg');
        fs.writeFileSync(path.join(dir, file), await res.body());
        items.push({ file, title: s.title, href: s.href });
      } catch (_) { /* skip */ }
    }
    fs.writeFileSync(path.join(dir, 'index.md'), `# References: ${q}\nSource: ${url}\n\n` + items.map((it, i) => `${String(i + 1).padStart(2, '0')}. [${it.title || 'shot'}](${it.href}) → ${it.file}`).join('\n') + '\n');
    if (items.length) await board(page, dir, items, `${q} · ${items.length} shots from Dribbble`);
    console.log(`refs: "${q}" → ${items.length} images in ${dir} (open board.png first, then the full images you pick)`);
  }
  for (const s of sites) {
    const dir = path.join(out, slug(s)); fs.mkdirSync(dir, { recursive: true });
    try {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(s, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
      await page.waitForTimeout(2000);
      const title = await page.title();
      if (/just a moment|security verification|access denied|checkpoint/i.test(title)) { console.log(`refs: ${s} is behind a bot check; skipped`); continue; }
      await page.screenshot({ path: path.join(dir, 'fold.png') });
      const h = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < Math.min(h, 14000); y += 800) { await page.evaluate((y) => scrollTo(0, y), y); await page.waitForTimeout(120); }
      await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(dir, 'full.png'), fullPage: true });
      fs.writeFileSync(path.join(dir, 'index.md'), `# Reference site: ${title}\n${s}\nfold.png (1440×900), full.png (whole page)\n`);
      console.log(`refs: ${s} → ${dir}/fold.png and full.png`);
    } catch (e) { console.log(`refs: could not open ${s} (${String(e).slice(0, 80)})`); }
  }
  await browser.close();
})();
