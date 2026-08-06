/**
 * Walks both locales and asserts that navigation never switches language.
 *
 * Checks every rendered internal href, plus the controls that navigate with
 * router.push and therefore have no href to inspect: the hero CTAs, the footer
 * links, the navbar, and "view all projects". Runs from the home page and from
 * a work detail page, since components behave differently once off the home
 * page. The language switcher is exempt, since crossing locales is its job.
 *
 * Needs playwright, which is not a dependency of this project. Install it
 * first if you do not have it:
 *   npm i -D playwright && npx playwright install chromium
 *
 * Then start the dev server and point the script at it:
 *   node scripts/check-locale-links.mjs http://localhost:3000
 *
 * Prints one line per assertion and exits with a CRAWLOK / CRAWLFAILURES:n
 * summary on the last line.
 */
import { chromium } from 'playwright';

const B = process.argv[2] || 'http://localhost:3003';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();

let failures = 0;
const ok = (cond, msg) => {
  if (!cond) { failures++; console.log('FAIL  ' + msg); } else { console.log('pass  ' + msg); }
};
const isJa = (p) => p === '/ja' || p.startsWith('/ja/');
const clean = () => new URL(page.url()).pathname.replace(/(.)\/$/, '$1');

const PAGES = ['', '/work', '/blog', '/contact', '/work/enpadel', '/work/ar-gallery', '/work/nicolita'];

// ---------- 1. every rendered internal href stays in its locale ----------
console.log('--- static href audit ---');
for (const locale of ['en', 'ja']) {
  const prefix = locale === 'ja' ? '/ja' : '';
  for (const path of PAGES) {
    const url = B + prefix + path;
    const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    if (res.status() !== 200) { failures++; console.log(`FAIL  ${url} -> ${res.status()}`); continue; }
    await page.waitForTimeout(300);

    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
    const internals = hrefs.filter((h) => h && h.startsWith('/') && !h.startsWith('//') && !h.startsWith('/_next'));
    // the language switcher is supposed to cross locales, so it is exempt
    const switcher = locale === 'ja' ? path.replace(/^$/, '/') : '/ja' + path;
    const wrong = internals.filter((h) => {
      if (h === switcher || h === (locale === 'ja' ? '/' : '/ja')) return false;
      return locale === 'ja' ? !isJa(h) : isJa(h);
    });
    ok(wrong.length === 0, `${url} (${internals.length} internal hrefs)` + (wrong.length ? ` -> ${JSON.stringify([...new Set(wrong)])}` : ''));
  }
}

// ---------- 2. button-driven navigation (router.push, no href) ----------
console.log('--- hero, footer and view-all buttons ---');
for (const start of ['/ja', '/']) {
  const prefix = start === '/ja' ? '/ja' : '';
  const want = (p) => (start === '/ja' ? isJa(p) : !isJa(p));

  // hero CTAs
  for (const idx of [0, 1]) {
    await page.goto(B + start, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(900);
    const btns = page.locator('section').first().locator('button');
    if ((await btns.count()) <= idx) { console.log(`skip  hero button ${idx} on ${start}`); continue; }
    const label = (await btns.nth(idx).textContent())?.trim().slice(0, 24);
    await btns.nth(idx).click();
    await page.waitForTimeout(1600);
    ok(want(clean()), `hero "${label}" from ${start} -> ${clean()}`);
  }

  // footer links
  await page.goto(B + start, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(900);
  const count = await page.locator('footer button').count();
  for (let i = 0; i < count; i++) {
    await page.goto(B + start, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(900);
    const b = page.locator('footer button').nth(i);
    const label = (await b.textContent())?.trim();
    await b.click();
    await page.waitForTimeout(1600);
    ok(want(clean()), `footer "${label}" from ${start} -> ${clean()}`);
  }

  // "view all projects"
  await page.goto(B + start, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(900);
  const viewAll = page.locator('#work button').last();
  if (await viewAll.count()) {
    await viewAll.click();
    await page.waitForTimeout(1600);
    ok(clean() === `${prefix}/work`, `view-all from ${start} -> ${clean()} (want ${prefix}/work)`);
  }

  // navbar links
  await page.goto(B + start, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(900);
  const navCount = await page.locator('nav button').count();
  for (let i = 0; i < navCount; i++) {
    await page.goto(B + start, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(900);
    const b = page.locator('nav button').nth(i);
    const label = (await b.textContent())?.trim();
    if (!label) continue;
    await b.click().catch(() => {});
    await page.waitForTimeout(1600);
    ok(want(clean()), `navbar "${label}" from ${start} -> ${clean()}`);
  }
}

// ---------- 3. a deep page, not just the home page ----------
console.log('--- from a work detail page ---');
for (const start of ['/ja/work/enpadel', '/work/enpadel']) {
  await page.goto(B + start, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(900);
  const count = await page.locator('footer button').count();
  for (let i = 0; i < count; i++) {
    await page.goto(B + start, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(900);
    const b = page.locator('footer button').nth(i);
    const label = (await b.textContent())?.trim();
    await b.click();
    await page.waitForTimeout(1600);
    const want = start.startsWith('/ja') ? isJa(clean()) : !isJa(clean());
    ok(want, `detail footer "${label}" from ${start} -> ${clean()}`);
  }
}

await browser.close();
console.log(failures ? `CRAWLFAILURES:${failures}` : 'CRAWLOK');
