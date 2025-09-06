import { z } from "zod";
import { withMcpClient } from "../_mcpClient";

export const dynamic = "force-dynamic";

const Body = z.object({ question: z.string().min(3) });

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { question } = Body.parse(json);

    const result = await withMcpClient(async (client) => {
      return client.callTool({
        name: "cv.query",
        arguments: { question },
      });
    });

    // Extract plain text from content blocks
    const text = Array.isArray((result as any).content)
      ? (result as any).content.map((c: any) => c?.text ?? "").join("\n")
      : JSON.stringify(result);

    return new Response(JSON.stringify({ answer: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || String(err) }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
