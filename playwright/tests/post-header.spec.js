const { test, expect } = require('@playwright/test');

// The header used to be assembled on DOMContentLoaded, which the rest of the suite
// cannot distinguish from server-rendered markup — a scripted header passes those
// assertions just as well. These run with JavaScript switched off, the way a crawler
// or a non-JS reader sees the page, so they fail if the header ever goes back to
// being injected at runtime.
test.use({ javaScriptEnabled: false });

const POSTS = [
  {
    path: '/2025/11/19/goethe-c1-exam',
    title: 'Goethe-Zertifikat C1 — The Exam (Part I)',
    date: 'November 19, 2025',
    datetime: '2025-11-19',
  },
  {
    path: '/2025/11/25/goethe-c1-preparations',
    title: 'Goethe-Zertifikat C1 — Preparations (Part II)',
    date: 'November 25, 2025',
    datetime: '2025-11-25',
  },
  {
    path: '/2025/12/07/goethe-c1-whats-next',
    title: "Goethe-Zertifikat C1 — What's Next? (Part III)",
    date: 'December 7, 2025',
    datetime: '2025-12-07',
  },
];

test.describe('Post header without JavaScript', () => {
  for (const post of POSTS) {
    test(`should render title, date and logo on ${post.path}`, async ({ page }) => {
      await page.goto(post.path, { waitUntil: 'domcontentloaded' });

      const header = page.locator('.page-header');
      await expect(header.locator('.page-title')).toHaveText(post.title);

      const time = header.locator('.post-date-in-header time');
      await expect(time).toHaveText(post.date);
      // The offset varies per post, so anchor on the calendar date only.
      await expect(time).toHaveAttribute('datetime', new RegExp(`^${post.datetime}T`));

      const logo = header.locator('.post-header-logo img');
      await expect(logo).toHaveAttribute('src', '/assets/images/goethe-institut.png');
      await expect(logo).toHaveAttribute('alt', 'Goethe Institut');
    });
  }
});
