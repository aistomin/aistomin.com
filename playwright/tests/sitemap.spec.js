const { test, expect } = require('@playwright/test');

// Helper to escape special regex characters in a string
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

test.describe('Sitemap.xml', () => {
    test('should be accessible and return 200', async ({ request }) => {
        const response = await request.get('/sitemap.xml');
        expect(response.status()).toBe(200);
    });

    test('should have correct content type', async ({ request }) => {
        const response = await request.get('/sitemap.xml');
        const contentType = response.headers()['content-type'];
        expect(contentType).toMatch(/xml/);
    });

    test('should be valid XML with urlset root element', async ({ request }) => {
        const response = await request.get('/sitemap.xml');
        const content = await response.text();

        // Should start with XML declaration
        expect(content).toMatch(/^<\?xml version="1\.0"/);

        // Should contain urlset element with sitemap namespace
        expect(content).toContain('<urlset');
        expect(content).toContain('http://www.sitemaps.org/schemas/sitemap/0.9');
    });

    test('should contain home page URL', async ({ request, baseURL }) => {
        const response = await request.get('/sitemap.xml');
        const content = await response.text();

        // Should contain the home page (check for baseURL with trailing slash)
        expect(content).toContain(`<loc>${baseURL}/</loc>`);
    });

    test('should contain main pages', async ({ request, baseURL }) => {
        const response = await request.get('/sitemap.xml');
        const content = await response.text();

        // Should contain About page
        expect(content).toContain(`${baseURL}/about`);

        // Should contain Blog page
        expect(content).toContain(`${baseURL}/blog`);

        // Should contain Certificates page
        expect(content).toContain(`${baseURL}/certificates`);
    });

    test('should contain blog posts', async ({ request, baseURL }) => {
        const response = await request.get('/sitemap.xml');
        const content = await response.text();

        // Should contain at least one blog post URL pattern
        // Blog posts follow the pattern /YYYY/MM/DD/slug.html
        // Escape the baseURL for regex usage
        const escapedBaseURL = escapeRegex(baseURL);
        const blogPostPattern = new RegExp(`<loc>${escapedBaseURL}/\\d{4}/\\d{2}/\\d{2}/[\\w-]+\\.html</loc>`);
        expect(content).toMatch(blogPostPattern);
    });

    test('should have lastmod dates for entries', async ({ request }) => {
        const response = await request.get('/sitemap.xml');
        const content = await response.text();

        // Should contain lastmod elements with ISO date format
        expect(content).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}/);
    });

    test('should have multiple URL entries', async ({ request }) => {
        const response = await request.get('/sitemap.xml');
        const content = await response.text();

        // Count <url> elements - should have at least 5 (home, about, blog, certificates, and at least one post)
        const urlMatches = content.match(/<url>/g);
        expect(urlMatches).not.toBeNull();
        expect(urlMatches.length).toBeGreaterThanOrEqual(5);
    });

    test('should not contain node_modules paths', async ({ request }) => {
        const response = await request.get('/sitemap.xml');
        const content = await response.text();

        // Should NOT contain any node_modules paths
        expect(content).not.toContain('node_modules');
    });

    test('should not contain playwright paths', async ({ request }) => {
        const response = await request.get('/sitemap.xml');
        const content = await response.text();

        // Should NOT contain any playwright test paths
        expect(content).not.toContain('/playwright/');
    });
});
