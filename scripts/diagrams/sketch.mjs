// Building blocks for the hand-drawn architecture sketches (docs/diagrams.md):
// Excalidraw elements laid out from shared spacing rules, library icons placed
// and scaled, and an audit that fails the build on overlaps or broken padding.
// Project layouts (./<slug>.mjs) compose these; scripts/diagrams.mjs exports.
import { readFileSync } from "node:fs";
import path from "node:path";

/** Spacing rules, in diagram px. Every gap in a sketch comes from here. */
export const GAP = {
  /** icon or box → its caption below */
  caption: 12,
  /** caption → its grey sub-caption */
  subCaption: 4,
  /** zone border → anything inside it */
  zonePad: 24,
  /** zone title → the zone's first content */
  zoneTitle: 16,
  /** arrow end → the shape it points at */
  arrow: 10,
  /** arrow → its label */
  label: 8,
  /** stick figure → its browser */
  person: 24,
  /** minimum clearance between unrelated things (audited) */
  clear: 8,
};

export const FONT = { title: 34, subtitle: 20, zone: 20, box: 22, caption: 18, label: 16 };
const LINE_HEIGHT = 1.25;
/** Excalifont's average glyph width, as a share of the font size (estimates
 *  only: centred text is centred by Excalidraw, so this sizes the audit) */
const GLYPH = 0.55;

export const INK = {
  text: "#1e1e1e",
  muted: "#757575",
  amber: "#b45309",
  nest: { stroke: "#c2255c", fill: "#ffc9c9" },
  purple: "#d0bfff",
  orange: "#ffd8a8",
  red: "#ffc9c9",
  blue: "#a5d8ff",
};

const ROUGH = 2;

/** A stable seed per id, so re-exports draw the same wobbles (clean diffs). */
function seed(id) {
  let h = 2166136261;
  for (const c of id) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}

function base(type, id, x, y, width, height, props) {
  return {
    type,
    id,
    x,
    y,
    width,
    height,
    angle: 0,
    strokeColor: INK.text,
    backgroundColor: "transparent",
    fillStyle: "hachure",
    strokeWidth: 2,
    strokeStyle: "solid",
    roughness: ROUGH,
    opacity: 100,
    groupIds: [],
    seed: seed(id),
    ...props,
  };
}

export const textHeight = (text, size) => text.split("\n").length * size * LINE_HEIGHT;
export const textWidth = (text, size) =>
  Math.max(...text.split("\n").map((line) => line.length)) * size * GLYPH;

/** Text whose top-left is (x, y). */
export function text(id, x, y, value, size = FONT.caption, props = {}) {
  return base("text", id, x, y, textWidth(value, size), textHeight(value, size), {
    text: value,
    originalText: value,
    fontSize: size,
    fontFamily: 5,
    textAlign: "left",
    verticalAlign: "top",
    lineHeight: LINE_HEIGHT,
    strokeWidth: 1,
    ...props,
  });
}

/** Text centred on cx, top at y. */
export function centred(id, cx, y, value, size = FONT.caption, props = {}) {
  const w = textWidth(value, size);
  return text(id, cx - w / 2, y, value, size, { textAlign: "center", ...props });
}

export function rect(id, x, y, w, h, props = {}) {
  return base("rectangle", id, x, y, w, h, { roundness: { type: 3 }, ...props });
}

export function ellipse(id, x, y, w, h, props = {}) {
  return base("ellipse", id, x, y, w, h, props);
}

export function line(id, x, y, points, props = {}) {
  const xs = points.map(([px]) => px);
  const ys = points.map(([, py]) => py);
  return base("line", id, x, y, Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys), {
    points,
    ...props,
  });
}

export function arrow(id, from, to, props = {}) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  return base("arrow", id, x1, y1, Math.abs(x2 - x1), Math.abs(y2 - y1), {
    points: [
      [0, 0],
      [x2 - x1, y2 - y1],
    ],
    endArrowhead: "arrow",
    startArrowhead: null,
    ...props,
  });
}

