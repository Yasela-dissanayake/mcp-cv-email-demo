import { CV } from "./data.js";

export async function answerCvQuestion(
  question: string
): Promise<{ answer: string; sources: string[] }> {
  const q = question.toLowerCase();

  if (
    q.includes("last position") ||
    q.includes("latest position") ||
    q.includes("most recent role") ||
    q.includes("last role")
  ) {
    const last = CV.work[0];
    return {
      answer: `${last.title} at ${last.company} (${last.start} – ${last.end})`,
      sources: ["cv.work[0]"],
    };
  }

  if (
    q.includes("start at eyepax") ||
    q.includes("when did i start at eyepax")
  ) {
    const job = CV.work.find((w) => w.company.toLowerCase().includes("eyepax"));
    if (job) {
      return { answer: `${job.start}`, sources: ["cv.work[Eyepax]"] };
    }
  }

  if (q.includes("which databases") || q.includes("databases have i used")) {
    const dbs = CV.skills
      .filter((s) => /sql|postgres|supabase|mysql|sqlite/i.test(s))
      .join(", ");
    return { answer: dbs || "Not specified", sources: ["cv.skills"] };
  }

  // Fallback: return a brief summary
  const names = CV.work.map((w) => `${w.title} @ ${w.company}`).join("; ");
  return {
    answer: `I can answer about roles, dates, companies, and skills. Current roles: ${names}.`,
    sources: ["cv.work", "cv.skills"],
  };
}
