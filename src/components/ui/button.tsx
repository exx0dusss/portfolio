"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

/**
 * Button atoms on Base UI, styled with Tailwind through CVA.
 *
 * - `Button` is an action: a real `<button>` (Base UI Button).
 * - `ButtonLink` is navigation that looks like a button: an `<a>` with link
 *   semantics. Base UI's Button would give a rendered `<a>` `role="button"`,
 *   so links go through `useRender` instead.
 *
 *   <Button onClick={save}>Save</Button>
 *   <ButtonLink href="/cv.pdf" variant="ghost" size="sm">CV</ButtonLink>
 */
const buttonVariants = cva(
  "inline-flex cursor-pointer items-center gap-2 rounded-full font-medium whitespace-nowrap transition-press hover:-translate-y-0.5 active:translate-y-0 active:scale-94 active:duration-100 [&_svg]:size-4",
  {
    variants: {
      variant: {
        /** Solid ink. */
        primary: "bg-fg text-bg hover:bg-ink-hover",
        /** Outlined, transparent. */
        ghost: "bg-transparent text-fg inset-ring inset-ring-line-strong hover:inset-ring-fg-faint",
      },
      size: {
        default: "px-4.25 py-2.75 text-14",
        sm: "px-3.5 py-2 text-13",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

/**
 *   <ButtonLink href="/cv.pdf" download>CV</ButtonLink>
 *   <ButtonLink render={<Link href="/resume" />} variant="ghost">Résumé</ButtonLink>
 */
function ButtonLink({
  className,
  variant,
  size,
  render,
  ...props
}: useRender.ComponentProps<"a"> & VariantProps<typeof buttonVariants>) {
  return useRender({
    defaultTagName: "a",
    render,
    props: {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size }), className),
      ...props,
    },
  });
}

export { Button, ButtonLink, buttonVariants };
