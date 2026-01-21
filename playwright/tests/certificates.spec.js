const { test, expect } = require('@playwright/test');

test.describe('Certificates Page', () => {
  test('should navigate to certificates page when clicking Certificates menu item', async ({ page }) => {
    // Start from home page
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Click on Certificates menu item
    await page.click('.nav-menu li a:has-text("Certificates")');

    // Verify we're on the certificates page
    await expect(page).toHaveURL(/\/certificates/);
    await expect(page.locator('.page-title')).toHaveText('Certificates & Achievements');
  });

  test('should display all required elements on certificates page', async ({ page }) => {
    // Navigate to certificates page
    await page.goto('/certificates', { waitUntil: 'domcontentloaded' });

    // 1. Test title exists
    const title = page.locator('.page-title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Certificates & Achievements');

    // 2. Test photo exists
    const photo = page.locator('.about-photo');
    await expect(photo).toBeVisible();
    await expect(photo).toHaveAttribute('src', '/assets/images/me-and-guitar.png');
    await expect(photo).toHaveAttribute('alt', 'Andrej with guitar');

    // 3. Test introductory text
    const introParagraph = page.locator('.page-content p').first();
    await expect(introParagraph).toBeVisible();
    await expect(introParagraph).toContainText('Learning never stops. Here\'s what I\'ve earned along the way:');

    // 4. Test certificates list container exists
    const certificatesList = page.locator('.certificates-list');
    await expect(certificatesList).toBeVisible();
  });

  test('should display Goethe C1 certificate details', async ({ page }) => {
    // Navigate to certificates page
    await page.goto('/certificates', { waitUntil: 'domcontentloaded' });

    const certificateItem = page.locator('.certificate-item');
    await expect(certificateItem).toBeVisible();

    // Test Goethe-Institut icon
    const icon = certificateItem.locator('.certificate-icon img');
    await expect(icon).toBeVisible();
    await expect(icon).toHaveAttribute('src', '/assets/images/goethe-institut.png');
    await expect(icon).toHaveAttribute('alt', 'Goethe-Institut');

    // Test certificate title
    const certificateTitle = certificateItem.locator('h3');
    await expect(certificateTitle).toBeVisible();
    await expect(certificateTitle).toHaveText('Goethe-Zertifikat C1');

    // Test certificate description
    const description = certificateItem.locator('.certificate-description');
    await expect(description).toBeVisible();
    await expect(description).toContainText('Advanced German language proficiency certificate');
    await expect(description).toContainText('Level C1');

    // Test certificate metadata
    const metadata = certificateItem.locator('.certificate-meta');
    await expect(metadata).toBeVisible();

    // Check specific metadata fields
    await expect(metadata).toContainText('Issued: Munich, 03.09.2025');
    await expect(metadata).toContainText('Certificate No: 2048-AC1A-0002450866');
    await expect(metadata).toContainText('Institution: Goethe-Institut');
    await expect(metadata).toContainText('My Date of Birth (for verification): 17.05.1985');
    await expect(metadata).toContainText('Verify:');
  });

  test('should have working external links', async ({ page }) => {
    // Navigate to certificates page
    await page.goto('/certificates', { waitUntil: 'domcontentloaded' });

    // Test CEFR Wikipedia link
    const cefrLink = page.locator('a:has-text("CEFR")');
    await expect(cefrLink).toBeVisible();
    await expect(cefrLink).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Common_European_Framework_of_Reference_for_Languages');
    await expect(cefrLink).toHaveAttribute('target', '_blank');
    await expect(cefrLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Test Goethe verification link
    const verifyLink = page.locator('a:has-text("www.goethe.de/verify")');
    await expect(verifyLink).toBeVisible();
    await expect(verifyLink).toHaveAttribute('href', 'https://www.goethe.de/verify');
    await expect(verifyLink).toHaveAttribute('target', '_blank');
    await expect(verifyLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should have active class on Certificates menu item', async ({ page }) => {
    // Navigate to certificates page
    await page.goto('/certificates', { waitUntil: 'domcontentloaded' });

    // Find the Certificates menu item
    const certificatesMenuItem = page.locator('.nav-menu li a:has-text("Certificates")');

    // Verify it has the 'active' class
    await expect(certificatesMenuItem).toHaveClass('active');
  });

  test('should navigate from certificates page to other pages', async ({ page }) => {
    // Navigate to certificates page
    await page.goto('/certificates', { waitUntil: 'domcontentloaded' });

    // Click on Home menu item
    await page.click('.nav-menu li a:has-text("Home")');
    await expect(page).toHaveURL(/\/$/);

    // Go back to certificates
    await page.goto('/certificates', { waitUntil: 'domcontentloaded' });

    // Click on About menu item
    await page.click('.nav-menu li a:has-text("About")');
    await expect(page).toHaveURL(/\/about/);
  });
});

