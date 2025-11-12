#!/bin/bash

set -e

echo "========================================="
echo "Pre-commit Test Runner"
echo "========================================="
echo ""

# Stop any running containers
echo "Stopping any running containers..."
docker compose down -v 2>/dev/null || true

# Clean build artifacts
echo "Cleaning build artifacts..."
rm -rf _site .jekyll-cache .jekyll-metadata

# Start the site in background
echo "Starting the website..."
docker compose up -d

# Wait for the site to be ready
echo "Waiting for website to start..."
sleep 5

MAX_RETRIES=20
RETRY_COUNT=0
while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -s http://0.0.0.0:4000 > /dev/null 2>&1; then
        echo "✓ Website is running!"
        break
    fi
    RETRY_COUNT=$((RETRY_COUNT + 1))
    if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
        echo "✗ ERROR: Website failed to start"
        docker compose down -v
        exit 1
    fi
    echo "  Waiting... ($RETRY_COUNT/$MAX_RETRIES)"
    sleep 3
done

echo ""
echo "========================================="
echo "Running E2E tests..."
echo "========================================="
echo ""

# Run the tests
cd playwright

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing Playwright dependencies..."
    npm install
    npx playwright install --with-deps chromium
fi

# Run tests and capture exit code
TEST_EXIT_CODE=0
npm test || TEST_EXIT_CODE=$?

cd ..

echo ""
echo "========================================="

if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo "✓ All tests passed!"
    echo "========================================="
    echo ""
    echo "Your changes are ready to commit."
else
    echo "✗ Tests failed!"
    echo "========================================="
    echo ""
    echo "Please fix the failing tests before committing."
fi

echo ""
echo "Stopping the website..."
docker compose down -v

echo ""
echo "Done!"

exit $TEST_EXIT_CODE

