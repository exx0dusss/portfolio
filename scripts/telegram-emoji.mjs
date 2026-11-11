// Renders Telegram custom emoji (animated .tgs stickers) as images the site
// can show without a Lottie player: a looping animated WebP, and a still PNG
// of the first frame for visitors who prefer reduced motion. Files in
// public/telegram-emoji/, sizes in src/lib/telegram-emoji.json. The site never
// calls Telegram at runtime. Re-run after adding an emoji to EMOJI:
//   TELEGRAM_BOT_TOKEN=… pnpm telegram:emoji
//
// Any bot's token can read any custom emoji (getCustomEmojiStickers); the
// frames are drawn by lottie-web in the installed Chrome, as Telegram's apps
// draw them, and joined into a WebP by sharp.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { gunzipSync } from "node:zlib";

import { chromium } from "playwright-core";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIR = path.join(ROOT, "public/telegram-emoji");
const OUT = path.join(ROOT, "src/lib/telegram-emoji.json");
/** pinned: a release at least a few weeks old */
const LOTTIE = "https://esm.sh/lottie-web@5.12.2/build/player/lottie_svg";

/** Name -> custom emoji id, the ones ExdDownloadApp sends (its
 *  custom-emoji.ts): the platform logos from its own ApplicationEmoji pack,
 *  the rest from Telegram's animated emoji. */
const EMOJI = {
  tiktok: "5327982530702359565",
  youtube: "5334681713316479679",
  soundcloud: "5345844509412444249",
  film: "5375464961822695044",
  chat: "5465300082628763143",
  hourglass: "5451732530048802485",
  folder: "5433653135799228968",
  telegram: "5330237710655306682",
  inbox: "5433811242135331842",
  rocket: "5445284980978621387",
  people: "5372926953978341366",
  person: "5373012449597335010",
  bellOff: "5244807637157029775",
  lock: "5472308992514464048",
  gift: "5199749070830197566",
  star: "5435957248314579621",
  megaphone: "5469903029144657419",
  sparkles: "5472164874886846699",
  link: "5375129357373165375",
  question: "5467666648263564704",
  cross: "5465665476971471368",
  bulb: "5472146462362048818",
  cards: "5431736674147114227",
  globe: "5399898266265475100",
  phone: "5406809207947142040",
  // the chat demo's other screens (welcome, /help's formats, settings, search)
  wave: "5472055112702629499",
  plus: "5226945370684140473",
  check: "5427009714745517609",
  robot: "5372981976804366741",
  music: "5188621441926438751",
  picture: "5375074927252621134",
  tv: "5373330964372004748",
  magnifier: "5188217332748527444",
  playlist: "5300893312973026117",
  // the social platforms' logos (its premium-config.ts SOCIAL_CUSTOM_EMOJI)
  x: "5330337435500951363",
  instagram: "5319160079465857105",
  reddit: "5330321861949539755",
  facebook: "5323261730283863478",
  pinterest: "5346103513120258857",
  twitch: "5334678011054669335",
  vimeo: "5334764984142412896",
  snapchat: "5330248916224983855",
  tumblr: "5328242556612395440",
  vk: "5334807822146225472",
  bilibili: "5335012820935261564",
  linkedin: "5346024520081751155",
};
/** Drawn at 2x for a 24px slot, at half Telegram’s 60 fps. */
const SIZE = 48;
const FPS = 30;

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) throw new Error("Set TELEGRAM_BOT_TOKEN (any bot's token)");
const api = async (method, body) => {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!json.ok) throw new Error(`${method}: ${json.description}`);
  return json.result;
};

const stickers = await api("getCustomEmojiStickers", {
  custom_emoji_ids: Object.values(EMOJI),
});

await mkdir(DIR, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE } });
await page.setContent(
  `<body style="margin:0;background:transparent"><div id="e" style="width:${SIZE}px;height:${SIZE}px"></div>` +
    `<script type="module">import lottie from "${LOTTIE}"; window.lottie = lottie;</script></body>`,
);
await page.waitForFunction(() => typeof window.lottie?.loadAnimation === "function", null, {
  timeout: 60_000,
});

const map = {};
for (const [name, id] of Object.entries(EMOJI)) {
  const sticker = stickers.find((s) => s.custom_emoji_id === id);
  if (!sticker?.is_animated) throw new Error(`${name}: not an animated (.tgs) emoji`);
  const file = await api("getFile", { file_id: sticker.file_id });
  const tgs = await fetch(`https://api.telegram.org/file/bot${token}/${file.file_path}`);
  const lottieJson = JSON.parse(gunzipSync(Buffer.from(await tgs.arrayBuffer())).toString());

  const total = await page.evaluate((data) => {
    window.anim?.destroy();
    window.anim = window.lottie.loadAnimation({
      container: document.getElementById("e"),
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: data,
    });
    return window.anim.totalFrames / window.anim.frameRate;
  }, lottieJson);

  const count = Math.max(1, Math.round(total * FPS));
  const frames = [];
  for (let i = 0; i < count; i++) {
    await page.evaluate((t) => window.anim.goToAndStop(t * 1000, false), i / FPS);
    frames.push(await page.screenshot({ omitBackground: true }));
  }
  await writeFile(path.join(DIR, `${name}.png`), frames[0]);
  // an emoji of one frame stays still
  const webp =
    count === 1
      ? sharp(frames[0]).webp({ quality: 80 })
      : sharp(frames, { join: { animated: true } }).webp({
          loop: 0,
          delay: Array(count).fill(Math.round(1000 / FPS)),
          quality: 80,
        });
  await webp.toFile(path.join(DIR, `${name}.webp`));
  map[name] = { width: SIZE, height: SIZE };
  console.log(`saved    ${name} (${count} frames)`);
}
await browser.close();
await writeFile(OUT, JSON.stringify(map, null, 2) + "\n");
console.log(
  `\n${Object.keys(map).length} emoji -> public/telegram-emoji/, map in src/lib/telegram-emoji.json`,
);
