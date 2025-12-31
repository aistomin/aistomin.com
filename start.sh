#!/bin/bash

docker compose down -v
rm -rf _site .jekyll-cache .jekyll-metadata

if [ "$1" = "-d" ] || [ "$1" = "--background" ]; then
    docker compose up -d
else
    docker compose up
fi
