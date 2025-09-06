# --- Build stage ---
FROM node:20-slim AS build
WORKDIR /app

# install deps (needs package-lock.json present!)
COPY package*.json ./
RUN npm ci

# copy sources and build
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# --- Run stage: expose MCP via Supergateway (HTTP/SSE/WS) ---
FROM node:20-slim
WORKDIR /app

# Install runtime deps (NO dev deps)
COPY package*.json ./
RUN npm ci --omit=dev

# Install supergateway locally so it's available in PATH via npx
RUN npm install supergateway@latest

# Bring in compiled JS
COPY --from=build /app/dist ./dist

# Env defaults (Railway will inject PORT)
ENV PORT=8080
ENV DRY_RUN=true
ENV ALLOWED_RECIPIENTS="you@example.com"

# Start: supergateway wraps your stdio MCP server and listens on $PORT
CMD ["npx", "supergateway", "--port", "8080", "--stdio-cmd", "node dist/index.js", "--stdio"]
