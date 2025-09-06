import type { CvDoc } from "../../types/cv.js";

// Minimal CV seed (updated with your real data)
export const CV: CvDoc = {
  basics: {
    name: "Yasela Dissanayake",
    email: "yasela2014@gmail.com",
    website: "https://github.com/Yasela-dissanayake",
  },
  work: [
    {
      title: "Fullstack Web Developer",
      company: "Visual Science UK Ltd",
      location: "Leeds, UK",
      start: "2023-05",
      end: "2025-07",
      summary:
        "Contributed to production websites with a focus on SEO, mobile-first design, and performance.",
    },
    {
      title: "Frontend Developer",
      company: "SprintCode Labs",
      location: "Sri Lanka",
      start: "2023-09",
      end: "2024-04",
      summary:
        "Built responsive React/TypeScript interfaces and integrated APIs with backend teams.",
    },
  ],
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express.js",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
    "Git",
    "GitHub",
  ],
};
