// Saves the logos the tech links use (src/components/tech-link.tsx); the site
// never calls these hosts at runtime. Re-run after adding a tech:
//   pnpm tech:logos
//
// 1. Colour logos, shown when a chip is hovered: from svgl (svgl.app, open
//    source; light and dark versions where it has both), Devicon where svgl
//    only has a wordmark, the brand's own file where neither has it, or a
//    brand's Simple Icons shape in its one colour. A brand that only
//    publishes a raster logo keeps it as is, in scripts/tech-logos/.
//    Chips show icons, not wordmarks: a logo much wider than tall is flagged
//    unless it's known to be the icon (WIDE_ICONS). Logos with no colour of
//    their own (black and white marks) are skipped: the grey mark already is
//    their look. Files in public/tech-logos/ (shown with <img>, so their
//    markup never runs), map in src/lib/tech-logos.json.
// 2. Grey marks for brands Simple Icons doesn't have: taken from the brand's
//    own favicon, mask icon or logo, background dropped, parsed against a
//    drawing allowlist and recoloured to currentColor; or, for a brand that
//    only publishes a raster logo, an SVG traced from it, kept in
//    scripts/tech-marks/. Map in src/lib/tech-marks.json.
import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import * as icons from "simple-icons";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "src/lib/tech-logos.json");
const MARKS_OUT = path.join(ROOT, "src/lib/tech-marks.json");
const DIR = path.join(ROOT, "public/tech-logos");

/** Tech id -> its svgl title, or a Simple Icons export for one-colour logos. */
const SOURCES = {
  nestjs: { svgl: "NestJS" },
  typeorm: { svgl: "TypeORM" },
  // svgl's SQLite is the wordmark; Devicon's is the feather alone
  sqlite: { devicon: "sqlite" },
  jwt: { svgl: "JWT" },
  docker: { svgl: "Docker" },
  coolify: { simpleIcon: "siCoolify" },
  nextjs: { svgl: "Next.js" },
  react: { svgl: "React" },
  "claude-code": { simpleIcon: "siClaude" },
  "telegram-api": { svgl: "Telegram" },
  javascript: { svgl: "JavaScript" },
  java: { svgl: "Java" },
  typescript: { svgl: "TypeScript" },
  tailwind: { svgl: "Tailwind CSS" },
  shadcn: { svgl: "shadcn/ui" },
  "base-ui": { svgl: "Base UI" },
  vercel: { svgl: "Vercel" },
  cloudflare: { svgl: "Cloudflare" },
  github: { svgl: "GitHub" },
  // grammY's own "Y" (gradient), not on svgl
  grammy: { url: "https://grammy.dev/images/Y.svg" },
  deno: { svgl: "Deno" },
  hono: { svgl: "Hono" },
  trpc: { svgl: "tRPC" },
  drizzle: { svgl: "Drizzle ORM" },
  postgresql: { svgl: "PostgreSQL" },
  redis: { svgl: "Redis" },
  vite: { svgl: "Vite" },
  sentry: { simpleIcon: "siSentry" },
  ffmpeg: { simpleIcon: "siFfmpeg" },
  "telegram-mini-apps": { svgl: "Telegram" },
  "telegram-bot-api": { svgl: "Telegram" },
  "tanstack-query": { svgl: "TanStack" },
  "tanstack-start": { svgl: "TanStack" },
  zod: { svgl: "Zod" },
  storybook: { svgl: "Storybook" },
  bun: { svgl: "Bun" },
  liquibase: { simpleIcon: "siLiquibase" },
  cursor: { svgl: "Cursor" },
  gemini: { svgl: "Gemini" },
  figma: { svgl: "Figma" },
  v0: { svgl: "v0" },
  msw: { simpleIcon: "siMockserviceworker" },
  openapi: { simpleIcon: "siOpenapiinitiative" },
  // the top hat from falso's README (ngneat-archive/falso, logo.png), scaled
  // to 128px; the project has no vector logo
  falso: { file: "scripts/tech-logos/falso.png" },
};

/** Logos that are wide by nature (a cloud, a wave), not wordmarks. */
const WIDE_ICONS = new Set(["cloudflare", "tailwind"]);

/** Width over height, from the SVG's viewBox. */
function aspectOf(svg) {
  const [, , width, height] = svg
    .match(/viewBox="([^"]+)"/)[1]
    .trim()
    .split(/[\s,]+/)
    .map(Number);
  return width / height;
}

/** Tech id -> the brand's own one-colour mark, and what to drop around it
 *  (a background shape). Geist has no mark: its brand is the typeface, and
 *  the tile's initial is set in Geist. */
