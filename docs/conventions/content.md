# Content conventions

Sanity is the source of truth for published portfolio content and media. The Studio owns projects, roles, education, certificates, books, site settings, images, and downloadable files. `src/lib/cms/` owns queries and validation; route composition maps CMS records into existing view models. Shared leaf components receive plain props.

Stable identifiers are required for mapped content. Write in first person, concrete verbs, and short paragraphs. Lead with the user's outcome, then explain the system or decision behind it. Confidential work describes the contribution without inventing private details.

External destinations must be real URLs. A missing destination is omitted or replaced with an intentional contact action; never ship a dead `#` link. Code, layout, and styling remain Git-owned and require a pull request.
