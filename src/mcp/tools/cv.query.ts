import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { answerCvQuestion } from "../../features/cv/qa.js";

export function cvQueryTool(server: McpServer) {
  server.registerTool(
    "cv.query",
    {
      title: "Query CV",
      description: "Answer questions about the candidate's CV (roles, dates, tech).",
      // NOTE: pass a ZodRawShape (shape object), not z.object(...)
      inputSchema: {
        question: z.string().min(3, "Provide a meaningful question"),
      },
    },
    async ({ question }) => {
      const { answer, sources } = await answerCvQuestion(question);
      return {
        content: [
          { type: "text", text: answer },
          { type: "text", text: `sources: ${sources.join(", ")}` },
        ],
      };
    }
  );
}