const MARKS = {
  // the favicon draws the mark in a band across a 64px square: crop to it
  motion: { url: "https://motion.dev/favicon.svg", drop: /<rect[^>]*\/>/, viewBox: "10 10 44 44" },
  easyweek: {
    url: "https://easyweek.io/favicons/favicon.svg",
    drop: /<path[^>]*fill="#469E30"[^>]*\/>/,
  },
  lightbox: { url: "https://yet-another-react-lightbox.com/safari-pinned-tab.svg" },
  // the "Y" alone: its gradient, the empty layout rects and the class names go
  grammy: {
    url: "https://grammy.dev/images/Y.svg",
    drop: /<defs>[\s\S]*?<\/defs>|<rect[^>]*\/>|\s(?:class|id)="[^"]*"/g,
  },
  // the bull from bullmq.io/images/bullmq-logo.png, traced with potrace
  bullmq: { file: "scripts/tech-marks/bullmq.svg" },
  // neverthrow has no logo: Phosphor's ArrowsSplit (bold), as a Result splits
  // into ok or err
  neverthrow: { file: "scripts/tech-marks/neverthrow.svg" },
  // falso's top hat (scripts/tech-logos/falso.png): its outlines and
  // moustache, the logo's dark pixels, traced with potrace
  falso: { file: "scripts/tech-marks/falso.svg" },
  // the letters alone: the black disc behind them goes
  nuqs: { url: "https://nuqs.dev/icon.svg", drop: /<rect[^>]*\/>/, viewBox: "128 128 768 768" },
  codex: { url: "https://svgl.app/library/codex_light.svg" },
  // the square icon in front of the wordmark: its tile and inline styles go
  context7: {
    url: "https://context7.com/_next/static/immutable/media/context7-logo-light.1irhnfg2jrcmg.svg",
    drop: /<rect[^>]*\/>|\sstyle="[^"]*"/g,
    viewBox: "0 0 28 28",
  },
};

/** What a mark may contain: drawing only. Anything else (script, style, use,
 *  image, foreignObject, links, event handlers, url() references) fails the
 *  script instead of being cleaned up, so nothing executable can reach the
 *  page. BrandIcon renders the result as React elements, never as HTML. */
const ALLOWED_TAGS = new Set(["g", "path", "circle", "ellipse", "rect", "polygon", "polyline"]);
const ALLOWED_ATTRS = new Set([
  "d",
  "transform",
  "fill",
  "fill-rule",
  "clip-rule",
  "cx",
  "cy",
  "r",
  "rx",
  "ry",
  "x",
  "y",
  "width",
  "height",
  "points",
  "opacity",
  "stroke",
]);
/** Parts of a file that aren't drawing and are skipped whole. */
const SKIPPED =
  /<\?xml[\s\S]*?\?>|<!DOCTYPE[\s\S]*?>|<!--[\s\S]*?-->|<metadata>[\s\S]*?<\/metadata>|<title>[\s\S]*?<\/title>|<desc>[\s\S]*?<\/desc>/gi;

/** An SVG's viewBox (its width and height when it has none, as in SVG
 *  itself) and its drawing as a tree of allowed elements, every fill painted
 *  in currentColor. Throws on anything outside the allowlist. */
