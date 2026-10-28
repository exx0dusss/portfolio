// Kosmetik Profi's architecture (from its repo): the visitor's browser loads
// the pages from one NestJS app and the third parties itself; the admin edits
// the price list through the same app; NestJS and its SQLite file share one
// Docker container that Coolify rebuilds on the VPS when main changes.
import {
  arrow,
  box,
  calendar,
  centred,
  chart,
  FONT,
  GAP,
  icon,
  INK,
  person,
  pin,
  text,
  textHeight,
  textWidth,
  zone,
} from "./sketch.mjs";

const TITLE = "Kosmetik Profi";
const SUBTITLE = "how it fits together";
const THIRD_PARTIES = [
  { id: "easyweek", draw: calendar, w: 70, h: 70, label: "EasyWeek\nbooking" },
  { id: "maps", draw: pin, w: 50, h: 80, label: "Google Maps\nembed" },
  { id: "gtm", draw: chart, w: 72, h: 70, label: "Tag Manager\nanalytics" },
];
const NEST = { w: 280, h: 110, label: "NestJS\npages · API · JWT" };
const COOLIFY = { w: 280, h: 90, label: "Coolify" };
const BROWSER_W = { desktop: 176, mobile: 100 };
const DB_W = 84;
const DOCKER_W = 56;
const GIT_W = 64;
/** room for an arrow between two parts: its length plus both end gaps */
const RUN = 70;

const below = (b, gap) => b.y + b.h + gap;
const mid = (b) => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });
const end = (b, side, gap = GAP.arrow, at = 0.5) =>
  ({
    left: [b.x - gap, b.y + b.h * at],
    right: [b.x + b.w + gap, b.y + b.h * at],
    top: [b.x + b.w * at, b.y - gap],
    bottom: [b.x + b.w * at, b.y + b.h + gap],
  })[side];
/** a label centred above the middle of an arrow from a to b, lifted by
 *  the slope under its half-width so it keeps GAP.label clear of the line */
function labelAbove(id, a, b, value) {
  const w = textWidth(value, FONT.label);
  const slope = Math.abs((b[1] - a[1]) / (b[0] - a[0]));
  const y = (a[1] + b[1]) / 2 - (slope * w) / 2 - GAP.label - textHeight(value, FONT.label);
  return centred(id, (a[0] + b[0]) / 2, y, value, FONT.label, { strokeColor: INK.muted });
}
/** a label to the left of a vertical arrow */
const labelLeft = (id, a, b, value) =>
  text(id, a[0] - GAP.label - 4 - textWidth(value, FONT.label), (a[1] + b[1]) / 2 - textHeight(value, FONT.label) / 2, value, FONT.label, {
    strokeColor: INK.muted,
  });
/** a label to the right of a vertical arrow */
const labelBeside = (id, a, b, value) =>
  text(id, a[0] + GAP.label + 4, (a[1] + b[1]) / 2 - textHeight(value, FONT.label) / 2, value, FONT.label, {
    strokeColor: INK.muted,
  });

/** a captioned item: the thing, then its caption centred 12px below */
function captioned(id, part, caption, size = FONT.caption) {
  const c = centred(`${id}-caption`, mid(part.box).x, below(part.box, GAP.caption), caption, size);
  return { elements: [...part.elements, c], box: part.box, bottom: c.y + c.height };
}

