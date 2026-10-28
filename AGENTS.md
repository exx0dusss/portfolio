<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# UI components

Components are shadcn-style parts on Base UI. The whole site is styled with
Tailwind (CVA for variants) on the site's own tokens in
`src/styles/globals.css`; Tailwind's default theme is removed. Read
`docs/ui-patterns.md` before adding or changing anything in
`src/components/`. In short:

- Never run `shadcn init`; it overwrites the design tokens.
- One function per part, `data-slot` on each, props spread, `cn(base, className)`.
- Use the site's tokens (`bg-card`, `text-13`, `max-phone:`), never arbitrary values.
- Check styling changes with `pnpm visual` (docs/ui-patterns.md).
- Navigation that looks like a button is `ButtonLink`, not `Button`.
- Pass only data (no functions) from server components into Base UI parts.

After making changes, run `pnpm lint` and fix all errors.

# Architecture diagrams

Case-study architecture is a hand-drawn Excalidraw sketch exported to SVG.
Read `docs/diagrams.md` before adding or changing one: get the architecture
from the project's code, lay it out with the shared spacing rules in
`scripts/diagrams/sketch.mjs`, and run `pnpm diagrams` (it audits gaps and
padding, then exports desktop and mobile versions).
