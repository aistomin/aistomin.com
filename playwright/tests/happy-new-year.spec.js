const { test, expect } = require('@playwright/test');

test.describe('Happy New Year Blog Post', () => {
  test('should be accessible from the blog page', async ({ page }) => {
    // Navigate to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Find and click on the Happy New Year post link
    const postLink = page.locator('article.blog-post h2 a:has-text("Happy New Year 2026")');
    await expect(postLink).toBeVisible();
    await postLink.click();
    
    // Verify we're on the correct page
    await expect(page).toHaveURL(/\/2025\/12\/31\/happy-new-year/);
  });

  test('should display the correct title', async ({ page }) => {
    await page.goto('/2025/12/31/happy-new-year', { waitUntil: 'domcontentloaded' });
    
    const title = page.locator('.page-title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Happy New Year!');
  });

  test('should display the publishing date', async ({ page }) => {
    await page.goto('/2025/12/31/happy-new-year', { waitUntil: 'domcontentloaded' });
    
    const dateElement = page.locator('.post-date-in-header time');
    await expect(dateElement).toBeVisible();
    await expect(dateElement).toHaveText('December 31, 2025');
  });

  test('should display the main image', async ({ page }) => {
    await page.goto('/2025/12/31/happy-new-year', { waitUntil: 'domcontentloaded' });
    
    // Check for the New Year celebration image
    const mainImage = page.locator('img[alt="New Year celebration with clock and ornaments"]');
    await expect(mainImage).toBeVisible();
    await expect(mainImage).toHaveAttribute('src', '/assets/images/happy-new-year-large.jpg');
  });

  test('should display the New Year 2026 icon', async ({ page }) => {
    await page.goto('/2025/12/31/happy-new-year', { waitUntil: 'domcontentloaded' });
    
    // Check for the New Year 2026 icon in the header
    const icon = page.locator('.page-header img[alt="Happy New Year 2026"]');
    await expect(icon).toBeVisible();
    await expect(icon).toHaveAttribute('src', '/assets/images/new-year-2026.svg');
  });

  test('should display the opening paragraph', async ({ page }) => {
    await page.goto('/2025/12/31/happy-new-year', { waitUntil: 'domcontentloaded' });
    
    const content = page.locator('.page-content');
    await expect(content).toContainText('A new year always arrives quietly');
    await expect(content).toContainText('the fragile promise of what lies ahead');
  });

  test('should display the reflection paragraph about the past year', async ({ page }) => {
    await page.goto('/2025/12/31/happy-new-year', { waitUntil: 'domcontentloaded' });
    
    const content = page.locator('.page-content');
    await expect(content).toContainText('The year behind us was not an easy one');
    await expect(content).toContainText('tested endurance and patience');
    await expect(content).toContainText('cannot simply be erased by turning a calendar page');
  });

  test('should display the wishes paragraph', async ({ page }) => {
    await page.goto('/2025/12/31/happy-new-year', { waitUntil: 'domcontentloaded' });
    
    const content = page.locator('.page-content');
    await expect(content).toContainText('good health, prosperity');
    await expect(content).toContainText('courage to move on and keep striving');
    await expect(content).toContainText('resilience to rise after every setback');
  });

  test('should display the plans for 2026 paragraph', async ({ page }) => {
    await page.goto('/2025/12/31/happy-new-year', { waitUntil: 'domcontentloaded' });
    
    const content = page.locator('.page-content');
    await expect(content).toContainText('I have big plans for 2026');
    await expect(content).toContainText('many new—and hopefully interesting—posts');
    await expect(content).toContainText('Thank you for being here');
  });

  test('should display the letter closing with proper formatting', async ({ page }) => {
    await page.goto('/2025/12/31/happy-new-year', { waitUntil: 'domcontentloaded' });
    
    const content = page.locator('.page-content');
    
    // Check for the closing text
    await expect(content).toContainText('Wishing you all a meaningful year ahead');
    
    // Check for the signature
    const signature = content.locator('em');
    await expect(signature).toContainText('Andrej');
    
    // Check that the closing paragraph is right-aligned
    const closingParagraph = content.locator('p[style*="text-align: right"]');
    await expect(closingParagraph).toBeVisible();
  });

  test('should have working navigation from post back to blog', async ({ page }) => {
    await page.goto('/2025/12/31/happy-new-year', { waitUntil: 'domcontentloaded' });
    
    // Click on Blog menu item
    await page.click('.nav-menu li a:has-text("Blog")');
    
    // Verify we're back on the blog page
    await expect(page).toHaveURL(/\/blog/);
    await expect(page.locator('.page-title')).toHaveText('Random Thoughts from a Wandering Mind');
  });

  test('should display comments section if enabled', async ({ page }) => {
    await page.goto('/2025/12/31/happy-new-year', { waitUntil: 'domcontentloaded' });
    
    // Check that Disqus comments section exists
    const commentsSection = page.locator('.comments-section');
    await expect(commentsSection).toBeVisible();
    
    // Check for Disqus thread div
    const disqusThread = page.locator('#disqus_thread');
    await expect(disqusThread).toBeVisible();
  });

  test('should contain key New Year themes', async ({ page }) => {
    await page.goto('/2025/12/31/happy-new-year', { waitUntil: 'domcontentloaded' });
    
    const content = page.locator('.page-content');
    
    // Check for mentions of key themes
    await expect(content).toContainText('new year');
    await expect(content).toContainText('health');
    await expect(content).toContainText('prosperity');
    await expect(content).toContainText('courage');
    await expect(content).toContainText('2026');
    await expect(content).toContainText('strength');
    await expect(content).toContainText('resilience');
  });
});

