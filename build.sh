#!/bin/bash

docker run --rm \
  -e "SWANAGER_API_URL=$SWANAGER_API_URL" \
  -e "SWANAGER_WS_URL=$SWANAGER_WS_URL" \
  -w /app \
  -v "$PWD":/app \
  node:6.9.5 bash -c "npm install && npm run build"

docker build -t swanager-ui:latest .
