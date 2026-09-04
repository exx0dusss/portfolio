# Portfolio

Next.js 16 App Router portfolio for Tymur Mustafaiev. Content-first static pages. Keep client boundaries narrow and preserve the existing shell, tokens, and typed content modules.

`skills:`
- UI, component, or accessibility work → read `docs/conventions/ui.md`
- route, metadata, or Next.js work → read `docs/conventions/nextjs.md`
- content, project, experience, or resume work → read `docs/conventions/content.md`
- CMS schema, query, asset, or Studio work → read `docs/patterns/cms.md`
- page composition or responsive layout work → read `docs/patterns/page-layout.md`

@docs/conventions/nextjs.md
@docs/conventions/ui.md
@docs/conventions/content.md

## Read before work

| Work | Load first |
|------|------------|
| Page composition or responsive changes | `docs/patterns/page-layout.md` |
| Major component or visual-system changes | `docs/conventions/ui.md` |
| CMS schema, query, asset, or Studio changes | `docs/patterns/cms.md` |

## Checks

Run `pnpm lint`, `pnpm typecheck`, `pnpm check:architecture`, and `pnpm build` after route or component changes.

## Related docs

- `docs/conventions/` — always-loaded project rules.
- `docs/patterns/` — load-before-work page, layout, and CMS specs.