/** Bounding box of a list of elements (arrows and lines by their points). */
export function bbox(elements) {
  const xs = [];
  const ys = [];
  for (const e of elements) {
    if (e.points) {
      for (const [px, py] of e.points) {
        xs.push(e.x + px);
        ys.push(e.y + py);
      }
    } else {
      xs.push(e.x, e.x + e.width);
      ys.push(e.y, e.y + e.height);
    }
  }
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  return { x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y };
}

const ICONS = JSON.parse(
  readFileSync(path.join(import.meta.dirname, "icons.excalidrawlib"), "utf8"),
).libraryItems;

/** A library icon (icons.excalidrawlib) scaled to `width`, top-left at (x, y),
 *  grouped under `id`. Returns { elements, box }. */
export function icon(name, id, x, y, width) {
  const source = ICONS.find((item) => item.name === name).elements;
  const from = bbox(source);
  const k = width / from.w;
  const elements = source.map((e, n) => {
    const placed = {
      ...e,
      id: `${id}-${n}`,
      seed: seed(`${id}-${n}`),
      x: x + (e.x - from.x) * k,
      y: y + (e.y - from.y) * k,
      width: e.width * k,
      height: e.height * k,
      groupIds: [id],
      boundElements: null,
    };
    if (e.points) placed.points = e.points.map(([px, py]) => [px * k, py * k]);
    return placed;
  });
  return { elements, box: { x, y, w: from.w * k, h: from.h * k } };
}

/** Group hand-drawn parts as one figure, so the audit treats it as one. */
export function figure(id, elements) {
  const grouped = elements.map((e) => ({ ...e, groupIds: [id] }));
  return { elements: grouped, box: bbox(grouped) };
}

/** A stick figure whose box starts at (x, y): 44 × 107. */
export function person(id, x, y) {
  const cx = x + 22;
  return figure(id, [
    ellipse(`${id}-head`, cx - 15, y, 30, 30),
    line(`${id}-body`, cx, y + 30, [[0, 0], [0, 45]]),
    line(`${id}-arms`, cx - 22, y + 46, [[0, 0], [44, 0]]),
    line(`${id}-leg1`, cx, y + 75, [[0, 0], [-16, 32]]),
    line(`${id}-leg2`, cx, y + 75, [[0, 0], [16, 32]]),
  ]);
}

/** A calendar: 70 × 70 (rings included). */
export function calendar(id, x, y) {
  return figure(id, [
    rect(`${id}-page`, x, y + 10, 70, 60, { backgroundColor: INK.orange }),
    line(`${id}-bar`, x, y + 27, [[0, 0], [70, 0]]),
    line(`${id}-ring1`, x + 17, y, [[0, 0], [0, 18]]),
    line(`${id}-ring2`, x + 53, y, [[0, 0], [0, 18]]),
  ]);
}

/** A map pin: 50 × 80. */
export function pin(id, x, y) {
  return figure(id, [
    ellipse(`${id}-head`, x, y, 50, 50, { backgroundColor: INK.red }),
    line(`${id}-l`, x + 3, y + 36, [[0, 0], [22, 44]]),
    line(`${id}-r`, x + 47, y + 36, [[0, 0], [-22, 44]]),
    ellipse(`${id}-dot`, x + 18, y + 18, 14, 14, { backgroundColor: "#ffffff", fillStyle: "solid" }),
  ]);
}

/** A bar chart: 72 × 70. */
export function chart(id, x, y) {
  return figure(id, [
    rect(`${id}-b1`, x + 8, y + 38, 14, 30, { backgroundColor: INK.blue }),
    rect(`${id}-b2`, x + 28, y + 18, 14, 50, { backgroundColor: INK.blue }),
    rect(`${id}-b3`, x + 48, y, 14, 68, { backgroundColor: INK.blue }),
    line(`${id}-base`, x, y + 70, [[0, 0], [72, 0]]),
  ]);
}

