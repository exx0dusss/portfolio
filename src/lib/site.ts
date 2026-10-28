/** Site-wide identity shared by metadata, the sitemap, the OG image, and JSON-LD. */
export const SITE = {
  url: "https://tymurmustafaiev.com",
  /** JSON-LD @id of the Person, so other structured data can point at it. */
  personId: "https://tymurmustafaiev.com/#person",
  name: "Tymur Mustafaiev",
  role: "Front-End Engineer & UX/UI Designer",
  description:
    "Front-end engineer and designer in Warsaw. I design and build web products — websites, online stores and the systems behind them.",
  email: "tymurmustafaiev029@gmail.com",
  sameAs: [
    "https://github.com/exx0dusss",
    "https://linkedin.com/in/tymur-mustafaiev-968b3724b",
    "https://x.com/exx0dvs",
  ],
  /** Indexed via JSON-LD, including the long tail that isn't shown in the Stack section. */
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "TanStack",
    "Tailwind CSS",
    "Accessibility",
    "Core Web Vitals",
    "Design systems",
    "Figma",
    "UX design",
    "Node.js",
    "NestJS",
    "PostgreSQL",
    "WebSockets",
    "Docker",
    "Playwright",
    "Vitest",
    "Storybook",
    "AI SDK",
    "Agentic engineering",
    "Vue",
    "Svelte",
    "Three.js",
    "Python",
  ],
} as const;
