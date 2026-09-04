# Portfolio page layout

Use one `main.shell` per route. The shell owns the readable width, page rhythm, and bottom clearance for the fixed dock. Cards are route sections, not arbitrary wrappers.

## Composition

1. Start with a labelled hero card containing one `h1` and a short lead.
2. Follow with sections ordered by user intent: work, capabilities, context, contact.
3. Keep route-specific composition in `app/**/_components/`; promote only repeated behavior to `src/components/`.
4. Use `SectionLabel` for numbered detail sections and `data-navlabel` when the scroll-spy label should differ from visible text.
5. Keep dense two-column layouts at desktop widths and collapse to one column below `760px`.

## Responsive checks

- No horizontal scrolling at 320px.
- Fixed dock does not cover the final action or footer.
- Long titles and tags wrap rather than overflow.
- Keyboard focus remains visible on links, buttons, dock items, and scroll-spy controls.
- Motion can disappear without changing content or layout.

Done means every changed route has a valid heading hierarchy, usable mobile layout, and passes `pnpm lint` plus `pnpm build`.
