// Exports the hand-drawn architecture sketches (docs/diagrams.md). Each
// scripts/diagrams/<slug>.mjs lays out a desktop and a mobile version from
// scripts/diagrams/sketch.mjs; this audits both (overlaps, padding) and
// renders them with Excalidraw's own exporter in the installed Chrome, to
// public/diagrams/<slug>.svg and <slug>.mobile.svg, the hand-drawn font
// embedded, and records their sizes in src/lib/diagrams.json (so pages
// reserve the space). Static output: the site never loads Excalidraw.
//   pnpm diagrams              every sketch
//   pnpm diagrams kosmetik-profi
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { chromium } from "playwright-core";

import { audit } from "./diagrams/sketch.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCES = path.join(ROOT, "scripts/diagrams");
const OUT = path.join(ROOT, "public/diagrams");
const MANIFEST = path.join(ROOT, "src/lib/diagrams.json");
/** pinned: a release at least a few weeks old */
const EXPORTER = "https://esm.sh/@excalidraw/utils@0.1.5";
const PADDING = 8;

const only = process.argv.slice(2);
const slugs = (await readdir(SOURCES))
  .filter((file) => file.endsWith(".mjs") && file !== "sketch.mjs")
  .map((file) => file.replace(/\.mjs$/, ""))
  .filter((slug) => only.length === 0 || only.includes(slug));

// lay out and audit everything before starting a browser
const jobs = [];
let failed = false;
for (const slug of slugs) {
  const layouts = await import(path.join(SOURCES, `${slug}.mjs`));
  for (const variant of ["desktop", "mobile"]) {
    const { elements, zones } = layouts[variant]();
    const problems = audit(elements, zones);
    if (problems.length > 0) {
      failed = true;
      console.error(`✗ ${slug} (${variant})\n  ${problems.join("\n  ")}`);
    }
    jobs.push({ slug, variant, elements });
  }
}
if (failed) process.exit(1);

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage();
await page.setContent(
  `<script type="module">import { exportToSvg } from "${EXPORTER}"; window.exportToSvg = exportToSvg;</script>`,
);
await page.waitForFunction(() => typeof window.exportToSvg === "function", null, { timeout: 60_000 });
await mkdir(OUT, { recursive: true });
const manifest = JSON.parse(await readFile(MANIFEST, "utf8").catch(() => "{}"));

for (const { slug, variant, elements } of jobs) {
  const svg = await page.evaluate(
    async ({ elements, padding }) => {
      // transparent, so it sits on the page's panel; fonts are inlined
      const node = await window.exportToSvg({
        data: { elements, appState: { exportBackground: false }, files: null },
        config: { canvasBackgroundColor: false, padding, theme: "light" },
      });
      return node.outerHTML;
    },
    { elements, padding: PADDING },
  );
  const file = path.join(OUT, variant === "desktop" ? `${slug}.svg` : `${slug}.mobile.svg`);
  await writeFile(file, `${svg}\n`);
  const size = (attr) => Math.ceil(Number(svg.match(new RegExp(`${attr}="([\\d.]+)"`))[1]));
  manifest[slug] = { ...manifest[slug], [variant]: { width: size("width"), height: size("height") } };
  console.log(`ok  ${path.relative(ROOT, file)}  ${(svg.length / 1024).toFixed(0)} KB`);
}
await browser.close();
await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`wrote ${path.relative(ROOT, MANIFEST)}`);
