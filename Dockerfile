# --- Build stage ---
FROM node:20-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# --- Run stage ---
FROM node:20-slim
WORKDIR /app

# runtime deps and supergateway (used via npx)
COPY package*.json ./
RUN npm ci --omit=dev && npm install supergateway@latest

# compiled app + wrapper script
COPY --from=build /app/dist ./dist
COPY run.sh ./run.sh
RUN chmod +x /app/run.sh

# sensible defaults; Railway will inject PORT
ENV PORT=8080
ENV DRY_RUN=true
ENV ALLOWED_RECIPIENTS="you@example.com"

# use the wrapper; avoids ENTRYPOINT quoting headaches
ENTRYPOINT ["/app/run.sh"]
