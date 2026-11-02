// Giga Psych's frontend (from the monorepo's giga-psych-frontend): Next.js
// is a backend for the frontend (BFF). The user's browser asks it for pages
// and calls its /api for everything else, never the backend itself, keeping
// its TanStack Query cache in IndexedDB. In Next.js, proxy.ts checks the
// session and roles before a page renders; Server Components prefetch and
// the /api route forwards the browser's calls, both through serverFetch,
// which adds the token from the httpOnly cookie and calls the team's Spring
// Boot API. That API keeps its data in
// PostgreSQL, rate limits in Redis, and asks Gemini to map uploaded columns.
import {
  arrow,
  below,
  box,
  end,
  GAP,
  heading,
  INK,
  labelAbove,
  labelBeside,
  labelBelow,
  mid,
  outside,
  store,
  textHeight,
  FONT,
  user,
  zone,
} from "./sketch.mjs";

const TITLE = "Giga Psych";
const SUBTITLE = "frontend architecture";
const BROWSER_W = 160;
const PART = { w: 280, h: 84 };
const API = { w: 240, h: 84 };
const FETCH = { w: 240, h: 84 };
const GEMINI = { w: 220, h: 84 };
const STORE_W = 64;
/** room for an arrow between two parts: its length plus both end gaps */
const RUN = 70;
/** room between bands, for an arrow and its label */
const BAND = 130;
/** room inside the BFF between its column and serverFetch, for the widest
 *  label ("prefetchQuery") over its arrow */
const FAN = 160;

/** Next.js 16, the framework box, with the BFF inside it: proxy.ts →
 *  Server Components → the /api door, top to bottom, the last two feeding
 *  serverFetch on the right, level with Server Components. The browser only
 *  ever talks to the BFF. */
function frontend(x, y) {
  const title = "Next.js 16";
  const bffTitle = "BFF";
  const titled = (top, text) => top + GAP.zonePad + textHeight(text, FONT.zone) + GAP.zoneTitle;
  const bffX = x + GAP.zonePad;
  const bffY = titled(y, title);
  const px = bffX + GAP.zonePad;
  const giga = { backgroundColor: INK.giga.fill, strokeColor: INK.giga.stroke };
  const proxy = box(
    "proxy",
    px,
    titled(bffY, bffTitle),
    PART.w,
    PART.h,
    "proxy.ts\nauth · RBAC",
    giga,
  );
  const rsc = box(
    "rsc",
    px,
    below(proxy.box, RUN),
    PART.w,
    PART.h,
    "Server Components\nRSC · streaming",
    giga,
  );
  const door = box(
    "door",
    px,
    below(rsc.box, RUN),
    PART.w,
    PART.h,
    "/api/[...path]\nAPI proxy",
    giga,
  );
  const fetcher = box(
    "fetch",
    px + PART.w + FAN,
    mid(rsc.box).y - FETCH.h / 2,
    FETCH.w,
    FETCH.h,
    "serverFetch\ntoken · retries",
    giga,
  );
  const bff = zone(
    "bff",
    bffX,
    bffY,
    PART.w + FAN + FETCH.w + 2 * GAP.zonePad,
    below(door.box, GAP.zonePad) - bffY,
    bffTitle,
    { strokeStyle: "dashed", strokeColor: INK.giga.stroke },
  );
  const area = zone(
    "next",
    x,
    y,
    bff.zone.w + 2 * GAP.zonePad,
    below(bff.zone, GAP.zonePad) - y,
    title,
    { strokeColor: INK.giga.stroke },
  );

  const renders = [end(proxy.box, "bottom"), end(rsc.box, "top")];
  const prefetch = [end(rsc.box, "right"), end(fetcher.box, "left")];
  const forwards = [end(door.box, "right"), end(fetcher.box, "left", GAP.arrow, 0.8)];
  return {
    elements: [
      ...area.elements,
      ...bff.elements,
      ...proxy.elements,
      ...rsc.elements,
      ...door.elements,
      ...fetcher.elements,
      arrow("renders", ...renders),
      labelBeside("renders-label", ...renders, "renders"),
      arrow("prefetch", ...prefetch),
      labelAbove("prefetch-label", ...prefetch, "prefetchQuery"),
      arrow("forwards", ...forwards),
    ],
    zone: area.zone,
    bff: bff.zone,
    proxy: proxy.box,
    rsc: rsc.box,
    door: door.box,
    fetcher: fetcher.box,
  };
}

