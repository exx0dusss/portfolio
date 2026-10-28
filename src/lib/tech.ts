import {
  type SimpleIcon,
  siCoolify,
  siCss,
  siDocker,
  siGooglemaps,
  siHandlebarsdotjs,
  siHtml5,
  siJsonwebtokens,
  siNestjs,
  siNextdotjs,
  siOvh,
  siReact,
  siSpring,
  siSqlite,
  siThymeleaf,
  siTypeorm,
  siUdemy,
} from "simple-icons";

import previews from "./link-previews.json";
import links from "./tech-links.json";

export type TechId = keyof typeof links;

/** Everything the site knows about a technology or service: where it lives,
 *  its logo, and the link-preview snapshot from `pnpm links:previews`. */
export interface Tech {
  id: TechId;
  name: string;
  href: string;
  /** 24×24 Simple Icons path, painted in currentColor so all logos match. */
  iconPath?: string;
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
};

export function getTech(id: TechId): Tech {
  const link = links[id];
  return {
    id,
    name: link.name,
    href: link.href,
    iconPath: ICONS[id]?.path,
    preview: (previews as Record<string, Tech["preview"]>)[id] ?? {
      site: new URL(link.href).hostname.replace(/^www\./, ""),
    },
  };
}
