// v1–v3: each version's own way of turning a TikTok link into the video,
// timed in two steps: resolve (link → media URL) and media (download it all).
//   node bench-node.mjs v1|v2|v3 urls.txt runs > out.json
import { readFile } from "node:fs/promises";
import v2lib from "v2lib";
import * as v3lib from "v3lib";

const [version, urlsFile, runsArg] = process.argv.slice(2);
const urls = (await readFile(urlsFile, "utf8")).split("\n").filter(Boolean);
const runs = Number(runsArg || 3);

// v1 (2023): TikTok's private mobile feed API, as Client/Client.js called it
async function v1(url) {
  const id = url.match(/\/video\/(\d+)/)[1];
  const res = await fetch(
    `https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${id}`,
    {
      headers: { "User-Agent": "TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet" },
      signal: AbortSignal.timeout(20000),
    },
  );
  const body = await res.text();
  let json;
  try {
    json = JSON.parse(body);
  } catch {
    throw new Error(`HTTP ${res.status}, not JSON (${body.length} bytes)`);
  }
  const media = json.aweme_list?.[0]?.video?.play_addr?.url_list?.[0];
  if (!media) throw new Error(`HTTP ${res.status}, no aweme_list`);
  return { media, headers: {} };
}
// v2 (2024): @tobyg74/tiktok-api-dl 1.1.1, Tiktok.Downloader(url, { version: "v1" })
async function v2(url) {
  const data = await v2lib.Tiktok.Downloader(url, { version: "v1" });
  const media = data?.result?.video?.playAddr?.[0] ?? data?.result?.video?.[0];
  if (data?.status !== "success" || !media) throw new Error(data?.message || "no media");
  return { media, headers: {} };
}
// v3 (2024–25): @tobyg74/tiktok-api-dl 1.2.0, Downloader(url, { version: "v1" })
async function v3(url) {
  const data = await v3lib.Downloader(url, { version: "v1" });
  const media = data?.result?.video?.playAddr?.[0] ?? data?.result?.video?.[0];
  if (data?.status !== "success" || !media) throw new Error(data?.message || "no media");
  return { media, headers: {} };
}
const impl = { v1, v2, v3 }[version];

const rows = [];
for (let run = 0; run < runs; run++) {
  for (const url of urls) {
    const t0 = performance.now();
    try {
      const { media, headers } = await impl(url);
      const t1 = performance.now();
      const res = await fetch(media, { headers, signal: AbortSignal.timeout(60000) });
      if (!res.ok) throw new Error(`media HTTP ${res.status}`);
      const bytes = (await res.arrayBuffer()).byteLength;
      const t2 = performance.now();
      rows.push({
        version,
        url,
        run,
        ok: true,
        resolveMs: Math.round(t1 - t0),
        mediaMs: Math.round(t2 - t1),
        bytes,
      });
    } catch (e) {
      rows.push({
        version,
        url,
        run,
        ok: false,
        ms: Math.round(performance.now() - t0),
        error: String(e.message || e).slice(0, 160),
      });
    }
  }
}
console.log(JSON.stringify(rows));
