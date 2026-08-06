import { chromium } from 'playwright';
import path from 'node:path';

const dir = path.resolve('.');
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

for (const name of ['rolemap', 'apex']) {
  await page.goto('file://' + path.join(dir, `${name}.html`));
  await page.waitForTimeout(400);
  const el = await page.locator('.window');
  await el.screenshot({ path: `${name}-sheet.png` });
  console.log('SHOT', `${name}-sheet.png`);
}

await browser.close();
console.log('SHEETSDONE');
