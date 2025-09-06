import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

/**
 * Spawns your MCP stdio server using MCP_CMD/MCP_ARGS and runs the callback with a connected client.
 */
export async function withMcpClient<T>(fn: (c: Client) => Promise<T>) {
  const cmd = process.env.MCP_CMD || "node";
  const argsStr = process.env.MCP_ARGS || "dist/index.js";
  const args = argsStr.split(" ").filter(Boolean);

  // 1) Create the transport
  const transport = new StdioClientTransport({ command: cmd, args });

  // 2) Create the client with name/version (NOT with the transport)
  const client = new Client({
    name: "mcp-web-playground",
    version: "0.1.0",
  });

  // 3) Connect the client by passing the transport
  await client.connect(transport);

  try {
    return await fn(client);
  } finally {
    await client.close();
  }
}