/** The team's backend: the API level with serverFetch, its two stores
 *  above it, Gemini below the zone. */
function backend(x, apiY) {
  const title = "backend";
  const ax = x + GAP.zonePad;
  const api = box("api", ax, apiY, API.w, API.h, "Spring Boot API\nREST · OpenAPI");
  // the stores sit over the API's quarters, a run above it
  const storeH =
    64 + GAP.caption + textHeight("x", FONT.caption) + GAP.subCaption + textHeight("x", FONT.label);
  const storeY = apiY - RUN - storeH;
  const y = storeY - GAP.zoneTitle - textHeight(title, FONT.zone) - GAP.zonePad;
  const pg = store(
    "pg",
    ax + API.w * 0.25 - STORE_W / 2,
    storeY,
    "PostgreSQL",
    "datasets",
    STORE_W,
  );
  const redis = store(
    "redis",
    ax + API.w * 0.75 - STORE_W / 2,
    storeY,
    "Redis",
    "rate limits",
    STORE_W,
  );
  const area = zone(
    "backend",
    x,
    y,
    API.w + 2 * GAP.zonePad,
    below(api.box, GAP.zonePad) - y,
    title,
    {
      strokeStyle: "dashed",
      strokeColor: INK.muted,
    },
  );
  const gemini = outside(
    "gemini",
    mid(api.box).x - GEMINI.w / 2,
    below(area.zone, RUN),
    GEMINI.w,
    GEMINI.h,
    "Gemini API\ncolumn mapping",
  );

  const toPg = [end(api.box, "top", GAP.arrow, 0.25), [mid(pg.box).x, pg.bottom + GAP.arrow]];
  const toRedis = [
    end(api.box, "top", GAP.arrow, 0.75),
    [mid(redis.box).x, redis.bottom + GAP.arrow],
  ];
  const toGemini = [end(api.box, "bottom"), end(gemini.box, "top")];
  return {
    elements: [
      ...area.elements,
      ...pg.elements,
      ...redis.elements,
      ...api.elements,
      ...gemini.elements,
      arrow("to-pg", ...toPg),
      arrow("to-redis", ...toRedis),
      arrow("to-gemini", ...toGemini),
      labelBeside("to-gemini-label", ...toGemini, "Spring AI"),
    ],
    zone: area.zone,
    api: api.box,
    right: x + area.zone.w,
  };
}

export function layout() {
  const top = 100;

  // the Next.js band first: the people line up with its middle box, so
  // their two arrows climb to proxy.ts and drop to the /api door
  const nextX = 44 + GAP.person + BROWSER_W + BAND;
  const next = frontend(nextX, top);
  const visitor = user("user", 0, mid(next.rsc).y - 60, "user", "client", BROWSER_W);
  const cache = store(
    "cache",
    mid(visitor.browser).x - STORE_W / 2,
    visitor.bottom + RUN,
    "IndexedDB",
    "query persister",
    STORE_W,
  );
  const back = backend(next.zone.x + next.zone.w + BAND, next.fetcher.y);

  const pages = [
    end(visitor.browser, "right"),
    end(next.proxy, "left", GAP.arrow + 2 * GAP.zonePad),
  ];
  const calls = [
    end(visitor.browser, "right", GAP.arrow, 0.75),
    end(next.door, "left", GAP.arrow + 2 * GAP.zonePad),
  ];
  const toApi = [
    end(next.fetcher, "right", GAP.arrow + 2 * GAP.zonePad),
    end(back.api, "left", GAP.arrow + GAP.zonePad),
  ];
  const persists = [[mid(visitor.browser).x, visitor.bottom + GAP.arrow], end(cache.box, "top")];

  const elements = [
    ...visitor.elements,
    ...cache.elements,
    ...next.elements,
    ...back.elements,
    arrow("pages", ...pages),
    labelAbove("pages-label", ...pages, "HTML · RSC"),
    arrow("calls", ...calls),
    labelBelow("calls-label", ...calls, "fetch /api"),
    arrow("to-api", ...toApi),
    labelAbove("to-api-label", ...toApi, "REST + JWT"),
    arrow("persists", ...persists, { strokeColor: INK.amber }),
    labelBeside("persists-label", ...persists, "persist"),
  ];
  const width = back.right;
  const head = heading(width, TITLE, SUBTITLE);
  return {
    elements: [...head.elements, ...elements],
    zones: [next.zone, next.bff, back.zone],
    width,
  };
}
