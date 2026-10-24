export type ProjectStatus = "live" | "development" | "research";

export interface Project {
  slug: string;
  title: string;
  description: string;
  /** Short facets shown in the mono meta line, e.g. "Storefront", "CRM". */
  facets: string[];
  /** Start year; rendered as "2024 →" for ongoing work. */
  since?: number;
  /** Headline number, shown only where a real one exists. */
  scale?: { value: string; label: string };
  status: ProjectStatus;
  href: string;
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "Live",
  development: "In development",
  research: "Research",
};

/** Work section content, most significant first. */
export const PROJECTS: Project[] = [
  {
    slug: "salonsvitlo",
    title: "SalonSvitlo",
    description:
      "Custom commerce platform and CRM replacing the off-the-shelf store of a lighting retailer operating since 2005.",
    facets: ["Storefront", "CRM", "API"],
    since: 2024,
    scale: { value: "20K+", label: "products" },
    status: "development",
    href: "/projects/salonsvitlo",
  },
  {
    slug: "exd-downloader-app",
    title: "ExdDownloaderApp",
    description:
      "Telegram bot that downloads videos on request. Built and run solo, and the foundation for ExdBots.",
    facets: ["Telegram bot"],
    since: 2023,
    scale: { value: "90K+", label: "users" },
    status: "live",
    href: "/projects/exd-downloader-app",
  },
  {
    slug: "exdbots",
    title: "ExdBots",
    description:
      "A platform for building, connecting and monitoring Telegram bots without writing code.",
    facets: ["Web platform", "SDK"],
    since: 2026,
    status: "development",
    href: "/projects/exdbots",
  },
  {
    slug: "giga-psych",
    title: "Giga Psych",
    description:
      "Research data platform built with PJATK's XR Lab and the University of Amsterdam.",
    facets: ["Research", "Web platform"],
    status: "research",
    href: "/projects/giga-psych",
  },
];
