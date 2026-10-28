// Saves the logos the tech links use (src/components/tech-link.tsx); the site
// never calls these hosts at runtime. Re-run after adding a tech:
//   pnpm tech:logos
//
// 1. Colour logos, shown when a chip is hovered: from svgl (svgl.app, open
//    source; light and dark versions where it has both), Devicon where svgl
//    only has a wordmark, or a brand's Simple Icons shape in its one colour.
//    Chips show icons, not wordmarks: a logo much wider than tall is flagged
//    unless it's known to be the icon (WIDE_ICONS). Logos with no colour of
//    their own (black and white marks) are skipped: the grey mark already is
//    their look. Files in public/tech-logos/ (shown with <img>, so their
//    markup never runs), map in src/lib/tech-logos.json.
// 2. Grey marks for brands Simple Icons doesn't have: taken from the brand's
//    own favicon or mask icon, background dropped, parsed against a drawing
//    allowlist and recoloured to currentColor. Map in src/lib/tech-marks.json.
import { mkdir, rm, writeFile } from "node:fs/promises";
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
  typescript: { svgl: "TypeScript" },
  tailwind: { svgl: "Tailwind CSS" },
  shadcn: { svgl: "shadcn/ui" },
  "base-ui": { svgl: "Base UI" },
  vercel: { svgl: "Vercel" },
  cloudflare: { svgl: "Cloudflare" },
  github: { svgl: "GitHub" },
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

/** An SVG's viewBox and its drawing as a tree of allowed elements, every
 *  fill painted in currentColor. Throws on anything outside the allowlist. */
function toMark(svg, drop) {
  const viewBox = svg.match(/viewBox="([^"]+)"/)[1].trim();
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
  const logo = source.svgl
    ? await svglLogo(source.svgl)
    : source.devicon
      ? await deviconLogo(source.devicon)
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
for (const [id, { url, drop, viewBox }] of Object.entries(MARKS)) {
  marks[id] = toMark(await (await fetch(url)).text(), drop);
  if (viewBox) marks[id].viewBox = viewBox;
  console.log(`mark     ${id}`);
}
await writeFile(MARKS_OUT, JSON.stringify(marks, null, 2) + "\n");
console.log(
  `\n${Object.keys(map).length} logos -> public/tech-logos/, map in src/lib/tech-logos.json`,
);
