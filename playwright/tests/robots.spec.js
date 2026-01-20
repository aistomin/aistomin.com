const { test, expect } = require('@playwright/test');

test.describe('Robots.txt', () => {
  test('should be accessible and return 200', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
  });

  test('should have correct content type', async ({ request }) => {
    const response = await request.get('/robots.txt');
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('text/plain');
  });

  test('should allow all user agents', async ({ request }) => {
    const response = await request.get('/robots.txt');
    const content = await response.text();
    
    // Should contain User-agent: * directive
    expect(content).toContain('User-agent: *');
  });

  test('should have empty Disallow (allow everything)', async ({ request }) => {
    const response = await request.get('/robots.txt');
    const content = await response.text();
    
    // Should contain Disallow: with nothing after it (allows all)
    // This regex matches "Disallow:" followed by optional whitespace and newline
    expect(content).toMatch(/Disallow:\s*\n/);
  });

  test('should not block any paths', async ({ request }) => {
    const response = await request.get('/robots.txt');
    const content = await response.text();
    
    // Should NOT contain any Disallow with a path
    // This ensures we're not accidentally blocking anything
    const disallowWithPath = /Disallow:\s+\//;
    expect(content).not.toMatch(disallowWithPath);
  });

  test('should reference sitemap', async ({ request }) => {
    const response = await request.get('/robots.txt');
    const content = await response.text();
    
    // Should contain Sitemap directive pointing to sitemap.xml
    expect(content).toContain('Sitemap:');
    expect(content).toMatch(/Sitemap:\s*https:\/\/aistomin\.com\/sitemap\.xml/);
  });
});
