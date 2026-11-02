// The labels beside ExdDownloaderApp's rich download (RichMessageAnatomy in
// the case study): each slot of the bot's card named in the hand-drawn hand,
// with an arrow to its part of the message. Not a sketch of its own: it lies
// over the chat, so it is drawn in the chat's own pixels, (0, 0) being the
// chat's top-left corner. The parts' heights were measured on the page with
// the chat at its fixed 340px; change the message and they need measuring
// again.
import { arrow, FONT, GAP, INK, rect, text, textHeight } from "./sketch.mjs";

/** The bubble's right edge, where every arrow ends. */
const BUBBLE = 287;
/** Where the labels start: past the chat's edge (340px), with room for an arrow. */
const LABEL_X = 372;

/** Each slot: its label, a short line on what it holds, where its label sits
 *  and the height of the part it points at, both in the chat's pixels. */
const SLOTS = [
  { id: "title", name: "Title", sub: "<h5>: icon, then the title", label: 214, part: 214 },
  { id: "media", name: "Media", sub: "<figure>, edge to edge", label: 308, part: 308 },
  { id: "body", name: "Body", sub: "author and description", label: 404, part: 418 },
  { id: "meta", name: "Meta", sub: "views, likes, length", label: 474, part: 484 },
  { id: "footer", name: "Footer", sub: "the format's hashtag", label: 544, part: 524 },
  { id: "actions", name: "Actions", sub: "<tg-button-row> each", label: 614, part: 581 },
];

export function layout() {
  const nameH = textHeight("x", FONT.caption);
  const subH = textHeight("x", FONT.label);
  const blockH = nameH + GAP.subCaption + subH;

  const elements = [
    // pins the export's origin to the chat's corner, so the page can lay the
    // sketch straight over it
    rect("anchor-shape", 0, 0, 1, 1, { strokeColor: "transparent", opacity: 0 }),
  ];
  for (const slot of SLOTS) {
    const top = slot.label - blockH / 2;
    elements.push(
      text(`${slot.id}-label`, LABEL_X, top, slot.name, FONT.caption),
      text(`${slot.id}-sub`, LABEL_X, top + nameH + GAP.subCaption, slot.sub, FONT.label, {
        strokeColor: INK.muted,
      }),
      arrow(
        `${slot.id}-arrow`,
        [LABEL_X - GAP.arrow, slot.label],
        [BUBBLE + GAP.arrow, slot.part],
        { strokeColor: INK.amber },
      ),
    );
  }
  return { elements, zones: [] };
}
