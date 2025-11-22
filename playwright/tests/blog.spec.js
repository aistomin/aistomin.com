const { test, expect } = require('@playwright/test');

test.describe('Blog Page', () => {
  test('should navigate to blog page when clicking Blog menu item', async ({ page }) => {
    // Start from home page
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Click on Blog menu item
    await page.click('.nav-menu li a:has-text("Blog")');
    
    // Verify we're on the blog page
    await expect(page).toHaveURL(/\/blog/);
    await expect(page.locator('.page-title')).toHaveText('Thoughts ...');
  });

  test('should display two blog posts with all required elements', async ({ page }) => {
    // Navigate to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Verify there are exactly 2 blog posts
    const posts = page.locator('article.blog-post');
    await expect(posts).toHaveCount(2);
    
    // Test first post (most recent: Goethe-Zertifikat C1)
    const firstPost = posts.nth(0);
    
    // Check title exists and has correct text
    const firstTitle = firstPost.locator('h2 a');
    await expect(firstTitle).toHaveText('Goethe-Zertifikat C1 — My Experience, Part I: The Exam');
    
    // Check date exists and has correct format
    const firstDate = firstPost.locator('.post-meta time');
    await expect(firstDate).toBeVisible();
    await expect(firstDate).toHaveText('November 19, 2025');
    
    // Check preview/excerpt text exists
    const firstExcerpt = firstPost.locator('.post-excerpt');
    await expect(firstExcerpt).toBeVisible();
    await expect(firstExcerpt).toContainText('A couple of months have already passed since I got my Goethe-Zertifikat C1');
    
    // Check "read more" link exists and has correct href
    const firstReadMore = firstPost.locator('a.read-more');
    await expect(firstReadMore).toBeVisible();
    await expect(firstReadMore).toHaveText('Read more');
    await expect(firstReadMore).toHaveAttribute('href', /\/2025\/11\/19\/goethe-c1-exam/);
    
    // Test second post (Welcome To My New Website)
    const secondPost = posts.nth(1);
    
    // Check title exists and has correct text
    const secondTitle = secondPost.locator('h2 a');
    await expect(secondTitle).toHaveText('Welcome To My New Website');
    
    // Check date exists and has correct format
    const secondDate = secondPost.locator('.post-meta time');
    await expect(secondDate).toBeVisible();
    await expect(secondDate).toHaveText('October 11, 2025');
    
    // Check preview/excerpt text exists
    const secondExcerpt = secondPost.locator('.post-excerpt');
    await expect(secondExcerpt).toBeVisible();
    await expect(secondExcerpt).toContainText('Hey there! So I finally got around to building myself a proper website');
    
    // Check "read more" link exists and has correct href
    const secondReadMore = secondPost.locator('a.read-more');
    await expect(secondReadMore).toBeVisible();
    await expect(secondReadMore).toHaveText('Read more');
    await expect(secondReadMore).toHaveAttribute('href', /\/2025\/10\/11\/welcome/);
  });

  test('should navigate to correct post pages via read more links', async ({ page }) => {
    // Navigate to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    const posts = page.locator('article.blog-post');
    
    // Test first post's read more link
    const firstReadMore = posts.nth(0).locator('a.read-more');
    await firstReadMore.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/11\/19\/goethe-c1-exam/);
    await expect(page.locator('.page-title')).toContainText('Goethe-Zertifikat C1');
    
    // Go back to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Test second post's read more link
    const secondReadMore = posts.nth(1).locator('a.read-more');
    await secondReadMore.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/10\/11\/welcome/);
    await expect(page.locator('.page-title')).toHaveText('Welcome To My New Website');
  });

  test('should navigate to correct post pages via title links', async ({ page }) => {
    // Navigate to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    const posts = page.locator('article.blog-post');
    
    // Test first post's title link
    const firstTitleLink = posts.nth(0).locator('h2 a');
    await firstTitleLink.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/11\/19\/goethe-c1-exam/);
    await expect(page.locator('.page-title')).toContainText('Goethe-Zertifikat C1');
    
    // Go back to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Test second post's title link
    const secondTitleLink = posts.nth(1).locator('h2 a');
    await secondTitleLink.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/10\/11\/welcome/);
    await expect(page.locator('.page-title')).toHaveText('Welcome To My New Website');
  });
});

