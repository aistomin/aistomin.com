const { test, expect } = require('@playwright/test');

// Every host gtag.js talks to when it reports a page view.
const ANALYTICS_HOST = /googletagmanager\.com|google-analytics\.com|analytics\.google\.com/;

// One regular page and one post, so both the `default` and the `post` layout are covered.
const PAGES = ['/', '/2025/11/19/goethe-c1-exam'];

test.describe('Google Analytics', () => {
  // The tag is wrapped in an `if (!navigator.webdriver)` guard in _layouts/default.html.
  // Playwright sets that flag, so these runs must never reach Google Analytics.
  //
  // Note this is only meaningful where the tag actually ships: CI (which builds with
  // JEKYLL_ENV=production) and the daily run against https://aistomin.com. A local
  // ./start.sh builds in development mode, where the snippet is absent altogether.
  for (const path of PAGES) {
    test(`should not send any data to Google Analytics from an automated browser on ${path}`, async ({ page }) => {
      const analyticsRequests = [];
      page.on('request', (request) => {
        if (ANALYTICS_HOST.test(request.url())) {
          analyticsRequests.push(request.url());
        }
      });

      await page.goto(path);

      // networkidle rather than domcontentloaded: gtag.js is injected asynchronously,
      // so it has to be given the chance to fire before we assert that it did not.
      await page.waitForLoadState('networkidle');

      expect(analyticsRequests).toEqual([]);
      expect(await page.evaluate(() => typeof window.dataLayer)).toBe('undefined');
    });
  }
});
