const { test, expect } = require('@playwright/test');

test.describe('Goethe C1 Preparations Blog Post', () => {
  test('should be accessible from the blog page', async ({ page }) => {
    // Navigate to blog page
    await page.goto('/blog', { waitUntil: 'domcontentloaded' });
    
    // Find and click on the Goethe C1 Part II post link (be specific since there are multiple Goethe posts)
    const goethePostLink = page.locator('article.blog-post h2 a:has-text("Preparations (Part II)")');
    await expect(goethePostLink).toBeVisible();
    await goethePostLink.click();
    
    // Verify we're on the correct page
    await expect(page).toHaveURL(/\/2025\/11\/25\/goethe-c1-preparations/);
  });

  test('should display the correct title', async ({ page }) => {
    await page.goto('/2025/11/25/goethe-c1-preparations', { waitUntil: 'domcontentloaded' });
    
    const title = page.locator('.page-title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Goethe-Zertifikat C1 — Preparations (Part II)');
  });

  test('should display the publishing date', async ({ page }) => {
    await page.goto('/2025/11/25/goethe-c1-preparations', { waitUntil: 'domcontentloaded' });
    
    const dateElement = page.locator('.post-date-in-header time');
    await expect(dateElement).toBeVisible();
    await expect(dateElement).toHaveText('November 25, 2025');
  });

  test('should display the main image', async ({ page }) => {
    await page.goto('/2025/11/25/goethe-c1-preparations', { waitUntil: 'domcontentloaded' });
    
    // Check for the preparations image (large version displayed in post)
    const mainImage = page.locator('img[alt="Preparations mess on the table"]');
    await expect(mainImage).toBeVisible();
    await expect(mainImage).toHaveAttribute('src', '/assets/images/goethe-c1-preparations-large.jpg');
  });

  test('should display all section headings and content snippets', async ({ page }) => {
    await page.goto('/2025/11/25/goethe-c1-preparations', { waitUntil: 'domcontentloaded' });
    
    const content = page.locator('.page-content');
    
    // How It Started: B1 section
    const b1Heading = content.locator('h2:has-text("How It Started: B1")');
    await expect(b1Heading).toBeVisible();
    await expect(content).toContainText('Before jumping into the details of my C1 preparations');
    await expect(content).toContainText('I went from 0 to B1. Not bad.');
    
    // C1. Decision section
    const decisionHeading = content.locator('h2:has-text("C1. Decision")');
    await expect(decisionHeading).toBeVisible();
    await expect(content).toContainText('Every journey begins with a decision');
    await expect(content).toContainText('I made the decision to work toward the Goethe-Zertifikat C1');
    
    // My Learning Approach section
    const learningHeading = content.locator('h2:has-text("My Learning Approach")');
    await expect(learningHeading).toBeVisible();
    await expect(content).toContainText('It was important to understand the objective');
    await expect(content).toContainText('how people speak in real life.');
    
    // The Exam Preparations section
    const examPrepHeading = content.locator('h2:has-text("The Exam Preparations")');
    await expect(examPrepHeading).toBeVisible();
    await expect(content).toContainText('being at C1 and being ready for a C1 exam are not the same');
    await expect(content).toContainText('In the exam I got 85/100');
    
    // Conclusion section
    const conclusionHeading = content.locator('h2:has-text("Conclusion")');
    await expect(conclusionHeading).toBeVisible();
    await expect(content).toContainText('I should finish this long read somehow');
    await expect(content).toContainText('In the next post.');
    
    // Next Post section
    const nextPostHeading = content.locator('h2:has-text("Next Post")');
    await expect(nextPostHeading).toBeVisible();
  });

  test('should have working external links with correct attributes', async ({ page }) => {
    await page.goto('/2025/11/25/goethe-c1-preparations', { waitUntil: 'domcontentloaded' });
    
    // Check Volga Germans Wikipedia link
    const volgaLink = page.locator('a[href="https://en.wikipedia.org/wiki/Volga_Germans"]');
    await expect(volgaLink).toBeVisible();
    await expect(volgaLink).toHaveAttribute('target', '_blank');
    await expect(volgaLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Check Duolingo link
    const duolingoLink = page.locator('a[href="https://www.duolingo.com/"]');
    await expect(duolingoLink).toBeVisible();
    await expect(duolingoLink).toHaveAttribute('target', '_blank');
    await expect(duolingoLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Check Memrise link
    const memriseLink = page.locator('a[href="https://www.memrise.com/"]');
    await expect(memriseLink).toBeVisible();
    await expect(memriseLink).toHaveAttribute('target', '_blank');
    
    // Check ZDF link
    const zdfLink = page.locator('a[href="https://www.zdf.de/"]');
    await expect(zdfLink).toBeVisible();
    await expect(zdfLink).toHaveAttribute('target', '_blank');
    
    // Check Goethe-Zertifikat B1 link
    const goetheB1Link = page.locator('a[href="https://www.goethe.de/ins/de/en/prf/prf/gzb1.html"]');
    await expect(goetheB1Link).toBeVisible();
    await expect(goetheB1Link).toHaveAttribute('target', '_blank');
    await expect(goetheB1Link).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Check Kant Wikipedia link
    const kantLink = page.locator('a[href="https://en.wikipedia.org/wiki/Immanuel_Kant"]');
    await expect(kantLink).toBeVisible();
    await expect(kantLink).toHaveAttribute('target', '_blank');
    
    // Check Goethe-Zertifikat C1 link
    const goetheC1Link = page.locator('a[href="https://www.goethe.de/ins/de/en/prf/prf/gzc1.html"]');
    await expect(goetheC1Link).toBeVisible();
    await expect(goetheC1Link).toHaveAttribute('target', '_blank');
    await expect(goetheC1Link).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Check CEFR Wikipedia link
    const cefrLink = page.locator('a[href="https://en.wikipedia.org/wiki/Common_European_Framework_of_Reference_for_Languages"]');
    await expect(cefrLink).toBeVisible();
    await expect(cefrLink).toHaveAttribute('target', '_blank');
    
    // Check Lingster Academy link
    const lingsterLink = page.locator('a[href="https://lingster.de/"]');
    await expect(lingsterLink).toBeVisible();
    await expect(lingsterLink).toHaveAttribute('target', '_blank');
    
    // Check YouTube video link
    const youtubeLink = page.locator('a[href="https://www.youtube.com/watch?v=HoD9dnTidxw"]');
    await expect(youtubeLink).toBeVisible();
    await expect(youtubeLink).toHaveAttribute('target', '_blank');
    
    // Check ChatGPT link
    const chatgptLink = page.locator('a[href="https://chatgpt.com/"]');
    await expect(chatgptLink).toBeVisible();
    await expect(chatgptLink).toHaveAttribute('target', '_blank');
  });

  test('should have internal link to Part I with correct attributes', async ({ page }) => {
    await page.goto('/2025/11/25/goethe-c1-preparations', { waitUntil: 'domcontentloaded' });
    
    // Check link to Part I
    const part1Link = page.locator('a[href="/2025/11/19/goethe-c1-exam.html"]');
    await expect(part1Link).toBeVisible();
    await expect(part1Link).toHaveAttribute('target', '_blank');
    await expect(part1Link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should display next post section with link', async ({ page }) => {
    await page.goto('/2025/11/25/goethe-c1-preparations', { waitUntil: 'domcontentloaded' });
    
    const nextPostSection = page.locator('h2:has-text("Next Post")');
    await expect(nextPostSection).toBeVisible();
    
    // Check for "What's Next? (Part III)" link
    const part3Link = page.locator('a:has-text("What\'s Next? (Part III)")');
    await expect(part3Link).toBeVisible();
  });

  test('should have correct link to Part III', async ({ page }) => {
    await page.goto('/2025/11/25/goethe-c1-preparations', { waitUntil: 'domcontentloaded' });
    
    // Check that Part III link points to the correct URL (not to coming-soon page)
    const part3Link = page.locator('a[href="/2025/12/07/goethe-c1-whats-next.html"]');
    await expect(part3Link).toBeVisible();
    await expect(part3Link).toContainText('What\'s Next? (Part III)');
  });

  test('should navigate to Part III when clicking the link', async ({ page }) => {
    await page.goto('/2025/11/25/goethe-c1-preparations', { waitUntil: 'domcontentloaded' });
    
    // Find and click Part III link
    const part3Link = page.locator('a[href="/2025/12/07/goethe-c1-whats-next.html"]');
    await part3Link.click();
    
    // Verify we're on Part III page
    await expect(page).toHaveURL(/\/2025\/12\/07\/goethe-c1-whats-next/);
    await expect(page.locator('.page-title')).toContainText('What\'s Next? (Part III)');
  });

  test('should display the Goethe Institut logo', async ({ page }) => {
    await page.goto('/2025/11/25/goethe-c1-preparations', { waitUntil: 'domcontentloaded' });
    
    // Check for the Goethe Institut logo in the header
    const logo = page.locator('.page-header img[alt="Goethe Institut"]');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('src', '/assets/images/goethe-institut.png');
  });

  test('should contain key preparation topics', async ({ page }) => {
    await page.goto('/2025/11/25/goethe-c1-preparations', { waitUntil: 'domcontentloaded' });
    
    const content = page.locator('.page-content');
    
    // Check for mentions of key topics
    await expect(content).toContainText('B1');
    await expect(content).toContainText('Lingster Academy');
    await expect(content).toContainText('Reading, Listening, Writing, Speaking');
    await expect(content).toContainText('grammar');
    await expect(content).toContainText('96/100'); // Writing score
    await expect(content).toContainText('85/100'); // Speaking score
    await expect(content).toContainText('67'); // Reading score
    await expect(content).toContainText('77'); // Listening score
  });

  test('should have working navigation from post back to blog', async ({ page }) => {
    await page.goto('/2025/11/25/goethe-c1-preparations', { waitUntil: 'domcontentloaded' });
    
    // Click on Blog menu item
    await page.click('.nav-menu li a:has-text("Blog")');
    
    // Verify we're back on the blog page
    await expect(page).toHaveURL(/\/blog/);
    await expect(page.locator('.page-title')).toHaveText('Thoughts ...');
  });

  test('should display comments section if enabled', async ({ page }) => {
    await page.goto('/2025/11/25/goethe-c1-preparations', { waitUntil: 'domcontentloaded' });
    
    // Check that Disqus comments section exists
    const commentsSection = page.locator('.comments-section');
    await expect(commentsSection).toBeVisible();
    
    // Check for Disqus thread div
    const disqusThread = page.locator('#disqus_thread');
    await expect(disqusThread).toBeVisible();
  });
});

