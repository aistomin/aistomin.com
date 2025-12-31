const { test, expect } = require('@playwright/test');

test('should display all the menu items in the correct order', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const items = await page.locator('.nav-menu li a').allTextContents();
  expect(items).toEqual(['Home', 'About', 'Blog', 'Certificates']);
});

test('should display copyright information in footer', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  
  // Check footer exists
  const footer = page.locator('.site-footer');
  await expect(footer).toBeVisible();
  
  // Check copyright text
  const copyrightText = footer.locator('.footer-content p');
  await expect(copyrightText).toBeVisible();
  
  // Verify it contains copyright symbol, current year, and site name
  await expect(copyrightText).toContainText('©');
  await expect(copyrightText).toContainText('2025–');
  await expect(copyrightText).toContainText(new Date().getFullYear().toString());
  await expect(copyrightText).toContainText('Andrej Istomin');
  await expect(copyrightText).toContainText('All rights reserved');
});
