const { test, expect } = require('@playwright/test');

test.describe('About Page', () => {
  test('should navigate to about page when clicking About menu item', async ({ page }) => {
    // Start from home page
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Click on About menu item
    await page.click('.nav-menu li a:has-text("About")');
    
    // Verify we're on the about page
    await expect(page).toHaveURL(/\/about/);
    await expect(page.locator('.page-title')).toHaveText('Wandering Between Code, Chords and Schelling');
  });

  test('should display all required elements on about page', async ({ page }) => {
    // Navigate to about page
    await page.goto('/about', { waitUntil: 'domcontentloaded' });
    
    // 1. Test title exists
    const title = page.locator('.page-title');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Wandering Between Code, Chords and Schelling');
    
    // 2. Test picture exists
    const photo = page.locator('.about-photo');
    await expect(photo).toBeVisible();
    await expect(photo).toHaveAttribute('src', '/assets/images/me_young.jpg');
    await expect(photo).toHaveAttribute('alt', 'Andrej in younger years');
    
    // 3. Test text content - check first sentence
    const firstParagraph = page.locator('.page-content p').first();
    await expect(firstParagraph).toBeVisible();
    await expect(firstParagraph).toContainText('I grew up in Bishkek, Kyrgyz SSR, in a world that was rapidly changing.');
    
    // Test text content - check middle sentence (from paragraph 3)
    const middleParagraph = page.locator('.page-content p').nth(2);
    await expect(middleParagraph).toBeVisible();
    await expect(middleParagraph).toContainText('My early career was in Bishkek, building ERP systems in C# and CashIn systems that let people top up their mobile phones.');
    
    // Test text content - check last sentence (from last main paragraph)
    const lastMainParagraph = page.locator('.page-content p').nth(4);
    await expect(lastMainParagraph).toBeVisible();
    await expect(lastMainParagraph).toContainText('Whether it\'s a riff, an idea, or a system architecture, I\'m trying to understand how the parts connect, what makes something hold together, and what breaks when they don\'t.');
    
    // 4. Test social links exist
    const socialLinks = page.locator('.social-links');
    await expect(socialLinks).toBeVisible();
    
    // Verify all 6 social links are present
    const links = socialLinks.locator('a');
    await expect(links).toHaveCount(6);
  });

  test('should display correct social links', async ({ page }) => {
    // Navigate to about page
    await page.goto('/about', { waitUntil: 'domcontentloaded' });
    
    const socialLinks = page.locator('.social-links a');
    
    // Test LinkedIn link
    const linkedinLink = socialLinks.nth(0);
    await expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/andrej-istomin-51ba7530/');
    await expect(linkedinLink).toHaveAttribute('aria-label', 'LinkedIn');
    
    // Test Xing link
    const xingLink = socialLinks.nth(1);
    await expect(xingLink).toHaveAttribute('href', 'https://www.xing.com/profile/Andrei_Istomin');
    await expect(xingLink).toHaveAttribute('aria-label', 'Xing');
    
    // Test Upwork link
    const upworkLink = socialLinks.nth(2);
    await expect(upworkLink).toHaveAttribute('href', 'https://www.upwork.com/freelancers/~013da7713f9077c1db');
    await expect(upworkLink).toHaveAttribute('aria-label', 'Upwork');
    
    // Test GitHub link
    const githubLink = socialLinks.nth(3);
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/aistomin');
    await expect(githubLink).toHaveAttribute('aria-label', 'GitHub');
    
    // Test Stack Overflow link
    const stackoverflowLink = socialLinks.nth(4);
    await expect(stackoverflowLink).toHaveAttribute('href', 'http://stackoverflow.com/users/1842599');
    await expect(stackoverflowLink).toHaveAttribute('aria-label', 'Stack Overflow');
    
    // Test RSS Feed link
    const rssLink = socialLinks.nth(5);
    await expect(rssLink).toHaveAttribute('href', '/feed.xml');
    await expect(rssLink).toHaveAttribute('aria-label', 'RSS Feed');
  });

  test('should have working external links', async ({ page }) => {
    // Navigate to about page
    await page.goto('/about', { waitUntil: 'domcontentloaded' });
    
    // Test Russian-Slavic University link
    const universityLink = page.locator('a:has-text("Russian-Slavic University")');
    await expect(universityLink).toBeVisible();
    await expect(universityLink).toHaveAttribute('href', 'https://www.krsu.edu.kg/en');
    await expect(universityLink).toHaveAttribute('target', '_blank');
    await expect(universityLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Test recordings link
    const recordingsLink = page.locator('a:has-text("recordings")');
    await expect(recordingsLink).toBeVisible();
    await expect(recordingsLink).toHaveAttribute('href', 'https://andy-grails.de');
    await expect(recordingsLink).toHaveAttribute('target', '_blank');
    await expect(recordingsLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

