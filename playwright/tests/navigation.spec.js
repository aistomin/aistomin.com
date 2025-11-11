const { test, expect } = require('@playwright/test');

test('should display all the menu items in the correct order', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const items = await page.locator('.nav-menu li a').allTextContents();
  expect(items).toEqual(['Home', 'About', 'Blog', 'Certificates']);
});
