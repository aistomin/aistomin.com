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

  test('should display four blog posts with all required elements', async ({ page }) => {
    // Navigate to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Verify there are exactly 4 blog posts
    const posts = page.locator('article.blog-post');
    await expect(posts).toHaveCount(4);
    
    // Test first post (most recent: Goethe-Zertifikat C1 Part III)
    const firstPost = posts.nth(0);
    
    // Check title exists and has correct text
    const firstTitle = firstPost.locator('h2 a');
    await expect(firstTitle).toHaveText('Goethe-Zertifikat C1 — My Experience, Part III: What\'s Next?');
    
    // Check date exists and has correct format
    const firstDate = firstPost.locator('.post-meta time');
    await expect(firstDate).toBeVisible();
    await expect(firstDate).toHaveText('December 7, 2025');
    
    // Check preview/excerpt text exists
    const firstExcerpt = firstPost.locator('.post-excerpt');
    await expect(firstExcerpt).toBeVisible();
    await expect(firstExcerpt).toContainText('This is the third and final part of my "Goethe-Zertifikat C1" trilogy');
    
    // Check "read more" link exists and has correct href
    const firstReadMore = firstPost.locator('a.read-more');
    await expect(firstReadMore).toBeVisible();
    await expect(firstReadMore).toHaveText('Read more');
    await expect(firstReadMore).toHaveAttribute('href', /\/2025\/12\/07\/goethe-c1-whats-next/);
    
    // Test second post (Goethe-Zertifikat C1 Part II)
    const secondPost = posts.nth(1);
    
    // Check title exists and has correct text
    const secondTitle = secondPost.locator('h2 a');
    await expect(secondTitle).toHaveText('Goethe-Zertifikat C1 — My Experience, Part II: Preparations');
    
    // Check date exists and has correct format
    const secondDate = secondPost.locator('.post-meta time');
    await expect(secondDate).toBeVisible();
    await expect(secondDate).toHaveText('November 25, 2025');
    
    // Check preview/excerpt text exists
    const secondExcerpt = secondPost.locator('.post-excerpt');
    await expect(secondExcerpt).toBeVisible();
    await expect(secondExcerpt).toContainText('In the second part of my Goethe-Zertifikat C1 trilogy');
    
    // Check "read more" link exists and has correct href
    const secondReadMore = secondPost.locator('a.read-more');
    await expect(secondReadMore).toBeVisible();
    await expect(secondReadMore).toHaveText('Read more');
    await expect(secondReadMore).toHaveAttribute('href', /\/2025\/11\/25\/goethe-c1-preparations/);
    
    // Test third post (Goethe-Zertifikat C1 Part I)
    const thirdPost = posts.nth(2);
    
    // Check title exists and has correct text
    const thirdTitle = thirdPost.locator('h2 a');
    await expect(thirdTitle).toHaveText('Goethe-Zertifikat C1 — My Experience, Part I: The Exam');
    
    // Check date exists and has correct format
    const thirdDate = thirdPost.locator('.post-meta time');
    await expect(thirdDate).toBeVisible();
    await expect(thirdDate).toHaveText('November 19, 2025');
    
    // Check preview/excerpt text exists
    const thirdExcerpt = thirdPost.locator('.post-excerpt');
    await expect(thirdExcerpt).toBeVisible();
    await expect(thirdExcerpt).toContainText('A couple of months have already passed since I got my Goethe-Zertifikat C1');
    
    // Check "read more" link exists and has correct href
    const thirdReadMore = thirdPost.locator('a.read-more');
    await expect(thirdReadMore).toBeVisible();
    await expect(thirdReadMore).toHaveText('Read more');
    await expect(thirdReadMore).toHaveAttribute('href', /\/2025\/11\/19\/goethe-c1-exam/);
    
    // Test fourth post (Welcome To My New Website)
    const fourthPost = posts.nth(3);
    
    // Check title exists and has correct text
    const fourthTitle = fourthPost.locator('h2 a');
    await expect(fourthTitle).toHaveText('Welcome To My New Website');
    
    // Check date exists and has correct format
    const fourthDate = fourthPost.locator('.post-meta time');
    await expect(fourthDate).toBeVisible();
    await expect(fourthDate).toHaveText('October 11, 2025');
    
    // Check preview/excerpt text exists
    const fourthExcerpt = fourthPost.locator('.post-excerpt');
    await expect(fourthExcerpt).toBeVisible();
    await expect(fourthExcerpt).toContainText('Hey there! So I finally got around to building myself a proper website');
    
    // Check "read more" link exists and has correct href
    const fourthReadMore = fourthPost.locator('a.read-more');
    await expect(fourthReadMore).toBeVisible();
    await expect(fourthReadMore).toHaveText('Read more');
    await expect(fourthReadMore).toHaveAttribute('href', /\/2025\/10\/11\/welcome/);
  });

  test('should navigate to correct post pages via read more links', async ({ page }) => {
    // Navigate to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    const posts = page.locator('article.blog-post');
    
    // Test first post's read more link (Part III: What's Next?)
    const firstReadMore = posts.nth(0).locator('a.read-more');
    await firstReadMore.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/12\/07\/goethe-c1-whats-next/);
    await expect(page.locator('.page-title')).toContainText('Goethe-Zertifikat C1');
    
    // Go back to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Test second post's read more link (Part II: Preparations)
    const secondReadMore = posts.nth(1).locator('a.read-more');
    await secondReadMore.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/11\/25\/goethe-c1-preparations/);
    await expect(page.locator('.page-title')).toContainText('Goethe-Zertifikat C1');
    
    // Go back to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Test third post's read more link (Part I: The Exam)
    const thirdReadMore = posts.nth(2).locator('a.read-more');
    await thirdReadMore.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/11\/19\/goethe-c1-exam/);
    await expect(page.locator('.page-title')).toContainText('Goethe-Zertifikat C1');
    
    // Go back to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Test fourth post's read more link (Welcome)
    const fourthReadMore = posts.nth(3).locator('a.read-more');
    await fourthReadMore.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/10\/11\/welcome/);
    await expect(page.locator('.page-title')).toHaveText('Welcome To My New Website');
  });

  test('should navigate to correct post pages via title links', async ({ page }) => {
    // Navigate to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    const posts = page.locator('article.blog-post');
    
    // Test first post's title link (Part III: What's Next?)
    const firstTitleLink = posts.nth(0).locator('h2 a');
    await firstTitleLink.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/12\/07\/goethe-c1-whats-next/);
    await expect(page.locator('.page-title')).toContainText('Goethe-Zertifikat C1');
    
    // Go back to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Test second post's title link (Part II: Preparations)
    const secondTitleLink = posts.nth(1).locator('h2 a');
    await secondTitleLink.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/11\/25\/goethe-c1-preparations/);
    await expect(page.locator('.page-title')).toContainText('Goethe-Zertifikat C1');
    
    // Go back to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Test third post's title link (Part I: The Exam)
    const thirdTitleLink = posts.nth(2).locator('h2 a');
    await thirdTitleLink.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/11\/19\/goethe-c1-exam/);
    await expect(page.locator('.page-title')).toContainText('Goethe-Zertifikat C1');
    
    // Go back to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Test fourth post's title link (Welcome)
    const fourthTitleLink = posts.nth(3).locator('h2 a');
    await fourthTitleLink.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/10\/11\/welcome/);
    await expect(page.locator('.page-title')).toHaveText('Welcome To My New Website');
  });
});