function toMark(svg, drop) {
  const svgTag = svg.match(/<svg[^>]*>/)[0];
  const size = (name) => svgTag.match(new RegExp(`\\s${name}="([\\d.]+)"`))?.[1];
  const viewBox = (
    svgTag.match(/viewBox="([^"]+)"/)?.[1] ?? `0 0 ${size("width")} ${size("height")}`
  ).trim();
  if (!/^[\d.\s,-]+$/.test(viewBox)) throw new Error(`unexpected viewBox "${viewBox}"`);
  let body = svg.slice(svg.indexOf(">", svg.indexOf("<svg")) + 1, svg.lastIndexOf("</svg>"));
  if (drop) body = body.replace(drop, "");
  body = body.replace(SKIPPED, "");

  const root = { children: [] };
  const stack = [root];
  for (const [, closing, tag, rawAttrs, selfClosing] of body.matchAll(
    /<(\/?)([a-zA-Z]+)([^>]*?)(\/?)>/g,
  )) {
    if (!ALLOWED_TAGS.has(tag)) throw new Error(`<${tag}> isn't allowed in a mark`);
    if (closing) {
      stack.pop();
      continue;
    }
    const attrs = {};
    // values may span lines (long path data): match across them, then
    // collapse the whitespace
    for (const [, name, , raw] of rawAttrs.matchAll(/([\w:-]+)\s*=\s*(["'])([\s\S]*?)\2/g)) {
      const value = raw.replace(/\s+/g, " ").trim();
      if (!ALLOWED_ATTRS.has(name)) throw new Error(`${name}="…" isn't allowed in a mark`);
      if (/url\(|:|&/.test(value)) throw new Error(`unexpected value ${name}="${value}"`);
      attrs[name] =
        (name === "fill" || name === "stroke") && value !== "none" ? "currentColor" : value;
    }
    const node = { tag, attrs, children: [] };
    stack.at(-1).children.push(node);
    if (!selfClosing) stack.push(node);
  }
  return { viewBox, nodes: root.children };
}

/** True when the SVG uses a colour that isn't grey (saturation over 0.25). */
function hasColour(svg) {
  const colours = [
    ...svg.matchAll(/#([0-9a-f]{6}|[0-9a-f]{3})\b/gi),
    ...svg.matchAll(/rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/gi),
  ];
  return colours.some((m) => {
    let r, g, b;
    if (m[0].startsWith("#")) {
      const hex = m[1].length === 3 ? [...m[1]].map((c) => c + c).join("") : m[1];
      [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
    } else [r, g, b] = [m[1], m[2], m[3]].map(Number);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return max > 0 && (max - min) / max > 0.25;
  });
}

async function svglLogo(title) {
  const res = await fetch(`https://api.svgl.app?search=${encodeURIComponent(title)}`);
  const found = (await res.json()).find?.((item) => item.title === title);
  if (!found) throw new Error(`svgl has no "${title}"`);
  const routes =
    typeof found.route === "string"
      ? { light: found.route }
      : { light: found.route.light, dark: found.route.dark };
  const get = async (url) => (await fetch(url)).text();
  return { light: await get(routes.light), dark: routes.dark && (await get(routes.dark)) };
}

async function urlLogo(url) {
  return { light: await (await fetch(url)).text() };
}

async function deviconLogo(name) {
  const url = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;
  return { light: await (await fetch(url)).text() };
}

function simpleIconLogo(name) {
  const icon = icons[name];
  return {
    light: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#${icon.hex}" d="${icon.path}"/></svg>`,
  };
}

await rm(DIR, { recursive: true, force: true });
await mkdir(DIR, { recursive: true });
const map = {};
for (const [id, source] of Object.entries(SOURCES)) {
  if (source.file) {
    const ext = path.extname(source.file);
    await copyFile(path.join(ROOT, source.file), path.join(DIR, `${id}${ext}`));
    map[id] = { light: `/tech-logos/${id}${ext}` };
    console.log(`saved    ${id} (${ext.slice(1)})`);
    continue;
  }
  const logo = source.svgl
    ? await svglLogo(source.svgl)
    : source.devicon
      ? await deviconLogo(source.devicon)
      : source.url
        ? await urlLogo(source.url)
        : simpleIconLogo(source.simpleIcon);
  if (aspectOf(logo.light) > 1.8 && !WIDE_ICONS.has(id)) {
    console.warn(`check    ${id}: ${aspectOf(logo.light).toFixed(1)}:1, likely a wordmark`);
  }
  if (!hasColour(logo.light) && !(logo.dark && hasColour(logo.dark))) {
    console.log(`skip     ${id} (no colour of its own)`);
    continue;
  }
  await writeFile(path.join(DIR, `${id}.svg`), logo.light);
  map[id] = { light: `/tech-logos/${id}.svg` };
  if (logo.dark && logo.dark !== logo.light) {
    await writeFile(path.join(DIR, `${id}.dark.svg`), logo.dark);
    map[id].dark = `/tech-logos/${id}.dark.svg`;
  }
  console.log(`saved    ${id}${map[id].dark ? " (light + dark)" : ""}`);
}
await writeFile(OUT, JSON.stringify(map, null, 2) + "\n");

const marks = {};
for (const [id, { url, file, drop, viewBox }] of Object.entries(MARKS)) {
  const svg = file
    ? await readFile(path.join(ROOT, file), "utf8")
    : await (await fetch(url)).text();
  marks[id] = toMark(svg, drop);
  if (viewBox) marks[id].viewBox = viewBox;
  console.log(`mark     ${id}`);
}
await writeFile(MARKS_OUT, JSON.stringify(marks, null, 2) + "\n");
console.log(
  `\n${Object.keys(map).length} logos -> public/tech-logos/, map in src/lib/tech-logos.json`,
);
