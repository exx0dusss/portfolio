<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# UI components

Components are shadcn-style parts on Base UI, styled by classes in
`src/styles/globals.css`. Read `docs/ui-patterns.md` before adding or
changing anything in `src/components/`. In short:

- Never run `shadcn init`; it overwrites the design tokens.
- One function per part, `data-slot` on each, props spread, `cn(base, className)`.
- Navigation that looks like a button is `ButtonLink`, not `Button`.
- Pass only data (no functions) from server components into Base UI parts.

After making changes, run `pnpm lint` and fix all errors.
