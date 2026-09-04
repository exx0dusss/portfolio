# UI conventions

Components follow the architecture's category model:

- `components/ui/` — style-only atoms; use CVA for same-markup variants and expose `data-slot`.
- `components/layout/`, `components/motion/`, and other category folders — reusable molecules and chrome.
- `app/**/_components/` — route-specific organisms and content composition.

Use semantic design tokens for colors, surfaces, borders, shadows, and typography. Define values in `src/styles/globals.css`; consume them through token variables or component classes. Keep interaction states visible with `:focus-visible`, hover, and reduced-motion behavior.

Prefer semantic HTML, one clear heading hierarchy, labelled navigation landmarks, keyboard-operable controls, useful link text, and alt text that reflects whether an image is content or decoration. Decorative visuals use `aria-hidden="true"`.

Motion is progressive enhancement. Keep content fully usable without animation and honor `prefers-reduced-motion`.
