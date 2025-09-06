import { z } from "zod";
import { withMcpClient } from "../_mcpClient";

export const dynamic = "force-dynamic";

const Body = z.object({
  recipient: z.string().email(),
  subject: z.string().min(1),
  body: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { recipient, subject, body } = Body.parse(json);

    const result = await withMcpClient(async (client) => {
      return client.callTool({
        name: "email.send",
        arguments: { recipient, subject, body },
      });
    });

    const text = Array.isArray((result as any).content)
      ? (result as any).content.map((c: any) => c?.text ?? "").join("\n")
      : JSON.stringify(result);

    return new Response(JSON.stringify({ status: text }), {
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
