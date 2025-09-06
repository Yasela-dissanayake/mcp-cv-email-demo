export interface CvDoc {
  basics: { name: string; email: string; website?: string };
  work: Array<{
    title: string;
    company: string;
    location?: string;
    start: string; // YYYY-MM
    end: string; // YYYY-MM | Present
    summary?: string;
  }>;
  skills: string[];
}
