const { test, expect } = require('@playwright/test');

test.describe('Goethe C1 Exam Blog Post', () => {
  test('should be accessible from the blog page', async ({ page }) => {
    // Navigate to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Find and click on the Goethe C1 Part I post link (be specific since there are multiple Goethe posts)
    const goethePostLink = page.locator('article.blog-post h2 a:has-text("Part I: The Exam")');
    await expect(goethePostLink).toBeVisible();
    await goethePostLink.click();
    
    // Verify we're on the correct page
    await expect(page).toHaveURL(/\/2025\/11\/19\/goethe-c1-exam/);
  });

  test('should display the correct title', async ({ page }) => {
    await page.goto('/2025/11/19/goethe-c1-exam', { waitUntil: 'domcontentloaded' });
    
    const title = page.locator('.page-title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Goethe-Zertifikat C1 — My Experience, Part I: The Exam');
  });

  test('should display the publishing date', async ({ page }) => {
    await page.goto('/2025/11/19/goethe-c1-exam', { waitUntil: 'domcontentloaded' });
    
    const dateElement = page.locator('.post-date-in-header time');
    await expect(dateElement).toBeVisible();
    await expect(dateElement).toHaveText('November 19, 2025');
  });

  test('should display the main image', async ({ page }) => {
    await page.goto('/2025/11/19/goethe-c1-exam', { waitUntil: 'domcontentloaded' });
    
    // Check for the Goethe Institut München image (large version displayed in post)
    const mainImage = page.locator('img[alt="Goethe-Institut München"]');
    await expect(mainImage).toBeVisible();
    await expect(mainImage).toHaveAttribute('src', '/assets/images/goethe-institut-muenchen-large.jpg');
  });

  test('should display all section headings and content snippets', async ({ page }) => {
    await page.goto('/2025/11/19/goethe-c1-exam', { waitUntil: 'domcontentloaded' });
    
    const content = page.locator('.page-content');
    
    // Preamble section
    const preambleHeading = content.locator('h2:has-text("Preamble")');
    await expect(preambleHeading).toBeVisible();
    await expect(content).toContainText('As often happens to me');
    await expect(content).toContainText('at the end of this one.');
    
    // Facts section
    const factsHeading = content.locator('h2:has-text("Facts")');
    await expect(factsHeading).toBeVisible();
    await expect(content).toContainText('I took the Goethe-Zertifikat C1');
    await expect(content).toContainText('meets expectations of the Goethe-Institut.');
    
    // Reception and Security section
    const receptionHeading = content.locator('h2:has-text("Reception and Security")');
    await expect(receptionHeading).toBeVisible();
    await expect(content).toContainText('After arriving, all students');
    await expect(content).toContainText('everything you need will be provided by the institute.');
    
    // Reading - Listening - Writing section
    const readingHeading = content.locator('h2:has-text("Reading - Listening - Writing")');
    await expect(readingHeading).toBeVisible();
    await expect(content).toContainText('The classroom is already prepared');
    await expect(content).toContainText('decided individually for each student.');
    
    // Long Break section
    const longBreakHeading = content.locator('h2:has-text("Long Break")');
    await expect(longBreakHeading).toBeVisible();
    await expect(content).toContainText('In my case, there was a very long');
    await expect(content).toContainText('the final part of this vaudeville.');
    
    // Speaking section
    const speakingHeading = content.locator('h2:has-text("Speaking")');
    await expect(speakingHeading).toBeVisible();
    await expect(content).toContainText('At the appointed time');
    await expect(content).toContainText('The exam takes about 20 minutes.');
    
    // Overall Experience section
    const overallHeading = content.locator('h2:has-text("Overall Experience")');
    await expect(overallHeading).toBeVisible();
    await expect(content).toContainText('Taking into consideration that the event');
    await expect(content).toContainText('meets expectations of the Goethe-Institut.');
    
    // Next Posts section
    const nextPostsHeading = content.locator('h2:has-text("Next Posts")');
    await expect(nextPostsHeading).toBeVisible();
  });

  test('should display the results table with correct data', async ({ page }) => {
    await page.goto('/2025/11/19/goethe-c1-exam', { waitUntil: 'domcontentloaded' });
    
    const resultsTable = page.locator('.results-table');
    await expect(resultsTable).toBeVisible();
    
    // Check table headers
    await expect(resultsTable.locator('th:has-text("Exam Part")')).toBeVisible();
    await expect(resultsTable.locator('th:has-text("Attained Score")')).toBeVisible();
    await expect(resultsTable.locator('th:has-text("Max. Score")')).toBeVisible();
    
    // Check some table data
    await expect(resultsTable).toContainText('Lesen (Reading)');
    await expect(resultsTable).toContainText('Hören (Listening)');
    await expect(resultsTable).toContainText('Schreiben (Writing)');
    await expect(resultsTable).toContainText('Sprechen (Speaking)');
  });

  test('should display the ratings table', async ({ page }) => {
    await page.goto('/2025/11/19/goethe-c1-exam', { waitUntil: 'domcontentloaded' });
    
    const ratingsTable = page.locator('.ratings-table');
    await expect(ratingsTable).toBeVisible();
    
    // Check table headers
    await expect(ratingsTable.locator('th:has-text("Points")')).toBeVisible();
    await expect(ratingsTable.locator('th:has-text("Rating")')).toBeVisible();
    
    // Check some ratings
    await expect(ratingsTable).toContainText('Very good');
    await expect(ratingsTable).toContainText('Good');
    await expect(ratingsTable).toContainText('Satisfactory');
    await expect(ratingsTable).toContainText('Pass');
    await expect(ratingsTable).toContainText('Fail');
  });

  test('should have working external links', async ({ page }) => {
    await page.goto('/2025/11/19/goethe-c1-exam', { waitUntil: 'domcontentloaded' });
    
    // Check Goethe-Zertifikat C1 link
    const goetheLink = page.locator('a[href="https://www.goethe.de/ins/de/en/prf/prf/gzc1.html"]');
    await expect(goetheLink).toBeVisible();
    await expect(goetheLink).toHaveAttribute('target', '_blank');
    await expect(goetheLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Check modular format link
    const modularLink = page.locator('a[href*="swiss-exams.ch"]');
    await expect(modularLink).toBeVisible();
    await expect(modularLink).toHaveAttribute('target', '_blank');
    
    // Check YouTube video link
    const youtubeLink = page.locator('a[href*="youtube.com"]');
    await expect(youtubeLink).toBeVisible();
    await expect(youtubeLink).toHaveAttribute('target', '_blank');
  });

  test('should display next posts section with links', async ({ page }) => {
    await page.goto('/2025/11/19/goethe-c1-exam', { waitUntil: 'domcontentloaded' });
    
    const nextPostsSection = page.locator('h2:has-text("Next Posts")');
    await expect(nextPostsSection).toBeVisible();
    
    // Check for "Part II: Preparations" link
    const part2Link = page.locator('a:has-text("Part II: Preparations")');
    await expect(part2Link).toBeVisible();
    
    // Check for "Part III: What\'s Next?" link
    const part3Link = page.locator('a:has-text("Part III: What\'s Next?")');
    await expect(part3Link).toBeVisible();
  });
});

