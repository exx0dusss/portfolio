import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const brandIconVariants = cva("brand-icon", {
  variants: {
    size: {
      sm: "brand-icon-sm",
      md: "",
      lg: "brand-icon-lg",
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
        <span className="brand-icon-initial">{name[0]}</span>
      )}
    </span>
  );
}

export { BrandIcon, brandIconVariants };
