import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

/**
 * Button atom. Maps the portfolio's two CTA looks (`btn-p` solid ink,
 * `btn-g` ghost outline) onto CVA variants. Styling lives in globals.css so
 * the buttons stay token-driven and identical to the approved design; CVA
 * just selects which class set to paint.
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

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
