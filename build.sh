#!/bin/bash

docker run --rm -w /app -v "$PWD":/app -e NODE_ENV=production node:6.9.5 bash -c "npm install && npm run build"

docker build -t swanager-ui:latest .
