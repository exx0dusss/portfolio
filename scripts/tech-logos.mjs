// Downloads each technology's logo in its own colours, for the tech chips'
// hover (src/components/tech-link.tsx). Logos come from svgl (svgl.app, open
// source; light and dark versions where it has both); a brand whose real logo
// is one colour is drawn from its Simple Icons shape in that colour. Logos
// with no colour of their own (black and white marks) are skipped: the chip's
// grey mark already is their look. Files go to public/tech-logos/ and the map
// to src/lib/tech-logos.json; the site never calls these hosts at runtime.
// Re-run after adding a tech:
//   pnpm tech:logos
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import * as icons from "simple-icons";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "src/lib/tech-logos.json");
const DIR = path.join(ROOT, "public/tech-logos");

/** Tech id -> its svgl title, or a Simple Icons export for one-colour logos. */
const SOURCES = {
  nestjs: { svgl: "NestJS" },
  typeorm: { svgl: "TypeORM" },
  sqlite: { svgl: "SQLite" },
  jwt: { svgl: "JWT" },
  docker: { svgl: "Docker" },
  coolify: { simpleIcon: "siCoolify" },
  nextjs: { svgl: "Next.js" },
  react: { svgl: "React" },
  typescript: { svgl: "TypeScript" },
  tailwind: { svgl: "Tailwind CSS" },
  shadcn: { svgl: "shadcn/ui" },
  "base-ui": { svgl: "Base UI" },
  motion: { svgl: "Motion" },
  vercel: { svgl: "Vercel" },
  cloudflare: { svgl: "Cloudflare" },
  github: { svgl: "GitHub" },
};

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
  const logo = source.svgl ? await svglLogo(source.svgl) : simpleIconLogo(source.simpleIcon);
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
console.log(
  `\n${Object.keys(map).length} logos -> public/tech-logos/, map in src/lib/tech-logos.json`,
);
