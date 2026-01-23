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

  test('should display five blog posts with all required elements', async ({ page }) => {
    // Navigate to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Verify there are exactly 5 blog posts
    const posts = page.locator('article.blog-post');
    await expect(posts).toHaveCount(5);
    
    // Test first post (most recent: Happy New Year!)
    const firstPost = posts.nth(0);
    
    // Check title exists and has correct text
    const firstTitle = firstPost.locator('h2 a');
    await expect(firstTitle).toHaveText('Happy New Year 2026 — Wishes and Reflections');
    
    // Check date exists and has correct format
    const firstDate = firstPost.locator('.post-meta time');
    await expect(firstDate).toBeVisible();
    await expect(firstDate).toHaveText('December 31, 2025');
    
    // Check preview/excerpt text exists
    const firstExcerpt = firstPost.locator('.post-excerpt');
    await expect(firstExcerpt).toBeVisible();
    await expect(firstExcerpt).toContainText('As we step into the new year, I wish everyone good health, prosperity');
    
    // Check "read more" link exists and has correct href
    const firstReadMore = firstPost.locator('a.read-more');
    await expect(firstReadMore).toBeVisible();
    await expect(firstReadMore).toHaveText('Read more');
    await expect(firstReadMore).toHaveAttribute('href', /\/2025\/12\/31\/happy-new-year/);
    
    // Test second post (Goethe-Zertifikat C1 Part III)
    const secondPost = posts.nth(1);
    
    // Check title exists and has correct text
    const secondTitle = secondPost.locator('h2 a');
    await expect(secondTitle).toHaveText('Goethe-Zertifikat C1 — What\'s Next? (Part III)');
    
    // Check date exists and has correct format
    const secondDate = secondPost.locator('.post-meta time');
    await expect(secondDate).toBeVisible();
    await expect(secondDate).toHaveText('December 7, 2025');
    
    // Check preview/excerpt text exists
    const secondExcerpt = secondPost.locator('.post-excerpt');
    await expect(secondExcerpt).toBeVisible();
    await expect(secondExcerpt).toContainText('This is the third and final part of my Goethe-Zertifikat C1 trilogy');
    
    // Check "read more" link exists and has correct href
    const secondReadMore = secondPost.locator('a.read-more');
    await expect(secondReadMore).toBeVisible();
    await expect(secondReadMore).toHaveText('Read more');
    await expect(secondReadMore).toHaveAttribute('href', /\/2025\/12\/07\/goethe-c1-whats-next/);
    
    // Test third post (Goethe-Zertifikat C1 Part II)
    const thirdPost = posts.nth(2);
    
    // Check title exists and has correct text
    const thirdTitle = thirdPost.locator('h2 a');
    await expect(thirdTitle).toHaveText('Goethe-Zertifikat C1 — Preparations (Part II)');
    
    // Check date exists and has correct format
    const thirdDate = thirdPost.locator('.post-meta time');
    await expect(thirdDate).toBeVisible();
    await expect(thirdDate).toHaveText('November 25, 2025');
    
    // Check preview/excerpt text exists
    const thirdExcerpt = thirdPost.locator('.post-excerpt');
    await expect(thirdExcerpt).toBeVisible();
    await expect(thirdExcerpt).toContainText('In the second part of my Goethe-Zertifikat C1 trilogy');
    
    // Check "read more" link exists and has correct href
    const thirdReadMore = thirdPost.locator('a.read-more');
    await expect(thirdReadMore).toBeVisible();
    await expect(thirdReadMore).toHaveText('Read more');
    await expect(thirdReadMore).toHaveAttribute('href', /\/2025\/11\/25\/goethe-c1-preparations/);
    
    // Test fourth post (Goethe-Zertifikat C1 Part I)
    const fourthPost = posts.nth(3);
    
    // Check title exists and has correct text
    const fourthTitle = fourthPost.locator('h2 a');
    await expect(fourthTitle).toHaveText('Goethe-Zertifikat C1 — The Exam (Part I)');
    
    // Check date exists and has correct format
    const fourthDate = fourthPost.locator('.post-meta time');
    await expect(fourthDate).toBeVisible();
    await expect(fourthDate).toHaveText('November 19, 2025');
    
    // Check preview/excerpt text exists
    const fourthExcerpt = fourthPost.locator('.post-excerpt');
    await expect(fourthExcerpt).toBeVisible();
    await expect(fourthExcerpt).toContainText('A couple of months have already passed since I got my Goethe-Zertifikat C1');
    
    // Check "read more" link exists and has correct href
    const fourthReadMore = fourthPost.locator('a.read-more');
    await expect(fourthReadMore).toBeVisible();
    await expect(fourthReadMore).toHaveText('Read more');
    await expect(fourthReadMore).toHaveAttribute('href', /\/2025\/11\/19\/goethe-c1-exam/);
    
    // Test fifth post (Welcome To My New Website)
    const fifthPost = posts.nth(4);
    
    // Check title exists and has correct text
    const fifthTitle = fifthPost.locator('h2 a');
    await expect(fifthTitle).toHaveText('Welcome To My New Website — Hello World!');
    
    // Check date exists and has correct format
    const fifthDate = fifthPost.locator('.post-meta time');
    await expect(fifthDate).toBeVisible();
    await expect(fifthDate).toHaveText('October 11, 2025');
    
    // Check preview/excerpt text exists
    const fifthExcerpt = fifthPost.locator('.post-excerpt');
    await expect(fifthExcerpt).toBeVisible();
    await expect(fifthExcerpt).toContainText('Hey there! So I finally got around to building myself a proper website');
    
    // Check "read more" link exists and has correct href
    const fifthReadMore = fifthPost.locator('a.read-more');
    await expect(fifthReadMore).toBeVisible();
    await expect(fifthReadMore).toHaveText('Read more');
    await expect(fifthReadMore).toHaveAttribute('href', /\/2025\/10\/11\/welcome/);
  });

  test('should navigate to correct post pages via read more links', async ({ page }) => {
    // Navigate to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    const posts = page.locator('article.blog-post');
    
    // Test first post's read more link (Happy New Year!)
    const firstReadMore = posts.nth(0).locator('a.read-more');
    await firstReadMore.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/12\/31\/happy-new-year/);
    await expect(page.locator('.page-title')).toHaveText('Happy New Year!');
    
    // Go back to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Test second post's read more link (Part III: What's Next?)
    const secondReadMore = posts.nth(1).locator('a.read-more');
    await secondReadMore.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/12\/07\/goethe-c1-whats-next/);
    await expect(page.locator('.page-title')).toContainText('Goethe-Zertifikat C1');
    
    // Go back to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Test third post's read more link (Part II: Preparations)
    const thirdReadMore = posts.nth(2).locator('a.read-more');
    await thirdReadMore.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/11\/25\/goethe-c1-preparations/);
    await expect(page.locator('.page-title')).toContainText('Goethe-Zertifikat C1');
    
    // Go back to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Test fourth post's read more link (Part I: The Exam)
    const fourthReadMore = posts.nth(3).locator('a.read-more');
    await fourthReadMore.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/11\/19\/goethe-c1-exam/);
    await expect(page.locator('.page-title')).toContainText('Goethe-Zertifikat C1');
    
    // Go back to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Test fifth post's read more link (Welcome)
    const fifthReadMore = posts.nth(4).locator('a.read-more');
    await fifthReadMore.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/10\/11\/welcome/);
    await expect(page.locator('.page-title')).toHaveText('Welcome To My New Website');
  });

  test('should navigate to correct post pages via title links', async ({ page }) => {
    // Navigate to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    const posts = page.locator('article.blog-post');
    
    // Test first post's title link (Happy New Year!)
    const firstTitleLink = posts.nth(0).locator('h2 a');
    await firstTitleLink.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/12\/31\/happy-new-year/);
    await expect(page.locator('.page-title')).toHaveText('Happy New Year!');
    
    // Go back to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Test second post's title link (Part III: What's Next?)
    const secondTitleLink = posts.nth(1).locator('h2 a');
    await secondTitleLink.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/12\/07\/goethe-c1-whats-next/);
    await expect(page.locator('.page-title')).toContainText('Goethe-Zertifikat C1');
    
    // Go back to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Test third post's title link (Part II: Preparations)
    const thirdTitleLink = posts.nth(2).locator('h2 a');
    await thirdTitleLink.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/11\/25\/goethe-c1-preparations/);
    await expect(page.locator('.page-title')).toContainText('Goethe-Zertifikat C1');
    
    // Go back to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Test fourth post's title link (Part I: The Exam)
    const fourthTitleLink = posts.nth(3).locator('h2 a');
    await fourthTitleLink.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/11\/19\/goethe-c1-exam/);
    await expect(page.locator('.page-title')).toContainText('Goethe-Zertifikat C1');
    
    // Go back to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Test fifth post's title link (Welcome)
    const fifthTitleLink = posts.nth(4).locator('h2 a');
    await fifthTitleLink.click();
    
    // Verify we're on the correct post page
    await expect(page).toHaveURL(/\/2025\/10\/11\/welcome/);
    await expect(page.locator('.page-title')).toHaveText('Welcome To My New Website');
  });
});

