#!/bin/bash

set -e

echo "========================================="
echo "Pre-commit Test Runner"
echo "========================================="
echo ""

# Start the site in background (also cleans up any running containers)
echo "Starting the website..."
./start.sh -d

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
        ./stop.sh
        exit 1
    fi
    echo "  Waiting... ($RETRY_COUNT/$MAX_RETRIES)"
    sleep 3
done

echo ""

# Run the E2E tests (captures exit code internally)
TEST_EXIT_CODE=0
./run-e2e-tests.sh || TEST_EXIT_CODE=$?

echo ""

if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo "Your changes are ready to commit."
else
    echo "Please fix the failing tests before committing."
fi

echo ""
./stop.sh

exit $TEST_EXIT_CODE
