// ExdDownloaderApp's architecture (from the exd-tiktok-bot repo): Telegram
// reaches the bot through a self-hosted Bot API server's webhook; the bot only
// queues the job in Redis (BullMQ), and a separate worker resolves the link,
// fetches the media from TikTok, YouTube, SoundCloud or 12 social platforms
// (X, Instagram, Reddit…; yt-dlp, gallery-dl and FxTwitter) and uploads it back
// through the same Bot API server. The Mini App is served by the bot itself.
// Bot, worker, Redis, Postgres and the Bot API server run on one Hostinger VPS
// under Coolify, which pulls the new image when a merge to main is built.
import {
  arrow,
  below,
  captioned,
  described,
  end,
  FONT,
  GAP,
  heading,
  icon,
  INK,
  labelAbove,
  labelBelow,
  labelBeside,
  labelLeft,
  labelRight,
  mid,
  outside,
  store,
  textWidth,
  user,
  zone,
} from "./sketch.mjs";

const TITLE = "ExdDownloaderApp";
const SUBTITLE = "how it fits together";
const PLATFORMS = ["TikTok", "YouTube", "SoundCloud", "+ 12 more"];
const BOT = { label: "bot\ngrammY · menus", sub: "webhook · Mini App API" };
const WORKER = { label: "worker\nresolve · fetch", sub: "ffmpeg · yt-dlp" };
const BOT_API = { label: "Bot API server", sub: "self-hosted, 2 GB files" };
const EXD = { strokeColor: INK.exd.stroke, backgroundColor: INK.exd.fill };
const DB_W = 72;
const PHONE_W = 56;
const GIT_W = 64;
/** room for an arrow between two parts: its length plus both end gaps */
const RUN = 70;

/** the platforms the worker downloads from, stacked in a dashed zone */
function platforms(x, y, w, rowH, rowGap) {
  const z = zone("platforms", x, y, w, 0, "platforms", {
    strokeStyle: "dashed",
    strokeColor: INK.muted,
  });
  const rows = PLATFORMS.map((name, i) =>
    outside(
      name.toLowerCase(),
      x + GAP.zonePad,
      z.inner + i * (rowH + rowGap),
      w - 2 * GAP.zonePad,
      rowH,
      name,
    ),
  );
  const h = below(rows.at(-1).box, GAP.zonePad) - y;
  const shaped = zone("platforms", x, y, w, h, "platforms", {
    strokeStyle: "dashed",
    strokeColor: INK.muted,
  });
  return {
    elements: [...shaped.elements, ...rows.flatMap((r) => r.elements)],
    zone: shaped.zone,
    box: shaped.zone,
  };
}

/** Coolify, on the VPS beside what it runs */
const coolify = (x, y, w, sub) =>
  described("coolify", x, y, w, 70, "Coolify", sub, { backgroundColor: INK.purple });
const COOLIFY_SUB = "pulls + runs containers";

