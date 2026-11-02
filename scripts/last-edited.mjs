// The date each page was last edited, for the "Last edited" line in the
// footer: src/lib/last-edited.json, keyed by the page's path ("/",
// "/projects/giga-psych"). Kept in the repo rather than read from git at
// build time, because Vercel clones the repo shallowly.
//
// A page is its route folder (page.tsx and private folders like
// _components), not its child routes or its share image; the home page also
// counts its sections in src/app/_components, and the work list the list's
// own parts.
//
//   node scripts/last-edited.mjs <files…>   the pre-commit hook: pages with
//                                            a staged file get today's date
//   node scripts/last-edited.mjs --all       every page, from git history
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const APP = "src/app/[lang]";
const OUT = path.join(ROOT, "src/lib/last-edited.json");

/** Folders under `dir` that are routes of their own (they have a page). */
function isRoute(dir) {
  return readdirSync(path.join(ROOT, dir)).includes("page.tsx");
}

/** A route folder's own files: not child routes, not the share image. */
function ownFiles(dir) {
  return readdirSync(path.join(ROOT, dir)).flatMap((name) => {
    const file = `${dir}/${name}`;
    if (statSync(path.join(ROOT, file)).isDirectory()) {
      return name.startsWith("_") ? [file] : [];
    }
    return name.startsWith("opengraph-image") ? [] : [file];
  });
}

/** Every page's path and the files that make it up. */
function pages(dir = APP, route = "/") {
  const here =
    route === "/"
      ? [`${APP}/page.tsx`, "src/app/_components"]
      : route === "/projects"
        ? [
            `${APP}/projects/page.tsx`,
            "src/app/_components/projects.ts",
            "src/app/_components/project-list.tsx",
            "src/app/_components/project-card.tsx",
          ]
        : ownFiles(dir);
  const children = readdirSync(path.join(ROOT, dir))
    .filter((name) => !name.startsWith("_") && statSync(path.join(ROOT, dir, name)).isDirectory())
    .filter((name) => isRoute(`${dir}/${name}`))
    .flatMap((name) => pages(`${dir}/${name}`, `${route === "/" ? "" : route}/${name}`));
  return [[route, here], ...children];
}

/** A file belongs to a page if it is one of its files or inside one of its folders. */
const touches = (paths, file) => paths.some((p) => file === p || file.startsWith(`${p}/`));

const today = () => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};

const lastCommitDate = (paths) =>
  execFileSync("git", ["log", "-1", "--format=%cs", "--", ...paths], {
    cwd: ROOT,
    encoding: "utf8",
  }).trim();

let dates = {};
try {
  dates = JSON.parse(readFileSync(OUT, "utf8"));
} catch {}

const all = process.argv[2] === "--all";
const staged = process.argv.slice(2);
for (const [route, paths] of pages()) {
  if (all) dates[route] = lastCommitDate(paths) || today();
  else if (staged.some((file) => touches(paths, file))) dates[route] = today();
}

const sorted = Object.fromEntries(Object.entries(dates).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(OUT, `${JSON.stringify(sorted, null, 2)}\n`);
