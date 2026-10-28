// Snapshots link-preview metadata for every linked entry in each source below
// (the tech registry and the certificates): title, description and site name
// from the page's meta tags, plus its og:image resized into the source's
// folder under public/. The site stays static and never calls these hosts at
// runtime. Re-run after adding a link:
//   pnpm links:previews
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const CERTIFICATES = "src/app/[lang]/certificates/_components";
/** links: { id: { href?, title?, description? } } in; previews out; images
 *  served from /<images>/. Entries without an href are skipped. */
const SOURCES = [
  { links: "src/lib/tech-links.json", out: "src/lib/link-previews.json", images: "link-previews" },
  {
    links: `${CERTIFICATES}/certificates.json`,
    out: `${CERTIFICATES}/certificate-previews.json`,
    images: "link-previews/certificates",
  },
];
const HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
  "accept-language": "en-US,en;q=0.9",
};
const host = (url) => new URL(url).hostname.replace(/^www\./, "");

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/\s+/g, " ")
    .trim();

/** Content of the first <meta> whose property/name matches one of `keys`. */
function meta(html, ...keys) {
  for (const key of keys) {
    for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
      const name = tag.match(/\b(?:property|name)\s*=\s*["']([^"']+)["']/i)?.[1];
      const content = tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i)?.[1];
      if (name?.toLowerCase() === key && content) return decode(content);
    }
  }
  return undefined;
}

async function snapshot(id, { href }, images) {
  const res = await fetch(href, { headers: HEADERS, redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const title =
    meta(html, "og:title", "twitter:title") ?? decode(html.match(/<title[^>]*>([^<]*)/i)?.[1] ?? "");
  const description = meta(html, "og:description", "twitter:description", "description");

  let image;
  const imageUrl = meta(html, "og:image", "og:image:url", "twitter:image");
  if (imageUrl) {
    try {
      const img = await fetch(new URL(imageUrl, res.url), { headers: HEADERS });
      if (!img.ok) throw new Error(`image HTTP ${img.status}`);
      const file = `${id}.webp`;
      await sharp(Buffer.from(await img.arrayBuffer()))
        .resize({ width: 640, height: 336, fit: "cover" })
        .webp({ quality: 80 })
        .toFile(path.join(ROOT, "public", images, file));
      image = `/${images}/${file}`;
    } catch (err) {
      console.warn(`  ${id}: no image (${err.message})`);
    }
  }
  return { title, description, image };
}

for (const source of SOURCES) {
  const links = JSON.parse(await readFile(path.join(ROOT, source.links), "utf8"));
  await mkdir(path.join(ROOT, "public", source.images), { recursive: true });

  const previews = {};
  for (const [id, link] of Object.entries(links)) {
    if (!link.href) continue;
    let fetched = {};
    try {
      fetched = await snapshot(id, link, source.images);
    } catch (err) {
      // Some hosts block scripted requests; the preview then shows only what
      // the source provides (name, host, any title/description override).
      console.warn(`err ${id}: ${err.message}`);
    }
    // A title or description in the source overrides the scraped one.
    previews[id] = {
      title: link.title ?? fetched.title,
      description: link.description ?? fetched.description,
      site: host(link.href),
      image: fetched.image,
    };
    console.log(`ok  ${id}: ${previews[id].title ?? "(no title)"}`);
  }
  await writeFile(path.join(ROOT, source.out), `${JSON.stringify(previews, null, 2)}\n`);
  console.log(`wrote ${source.out}`);
}
