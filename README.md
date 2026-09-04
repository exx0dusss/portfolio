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
├── lib/utils/                # shared utilities
└── styles/globals.css        # semantic design tokens + global styles
docs/
├── conventions/              # always-loaded project conventions
└── patterns/                 # load-before-work implementation specs
```

Content stays typed and close to its owning route. Shared rendering is promoted only when the same behavior is needed by multiple routes. See `AGENTS.md` for the context index.
