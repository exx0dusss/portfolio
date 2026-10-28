import type { TimelineEntry } from "@/app/[lang]/experience/_components/timeline";

/** Per-entry overrides for the experience timeline, matched by index to
 *  ROLES / EDUCATION. English uses the source data as is. */
type TimelineOverride = Partial<Pick<TimelineEntry, "role" | "company" | "where" | "description">>;

/** Copy for one translated page: <title>, meta description, and on-page text. */
interface PageCopy {
  title: string;
  description: string;
  heading: string;
  lead: string;
}

export interface Dictionary {
  name: string;
  meta: { title: string; description: string; role: string; location: string };
  nav: {
    role: string;
    work: string;
    experience: string;
    reading: string;
    about: string;
    resume: string;
    contact: string;
    language: string;
    theme: { label: string; system: string; light: string; dark: string };
    menu: { open: string; close: string };
    certificates: string;
  };
  footer: { certificates: string };
  hero: { title: string; scope: [string, string, string, string]; seeWork: string; resume: string };
  work: {
    label: string;
    sub: string;
    status: { live: string; development: string; research: string };
    projects: Record<string, { description: string; facets: string[]; scaleLabel?: string }>;
    /** Screenshot count label. Only English inflects; "фото" never changes. */
    photos: { one: string; other: string };
  };
  experience: {
    label: string;
    subBefore: string;
    subLink: string;
    now: string;
    roles: TimelineOverride[];
    education: TimelineOverride[];
  };
  skills: { label: string; tiers: { tier: string; items: string[] }[] };
  contact: { prompt: string; copy: string; copied: string };
  pages: {
    projects: PageCopy & { label: string };
    experience: PageCopy & { roles: string; education: string };
    certificates: PageCopy & { credentials: string; verify: string; course: string };
    reading: PageCopy & { books: string };
    about: PageCopy & {
      empty: { title: string; description: string };
      actions: { work: string; resume: string };
    };
  };
}

export const en: Dictionary = {
  name: "Tymur Mustafaiev",
  meta: {
    title: "Tymur Mustafaiev — Front-End Engineer & UX/UI Designer",
    role: "Front-End Engineer & UX/UI Designer",
    location: "Warsaw, Poland",
    description:
      "Front-end engineer and designer in Warsaw. I design and build web products — websites, online stores and the systems behind them.",
  },
  nav: {
    role: "Front-end engineer · Warsaw",
    work: "Work",
    about: "About",
    experience: "Experience",
    reading: "Reading",
    resume: "Résumé",
    contact: "Get in touch",
    language: "Language",
    theme: { label: "Theme", system: "System", light: "Light", dark: "Dark" },
    menu: { open: "Open menu", close: "Close menu" },
    certificates: "Certificates",
  },
  footer: { certificates: "Certificates" },
  hero: {
    title: "I design and build web products",
    scope: [
      "Design products customers enjoy using",
      "Build fast, reliable websites and online stores",
      "Connect payments, delivery and business systems",
      "Automate routine work with AI and chatbots",
    ],
    seeWork: "See work",
    resume: "Résumé",
  },
  work: {
    label: "Work",
    sub: "Selected projects",
    status: { live: "Live", development: "In development", research: "Research" },
    photos: { one: "photo", other: "photos" },
    projects: {
      salonsvitlo: {
        description:
          "Custom commerce platform and CRM replacing the off-the-shelf store of a lighting retailer operating since 2005.",
        facets: ["Storefront", "CRM", "API"],
        scaleLabel: "products",
      },
      "exd-downloader-app": {
        description:
          "Telegram bot that downloads videos on request. Built and run solo, and the foundation for ExdBots.",
        facets: ["Telegram bot"],
        scaleLabel: "users",
      },
      exdbots: {
        description:
          "A platform for building, connecting and monitoring Telegram bots without writing code.",
        facets: ["Web platform", "SDK"],
      },
      "kosmetik-profi": {
        description:
          "Website and admin panel for a cosmetology practice in Münster, with a bilingual price list and booking for two locations.",
        facets: ["Website", "Admin panel"],
      },
      "giga-psych": {
        description:
          "Research data platform built with PJATK's XR Lab and the University of Amsterdam.",
        facets: ["Research", "Web platform"],
      },
    },
  },
  experience: {
    label: "Experience",
    subBefore: "Full history on the",
    subLink: "Experience page",
    now: "now",
    roles: [],
    education: [],
  },
  skills: {
    label: "Skills",
    tiers: [
      {
        tier: "Every day",
        items: [
          "TypeScript, React, Next.js, TanStack",
          "Figma, design systems and tokens",
          "Accessibility and Core Web Vitals",
          "AI features and AI-assisted development",
        ],
      },
      {
        tier: "Also shipped with",
        items: [
          "Node.js, NestJS, PostgreSQL",
          "Payments, delivery and messaging integrations",
          "Docker, GitHub Actions, Cloudflare, Vercel",
          "Playwright and Vitest",
        ],
      },
    ],
  },
  contact: { prompt: "Have a role or a project in mind?", copy: "Copy", copied: "Copied" },
  pages: {
    projects: {
      title: "Projects",
      description:
        "Case studies by Tymur Mustafaiev — SalonSvitlo, a custom commerce platform; ExdDownloaderApp, a Telegram bot; ExdBots, a Telegram app platform; and Giga Psych, a research data platform.",
      heading: "Things I’ve built.",
      lead: "Products I’ve designed and built end to end — from Telegram platforms and research tooling to e-commerce. Each one has a full case study.",
      label: "Work",
    },
    experience: {
      title: "Experience",
      description:
        "Roles and education of Tymur Mustafaiev — front-end, UX/UI design, and full-stack work at Softica Tech, SalonSvitlo, Kosmetik Profi, and PCEXPERT; Master’s student at PJATK in Warsaw.",
      heading: "Where I’ve worked.",
      lead: "A history of the teams and products I’ve built with — front-end, design, and full-stack roles, mostly remote from Warsaw.",
      roles: "Roles",
      education: "Education",
    },
    certificates: {
      title: "Certificates",
      description:
        "Courses and certifications completed by Tymur Mustafaiev across front-end, back-end, and fundamentals — including Vercel’s official Next.js courses.",
      heading: "Courses & certifications.",
      lead: "Online courses I’ve completed across front-end, back-end, and the fundamentals — including the official Next.js courses from Vercel.",
      credentials: "Credentials",
      verify: "Verify",
      course: "Course",
    },
    about: {
      title: "About",
      description:
        "About Tymur Mustafaiev: a front-end engineer and UX/UI designer in Warsaw. This page is being written.",
      heading: "About me.",
      lead: "Who I am, how I work, and what I'm looking for.",
      empty: {
        title: "Working on the content",
        description:
          "This page is still being written. Meanwhile, my projects and résumé tell most of the story.",
      },
      actions: { work: "See my work", resume: "Open résumé" },
    },
    reading: {
      title: "Reading",
      description:
        "The books behind how Tymur Mustafaiev designs and builds — interface design, CSS, TypeScript, Node.js, data-intensive systems, and software architecture.",
      heading: "On my shelf.",
      lead: "The books behind how I design and build — from interfaces and CSS to Node.js, data systems, and architecture. Each links out to its source.",
      books: "Books",
    },
  },
};
