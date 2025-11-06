#!/bin/bash

docker compose down -v
rm -rf _site .jekyll-cache .jekyll-metadata
docker compose up

