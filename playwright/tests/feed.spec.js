const { test, expect } = require('@playwright/test');

// One regular page and one post, so both the `default` and the `post` layout are covered.
const PAGES = ['/', '/2025/11/19/goethe-c1-exam'];

test.describe('Feed auto-discovery', () => {
  for (const path of PAGES) {
    test(`should expose the feed link in the head on ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });

      const link = page.locator('link[rel="alternate"][type="application/atom+xml"]');
      await expect(link).toHaveCount(1);
      await expect(link).toHaveAttribute('title', 'Andrej Istomin');

      // Don't use baseURL - the href comes from Jekyll's site.url, which differs
      // between a local dev serve and a production build. Assert the path only.
      const href = await link.getAttribute('href');
      expect(href).toMatch(/\/feed\.xml$/);
    });
  }

  test('should serve an Atom feed at the advertised location', async ({ request }) => {
    const response = await request.get('/feed.xml');
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain('http://www.w3.org/2005/Atom');
    expect(body).toMatch(/<entry>/);
  });
});
