#!/bin/bash

echo "Cleaning up EVERYTHING..."
docker compose down -v
rm -rf _site .jekyll-cache .jekyll-metadata
docker volume prune -f

echo "Starting Jekyll from SCRATCH..."
docker compose up

