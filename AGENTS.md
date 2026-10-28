<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# UI components

Components are shadcn-style parts on Base UI. `src/components/ui/` is styled
with Tailwind (CVA for variants) on the tokens in `src/styles/globals.css`;
the rest of the site still uses classes from that file. Read
`docs/ui-patterns.md` before adding or changing anything in
`src/components/`. In short:

- Never run `shadcn init`; it overwrites the design tokens.
- One function per part, `data-slot` on each, props spread, `cn(base, className)`.
- Use the site's tokens (`bg-card`, `text-13`, `max-phone:`), never arbitrary values.
- Check styling changes with `pnpm visual` (docs/ui-patterns.md).
- Navigation that looks like a button is `ButtonLink`, not `Button`.
- Pass only data (no functions) from server components into Base UI parts.

After making changes, run `pnpm lint` and fix all errors.
