# Architecture sketches

Case studies explain a project's architecture with a hand-drawn sketch: real
boxes and arrows taken from the project's code, drawn in Excalidraw's style,
exported to static SVG. Kosmetik Profi is the reference; follow it for every
new project.

```bash
pnpm diagrams                 # audit and export every sketch
pnpm diagrams kosmetik-profi  # just one
```

## How it fits together

| Piece | What it does |
| --- | --- |
| `scripts/diagrams/<slug>.mjs` | The project's layout: a `desktop()` and a `mobile()` function returning Excalidraw elements |
| `scripts/diagrams/sketch.mjs` | Shared building blocks: spacing rules (`GAP`), fonts, colours, shapes, figures, library icons, the audit |
| `scripts/diagrams/icons.excalidrawlib` | The library icons in use, from [excalidraw-libraries](https://github.com/excalidraw/excalidraw-libraries) (MIT); each item names its source library |
| `scripts/diagrams.mjs` | Audits every layout, then renders it with Excalidraw's exporter (`@excalidraw/utils`, pinned) in the installed Chrome |
| `public/diagrams/<slug>.svg`, `<slug>.mobile.svg` | The output: transparent, the hand-drawn font embedded, no outside requests |
| `src/lib/diagrams.json` | Each SVG's size, written by the export, so the page reserves the space |
| `SketchDiagram` (`projects/_components`) | Shows the sketch: wide one above 1040px, tall one below, inverted for dark mode |

The site never loads Excalidraw; the SVGs are plain images.

## Get the architecture right first

Read the project's own code before drawing; the sketch is a claim about it.
Draw only connections that exist:

- **Who talks to what.** Third-party widgets loaded by the browser (booking
  links, map embeds, analytics) hang off the *browser*, not the server.
- **Containment, not steps.** Hosting is a box around what runs in it (VPS ⊃
  container ⊃ app + database), never a column after the database.
- **One arrow per real call**, labelled with what flows (`pages`,
  `login + edits`, `TypeORM`, `on merge`).

## Layout

Lay out in bands, left to right on desktop and top to bottom on mobile:
outside services → people and their browsers → the server zone (with deploy
below it). Position everything from the boxes before it and the `GAP` rules
(`below()`, `end()`, `captioned()` in the Kosmetik layout); no free-floating
coordinates.

| Rule (`GAP`) | px | Between |
| --- | --- | --- |
| `caption` | 12 | an icon or box and its caption |
| `subCaption` | 4 | a caption and its grey sub-caption |
| `zonePad` | 24 | a zone's border and anything inside |
| `zoneTitle` | 16 | a zone's title and its first content |
| `arrow` | 10 | an arrow's end and what it points at |
| `label` | 8 | an arrow and its label |
| `person` | 24 | a stick figure and its browser |
| `clear` | 8 | any two unrelated things (audited) |

- **Sizes:** title 34, subtitle 20, zone titles 20, boxes 22, captions 18,
  arrow labels 16 (grey). Captions sit under their icon, centred.
- **Labels never sit on arrows:** above a sloped arrow (lifted by its slope),
  beside a vertical one. Arrows stop at zone edges rather than cross a zone's
  title.
- **Desktop** is drawn ~1200 wide and shown near 1:1 across the whole section.
  **Mobile** is drawn **400 wide** (shown at ~75% on a 375px phone): break
  long captions onto two lines and keep 12px side margins.

The audit (`audit()` in `sketch.mjs`) fails the export when zone content
breaks the padding, unrelated parts sit under 8px apart, or an arrow runs
through text. Fix the layout until both versions pass; never loosen the rules.

## Style

- Hand-drawn: roughness 2, hatched fills, Excalifont. Seeds come from element
  ids, so re-exports draw the same wobbles.
- Few colours, each with a meaning: ink for structure, grey (`INK.muted`) for
  zones of outside things and for labels, amber for what the browser loads,
  the project's own colour on its main app (NestJS's pink), purple for deploy.
- Library icons for things with a well-known face (browser window, database,
  Docker, git branch); simple drawn figures (`calendar`, `pin`, `chart`,
  `person`) for the rest. Strip a library icon's own captions and fake logos.

### Adding an icon

1. Find it on [libraries.excalidraw.com](https://libraries.excalidraw.com)
   (the index is `libraries.json` in the excalidraw-libraries repo).
2. Download that `.excalidrawlib`, copy the item's elements (text removed)
   into `icons.excalidrawlib` with a `name` and a `source`, and place it with
   `icon(name, id, x, y, width)`.

## On the page

```tsx
<SketchDiagram
  slug="kosmetik-profi"
  alt="Architecture sketch. A visitor's browser gets its pages from…"
  note="// one server, one database file — sized for a single practice"
/>
```

It spans the whole `Section` below its label (`data-span="full"`). The `alt`
says in words everything the sketch shows. After changing a layout, run
`pnpm diagrams`, check both sizes on the page in light and dark, and commit
the SVGs with `diagrams.json`.
