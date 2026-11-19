#!/usr/bin/env node
// Icons in the references' style, not one default line set.
//
//   node icons.cjs board [--color #135BC6] [--out icons-board.png]
//       The same eight icons in about twenty styles (outline, rounded, bold, filled, duotone, two-tone,
//       broken), plain and on a tinted chip, in one image. Put it beside the reference's icons and pick the
//       style that matches their weight, fill, corners and two-tone treatment.
//   node icons.cjs board --words "stethoscope,tooth,baby,pill,lab,queue" [--color #hex]
//       The same board for your product's own words, across sets that include domain icons (Healthicons for
//       medicine, Material Symbols, Fluent, Phosphor, Solar, Tabler and others). Generic icons for domain
//       items (a smiley for dentistry) look like a template; detailed domain icons look designed.
//   node icons.cjs find <word> [more words] [--set solar] [--style bold-duotone]
//       Icon names for each word in a set and style (from the Iconify index of 200+ open icon sets).
//   node icons.cjs sprite <set:name> [more] [--out icons.svg]
//       Downloads the icons and writes an inline SVG sprite: paste it at the top of <body> and use
//       <svg class="icon"><use href="#solar-home-2-bold-duotone"/></svg>. Colours follow currentColor, so a
//       duotone icon takes the text colour at full and reduced opacity.
//
// Needs Playwright with Chromium (the same as audit.cjs) and a network connection.

const fs = require('fs');
const path = require('path');

