// v4 (2025–): the bot’s own client (fetchPostData) and the media request
// downloadMediaOnce makes, timed like bench-node.mjs.
//   deno run -A bench-v4.ts urls.txt runs > out.json
import { fetchPostData } from "@/bot/downloader/tiktok/api-client.ts";

const CDN_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const [urlsFile, runsArg] = Deno.args;
const urls = (await Deno.readTextFile(urlsFile)).split("\n").filter(Boolean);
const runs = Number(runsArg || 3);
const rows = [];
for (let run = 0; run < runs; run++) {
  for (const url of urls) {
    const t0 = performance.now();
    try {
      const { result, cookies } = await fetchPostData(url);
      if (result.type !== "video") throw new Error(`not a video: ${result.type}`);
      const media = result.video.variants[0]?.urls[0];
      if (!media) throw new Error("no rendition");
      const t1 = performance.now();
      const headers: Record<string, string> = cookies
        ? { "User-Agent": CDN_UA, Referer: "https://www.tiktok.com/", Cookie: cookies }
        : {};
      const res = await fetch(media, { headers, signal: AbortSignal.timeout(60000) });
      if (!res.ok) throw new Error(`media HTTP ${res.status}`);
      const bytes = (await res.arrayBuffer()).byteLength;
      const t2 = performance.now();
      rows.push({
        version: "v4",
        url,
        run,
        ok: true,
        resolveMs: Math.round(t1 - t0),
        mediaMs: Math.round(t2 - t1),
        bytes,
      });
    } catch (e) {
      rows.push({
        version: "v4",
        url,
        run,
        ok: false,
        ms: Math.round(performance.now() - t0),
        error: String((e as Error).message || e).slice(0, 160),
      });
    }
  }
}
console.log(JSON.stringify(rows));
Deno.exit(0);