/** The server side: VPS ⊃ (Docker ⊃ NestJS → SQLite) + Coolify. */
function server(x, y) {
  const els = [];
  const zones = [];
  const dockW = NEST.w + 2 * GAP.zonePad;
  const vpsW = dockW + 2 * GAP.zonePad;

  // Docker zone: title on the left, the whale on the right of the same row
  const dockX = x + GAP.zonePad;
  const vpsTitleBottom = y + GAP.zonePad + textHeight("OVHcloud VPS", FONT.zone) + GAP.zoneTitle;
  const whale = icon("docker", "whale", dockX + dockW - GAP.zonePad - DOCKER_W, vpsTitleBottom + GAP.zonePad, DOCKER_W);
  const dockInner = Math.max(vpsTitleBottom + GAP.zonePad + textHeight("docker", FONT.zone), below(whale.box, 0)) + GAP.zoneTitle;

  const nest = box("nest", dockX + GAP.zonePad, dockInner, NEST.w, NEST.h, NEST.label, {
    backgroundColor: INK.nest.fill,
    strokeColor: INK.nest.stroke,
  });
  const dbIcon = icon("database", "db", mid(nest.box).x - DB_W / 2, below(nest.box, RUN), DB_W);
  const db = captioned("db", dbIcon, "SQLite");
  const dbSub = centred("db-sub", mid(db.box).x, db.bottom + GAP.subCaption, "one file on a volume", FONT.label, {
    strokeColor: INK.muted,
  });
  const dockH = dbSub.y + dbSub.height + GAP.zonePad - vpsTitleBottom;
  const dock = zone("dock", dockX, vpsTitleBottom, dockW, dockH, "docker container", {
    strokeStyle: "dashed",
    strokeColor: INK.muted,
  });

  const coolify = box("coolify", mid(nest.box).x - COOLIFY.w / 2, vpsTitleBottom + dockH + RUN, COOLIFY.w, COOLIFY.h, COOLIFY.label, {
    backgroundColor: INK.purple,
  });
  const vps = zone("vps", x, y, vpsW, below(coolify.box, GAP.zonePad) - y, "OVHcloud VPS");
  const dockBox = { x: dockX, y: vpsTitleBottom, w: dockW, h: dockH };

  const toDb = [end(nest.box, "bottom"), end(db.box, "top")];
  const deploy = [end(coolify.box, "top"), end(dockBox, "bottom")];
  els.push(
    ...vps.elements,
    ...dock.elements,
    ...whale.elements,
    ...nest.elements,
    ...db.elements,
    dbSub,
    arrow("to-db", ...toDb),
    labelBeside("to-db-label", ...toDb, "TypeORM"),
    ...coolify.elements,
    arrow("deploy", ...deploy),
    labelBeside("deploy-label", ...deploy, "build + run"),
  );
  zones.push(vps.zone, dock.zone);
  return { elements: els, zones, nest: nest.box, coolify: coolify.box, box: { x, y, w: vpsW, h: vps.zone.h } };
}

/** A person and their browser side by side, each captioned. */
function user(id, x, y, who, what, browserW) {
  const figure = captioned(`${id}-person`, person(id, x, y), who);
  const page = captioned(`${id}-browser`, icon("browser", `${id}-browser`, x + 44 + GAP.person, y, browserW), what);
  return {
    elements: [...figure.elements, ...page.elements],
    person: figure.box,
    browser: page.box,
    bottom: Math.max(figure.bottom, page.bottom),
    right: page.box.x + page.box.w,
  };
}

function heading(width) {
  const title = centred("title", width / 2, 0, TITLE, FONT.title, { groupIds: ["heading"] });
  const sub = centred("subtitle", width / 2, below({ y: title.y, h: title.height }, 4), SUBTITLE, FONT.subtitle, {
    strokeColor: INK.muted,
    groupIds: ["heading"],
  });
  return { elements: [title, sub], bottom: sub.y + sub.height + 40 };
}

export function desktop() {
  const top = 100;
  const els = [];
  const zones = [];

  // third parties: one row each, icon in a 72px slot, caption to its right
  const rowH = 80;
  const rowGap = 32;
  const slot = 72;
  const tpW = 260;
  const tpH = GAP.zonePad + textHeight("x", FONT.zone) + GAP.zoneTitle + 3 * rowH + 2 * rowGap + GAP.zonePad;
  const tp = zone("third", 0, top, tpW, tpH, "third parties", { strokeStyle: "dashed", strokeColor: INK.muted });
  els.push(...tp.elements);
  zones.push(tp.zone);
  const rows = THIRD_PARTIES.map((item, i) => {
    const rowY = tp.inner + i * (rowH + rowGap);
    const part = item.draw(item.id, GAP.zonePad + (slot - item.w) / 2, rowY + (rowH - item.h) / 2);
    const label = text(`${item.id}-caption`, GAP.zonePad + slot + 20, rowY + (rowH - textHeight(item.label, FONT.caption)) / 2, item.label);
    els.push(...part.elements, label);
    return rowY + rowH / 2;
  });

  // people, then the server
  const peopleX = tpW + 110;
  const visitor = user("visitor", peopleX, top + 40, "visitor", "site · DE / EN", BROWSER_W.desktop);
  const admin = user("admin", peopleX, visitor.bottom + 110, "admin", "price list editor", BROWSER_W.desktop);
  const srv = server(visitor.right + 170, top);
  els.push(...visitor.elements, ...admin.elements, ...srv.elements);
  zones.push(...srv.zones);

  // GitHub, level with Coolify
  const gitIcon = icon("git-branch", "git", mid(visitor.browser).x - GIT_W / 2, mid(srv.coolify).y - 32, GIT_W);
  const git = captioned("git", gitIcon, "GitHub · main");
  els.push(...git.elements);

  // arrows
  const loads = rows.map((y) => [end(visitor.person, "left", GAP.arrow, 0.45), [tpW + GAP.arrow, y]]);
  loads.forEach((a, i) => els.push(arrow(`loads-${i}`, ...a, { strokeColor: INK.amber })));
  els.push(
    text("loads-label", tpW + GAP.arrow + 16, loads[0][1][1] - GAP.label - 20 - 24, "loads", FONT.label, { strokeColor: INK.amber }),
  );
  const pages = [end(visitor.browser, "right"), end(srv.nest, "left", GAP.arrow, 0.3)];
  const edits = [end(admin.browser, "right"), end(srv.nest, "left", GAP.arrow, 0.7)];
  const merge = [end(git.box, "right"), end(srv.coolify, "left")];
  els.push(
    arrow("pages", ...pages),
    labelAbove("pages-label", ...pages, "pages"),
    arrow("edits", ...edits),
    // under the start of the arrow, which climbs away from it
    text("edits-label", edits[0][0] + 12, edits[0][1] + GAP.label, "login + edits", FONT.label, { strokeColor: INK.muted }),
    arrow("merge", ...merge),
    labelAbove("merge-label", ...merge, "on merge"),
  );

  const width = srv.box.x + srv.box.w;
  const head = heading(width);
  return { elements: [...head.elements, ...els], zones, width };
}

