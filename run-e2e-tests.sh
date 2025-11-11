#!/bin/bash

set -e

echo "========================================="
echo "Setting up E2E tests for aistomin.com"
echo "========================================="

# Navigate to the playwright directory
cd playwright

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo ""
    echo "Installing Playwright dependencies..."
    npm install
    echo ""
    echo "Installing Playwright browsers..."
    npx playwright install --with-deps
fi

# Check if the website is running
echo ""
echo "Checking if the website is running at http://0.0.0.0:4000..."
if ! curl -s http://0.0.0.0:4000 > /dev/null 2>&1; then
    echo ""
    echo "⚠️  ERROR: Website is not running at http://0.0.0.0:4000"
    echo ""
    echo "Please start the website first by running:"
    echo "  ./start.sh"
    echo ""
    echo "Then run the E2E tests again with:"
    echo "  ./run-e2e-tests.sh"
    echo ""
    exit 1
fi

echo "✓ Website is running!"

# Run the tests
echo ""
echo "========================================="
echo "Running E2E tests..."
echo "========================================="
echo ""

npm test

echo ""
echo "========================================="
echo "E2E tests completed!"
echo "========================================="
echo ""
echo "To view the test report, run:"
echo "  npx playwright show-report"
echo ""

