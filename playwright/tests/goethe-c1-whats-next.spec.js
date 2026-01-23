const { test, expect } = require('@playwright/test');

test.describe('Goethe C1 What\'s Next Blog Post', () => {
  test('should be accessible from the blog page', async ({ page }) => {
    // Navigate to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Find and click on the Goethe C1 Part III post link (be specific since there are multiple Goethe posts)
    const goethePostLink = page.locator('article.blog-post h2 a:has-text("What\'s Next? (Part III)")');
    await expect(goethePostLink).toBeVisible();
    await goethePostLink.click();
    
    // Verify we're on the correct page
    await expect(page).toHaveURL(/\/2025\/12\/07\/goethe-c1-whats-next/);
  });

  test('should display the correct title', async ({ page }) => {
    await page.goto('/2025/12/07/goethe-c1-whats-next', { waitUntil: 'domcontentloaded' });
    
    const title = page.locator('.page-title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Goethe-Zertifikat C1 — What\'s Next? (Part III)');
  });

  test('should display the publishing date', async ({ page }) => {
    await page.goto('/2025/12/07/goethe-c1-whats-next', { waitUntil: 'domcontentloaded' });
    
    const dateElement = page.locator('.post-date-in-header time');
    await expect(dateElement).toBeVisible();
    await expect(dateElement).toHaveText('December 7, 2025');
  });

  test('should display the main image', async ({ page }) => {
    await page.goto('/2025/12/07/goethe-c1-whats-next', { waitUntil: 'domcontentloaded' });
    
    // Check for the working materials image (large version displayed in post)
    const mainImage = page.locator('img[alt="Working materials on the table"]');
    await expect(mainImage).toBeVisible();
    await expect(mainImage).toHaveAttribute('src', '/assets/images/goethe-c1-whats-next-large.jpg');
  });

  test('should display the Goethe Institut logo', async ({ page }) => {
    await page.goto('/2025/12/07/goethe-c1-whats-next', { waitUntil: 'domcontentloaded' });
    
    // Check for the Goethe Institut logo in the header
    const logo = page.locator('.page-header img[alt="Goethe Institut"]');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('src', '/assets/images/goethe-institut.png');
  });

  test('should display the epigraph with correct styling', async ({ page }) => {
    await page.goto('/2025/12/07/goethe-c1-whats-next', { waitUntil: 'domcontentloaded' });
    
    // Check for epigraph container
    const epigraph = page.locator('.epigraph');
    await expect(epigraph).toBeVisible();
    
    // Check for quote
    const quote = page.locator('.epigraph-quote');
    await expect(quote).toBeVisible();
    await expect(quote).toContainText('Homo proponit, sed Deus disponit');
    
    // Check for source/author
    const source = page.locator('.epigraph-source');
    await expect(source).toBeVisible();
    await expect(source).toContainText('Thomas à Kempis');
  });

  test('should display all section headings and content snippets', async ({ page }) => {
    await page.goto('/2025/12/07/goethe-c1-whats-next', { waitUntil: 'domcontentloaded' });
    
    const content = page.locator('.page-content');
    
    // To C2 or Not to C2 section
    const c2Heading = content.locator('h2:has-text("To C2 or Not to C2")');
    await expect(c2Heading).toBeVisible();
    await expect(content).toContainText('I already mentioned in the');
    await expect(content).toContainText('The show must go on.');
    
    // What Is the Plan section
    const planHeading = content.locator('h2:has-text("What Is the Plan?")');
    await expect(planHeading).toBeVisible();
    await expect(content).toContainText('I shouldn\'t repeat the same mistake');
    await expect(content).toContainText('distractions and the lack of concentration');
    
    // ETA section
    const etaHeading = content.locator('h2:has-text("ETA")');
    await expect(etaHeading).toBeVisible();
    await expect(content).toContainText('a plan without time estimations is just a dream');
    await expect(content).toContainText('wandering in the dark, as I did with C1.');
    
    // Conclusion section
    const conclusionHeading = content.locator('h2:has-text("Conclusion")');
    await expect(conclusionHeading).toBeVisible();
    await expect(content).toContainText('This post may look like a random rant');
    await expect(content).toContainText('Wish me good luck with the preparations!');
  });

  test('should contain key C2 planning topics', async ({ page }) => {
    await page.goto('/2025/12/07/goethe-c1-whats-next', { waitUntil: 'domcontentloaded' });
    
    const content = page.locator('.page-content');
    
    // Check for mentions of key topics
    await expect(content).toContainText('C2');
    await expect(content).toContainText('grammar');
    await expect(content).toContainText('Reading');
    await expect(content).toContainText('Writing');
    await expect(content).toContainText('Listening');
    await expect(content).toContainText('Speaking');
    await expect(content).toContainText('philosophy');
    await expect(content).toContainText('Kant');
    await expect(content).toContainText('2.5–3 years');
  });

  test('should have internal link to Part II with correct attributes', async ({ page }) => {
    await page.goto('/2025/12/07/goethe-c1-whats-next', { waitUntil: 'domcontentloaded' });
    
    // Check link to Part II (previous part)
    const part2Link = page.locator('a[href="/2025/11/25/goethe-c1-preparations.html"]');
    await expect(part2Link).toBeVisible();
    await expect(part2Link).toHaveAttribute('target', '_blank');
    await expect(part2Link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should have external link to Verein article with correct attributes', async ({ page }) => {
    await page.goto('/2025/12/07/goethe-c1-whats-next', { waitUntil: 'domcontentloaded' });
    
    // Check link to DW article about Verein
    const vereinLink = page.locator('a[href="https://www.dw.com/en/get-to-know-the-concept-of-the-german-verein/a-48306152"]');
    await expect(vereinLink).toBeVisible();
    await expect(vereinLink).toHaveAttribute('target', '_blank');
    await expect(vereinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should have working navigation from post back to blog', async ({ page }) => {
    await page.goto('/2025/12/07/goethe-c1-whats-next', { waitUntil: 'domcontentloaded' });
    
    // Click on Blog menu item
    await page.click('.nav-menu li a:has-text("Blog")');
    
    // Verify we're back on the blog page
    await expect(page).toHaveURL(/\/blog/);
    await expect(page.locator('.page-title')).toHaveText('Random Thoughts from a Wandering Mind');
  });

  test('should display comments section if enabled', async ({ page }) => {
    await page.goto('/2025/12/07/goethe-c1-whats-next', { waitUntil: 'domcontentloaded' });
    
    // Check that Disqus comments section exists
    const commentsSection = page.locator('.comments-section');
    await expect(commentsSection).toBeVisible();
    
    // Check for Disqus thread div
    const disqusThread = page.locator('#disqus_thread');
    await expect(disqusThread).toBeVisible();
  });
});