export function mobile() {
  const width = 400;
  const head = heading(width);
  const top = head.bottom;
  const els = [...head.elements];
  const zones = [];

  // third parties: three cells across, captions under the icons
  const cellW = (width - 2 * GAP.zonePad) / 3;
  const iconH = 80;
  const tpInner = top + GAP.zonePad + textHeight("x", FONT.zone) + GAP.zoneTitle;
  const tpH = tpInner - top + iconH + GAP.caption + textHeight("a\nb", FONT.caption) + GAP.zonePad;
  const tp = zone("third", 0, top, width, tpH, "third parties", { strokeStyle: "dashed", strokeColor: INK.muted });
  els.push(...tp.elements);
  zones.push(tp.zone);
  THIRD_PARTIES.forEach((item, i) => {
    const cx = GAP.zonePad + cellW * (i + 0.5);
    const part = item.draw(item.id, cx - item.w / 2, tpInner + (iconH - item.h));
    els.push(...captioned(item.id, part, item.label).elements);
  });

  // people, two across, 12px from the sides
  const side = 12;
  const groupW = 44 + GAP.person + BROWSER_W.mobile;
  const gap = width - 2 * groupW - 2 * side;
  const peopleY = top + tpH + RUN + 10;
  const visitor = user("visitor", side, peopleY, "visitor", "site\nDE / EN", BROWSER_W.mobile);
  const admin = user("admin", side + groupW + gap, peopleY, "admin", "price list\neditor", BROWSER_W.mobile);
  els.push(...visitor.elements, ...admin.elements);

  const srv = server((width - (NEST.w + 4 * GAP.zonePad)) / 2, Math.max(visitor.bottom, admin.bottom) + RUN + 10);
  els.push(...srv.elements);
  zones.push(...srv.zones);

  const gitIcon = icon("git-branch", "git", width / 2 - GIT_W / 2, below(srv.box, RUN), GIT_W);
  const git = captioned("git", gitIcon, "GitHub · main");
  els.push(...git.elements);

  const loads = [end(visitor.browser, "top"), [mid(visitor.browser).x, top + tpH + GAP.arrow]];
  // straight down into the server's zone, clear of the zone titles inside it
  const pages = [[mid(visitor.browser).x, visitor.bottom + GAP.arrow], [mid(visitor.browser).x, srv.box.y - GAP.arrow]];
  const edits = [[mid(admin.browser).x, admin.bottom + GAP.arrow], [mid(admin.browser).x, srv.box.y - GAP.arrow]];
  const merge = [end(git.box, "top"), end(srv.coolify, "bottom")];
  els.push(
    arrow("loads", ...loads, { strokeColor: INK.amber }),
    labelBeside("loads-label", ...loads, "loads"),
    arrow("pages", ...pages),
    labelLeft("pages-label", ...pages, "pages"),
    arrow("edits", ...edits),
    labelLeft("edits-label", ...edits, "login + edits"),
    arrow("merge", ...merge),
    labelBeside("merge-label", ...merge, "on merge"),
  );
  return { elements: els, zones, width };
}
