import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

import { PROJECTS } from "./_components/projects";

const PAGES = ["", "/projects", "/experience", "/certificates", "/reading", "/resume"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((path) => ({
      url: `${SITE.url}${path}`,
      priority: path === "" ? 1 : 0.7,
    })),
    ...PROJECTS.map((project) => ({
      url: `${SITE.url}${project.href}`,
      priority: 0.8,
    })),
  ];
}
