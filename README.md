# aistomin.com

[![CI/CD](https://github.com/aistomin/aistomin.com/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/aistomin/aistomin.com/actions/workflows/ci-cd.yml)

Andrej Istomin's personal website, built with Jekyll. Visit at https://aistomin.com

## About

This is where I write about things that interest me - mostly technology, innovation, and the occasional random thought. Sometimes I post about my work and projects too.

## Local Development

### Recommended: Docker Setup

#### Prerequisites

- Docker Engine 18.06.0+ (includes Docker Compose)

#### Setup

1. Clone the repository:

   ```bash
   git clone git@github.com:aistomin/aistomin.com.git
   cd aistomin.com
   ```

2. Start the development server:

   ```bash
   ./start.sh
   ```

3. Open your browser and navigate to `http://localhost:4000`

The site will automatically rebuild when you make changes to the source files, and live reload is enabled!

**Note:** The `start.sh` script rebuilds the Docker image from scratch to ensure you always have the latest changes with no caching issues.

### Alternative: Traditional Ruby Setup

#### Prerequisites

- Ruby 2.7 or newer
- Bundler gem

#### Setup

1. Clone the repository:

   ```bash
   git clone git@github.com:aistomin/aistomin.com.git
   cd aistomin.com
   ```

2. Install dependencies:

   ```bash
   bundle install
   ```

3. Start the development server:

   ```bash
   bundle exec jekyll serve
   ```

4. Open your browser and navigate to `http://localhost:4000`

The site will automatically rebuild when you make changes to the source files.

## End-to-End Testing

This project includes automated end-to-end tests using [Playwright](https://playwright.dev/).

### Prerequisites

- Node.js 18+ and npm
- The website must be running (see Local Development section above)

### Running E2E Tests

1. Start the development server in a separate terminal:

   ```bash
   ./start.sh
   ```

2. Run the E2E tests:

   ```bash
   ./run-e2e-tests.sh
   ```

The script will:

- Install Playwright dependencies if needed (first run only)
- Check if the website is running at `http://0.0.0.0:4000`
- Run all E2E tests across multiple browsers (Chromium, Firefox, WebKit)
- Generate an HTML report

### Viewing Test Results

After running the tests, you can view the detailed HTML report:

```bash
cd playwright
npx playwright show-report
```

### Additional Test Commands

From the `playwright` directory, you can run:

```bash
# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment.

### How It Works

**On every push/PR to any branch:**

- Build Jekyll site
- Run Playwright e2e tests
- Upload test reports (available in Actions tab)

**On push to `master` branch (only if tests pass):**

- Deploy to GitHub Pages at https://aistomin.com

**If tests fail:**

- Deployment is blocked
- Check the Actions tab for test reports

### Production Monitoring

A separate workflow runs e2e tests against the live production site (https://aistomin.com):

- Runs **every hour** automatically
- Can be triggered manually from Actions tab
- Verifies the site is working correctly in production
- Uploads test reports (retained for 7 days)

This helps catch any issues that might only appear in production.

## How to Contribute

We welcome contributions! Please follow these steps:

### 1. Fork and Clone

```bash
git clone git@github.com:YOUR_USERNAME/aistomin.com.git
cd aistomin.com
```

### 2. Create a Branch

```bash
git checkout -b your-feature-branch
```

### 3. Make Your Changes

Edit the files as needed. The site uses Jekyll, so:

- Content pages are in the root (`.markdown` files)
- Layouts are in `_layouts/`
- Styles are in `_sass/` and `assets/css/`
- Blog posts go in `_posts/`

### 4. Test Your Changes Locally

Start the development server to preview your changes:

```bash
./start.sh
```

Then visit `http://localhost:4000` in your browser.

### 5. Run Tests Before Committing

**Important:** Always run tests before committing:

```bash
./test-before-commit.sh
```

This script will:

- Stop any running containers
- Start a fresh instance
- Run all e2e tests
- Show results
- Clean up and stop containers

Only commit if all tests pass.

### 6. Commit and Push

```bash
git add .
git commit -m "Your descriptive commit message"
git push origin your-feature-branch
```

### 7. Create a Pull Request

Go to GitHub and create a pull request from your branch. The CI/CD pipeline will automatically:

- Build the site
- Run e2e tests
- Report results

Your PR can only be merged if all tests pass.

### Additional Scripts

- `./start.sh` - Start the development server
- `./stop.sh` - Stop the development server
- `./run-e2e-tests.sh` - Run tests against a running server
- `./test-before-commit.sh` - Full test cycle (recommended before committing)

## Built With

- [Jekyll](https://jekyllrb.com/) - Static site generator
- [Bundler](https://bundler.io/) - Dependency management
- [Playwright](https://playwright.dev/) - End-to-end testing
- [GitHub Actions](https://github.com/features/actions) - CI/CD
