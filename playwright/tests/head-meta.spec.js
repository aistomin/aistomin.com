const { test, expect } = require('@playwright/test');

// Every page reachable from the nav, plus one post so the `post` layout is covered too.
// `navLabel` is the menu item that must point at exactly this page's canonical path.
const PAGES = [
  { path: '/', navLabel: 'Home' },
  { path: '/about.html', navLabel: 'About' },
  { path: '/blog.html', navLabel: 'Blog' },
  { path: '/certificates.html', navLabel: 'Certificates' },
  { path: '/2025/11/19/goethe-c1-exam.html', navLabel: null },
];

test.describe('Head meta tags', () => {
  for (const { path, navLabel } of PAGES) {
    test(`should advertise one canonical URL on ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });

      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
      const twitterUrl = await page.locator('meta[name="twitter:url"]').getAttribute('content');

      // Character-for-character equal, not merely equivalent: a crawler handed
      // /about and /about.html sees two pages competing for the same content.
      expect(canonical).toBe(ogUrl);
      expect(canonical).toBe(twitterUrl);

      // Don't use baseURL - these hrefs come from Jekyll's site.url, which is the
      // production host even on a local serve. Compare the path instead.
      expect(new URL(canonical).pathname).toBe(path);
    });

    if (navLabel) {
      test(`should link ${navLabel} in the nav by its canonical path`, async ({ page }) => {
        await page.goto(path, { waitUntil: 'domcontentloaded' });

        const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
        const navLink = page.locator(`.nav-menu li a:has-text("${navLabel}")`);
        await expect(navLink).toHaveAttribute('href', new URL(canonical).pathname);
      });
    }

    test(`should use name= for the twitter card metas on ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });

      // Twitter reads name=; property= is the Open Graph spelling and is ignored.
      for (const key of ['card', 'url', 'title', 'description']) {
        await expect(page.locator(`meta[name="twitter:${key}"]`)).toHaveCount(1);
      }
      await expect(page.locator('meta[property^="twitter:"]')).toHaveCount(0);
    });

    test(`should not declare a made-up og:logo on ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });

      // og:logo is not part of the Open Graph protocol.
      await expect(page.locator('meta[property="og:logo"]')).toHaveCount(0);
    });
  }
});
