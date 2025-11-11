# aistomin.com

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

## Built With

- [Jekyll](https://jekyllrb.com/) - Static site generator
- [Bundler](https://bundler.io/) - Dependency management
- [Playwright](https://playwright.dev/) - End-to-end testing framework
