# Tymur Mustafaiev — portfolio

Personal portfolio for a Warsaw-based full-stack developer and UX/UI designer.

Built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, CVA, Lucide, and Motion.
The site is content-first: route pages are server-rendered by default, with small client islands for copy, print, navigation state, scroll-spy, and motion.

## Commands

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm check:architecture
pnpm build
pnpm studio:dev
```

## Structure

```text
src/
├── app/                       # routes + route-private _components/
├── components/
│   ├── layout/               # site chrome
│   ├── motion/               # progressive-enhancement motion
│   ├── backgrounds/          # decorative surfaces
│   └── ui/                   # CVA atoms and image primitives
├── lib/
│   ├── cms/                  # validated Sanity query boundary
│   └── utils/                # shared utilities
└── styles/globals.css        # semantic design tokens + global styles
studio-portfolio/             # Sanity Studio and content schemas
docs/
├── conventions/              # always-loaded project conventions
└── patterns/                 # load-before-work implementation specs
```

## Content editing

Content and media are managed in Sanity Studio using project `pg0p8z5s` and dataset `production`. Defaults are committed; `.env.example` and `studio-portfolio/.env.example` document optional overrides.

```bash
pnpm studio:dev
```

Open the local Studio URL, sign in, and publish changes. Run `pnpm studio:deploy` once to host Studio on Sanity (project authentication required). The website reads published documents through `src/lib/cms/` and revalidates them every 60 seconds. Repository content remains fallback; project records override matching slugs, while each non-empty CMS collection becomes authoritative for its list. See `docs/patterns/cms.md`.

Sanity setup is intentionally separate from code changes: content and assets can be edited without Git or a site rebuild; components, layout, and styling still use pull requests. See `AGENTS.md` for the context index.
