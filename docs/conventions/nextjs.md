# Next.js conventions

Next.js 16 App Router. Pages and layouts stay Server Components unless they need state, effects, event handlers, or browser APIs. Keep client boundaries narrow: `CopyEmailButton`, `PrintButton`, scroll-spy, and pathname-aware navigation are interactive islands.

Use `Link` for internal navigation and real `<a>` elements for external URLs. Set `target="_blank"` links to `rel="noopener noreferrer"`. Page metadata belongs in the owning route file or the root layout.

Route-only implementation lives in the route's private `_components/` folder. Shared UI belongs under `src/components/`; shared utilities belong under `src/lib/`. Keep global CSS imported once from `src/app/layout.tsx`.

Current site is content-first and static. No service/query layer is needed until content becomes remote or user-generated. Do not add proxy routes, auth, or caching machinery for presentational content.
