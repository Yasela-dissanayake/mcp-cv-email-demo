"use client";
import { useState } from "react";

export default function Page() {
  const [question, setQuestion] = useState(
    "What role did I have at my last position?"
  );
  const [answer, setAnswer] = useState<string>("");
  const [loadingQ, setLoadingQ] = useState(false);

  const [recipient, setRecipient] = useState("yasela2014@gmail.com");
  const [subject, setSubject] = useState("Hello");
  const [body, setBody] = useState("This is a test.");
  const [emailResp, setEmailResp] = useState("");
  const [loadingE, setLoadingE] = useState(false);

  async function runQuery() {
    setLoadingQ(true);
    setAnswer("");
    try {
      const res = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer || JSON.stringify(data));
    } catch (e: any) {
      setAnswer("Error: " + e?.message);
    } finally {
      setLoadingQ(false);
    }
  }

  async function sendEmail() {
    setLoadingE(true);
    setEmailResp("");
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipient, subject, body }),
      });
      const data = await res.json();
      setEmailResp(data.status || JSON.stringify(data));
    } catch (e: any) {
      setEmailResp("Error: " + e?.message);
    } finally {
      setLoadingE(false);
    }
  }

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>MCP Playground</h1>

      <section
        style={{
          padding: 16,
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          marginBottom: 24,
        }}
      >
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>CV Q&A (cv.query)</h2>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about your CV"
            style={{
              flex: 1,
              padding: 8,
              border: "1px solid #d1d5db",
              borderRadius: 8,
            }}
          />
          <button
            onClick={runQuery}
            disabled={loadingQ}
            style={{ padding: "8px 12px", borderRadius: 8 }}
          >
            {loadingQ ? "Running…" : "Ask"}
          </button>
        </div>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            background: "#f9fafb",
            padding: 12,
            borderRadius: 8,
          }}
        >
          {answer}
        </pre>
      </section>

      <section
        style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 12 }}
      >
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>
          Send Email (email.send)
        </h2>
        <div style={{ display: "grid", gap: 8 }}>
          <input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="recipient"
            style={{ padding: 8, border: "1px solid #d1d5db", borderRadius: 8 }}
          />
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="subject"
            style={{ padding: 8, border: "1px solid #d1d5db", borderRadius: 8 }}
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="body"
            rows={5}
            style={{ padding: 8, border: "1px solid #d1d5db", borderRadius: 8 }}
          />
          <button
            onClick={sendEmail}
            disabled={loadingE}
            style={{ padding: "8px 12px", borderRadius: 8 }}
          >
            {loadingE ? "Sending…" : "Send"}
          </button>
        </div>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            background: "#f9fafb",
            padding: 12,
            borderRadius: 8,
            marginTop: 8,
          }}
        >
          {emailResp}
        </pre>
      </section>
    </main>
  );
}
