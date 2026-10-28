# UI patterns

How components are built in this portfolio. The site follows the
`architectures/nextjs` guideline's UI layer: **shadcn on Base UI**, with the
approved design's own CSS kept as the source of truth for how things look.

## The stack

| Piece | What it is |
| --- | --- |
| Primitives | [Base UI](https://base-ui.com) (`@base-ui/react`): behaviour and accessibility only |
| Component shape | [shadcn](https://ui.shadcn.com) conventions, `base-nova` style, configured in `components.json` |
| Styling | Hand-written classes in `src/styles/globals.css`, driven by the tokens at its top |
| Variants | `class-variance-authority` (CVA) selecting those classes |
| Class merging | `cn()` from `src/lib/utils/cn.ts` |
| Icons | Phosphor (`components/ui/icons.ts`); brand logos from Simple Icons |

### Never run `shadcn init`

`components.json` was written by hand on purpose. `shadcn init` rewrites
`globals.css`: it replaces `--accent` (the orange) with a grey, pins `--card`
to white (breaking dark mode), adds a circular `--font-sans` and global
border/outline rules, and installs packages the site doesn't use.

To use a registry component, read its Base UI source first, then write it
here following the rules below:

```bash
npx shadcn@4.21.5 view hover-card     # base-nova source, without installing
npx shadcn@4.21.5 docs hover-card     # usage and API notes
```

`shadcn add` works too (`components.json` points it at the right folders),
but swap its Tailwind classes for classes in `globals.css` before shipping.

## Where components live

| Folder | Holds | Example |
| --- | --- | --- |
| `src/components/ui/` | Generic, reusable parts with no site content | `Button`, `HoverCard`, `Fact`, `Meter` |
| `src/components/` | Site-specific compositions of `ui/` parts | `TechLink` |
| `app/**/_components/` | Pieces used by one route | `ProjectHero`, `Gallery` |

Files are kebab-case. Import UI from `@/components/ui/*`, never from
`@base-ui/react` directly outside `ui/`.

## Building a component

Every `ui/` component follows the shadcn composition rules:

1. **One function per part.** A component with structure exports its parts
   (`Facts`, `Fact`, `FactHeader`, `FactIcon`, `FactLabel`, `FactValue`,
   `FactDescription`) instead of taking a big config object. Callers compose
   only what they need.
2. **`data-slot` on every part**, named after the part in kebab-case
   (`data-slot="fact-header"`). State goes in data attributes too
   (`data-span="full"`, `data-filled`).
3. **Spread the rest of the props** onto the element, and type them with
   `React.ComponentProps<"div">` or the primitive's `Props`
   (`ButtonPrimitive.Props`, `PreviewCardPrimitive.Popup.Props`).
4. **Merge `className` last**: `cn("fact-header", className)`, so callers can
   add layout classes.
5. **Variants through CVA**, exported next to the component
   (`buttonVariants`, `brandIconVariants`, `techLinkVariants`).
6. **A doc comment with a usage example** at the top of each component.

```tsx
function FactHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="fact-header" className={cn("fact-header", className)} {...props} />;
}
```

### Styling

- Each part's class matches its slot: `data-slot="link-preview-title"` →
  `.link-preview-title` in `globals.css`. Group a component's rules under a
  `/* ---------- name (ui/file) ---------- */` header.
- Colours, radii and shadows come from the tokens (`var(--fg)`,
  `var(--line)`, `var(--radius-card)`, `rgb(var(--shadow-rgb) / 0.18)`), so
  light and dark mode work without extra rules.
- Callers may add **layout** utilities only (`mt-6`, `w-full`); appearance
  belongs inside the component. That's what `@shadcn/lint`'s `no-restyle`
  enforces (see [Lint](#lint)).
- A dynamic value goes in through a CSS custom property, not an inline
  style: `Facts` sets `--fact-cols` and the CSS reads it.
- Phone rules (`@media (max-width: 760px)`) go **after** the component's base
  rules. With equal specificity the later rule wins, so a media block placed
  above the base rules is silently ignored. Phones get tighter spacing, not
  a different layout.

## Base UI rules of thumb

- **Actions vs links.** `Button` is a real `<button>`. Anything that
  navigates is a `ButtonLink`, which renders an `<a>` with link semantics:

  ```tsx
  <Button onClick={() => window.print()}>Print</Button>
  <ButtonLink href="/cv.pdf" download>Download PDF</ButtonLink>
  <ButtonLink render={<Link href="/resume" />} variant="ghost">Résumé</ButtonLink>
  ```

  Don't use `<Button render={<a />} nativeButton={false}>`: Base UI then
  gives the link `role="button"`, so screen readers announce a button.
- **`render` replaces Radix's `asChild`.** Pass the element to render as;
  Base UI merges props, classes and refs onto it.
- **Server → client props.** Base UI parts are client components. From a
  server component, pass data, never functions: `Meter` takes
  `aria-valuetext="Very easy, 1 of 5"`, not `getAriaValueText={() => …}`.
- **Animate with Base UI's state attributes**, not mount keyframes:
  `[data-starting-style]` and `[data-ending-style]` on the popup give enter
  and exit transitions (see `.hover-card`).
- Base UI's Meter adds a visually hidden `<span role="presentation">x</span>`
  for screen readers. It's expected; don't style or remove it.

## Recipes

### Tech links with previews

`<TechLink id="nestjs" />` renders an inline link that previews the site on
hover or focus and opens it in a new tab. `variant="chip"` gives the logo
chip used in the project stack row.

To add a technology:

1. Add it to `src/lib/tech-links.json` (`name`, `href`; optional `title` or
   `description` when the site's own are poor or the site blocks scripts).
2. Add its Simple Icons logo to `ICONS` in `src/lib/tech.ts`, if one exists.
   Without one, `BrandIcon` shows the initial.
3. Run `pnpm links:previews`. It saves title, description and a 640×336
   image to `src/lib/link-previews.json` and `public/link-previews/`. The site
   never calls these hosts at runtime.

### Project facts

`ProjectHero` builds its tiles from `ui/fact` and `ui/meter`. Pages pass
data: `meta` (`key`, `value`, optional `sub`), `difficulty` (`level` 1–5 and
a `label`), `openness`, and `stack` (tech ids). Tile icons come from
`FACT_ICONS` by label; the column count keeps rows even.

### Gallery

`Gallery` takes `{ placeholder, wide?, src?, alt? }` items. Tiles with a
`src` open `ui/lightbox`: a fullscreen viewer on
`yet-another-react-lightbox` with a title and "2 of 4" header, round outline
buttons, and a thumbnail strip. Swipe, arrow keys, zoom (pinch, scroll,
double-tap), and Esc, swipe down or the backdrop to close.

- It's dark in both themes: screenshots read best on dark.
- The backdrop and blur sit on the root `.lightbox`, so they cover the
  thumbnail strip too; inner layers stay transparent.
- The active thumbnail's ring is the only accent in the view.
- The carousel is finite: a short set has a start and an end, and each
  image appears in the strip once.
- Style it through the `--yarl__*` variables on `.lightbox`. Phones drop the
  arrows (swipe instead) and the slide padding.

To reuse it elsewhere:

```tsx
const [index, setIndex] = useState(-1);
<Lightbox slides={[{ src, alt, title }]} index={index} onClose={() => setIndex(-1)} />
```

On a project page, pass the cover to `Gallery` too (`cover={COVER}`) and
render it with `GalleryCover`: the cover becomes slide 1, and
`OpenGalleryButton` (in the hero's `extraActions`) opens the same set. The
open index lives in a small shared store in `gallery.tsx`, because the
cover, the hero button and the gallery render in different parts of the
page.

### Live preview

`<LivePreview url="https://…" />` is a "Try it live" button that opens the
real site in a `ui/dialog`, framed as Desktop (1440×900) or Phone (390×844)
and scaled to fit (`ui/toggle-group` switches them). The iframe only exists
while the dialog is open, so the page loads nothing from the site until a
visitor asks. Check the site sends no `X-Frame-Options` or CSP
`frame-ancestors` header first, or the frame stays blank.

### Empty states

`ui/empty` (`Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`,
`EmptyDescription`, `EmptyContent`) is for "nothing here yet". Always give
it a way forward in `EmptyContent`, as the About page does with links to the
work and the résumé. Use `EmptyMedia variant="icon"` with a Phosphor icon
(the About page uses `CraneTowerIcon`), so the illustration matches the
site's icon set.

### Project SEO and preview cards

Each case study's metadata comes from `projectMetadata(SEO)` and its
structured data from `<ProjectStructuredData {...SEO} />`, both in
`projects/_components/project-seo.tsx`. `SEO` is `{ slug, title,
description }`; keep the description around 150 characters.

The preview card is the folder's `opengraph-image.tsx`, which calls
`renderProjectCard(slug)`. It reads the project's favicon and `cardImage`
from `PROJECTS` and the one-liner and facets from the English dictionary.
`cardImage` must be PNG or JPEG: the card generator can't read WebP. One
1200×630 card serves Open Graph (Facebook, LinkedIn, WhatsApp, Telegram,
Slack, Discord, iMessage, Mastodon) and the X card.

Satori (the card generator) quirks: spaces in long text come out uneven,
so text that wraps goes through `Words`; and a tightly tracked name is
measured too wide, so nothing sits right after the title.

### Page transitions

`experimental.viewTransition` is on in `next.config.ts`, so route changes
crossfade. A project's name also morphs from its row in the work list into
the case-study heading: both are wrapped in React's `<ViewTransition>` with
`name={projectTitleTransition(title)}` and `share="morph"` (styles under
`::view-transition-group(.morph)`).

React only morphs when **both** elements are in the viewport at the moment
of the update. A row you had to scroll to falls back to the crossfade, since
the new page's heading is still off-screen until Next scrolls to the top.
That's expected, not a bug. Reduced motion turns all of it off.

## Troubleshooting

**A CSS change doesn't show up in `pnpm dev`.** Turbopack can keep serving
an old `globals.css`, even across restarts, especially after the file was
rewritten by a script rather than saved from an editor. Check what is
served (`curl` the CSS chunk and search for the rule). If it's stale, stop
the dev server, wait until it has exited, delete `.next/dev`, and start it
again.

## Lint

`@shadcn/lint` runs with the rest of ESLint. Run everything with:

```bash
pnpm lint
```

Enabled in `eslint.config.mjs` for `src/`:

| Rule | What it enforces here |
| --- | --- |
| `no-arbitrary-values` | No off-scale values like `mt-[13px]`; use the theme scale |
| `no-restyle` (`allow: ["layout"]`) | Pages may add layout classes (`mt-6`, `w-full`) to a component, not restyle it. A component placed somewhere special is styled by its parent's CSS (`.brand .face-icon`) |
| `require-static-classes` | Class names must be readable static strings, not built like `` `bg-${tone}` `` |

`no-restyle` and `require-static-classes` are off inside `src/components/`,
where components style themselves and call their own variant functions.

Not enabled, from a dry run in October 2026:

| Rule | Findings | Why not |
| --- | --- | --- |
| `no-raw-colors` | 5 | All in `app/apple-icon.tsx`, which draws a PNG and needs literal colours |
| `no-inline-styles` | 66 | Mostly OG and icon images (inline-only by design), plus `ImageSlot` sizing |
| `no-unknown-classes` | 99 | Reports the site's own classes from `globals.css`; not usable as is |

Rules and options: <https://github.com/shadcn-ui/lint#rules>.