/** A labelled box (label centred inside). Returns { elements, box }. */
export function box(id, x, y, w, h, label, props = {}) {
  const size = FONT.box;
  const label_ = centred(`${id}-label`, x + w / 2, y + (h - textHeight(label, size)) / 2, label, size);
  return figure(id, [rect(`${id}-shape`, x, y, w, h, props), label_]);
}

/** A zone: rounded outline with its title inside the top-left padding.
 *  `inner` is where its content may start. */
export function zone(id, x, y, w, h, title, props = {}) {
  const titleEl = text(`${id}-title`, x + GAP.zonePad, y + GAP.zonePad, title, FONT.zone, {
    strokeColor: props.strokeColor ?? INK.text,
  });
  return {
    elements: [rect(`${id}-shape`, x, y, w, h, props), titleEl],
    zone: { id, x, y, w, h },
    inner: y + GAP.zonePad + textHeight(title, FONT.zone) + GAP.zoneTitle,
  };
}

/* ── audit ─────────────────────────────────────────────────────────── */

/** the part an element belongs to: its group, else its id without the role
 *  suffix (so a caption and sub-caption count with the thing they name) */
const owner = (e) => e.groupIds?.[0] ?? e.id.replace(/-(label|title|shape|caption|sub)$/, "");

function rectOf(e) {
  if (e.type === "text" && e.textAlign === "center") return { x: e.x, y: e.y, w: e.width, h: e.height };
  return bbox([e]);
}

function distance(a, b) {
  const dx = Math.max(a.x - (b.x + b.w), b.x - (a.x + a.w), 0);
  const dy = Math.max(a.y - (b.y + b.h), b.y - (a.y + a.h), 0);
  return Math.hypot(dx, dy);
}

const inside = (a, b) => a.x >= b.x && a.y >= b.y && a.x + a.w <= b.x + b.w && a.y + a.h <= b.y + b.h;

/** Checks a layout: zone content keeps the zone padding; texts and shapes of
 *  different parts keep GAP.clear apart; arrows don't run through text.
 *  Returns a list of problems (empty when clean). */
export function audit(elements, zones) {
  const problems = [];
  const zoneShapes = new Set(zones.map((z) => `${z.id}-shape`));
  const parts = elements.filter((e) => e.type !== "arrow" && !zoneShapes.has(e.id));

  for (const z of zones) {
    const padded = { x: z.x + GAP.zonePad - 1, y: z.y + GAP.zonePad - 1, w: z.w - 2 * GAP.zonePad + 2, h: z.h - 2 * GAP.zonePad + 2 };
    for (const e of parts) {
      const r = rectOf(e);
      const overlaps = distance(r, z) === 0;
      if (overlaps && !inside(r, padded) && inside(r, z)) problems.push(`${e.id}: inside ${z.id} but within its padding`);
      if (overlaps && !inside(r, z) && !inside(z, r) && distance(r, padded) === 0)
        problems.push(`${e.id}: crosses the border of ${z.id}`);
    }
  }

  for (let i = 0; i < parts.length; i += 1) {
    for (let j = i + 1; j < parts.length; j += 1) {
      const a = parts[i];
      const b = parts[j];
      if (owner(a) === owner(b)) continue;
      const ra = rectOf(a);
      const rb = rectOf(b);
      if (inside(ra, rb) || inside(rb, ra)) continue; // a zone-like container and its content
      const d = distance(ra, rb);
      if (d < GAP.clear) problems.push(`${a.id} ↔ ${b.id}: ${d.toFixed(1)}px apart`);
    }
  }

  const texts = elements.filter((e) => e.type === "text");
  for (const a of elements.filter((e) => e.type === "arrow")) {
    const [[, ], [dx, dy]] = a.points;
    for (let t = 0.08; t <= 0.92; t += 0.04) {
      const p = { x: a.x + dx * t, y: a.y + dy * t, w: 0, h: 0 };
      const hit = texts.find((e) => distance(p, rectOf(e)) < 2);
      if (hit) {
        problems.push(`${a.id} runs through ${hit.id}`);
        break;
      }
    }
  }
  return problems;
}
