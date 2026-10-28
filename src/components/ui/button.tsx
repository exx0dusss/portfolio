"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

/**
 * Button atoms on Base UI. Maps the portfolio's two CTA looks (`btn-p` solid
 * ink, `btn-g` ghost outline) onto CVA variants. Styling lives in globals.css
 * so the buttons stay token-driven and identical to the approved design; CVA
 * just selects which class set to paint.
 *
 * - `Button` is an action: a real `<button>` (Base UI Button).
 * - `ButtonLink` is navigation that looks like a button: an `<a>` with link
 *   semantics. Base UI's Button would give a rendered `<a>` `role="button"`,
 *   so links go through `useRender` instead.
 */
const buttonVariants = cva("btn", {
  variants: {
    variant: {
      primary: "btn-p",
      ghost: "btn-g",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

function Button({
  className,
  variant,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant }), className)}
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
  render,
  ...props
}: useRender.ComponentProps<"a"> & VariantProps<typeof buttonVariants>) {
  return useRender({
    defaultTagName: "a",
    render,
    props: {
      "data-slot": "button",
      className: cn(buttonVariants({ variant }), className),
      ...props,
    },
  });
}

export { Button, ButtonLink, buttonVariants };