function loadPlaywright() {
  for (const name of ['playwright', 'playwright-core', '@playwright/test']) { try { return require(name); } catch (_) { /* next */ } }
  try { return require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright'); } catch (_) { /* none */ }
  console.error('icons: Playwright not found (npm i -D playwright).'); process.exit(2);
}
const { chromium } = loadPlaywright();
const [cmd, ...rest] = process.argv.slice(2);
const opt = (k, d) => { const i = rest.indexOf('--' + k); return i >= 0 ? rest[i + 1] : d; };
const pos = rest.filter((a, i) => !a.startsWith('--') && !(i > 0 && rest[i - 1].startsWith('--')));
const API = 'https://api.iconify.design';

// eight concepts per style: home, calendar, bell, user, search, heart, document, settings
const C = (prefix, names, suffix = '') => names.map((n) => `${prefix}:${n}${suffix}`);
const SOLAR = ['home-2', 'calendar', 'bell', 'user', 'magnifer', 'heart', 'document-text', 'settings'];
const PH = ['house', 'calendar-blank', 'bell', 'user', 'magnifying-glass', 'heart', 'file-text', 'gear-six'];
const FL = ['home-24', 'calendar-24', 'alert-24', 'person-24', 'search-24', 'heart-24', 'document-text-24', 'settings-24'];
const MS = ['home', 'calendar-month', 'notifications', 'person', 'search', 'favorite', 'description', 'settings'];
const MG = ['home-3', 'calendar', 'notification', 'user-3', 'search', 'heart', 'file', 'settings-3'];
const WORD_STYLES = [
  ['Outline · healthicons (medical)', 'healthicons', (n) => n.endsWith('-outline')],
  ['Filled · healthicons (medical)', 'healthicons', (n) => !/-(outline|negative)/.test(n)],
  ['Outline rounded · material symbols', 'material-symbols', (n) => n.endsWith('-outline-rounded')],
  ['Filled rounded · material symbols', 'material-symbols', (n) => n.endsWith('-rounded') && !n.endsWith('-outline-rounded')],
  ['Regular · fluent', 'fluent', (n) => n.endsWith('-24-regular')],
  ['Filled · fluent', 'fluent', (n) => n.endsWith('-24-filled')],
  ['Linear · solar', 'solar', (n) => n.endsWith('-linear')],
  ['Bold duotone · solar', 'solar', (n) => n.endsWith('-bold-duotone')],
  ['Regular · phosphor', 'ph', (n) => !/-(bold|duotone|fill|light|thin)$/.test(n)],
  ['Duotone · phosphor', 'ph', (n) => n.endsWith('-duotone')],
  ['Outline · tabler', 'tabler', (n) => !n.endsWith('-filled')],
  ['Outline · lucide', 'lucide', () => true],
  ['Outline rounded · hugeicons', 'hugeicons', () => true],
  ['Outline · material design icons', 'mdi', (n) => n.endsWith('-outline')],
];
const STYLES = [
  ['Outline thin · lucide', C('lucide', ['house', 'calendar', 'bell', 'user', 'search', 'heart', 'file-text', 'settings'])],
  ['Outline · tabler', C('tabler', ['home', 'calendar', 'bell', 'user', 'search', 'heart', 'file-text', 'settings'])],
  ['Outline rounded · hugeicons', C('hugeicons', ['home-01', 'calendar-03', 'notification-01', 'user', 'search-01', 'favourite', 'file-01', 'settings-01'])],
  ['Outline · iconoir', C('iconoir', ['home', 'calendar', 'bell', 'user', 'search', 'heart', 'page', 'settings'])],
  ['Linear · solar', C('solar', SOLAR, '-linear')],
  ['Broken · solar', C('solar', SOLAR, '-broken')],
  ['Line duotone · solar', C('solar', SOLAR, '-line-duotone')],
  ['Bold duotone · solar', C('solar', SOLAR, '-bold-duotone')],
  ['Bold · solar', C('solar', SOLAR, '-bold')],
  ['Regular · phosphor', C('ph', PH)],
  ['Bold · phosphor', C('ph', PH, '-bold')],
  ['Duotone · phosphor', C('ph', PH, '-duotone')],
  ['Fill · phosphor', C('ph', PH, '-fill')],
  ['Regular · fluent', C('fluent', FL, '-regular')],
  ['Filled · fluent', C('fluent', FL, '-filled')],
  ['Outline rounded · material symbols', C('material-symbols', MS.map((n) => (n === 'search' ? n : n + '-outline')), '-rounded')],
  ['Filled rounded · material symbols', C('material-symbols', MS, '-rounded')],
  ['Line · mingcute', C('mingcute', MG, '-line')],
  ['Fill · mingcute', C('mingcute', MG, '-fill')],
];

(async () => {
  if (!['board', 'find', 'sprite'].includes(cmd)) { console.error('usage: node icons.cjs board | find <word> [--set solar] [--style bold-duotone] | sprite <set:name>... [--out icons.svg]'); process.exit(2); }
  const b = await chromium.launch(); const page = await b.newPage({ viewport: { width: 1180, height: 900 }, deviceScaleFactor: 2 });
  const get = async (url) => { const r = await page.request.get(url, { timeout: 20000 }); if (!r.ok()) throw new Error(r.status() + ' ' + url); return r.text(); };

  if (cmd === 'board') {
    const color = opt('color', '#1F6FEB'); const out = opt('out', 'icons-board.png');
    if (opt('words')) { const words = opt('words').split(/[\s,]+/).map((w) => w.trim()).filter(Boolean); STYLES.length = 0;
      for (const [label, prefix, ok] of WORD_STYLES) { const ids = [];
        for (const w of words) { let j = { icons: [] }; try { j = JSON.parse(await get(`${API}/search?query=${encodeURIComponent(w)}&prefix=${prefix}&limit=96`)); } catch (_) { /* none */ }
          const base = (id) => id.split(':')[1].replace(/-(outline-rounded|rounded|outline|24-regular|24-filled|linear|bold-duotone|duotone|filled|negative)$/, '');
          const toks = (id) => id.split(':')[1].split('-'); const has = (id) => toks(id).includes(w) && !toks(id).some((t) => ['off', 'slash', 'remove', 'cancel', 'x', 'minus', 'plus', 'add', 'alert', 'question', 'music', 'play', 'next', 'bluetooth'].includes(t));
          const c = (j.icons || []).filter((id) => ok(id.split(':')[1]) && has(id)).sort((a, b) => (base(a) === w ? 0 : base(a).startsWith(w) ? 1 : 2) - (base(b) === w ? 0 : base(b).startsWith(w) ? 1 : 2) || a.length - b.length);
          ids.push(c[0] || `${prefix}:none`); }
        STYLES.push([label, ids]); } }
    const svgs = {}; await Promise.all(STYLES.flatMap(([, ids]) => ids).map(async (id) => { const [p, n] = id.split(':'); try { svgs[id] = await get(`${API}/${p}/${n}.svg?height=24`); } catch (_) { svgs[id] = ''; } }));
    const row = ([label, ids]) => `<div class="r"><div class="l">${label}<small>${opt('words') ? ids.map((i) => i.split(':')[1]).join(' · ') : ids[0].split(':')[0]}</small></div>
      <div class="ic">${ids.map((id) => `<span class="p">${svgs[id]}</span>`).join('')}</div>
      <div class="ic">${ids.slice(0, 4).map((id) => `<span class="c">${svgs[id]}</span>`).join('')}<span class="c d">${svgs[ids[0]]}</span></div></div>`;
    await page.setContent(`<!doctype html><style>body{margin:0;padding:20px 24px;font:13px/1.3 system-ui,sans-serif;color:#1d2330;background:#fff;width:1130px}
      h1{font-size:16px;margin:0 0 12px}.r{display:grid;grid-template-columns:300px 360px 1fr;align-items:center;gap:16px;padding:7px 0;border-top:1px solid #eceef2}
      .l{font-weight:600}.l small{display:block;font-weight:400;color:#6b7280;font-size:11px}.ic{display:flex;gap:14px;align-items:center;flex-wrap:wrap}
      .p svg{width:24px;height:24px;color:#1d2330;display:block}.c{width:44px;height:44px;border-radius:14px;background:color-mix(in oklch,${color} 12%,white);color:${color};display:grid;place-items:center}
      .c svg{width:22px;height:22px}.c.d{background:${color};color:#fff;border-radius:50%}</style>
      <h1>Icon styles · ${opt('words') ? opt('words').split(/[\s,]+/).join(', ') : 'home, calendar, bell, user, search, heart, document, settings'} — plain, then on a tinted chip and a solid circle (${color}). Blank = the set has no such icon.</h1>${STYLES.map(row).join('')}`);
    const found = STYLES.reduce((a, [, ids]) => a + ids.filter((id) => !id.endsWith(':none') && svgs[id]).length, 0);
    if (!found) console.error('No icons resolved. Check the words (separate them with commas or spaces) and that api.iconify.design is reachable (icons.cjs find stethoscope).');
    await page.screenshot({ path: out, fullPage: true });
    console.log(`Icon style board → ${out}\nOpen it beside the reference's icons. Match: outline or filled, stroke weight, rounded or sharp ends, one tone or two (duotone), and the container (none, tinted circle, rounded square, solid). Then: node icons.cjs find <word> --set <prefix> --style <suffix>, and sprite.`);
  }
  if (cmd === 'find') {
    const set = opt('set'); const style = opt('style');
    for (const w of pos) {
      const j = JSON.parse(await get(`${API}/search?query=${encodeURIComponent(w)}&limit=96${set ? '&prefix=' + set : ''}`));
      let ids = j.icons || []; if (style) ids = ids.filter((id) => id.endsWith('-' + style) || id.endsWith(style));
      console.log(`${w}: ${ids.slice(0, 16).join('  ') || '(none: try a synonym, e.g. queue → list / ticket / users-group)'}`);
    }
  }
  if (cmd === 'sprite') {
    const out = opt('out', 'icons.svg'); const sym = [];
    for (const id of pos) { const [p, n] = id.split(':'); try { const s = await get(`${API}/${p}/${n}.svg`); const vb = (s.match(/viewBox="([^"]+)"/) || [, '0 0 24 24'])[1]; const inner = s.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
      sym.push(`<symbol id="${p}-${n}" viewBox="${vb}">${inner}</symbol>`); } catch (e) { console.error('missing ' + id); } }
    fs.writeFileSync(out, `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n${sym.join('\n')}\n</svg>\n`);
    console.log(`Sprite with ${sym.length} icons → ${out}\nPaste it right after <body>; use <svg class="icon" aria-hidden="true"><use href="#${pos[0] ? pos[0].replace(':', '-') : 'set-name'}"/></svg>, with .icon{width:24px;height:24px;color:currentColor}.`);
  }
  await b.close();
})();
