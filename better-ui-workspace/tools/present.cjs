// Capture presentation screenshots (2x) for the comparison page.
// usage: node present.cjs <index.html> <out-prefix> [setup.js]
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
(async () => {
  const [file, prefix, setup] = process.argv.slice(2);
  const browser = await chromium.launch();
  for (const [name, width, height] of [['desktop', 1440, 900], ['phone', 375, 812]]) {
    const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2, isMobile: name === 'phone', hasTouch: name === 'phone' });
    const page = await ctx.newPage();
    await page.goto('file://' + path.resolve(file), { waitUntil: 'networkidle' });
    if (setup) { await page.evaluate(`(async () => { ${fs.readFileSync(setup, 'utf8')}\n })()`); await page.waitForTimeout(400); await page.waitForLoadState('networkidle'); }
    await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(500);
    await page.screenshot({ path: `${prefix}-${name}.png`, fullPage: true });
    await ctx.close();
  }
  await browser.close();
})();
