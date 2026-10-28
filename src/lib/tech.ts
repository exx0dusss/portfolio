import {
  type SimpleIcon,
  siBaseui,
  siCloudflare,
  siCoolify,
  siCss,
  siDocker,
  siGithub,
  siGooglemaps,
  siHandlebarsdotjs,
  siHtml5,
  siJsonwebtokens,
  siNestjs,
  siNextdotjs,
  siOvh,
  siPhosphoricons,
  siReact,
  siShadcnui,
  siSimpleicons,
  siSpring,
  siSqlite,
  siTailwindcss,
  siThymeleaf,
  siTypeorm,
  siTypescript,
  siUdemy,
  siVercel,
} from "simple-icons";

import previews from "./link-previews.json";
import logos from "./tech-logos.json";
import marks from "./tech-marks.json";
import links from "./tech-links.json";

export type TechId = keyof typeof links;

/** An SVG mark: its viewBox and inner markup, drawn in currentColor. */
export interface TechMark {
  viewBox: string;
  body: string;
}

/** Everything the site knows about a technology or service: where it lives,
 *  its logo, and the link-preview snapshot from `pnpm links:previews`. */
export interface Tech {
  id: TechId;
  name: string;
  href: string;
  /** The brand's one-colour mark, painted in currentColor so all logos
   *  match: a Simple Icons path, or the brand's own mark from
   *  `pnpm tech:logos` where Simple Icons has none. */
  mark?: TechMark;
  /** The logo in its own colours (light and dark-background versions), from
   *  `pnpm tech:logos`; absent for black-and-white brands. */
  logo?: { light: string; dark?: string };
  preview: { title?: string; description?: string; site: string; image?: string };
}

const ICONS: Partial<Record<TechId, SimpleIcon>> = {
  nestjs: siNestjs,
  handlebars: siHandlebarsdotjs,
  sqlite: siSqlite,
  typeorm: siTypeorm,
  docker: siDocker,
  coolify: siCoolify,
  ovhcloud: siOvh,
  jwt: siJsonwebtokens,
  "google-maps": siGooglemaps,
  react: siReact,
  nextjs: siNextdotjs,
  udemy: siUdemy,
  spring: siSpring,
  thymeleaf: siThymeleaf,
  html: siHtml5,
  "css-subgrid": siCss,
  typescript: siTypescript,
  tailwind: siTailwindcss,
  shadcn: siShadcnui,
  "base-ui": siBaseui,
  phosphor: siPhosphoricons,
  "simple-icons": siSimpleicons,
  vercel: siVercel,
  cloudflare: siCloudflare,
  github: siGithub,
};

function markOf(id: TechId): TechMark | undefined {
  const icon = ICONS[id];
  if (icon) return { viewBox: "0 0 24 24", body: `<path d="${icon.path}"/>` };
  return (marks as Partial<Record<TechId, TechMark>>)[id];
}

export function getTech(id: TechId): Tech {
  const link = links[id];
  return {
    id,
    name: link.name,
    href: link.href,
    mark: markOf(id),
    logo: (logos as Partial<Record<TechId, Tech["logo"]>>)[id],
    preview: (previews as Record<string, Tech["preview"]>)[id] ?? {
      site: new URL(link.href).hostname.replace(/^www\./, ""),
    },
  };
}
