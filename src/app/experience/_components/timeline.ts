/** A single entry on an experience or education timeline. */
export interface TimelineEntry {
  /** Year range, shown in the left column (`.yr`). */
  year: string;
  /** Location, shown beneath the year (`.tl-where`). */
  where: string;
  /** Job title or degree (`.tl-role`). */
  role: string;
  /** Company or institution (`.tl-co`). */
  company: string;
  /** Optional descriptive paragraph (`.tl-desc`). */
  description?: string;
  /** Optional tag chips (`.proj-tags`). */
  tags?: string[];
}

/** Professional roles, newest first. */
export const ROLES: TimelineEntry[] = [
  {
    year: "2025 — 2026",
    where: "Remote",
    role: "Front-End Developer & UX/UI Designer",
    company: "Softica Tech",
    description:
      "Joined as a Junior Front-End Developer (Feb 2025), took on Lead UX/UI Designer (Mar 2025), and moved into a Middle Front-End Developer role (Feb 2026) — working across product front-end and design until May 2026.",
    tags: ["React", "Next.js", "Figma", "Design systems"],
  },
  {
    year: "2024 — now",
    where: "Remote",
    role: "Full-Stack Developer",
    company: "MyLamp",
    description:
      "Designing and building a full-stack e-commerce product for a lighting business with 20+ years in the trade — the store, landing, CRM, and a Telegram bot with a web-app.",
    tags: ["Next.js", "Node.js", "CRM", "Telegram"],
  },
  {
    year: "2024",
    where: "Warsaw, PL",
    role: "Lead Front-End Developer",
    company: "PCEXPERT",
    description: "Led front-end development for the company’s web products (Mar — Jul 2024).",
    tags: ["React", "TypeScript"],
  },
];

/** Education, newest first. */
export const EDUCATION: TimelineEntry[] = [
  {
    year: "2026 — now",
    where: "Warsaw, PL",
    role: "Master’s Degree",
    company: "Polish-Japanese Academy of Information Technologies (PJATK)",
  },
  {
    year: "2022 — 2026",
    where: "Warsaw, PL",
    role: "Bachelor’s Degree",
    company: "Polish-Japanese Academy of Information Technologies (PJATK)",
    description:
      "Worked with the university’s XR Lab on the Giga Psych research project alongside researchers from the University of Amsterdam.",
  },
];
