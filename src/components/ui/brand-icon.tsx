import { cva, type VariantProps } from "class-variance-authority";
import { createElement } from "react";

import { cn } from "@/lib/utils/cn";

const brandIconVariants = cva(
  "inline-grid flex-none place-items-center border border-line bg-card text-fg",
  {
    variants: {
      size: {
        sm: "size-5 rounded-6 [&_img]:size-2.75 [&_svg]:size-2.75",
        md: "size-8 rounded-9 [&_img]:size-4 [&_svg]:size-4",
        lg: "size-16 rounded-16 [&_img]:size-8 [&_svg]:size-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

/** The name's initial, shown when there's no logo; sized to the tile. */
const brandIconInitialVariants = cva("leading-none font-semibold", {
  variants: {
    size: {
      sm: "text-10",
      md: "text-13",
      lg: "text-26",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/** Drawing elements a mark may use (the allowlist `pnpm tech:logos` parses
 *  against). */
type MarkTag = "g" | "path" | "circle" | "ellipse" | "rect" | "polygon" | "polyline";

/** One element of a mark's drawing. */
interface MarkNode {
  tag: MarkTag;
  attrs: Record<string, string>;
  children: MarkNode[];
}

/** A one-colour mark: an SVG viewBox and its drawing as a tree of drawing
 *  elements, from the site's logo registry (src/lib/tech.ts). Rendered as
 *  React elements, never injected as HTML. */
interface BrandMark {
  viewBox: string;
  nodes: MarkNode[];
}

const MARK_TAGS = new Set<string>([
  "g",
  "path",
  "circle",
  "ellipse",
  "rect",
  "polygon",
  "polyline",
]);

/** SVG attribute names as React props: fill-rule -> fillRule. */
const reactProp = (name: string) => name.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

function renderNodes(nodes: MarkNode[]): React.ReactNode[] {
  return nodes
    .filter((node) => MARK_TAGS.has(node.tag))
    .map((node, index) => {
      const props = Object.fromEntries(
        Object.entries(node.attrs).map(([name, value]) => [reactProp(name), value]),
      );
      return createElement(node.tag, { key: index, ...props }, ...renderNodes(node.children));
    });
}

/** A logo in its own colours, with an optional version for dark backgrounds. */
interface BrandLogo {
  light: string;
  dark?: string;
}

/** The mark and the colour logo share the tile's one grid cell, so they
 *  crossfade in place. */
const LAYER = "col-start-1 row-start-1 transition-opacity duration-150 ease-standard";

/**
 * A brand logo in a square thumbnail. Every mark is single-colour, painted
 * in currentColor, so a row of them reads as one set in both themes. Without
 * a `mark` it shows the name's initial.
 *
 * Given a `logo` (the brand's own colours), it crossfades to it while the
 * nearest `group/brand` parent is hovered or keyboard-focused:
 *
 *   <a className="group/brand …"><BrandIcon name="NestJS" mark={…} logo={…} /></a>
 */
function BrandIcon({
  name,
  mark,
  logo,
  size,
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> &
  VariantProps<typeof brandIconVariants> & { name: string; mark?: BrandMark; logo?: BrandLogo }) {
  return (
    <span
      data-slot="brand-icon"
      aria-hidden
      className={cn(brandIconVariants({ size }), className)}
      {...props}
    >
      {mark ? (
        <svg
          viewBox={mark.viewBox}
          fill="currentColor"
          className={cn(
            LAYER,
            logo && "group-hover/brand:opacity-0 group-focus-visible/brand:opacity-0",
          )}
        >
          {renderNodes(mark.nodes)}
        </svg>
      ) : (
        <span className={cn(LAYER, brandIconInitialVariants({ size }))}>{name[0]}</span>
      )}
      {logo && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element -- a small local SVG logo */}
          <img
            src={logo.light}
            alt=""
            className={cn(
              LAYER,
              "opacity-0 group-hover/brand:opacity-100 group-focus-visible/brand:opacity-100",
              logo.dark && "dark:hidden",
            )}
          />
          {logo.dark && (
            // eslint-disable-next-line @next/next/no-img-element -- a small local SVG logo
            <img
              src={logo.dark}
              alt=""
              className={cn(
                LAYER,
                "hidden opacity-0 group-hover/brand:opacity-100 group-focus-visible/brand:opacity-100 dark:block",
              )}
            />
          )}
        </>
      )}
    </span>
  );
}

export { BrandIcon, type BrandLogo, type BrandMark, brandIconVariants };
