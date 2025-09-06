# MCP CV + Email Server

This project implements a **Model Context Protocol (MCP) server** that can:
- Answer questions about a CV (resume) through `cv.query`
- Send emails (dry-run mode for safety) through `email.send`
- Be deployed as a live MCP service via Docker + Supergateway + Railway

---

## Live Deployment

**Public MCP URL (deployed on Railway):**  
👉 https://mcp-cv-email-demo-production.up.railway.app/mcp

This endpoint speaks **Streamable HTTP** (SSE frames).

---

## Local Development

### 1. Clone and install
```bash
git clone <your-repo-url>
cd mcp-cv-email
npm install
```

### 2. Run locally (dev mode)
```bash
npm run dev
```
This runs the MCP server via ts-node (stdio).

### 3. Run with Docker
Build the image:
```bash
docker build -t mcp-cv-email:latest .
```

Run the container:
```bash
docker run --rm -p 9090:8080   -e PORT=8080   -e DRY_RUN=true   -e ALLOWED_RECIPIENTS="you@example.com,hr@example.com"   mcp-cv-email:latest
```

The server will be available at:  
- SSE endpoint: `http://localhost:9090/sse`  
- Message POST: `http://localhost:9090/message`  
- Streamable HTTP endpoint: `http://localhost:9090/mcp`

---

## Testing with curl

All requests must send an `Accept: application/json, text/event-stream` header.

### 1. List available tools
```bash
curl -N -X POST https://mcp-cv-email-demo-production.up.railway.app/mcp   -H 'Content-Type: application/json'   -H 'Accept: application/json, text/event-stream'   -d '{"jsonrpc":"2.0","id":"1","method":"tools/list"}'
```

### 2. Query the CV
```bash
curl -N -X POST https://mcp-cv-email-demo-production.up.railway.app/mcp   -H 'Content-Type: application/json'   -H 'Accept: application/json, text/event-stream'   -d '{"jsonrpc":"2.0","id":"2","method":"tools/call","params":{"name":"cv.query","arguments":{"question":"What role did I have at my last position?"}}}'
```

### 3. Send an email (dry-run)
```bash
curl -N -X POST https://mcp-cv-email-demo-production.up.railway.app/mcp   -H 'Content-Type: application/json'   -H 'Accept: application/json, text/event-stream'   -d '{"jsonrpc":"2.0","id":"3","method":"tools/call","params":{"name":"email.send","arguments":{"recipient":"you@example.com","subject":"Hello","body":"Test"}}}'
```

---

## Environment Variables

- `PORT` → Port to listen on (Railway injects automatically). Defaults to `8080` locally.
- `DRY_RUN` → If `true`, emails are simulated only (recommended for demo).
- `ALLOWED_RECIPIENTS` → Comma-separated list of allowed email addresses.

---


### Author
**Yasela Dissanayake**  
Fullstack Developer • React & Node.js • Growing in AI & Web3  