export function layout() {
  const top = 100;
  const els = [];
  const zones = [];

  // left band: the user and Telegram, then the platforms
  const bandW = 220;
  const who = user("user", 24, top, "user", "Telegram", PHONE_W, "smartphone");
  const rowY = 310; // the bot's row
  const boxH = 90;
  const telegram = outside("telegram", 0, rowY, 180, boxH, "Telegram\nservers");
  els.push(...who.elements, ...telegram.elements);

  // the VPS: Bot API server and worker on the left, bot and Redis beside them
  const vpsX = bandW + 150;
  const colA = { x: vpsX + GAP.zonePad, w: 220 };
  const colB = { x: colA.x + colA.w + 150, w: 230 };
  const botApi = described("botapi", colA.x, rowY, colA.w, boxH, BOT_API.label, BOT_API.sub, {
    strokeColor: INK.muted,
  });
  const bot = described("bot", colB.x, rowY, colB.w, boxH, BOT.label, BOT.sub, EXD);
  const row2 = Math.max(botApi.bottom, bot.bottom) + RUN + 30;
  const worker = described("worker", colA.x, row2, colA.w, boxH, WORKER.label, WORKER.sub, EXD);
  const redis = store("redis", colB.x + colB.w * 0.3 - DB_W / 2, row2, "Redis", "queue · sessions");
  const pgX = colB.x + colB.w + 40;
  const pg = store(
    "pg",
    pgX,
    Math.max(worker.bottom, redis.bottom) + 30,
    "Postgres",
    "users · downloads",
  );
  const cool = coolify(colA.x, below({ y: worker.bottom, h: 0 }, RUN + 20), colA.w, COOLIFY_SUB);
  const vpsRight =
    Math.max(pgX + DB_W, mid(pg.box).x + textWidth("users · downloads", FONT.label) / 2) +
    GAP.zonePad;
  const vpsBottom = below({ y: Math.max(pg.bottom, cool.bottom), h: 0 }, GAP.zonePad);
  const vps = zone("vps", vpsX, top, vpsRight - vpsX, vpsBottom - top, "Hostinger VPS");
  els.push(
    ...vps.elements,
    ...botApi.elements,
    ...bot.elements,
    ...worker.elements,
    ...redis.elements,
    ...pg.elements,
    ...cool.elements,
  );
  zones.push(vps.zone);

  // platforms, level with the worker
  const plat = platforms(0, mid(worker.box).y - 150, bandW, 56, 16);
  els.push(...plat.elements);
  zones.push(plat.zone);

  const git = captioned(
    "git",
    icon("git-branch", "git", mid(cool.box).x - GIT_W / 2, below(vps.zone, RUN), GIT_W),
    "GitHub · main",
  );
  els.push(...git.elements);

  // arrows
  const phone = who.browser;
  const messages = [
    [mid(phone).x, who.bottom + GAP.arrow],
    end(telegram.box, "top", GAP.arrow, (mid(phone).x - telegram.box.x) / telegram.box.w),
  ];
  const mtproto = [end(telegram.box, "right"), end(botApi.box, "left")];
  const miniApp = [end(phone, "right", GAP.arrow, 0.4), end(bot.box, "top", GAP.arrow, 0.2)];
  const webhook = [end(botApi.box, "right"), end(bot.box, "left")];
  const enqueue = [end(bot.box, "bottom", GAP.arrow, 0.3), end(redis.box, "top")];
  // from below the bot's sub-caption
  enqueue[0][1] = bot.bottom + GAP.arrow;
  const jobs = [end(redis.box, "left"), end(worker.box, "right")];
  const upload = [
    [mid(worker.box).x, worker.box.y - GAP.arrow],
    [mid(botApi.box).x, botApi.bottom + GAP.arrow],
  ];
  const fetch = [end(worker.box, "left"), [plat.box.x + plat.box.w + GAP.arrow, mid(worker.box).y]];
  const botDb = [[colB.x + colB.w - 20, bot.bottom + GAP.arrow], end(pg.box, "top")];
  const workerDb = [[colA.x + colA.w + GAP.arrow, worker.bottom + 6], end(pg.box, "left")];
  const merge = [end(git.box, "top"), [mid(cool.box).x, cool.bottom + GAP.arrow]];
  els.push(
    arrow("messages", ...messages),
    labelBeside("messages-label", ...messages, "messages"),
    arrow("mtproto", ...mtproto),
    labelAbove("mtproto-label", ...mtproto, "MTProto"),
    arrow("mini-app", ...miniApp),
    labelAbove("mini-app-label", ...miniApp, "Mini App"),
    arrow("webhook", ...webhook),
    labelAbove("webhook-label", ...webhook, "webhook"),
    arrow("enqueue", ...enqueue),
    labelBeside("enqueue-label", ...enqueue, "enqueue"),
    arrow("jobs", ...jobs),
    labelAbove("jobs-label", ...jobs, "BullMQ"),
    arrow("upload", ...upload),
    labelLeft("upload-label", ...upload, "upload"),
    arrow("fetch", ...fetch),
    labelAbove("fetch-label", ...fetch, "fetch media"),
    arrow("bot-db", ...botDb),
    labelRight("bot-db-label", ...botDb, "Drizzle"),
    arrow("worker-db", ...workerDb),
    labelBelow("worker-db-label", ...workerDb, "Drizzle"),
    arrow("merge", ...merge),
    labelBeside("merge-label", ...merge, "on merge"),
  );

  const width = vps.zone.x + vps.zone.w;
  const head = heading(width, TITLE, SUBTITLE);
  return { elements: [...head.elements, ...els], zones, width };
}
