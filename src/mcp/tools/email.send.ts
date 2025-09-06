import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

function isAllowed(recipient: string) {
  const allow = (process.env.ALLOWED_RECIPIENTS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return allow.length === 0 || allow.includes(recipient.toLowerCase());
}

export function emailSendTool(server: McpServer) {
  server.registerTool(
    "email.send",
    {
      title: "Send Email",
      description:
        "Send an email (recipient, subject, body). Dry-run by default.",
      inputSchema: {
        recipient: z.string().email(),
        subject: z.string().min(1),
        body: z.string().min(1),
      },
    },
    async ({ recipient, subject, body }) => {
      if (!isAllowed(recipient)) {
        return {
          content: [
            { type: "text", text: "blocked: recipient not in allowlist" },
          ],
        };
      }

      const dryRun = (process.env.DRY_RUN || "true").toLowerCase() === "true";
      if (dryRun) {
        return {
          content: [
            { type: "text", text: "queued (dry-run)" },
            { type: "text", text: `id=dry_${Date.now()}` },
            { type: "text", text: `to=${recipient}` },
            { type: "text", text: `subject=${subject}` },
          ],
        };
      }

      // TODO: plug real provider (SMTP/Resend/SendGrid)
      return {
        content: [{ type: "text", text: "error: provider not configured" }],
      };
    }
  );
}
