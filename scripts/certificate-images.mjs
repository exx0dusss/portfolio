// Saves each certificate's image (the issuer's certificate, or the course's
// preview card) from src/app/[lang]/certificates/_components/certificates.json
// into public/certificates/ as WebP, keeping its aspect ratio, and records the
// size beside it so pages reserve the space. The site never calls these hosts
// at runtime. Re-run after adding a certificate:
//   pnpm certificates:images
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIR = path.join(ROOT, "src/app/[lang]/certificates/_components");
const IMG_DIR = path.join(ROOT, "public/certificates");
const WIDTH = 1200;

const certificates = JSON.parse(await readFile(path.join(DIR, "certificates.json"), "utf8"));
await mkdir(IMG_DIR, { recursive: true });

const images = {};
for (const [id, { image }] of Object.entries(certificates)) {
  if (!image) continue;
  try {
    const res = await fetch(image);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const file = `${id}.webp`;
    const { width, height } = await sharp(Buffer.from(await res.arrayBuffer()))
      .resize({ width: WIDTH, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(IMG_DIR, file));
    images[id] = { src: `/certificates/${file}`, width, height };
    console.log(`ok  ${id}: ${width}×${height}`);
  } catch (err) {
    console.warn(`err ${id}: ${err.message}`);
  }
}
await writeFile(path.join(DIR, "certificate-images.json"), `${JSON.stringify(images, null, 2)}\n`);
console.log("wrote certificate-images.json");
