import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { cvQueryTool } from "./tools/cv.query.js";
import { emailSendTool } from "./tools/email.send.js";

export async function startMcpServer() {
  const server = new McpServer({ name: "mcp-cv-email", version: "0.1.0" });

  // register tools
  cvQueryTool(server);
  emailSendTool(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  return server;
}
