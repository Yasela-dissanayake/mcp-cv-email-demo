# mcp-cv-email (Step 1)


## Install
```bash
npm i
```


> If starting from an empty folder, run:
> ```bash
> npm init -y
> npm i @modelcontextprotocol/sdk zod pino
> npm i -D typescript ts-node nodemon @types/node
> ```


## Configure
Copy `.env.example` to `.env` and adjust values if needed.


## Run (dev)
```bash
npm run dev
```
The server speaks **MCP over stdio**. Connect from an MCP-compatible client or test via your chosen MCP runner.


## Tools
- `cv.query({ question })` → returns `{ answer, sources }`
- `email.send({ recipient, subject, body })` → returns `{ status, id?, provider?, reason? }` (dry-run)


## Next steps
- Step 2: Parse real CV (PDF/Markdown → JSON) and expand Q&A.
- Step 3: Plug a real email provider with safe defaults + retries.
- Step 4: Add basic tests and a healthcheck.# mcp-cv-email-demo
