# Sanity CMS

Sanity project `pg0p8z5s`, dataset `production`, owns published portfolio content and media. Source boundary lives in `src/lib/cms/`; Studio lives in `studio-portfolio/`.

## Ownership

Sanity owns:

- global hero, about, contact, technology stack, social links, portrait, and résumé PDF;
- page headings and lead copy;
- projects, project images, rich-text details, features, and architecture diagrams;
- experience, education, certificates, certificate images, books, and book covers.

Git owns components, routes, layout, visual styling, schemas, and query contracts.

## Editing

Run `pnpm studio:dev`, authenticate in browser, edit document, then publish. Website reads published perspective and refreshes cached content within 60 seconds. Drafts stay private.

Existing repository content remains fallback. Project documents override matching slugs; new project slugs use `app/projects/[slug]`. Once any experience, education, certificate, or book documents are published, that CMS collection replaces its corresponding fallback list.

## Contracts

- Add fields in Studio schema and GROQ query together.
- Validate every query result in `src/lib/cms/repository.ts` before rendering.
- Keep Sanity types out of shared leaf components; map records into existing view models at route composition seams.
- Uploaded images require descriptive alt text at render seam. Uploaded files expose direct asset URLs.
- Published CMS failure must degrade to repository fallback instead of breaking build.

## Verification

Run `pnpm lint`, `pnpm typecheck`, `pnpm check:architecture`, `pnpm build`, and `pnpm studio:build`.
