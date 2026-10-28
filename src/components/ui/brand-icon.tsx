import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const brandIconVariants = cva(
  "inline-grid flex-none place-items-center border border-line bg-card text-fg",
  {
    variants: {
      size: {
        sm: "size-5 rounded-6 [&_svg]:size-2.75",
        md: "size-8 rounded-9 [&_svg]:size-4",
        lg: "size-16 rounded-16 [&_svg]:size-8",
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

/**
 * A brand logo in a square thumbnail. Every logo is a single-colour 24×24
 * path (Simple Icons) painted in currentColor, so a row of them reads as one
 * set in both themes. Without a `path` it shows the name's initial.
 */
function BrandIcon({
  name,
  path,
  size,
  className,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> &
  VariantProps<typeof brandIconVariants> & { name: string; path?: string }) {
  return (
    <span
      data-slot="brand-icon"
      aria-hidden
      className={cn(brandIconVariants({ size }), className)}
      {...props}
    >
      {path ? (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d={path} />
        </svg>
      ) : (
        <span className={brandIconInitialVariants({ size })}>{name[0]}</span>
      )}
    </span>
  );
}

export { BrandIcon, brandIconVariants };
