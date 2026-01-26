const { test, expect } = require('@playwright/test');

test.describe('Home Page', () => {
  test('should display home page when landing on the website', async ({ page }) => {
    // Navigate to root URL
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Verify we're on the home page
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('.hero h1')).toHaveText('Andrej Istomin');
    await expect(page).toHaveTitle('Engineer, Musician & Philosopher - Andrej Istomin');
  });

  test('should display all required elements on home page', async ({ page }) => {
    // Navigate to home page
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // 1. Test page title and header both exist
    const header = page.locator('.hero h1');
    await expect(header).toBeVisible();
    await expect(header).toHaveText('Andrej Istomin');
    await expect(page).toHaveTitle('Engineer, Musician & Philosopher - Andrej Istomin');
    
    // 2. Test subheader exists
    const subheader = page.locator('.hero .subtitle');
    await expect(subheader).toBeVisible();
    await expect(subheader).toHaveText('Software Engineer, Musician & Wandering Philosopher');
    
    // 3. Test picture exists
    const photo = page.locator('.hero-photo');
    await expect(photo).toBeVisible();
    await expect(photo).toHaveAttribute('src', '/assets/images/profile.jpg');
    await expect(photo).toHaveAttribute('alt', 'Andrej Istomin');
    
    // 4. Test text content
    const description = page.locator('.hero-description');
    await expect(description).toBeVisible();
    await expect(description).toContainText('Welcome. This space is where I keep traces of my work and thoughts — nothing polished, just real.');
    await expect(description).toContainText('That\'s how I approach engineering too: systems that last, code that makes sense, and projects that deliver for the customer.');
    
    // 5. Test social media links section exists
    const socialLinks = page.locator('.hero-contact .social-links');
    await expect(socialLinks).toBeVisible();
    
    // Verify "Follow me:" text
    const followText = page.locator('.hero-contact p');
    await expect(followText).toContainText('Follow me:');
    
    // Verify all 6 social links are present
    const links = socialLinks.locator('a');
    await expect(links).toHaveCount(6);
  });

  test('should display correct social media links', async ({ page }) => {
    // Navigate to home page
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    const socialLinks = page.locator('.hero-contact .social-links a');
    
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

  test('should navigate from Home to About and back to Home', async ({ page }) => {
    // Start on home page
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Verify we're on home page by checking for text from the middle
    await expect(page.locator('.hero-description')).toContainText('systems that last, code that makes sense');
    
    // Click on About menu item
    await page.click('.nav-menu li a:has-text("About")');
    
    // Verify we're on the about page
    await expect(page).toHaveURL(/\/about/);
    
    // Check for text from the middle of About page
    const aboutContent = page.locator('.page-content');
    await expect(aboutContent).toContainText('My early career was in Bishkek, building ERP systems in C# and CashIn systems');
    
    // Click Home menu item
    await page.click('.nav-menu li a:has-text("Home")');
    
    // Verify we're back on home page
    await expect(page).toHaveURL(/\/$/);
    
    // Check for text from the middle of home page
    await expect(page.locator('.hero-description')).toContainText('systems that last, code that makes sense');
  });

  test('should have active class on Home menu item', async ({ page }) => {
    // Navigate to home page
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Check that Home menu item has active class
    const homeMenuItem = page.locator('.nav-menu li a:has-text("Home")');
    await expect(homeMenuItem).toHaveClass(/active/);
  });

  test('should display logo with correct text on landing', async ({ page }) => {
    // Navigate to home page
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Check that logo is visible
    const logo = page.locator('.site-title');
    await expect(logo).toBeVisible();
    
    // Check that logo displays correct text
    await expect(logo).toHaveText('Andrej Istomin');
    
    // Check that logo links to home
    await expect(logo).toHaveAttribute('href', '/');
  });

  test('should navigate from About page to Home page via logo click', async ({ page }) => {
    // Start on home page
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Navigate to About page
    await page.click('.nav-menu li a:has-text("About")');
    
    // Verify we're on About page
    await expect(page).toHaveURL(/\/about/);
    
    // Verify About page text is visible (text from the middle)
    const aboutContent = page.locator('.page-content');
    await expect(aboutContent).toContainText('My early career was in Bishkek, building ERP systems in C# and CashIn systems');
    
    // Click on logo
    const logo = page.locator('.site-title');
    await logo.click();
    
    // Verify we're back on home page
    await expect(page).toHaveURL(/\/$/);
    
    // Verify Home page text is visible
    await expect(page.locator('.hero-description')).toContainText('systems that last, code that makes sense');
  });
});

