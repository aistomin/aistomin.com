# E2E Tests for aistomin.com

This directory contains end-to-end tests for the aistomin.com website using Playwright.

## Structure

```
playwright/
├── package.json           # Node.js dependencies and scripts
├── playwright.config.js   # Playwright configuration
├── tests/                 # Test files
│   └── navigation.spec.js # Navigation menu tests
└── README.md             # This file
```

## Tests

### navigation.spec.js

Tests the main navigation menu functionality:
- Verifies all menu items (Home, About, Blog, Certificates) are present in the correct order
- Tests navigation to each page by clicking menu items

## Running Tests

From the project root:

```bash
./run-e2e-tests.sh
```

Or from this directory:

```bash
npm test
```

## Configuration

The tests are configured to:
- Run against `http://0.0.0.0:4000` (configurable in `playwright.config.js`)
- Test across 3 browsers: Chromium, Firefox, and WebKit
- Generate HTML reports
- Take screenshots on failure
- Capture traces on first retry

## Adding New Tests

1. Create a new `.spec.js` file in the `tests/` directory
2. Import test and expect from `@playwright/test`
3. Write your tests following the Playwright API

Example:

```javascript
const { test, expect } = require('@playwright/test');

test('my test', async ({ page }) => {
  await page.goto('/');
  // Your test code here
});
```

## Useful Commands

```bash
# Run tests in headed mode (visible browser)
npm run test:headed

# Open Playwright UI mode for debugging
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

## Documentation

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)

