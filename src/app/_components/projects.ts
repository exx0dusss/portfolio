export type ProjectStatus = "live" | "development" | "research";

/** Language-independent project facts. Descriptions, facets and labels live
 *  in the dictionaries (work.projects[slug]). */
export interface Project {
  slug: string;
  title: string;
  /** Start year; rendered as "2024 →" for ongoing work. */
  since?: number;
  /** Headline number, shown only where a real one exists; its label is in
   *  the dictionary. */
  scale?: string;
  status: ProjectStatus;
  /** Case studies are English-only, so this is never locale-prefixed. */
  href: string;
  /** The project site's own icon, shown before the title (square, under /public). */
  favicon?: string;
  /** How many screenshots the case study shows; omitted until it has real ones. */
  photos?: number;
}

/** Work section content, most significant first. */
export const PROJECTS: Project[] = [
  {
    slug: "salonsvitlo",
    title: "SalonSvitlo",
    since: 2024,
    scale: "20K+",
    status: "development",
    href: "/projects/salonsvitlo",
  },
  {
    slug: "exd-downloader-app",
    title: "ExdDownloaderApp",
    since: 2023,
    scale: "90K+",
    status: "live",
    href: "/projects/exd-downloader-app",
  },
  {
    slug: "exdbots",
    title: "ExdBots",
    since: 2026,
    status: "development",
    href: "/projects/exdbots",
  },
  {
    slug: "kosmetik-profi",
    title: "Kosmetik Profi",
    since: 2024,
    status: "live",
    href: "/projects/kosmetik-profi",
    favicon: "/projects/kosmetik-profi/favicon.png",
    photos: 5,
  },
  {
    slug: "giga-psych",
    title: "Giga Psych",
    status: "research",
    href: "/projects/giga-psych",
  },
];
