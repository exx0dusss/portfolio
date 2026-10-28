#!/usr/bin/env node
/**
 * Screenshot every page and a few interactive states, then compare two sets
 * pixel by pixel. Used to keep styling refactors 1:1.
 *
 *   pnpm build && pnpm start -p 3100      # a production server to shoot
 *   pnpm visual capture baseline          # before the change
 *   pnpm visual capture current           # after it
 *   pnpm visual compare baseline current  # lists pages that differ
 *
 * Shots go to .visual/<set>/, diff images (changed pixels in red) to
 * .visual/diff/. Uses the installed Google Chrome (playwright-core, no
 * browser download). BASE_URL overrides http://localhost:3100.
 */
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import pixelmatch from "pixelmatch";
import { chromium } from "playwright-core";
import { PNG } from "pngjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, ".visual");
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3100";

const PAGES = [
  "/",
  "/projects",
  "/about",
  "/experience",
  "/certificates",
  "/reading",
  "/colophon",
  "/resume",
  "/projects/kosmetik-profi",
  "/projects/salonsvitlo",
  "/projects/exd-downloader-app",
  "/projects/exdbots",
  "/projects/giga-psych",
  "/uk",
];
const WIDTHS = [375, 768, 1280];
const THEMES = ["light", "dark"];

/** Interactive ui/ states a page screenshot can't show, at desktop width. */
const STATES = [
  {
    name: "hover-card",
    page: "/projects/kosmetik-profi",
    run: async (page) => {
      await page.locator(".tech-chip").first().hover();
      await page.locator(".hover-card").waitFor();
    },
  },
  {
    name: "lightbox",
    page: "/projects/kosmetik-profi",
    run: async (page) => {
      await page.getByRole("button", { name: /screenshots/i }).first().click();
      await page.locator(".lightbox").waitFor();
    },
  },
  {
    name: "live-preview",
    page: "/projects/kosmetik-profi",
    run: async (page) => {
      await page.getByRole("button", { name: /try it live/i }).first().click();
      await page.getByRole("dialog").waitFor();
    },
  },
];

const slug = (route) => (route === "/" ? "home" : route.slice(1).replaceAll("/", "_"));

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(300);
}

async function newPage(browser, width, theme) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    colorScheme: theme,
    reducedMotion: "reduce",
  });
  await context.addInitScript((value) => localStorage.setItem("theme", value), theme);
  // third-party embeds (the live preview's iframe) aren't ours to compare
  await context.route(
    (url) => !url.href.startsWith(BASE_URL),
    (route) => route.abort(),
  );
  return context.newPage();
}

async function capture(set) {
  const dir = path.join(OUT, set);
  await rm(dir, { recursive: true, force: true });
  await mkdir(dir, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome" });
  try {
    for (const theme of THEMES) {
      for (const width of WIDTHS) {
        const page = await newPage(browser, width, theme);
        for (const route of PAGES) {
          await page.goto(BASE_URL + route);
          await settle(page);
          await page.screenshot({
            path: path.join(dir, `${slug(route)}.${width}.${theme}.png`),
            fullPage: true,
          });
        }
        await page.context().close();
      }
      for (const state of STATES) {
        const page = await newPage(browser, 1280, theme);
        await page.goto(BASE_URL + state.page);
        await settle(page);
        await state.run(page);
        await page.waitForTimeout(400);
        await page.screenshot({ path: path.join(dir, `state-${state.name}.1280.${theme}.png`) });
        await page.context().close();
      }
    }
  } finally {
    await browser.close();
  }
  console.log(`${(await readdir(dir)).length} shots in .visual/${set}/`);
}

async function compare(a, b) {
  const diffDir = path.join(OUT, "diff");
  await rm(diffDir, { recursive: true, force: true });
  await mkdir(diffDir, { recursive: true });
  const files = (await readdir(path.join(OUT, a))).sort();
  let changed = 0;
  for (const file of files) {
    const before = PNG.sync.read(await readFile(path.join(OUT, a, file)));
    let after;
    try {
      after = PNG.sync.read(await readFile(path.join(OUT, b, file)));
    } catch {
      console.log(`missing  ${file}`);
      changed++;
      continue;
    }
    if (before.width !== after.width || before.height !== after.height) {
      console.log(
        `size     ${file}  ${before.width}×${before.height} → ${after.width}×${after.height}`,
      );
      changed++;
      continue;
    }
    const diff = new PNG({ width: before.width, height: before.height });
    const pixels = pixelmatch(before.data, after.data, diff.data, before.width, before.height, {
      threshold: 0.1,
    });
    if (pixels > 0) {
      await writeFile(path.join(diffDir, file), PNG.sync.write(diff));
      console.log(`pixels   ${file}  ${pixels} px`);
      changed++;
    }
  }
  console.log(changed ? `\n${changed} of ${files.length} differ` : `all ${files.length} identical`);
  process.exitCode = changed ? 1 : 0;
}

const [command, ...args] = process.argv.slice(2);
if (command === "capture" && args[0]) await capture(args[0]);
else if (command === "compare" && args.length === 2) await compare(args[0], args[1]);
else {
  console.error("usage: pnpm visual capture <set> | pnpm visual compare <a> <b>");
  process.exitCode = 2;
}
