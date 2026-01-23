const { test, expect } = require('@playwright/test');

test.describe('Welcome Blog Post', () => {
  test('should be accessible from the blog page', async ({ page }) => {
    // Navigate to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Find and click on the Welcome post link
    const welcomePostLink = page.locator('article.blog-post h2 a:has-text("Welcome To My New Website — Hello World!")');
    await expect(welcomePostLink).toBeVisible();
    await welcomePostLink.click();
    
    // Verify we're on the correct page
    await expect(page).toHaveURL(/\/2025\/10\/11\/welcome/);
  });

  test('should display the correct title', async ({ page }) => {
    await page.goto('/2025/10/11/welcome', { waitUntil: 'domcontentloaded' });
    
    const title = page.locator('.page-title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Welcome To My New Website');
  });

  test('should display the publishing date', async ({ page }) => {
    await page.goto('/2025/10/11/welcome', { waitUntil: 'domcontentloaded' });
    
    const dateElement = page.locator('.post-date-in-header time');
    await expect(dateElement).toBeVisible();
    await expect(dateElement).toHaveText('October 11, 2025');
  });

  test('should display the rocket emoji in header', async ({ page }) => {
    await page.goto('/2025/10/11/welcome', { waitUntil: 'domcontentloaded' });
    
    // Check for the emoji in the header
    const header = page.locator('.page-header');
    await expect(header).toContainText('🚀');
  });

  test('should display all section headings and content snippets', async ({ page }) => {
    await page.goto('/2025/10/11/welcome', { waitUntil: 'domcontentloaded' });
    
    const content = page.locator('.page-content');
    
    // Check first paragraph
    await expect(content).toContainText('Hey there! So I finally got around to building myself a proper website');
    
    // What's the deal here? section
    const dealHeading = content.locator('h2:has-text("What\'s the deal here?")');
    await expect(dealHeading).toBeVisible();
    await expect(content).toContainText('I\'ll be writing about tech stuff');
    await expect(content).toContainText('Think of it as my personal corner of the internet');
    
    // The old stuff section
    const oldStuffHeading = content.locator('h2:has-text("The old stuff")');
    await expect(oldStuffHeading).toBeVisible();
    await expect(content).toContainText('If you\'re curious about what I used to write');
    await expect(content).toContainText('That\'s where I rambled about Android development');
    
    // What's next? section
    const nextHeading = content.locator('h2:has-text("What\'s next?")');
    await expect(nextHeading).toBeVisible();
    await expect(content).toContainText('Honestly, I\'m not entirely sure yet');
    await expect(content).toContainText('Thanks for stopping by!');
  });

  test('should have working external links with correct attributes', async ({ page }) => {
    await page.goto('/2025/10/11/welcome', { waitUntil: 'domcontentloaded' });
    
    // Check aistomin.com link
    const aistominLink = page.locator('a[href="https://aistomin.com"]');
    await expect(aistominLink).toBeVisible();
    await expect(aistominLink).toHaveAttribute('target', '_blank');
    await expect(aistominLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Check old blog link (aistomin.github.io)
    const githubIoLink = page.locator('a[href="https://aistomin.github.io/"]');
    await expect(githubIoLink).toBeVisible();
    await expect(githubIoLink).toHaveAttribute('target', '_blank');
    await expect(githubIoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should have working navigation from post back to blog', async ({ page }) => {
    await page.goto('/2025/10/11/welcome', { waitUntil: 'domcontentloaded' });
    
    // Click on Blog menu item
    await page.click('.nav-menu li a:has-text("Blog")');
    
    // Verify we're back on the blog page
    await expect(page).toHaveURL(/\/blog/);
    await expect(page.locator('.page-title')).toHaveText('Random Thoughts from a Wandering Mind');
  });

  test('should display comments section if enabled', async ({ page }) => {
    await page.goto('/2025/10/11/welcome', { waitUntil: 'domcontentloaded' });
    
    // Check that Disqus comments section exists
    const commentsSection = page.locator('.comments-section');
    await expect(commentsSection).toBeVisible();
    
    // Check for Disqus thread div
    const disqusThread = page.locator('#disqus_thread');
    await expect(disqusThread).toBeVisible();
  });

  test('should have Blog menu item active', async ({ page }) => {
    await page.goto('/2025/10/11/welcome', { waitUntil: 'domcontentloaded' });
    
    // Verify Blog menu item has active class when viewing a post
    const blogMenuItem = page.locator('.nav-menu li a:has-text("Blog")');
    await expect(blogMenuItem).toHaveClass('active');
  });
});

