# ExdDownloadApp: fetch speed across versions

How fast each version turns a TikTok link into the video, measured on
29 October 2026 from one Mac, on the same ten public TikTok videos (the
latest video posts in the dev database), with each version's own fetching
code and the library version it pinned. Results in `results.json` (links
replaced by `video-1`…`video-10`); the case study's Performance section
quotes them.

| Version      | How it fetches                                                                           | Works today | Link → media URL, p50 / p90 | Link → whole file, p50 |
| ------------ | ---------------------------------------------------------------------------------------- | ----------- | --------------------------- | ---------------------- |
| v1 (2023)    | TikTok's private mobile API (`api16-normal…/aweme/v1/feed`)                              | 0 of 10     | HTTP 429 / empty            | —                      |
| v2 (2024)    | `@tobyg74/tiktok-api-dl` 1.1.1, `version: "v1"` (the same API)                           | 0 of 10     | "ratelimit triggered"       | —                      |
| v3 (2024–25) | `@tobyg74/tiktok-api-dl` 1.2.0, `version: "v1"`                                          | 30 of 30    | 6.84 s / 11.09 s            | 6.97 s                 |
| v4 (2025–)   | its own client (`fetchPostData`: the post page's embedded data, the library as fallback) | 27 of 30    | 0.58 s / 0.68 s             | 0.66 s                 |

- v4's three misses are one age-restricted post, which it reports as
  unavailable on purpose; v3 returned a file for it.
- v1 and v2 were retried after a pause with the same result: TikTok no
  longer answers unsigned requests to that API. Their speed in their day
  can't be measured now.
- Media sizes match at the median (2.0 MB); v4 picks the best watermark-free
  rendition, so some of its files are larger.
- Not measured: a whole bot round trip. Each version would need its own
  database, Redis and a Telegram token, and the upload to Telegram would
  dominate. v4's production figures cover that instead (stats_query,
  October 2026): processing p50 3.5 s TikTok, 1.8 s SoundCloud, 11.6 s
  YouTube; queue wait p50 2 ms; TikTok success 97.1%.

## Re-running

```bash
# v1–v3 (Node): npm i v2lib@npm:@tobyg74/tiktok-api-dl@1.1.1 v3lib@npm:@tobyg74/tiktok-api-dl@1.2.0
node bench-node.mjs v3 urls.txt 3 > v3.json
# v4 (Deno): copy bench-v4.ts into an exd-tiktok-bot checkout, with its .env loaded
deno run -A bench-v4.ts urls.txt 3 > v4.json
```
