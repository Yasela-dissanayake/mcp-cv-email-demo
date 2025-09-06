#!/usr/bin/env sh
set -e
PORT="${PORT:-8080}"

exec npx -y supergateway \
  --stdio "node dist/index.js" \
  --outputTransport streamableHttp \
  --port "$PORT" \
  --streamableHttpPath "/mcp"
