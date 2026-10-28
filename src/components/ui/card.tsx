import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const cardVariants = cva(
  "flex flex-col overflow-hidden rounded-14 border border-line bg-card text-left text-fg",
  {
    variants: {
      variant: {
        default: "",
        /** The whole card is the control (a link or a dialog trigger): it
         *  lifts on hover and presses in on click, like a button. */
        interactive:
          "cursor-pointer p-0 transition-press hover:-translate-y-0.5 hover:border-line-strong active:translate-y-0 active:scale-98",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * A bordered surface, shadcn's Card painted with the site's tokens. Renders a
 * <div>; `render` swaps the element, so a clickable card can be a button or
 * a link, or a trigger's element:
 *
 *   <Card>…</Card>
 *   <DialogTrigger render={<Card variant="interactive" render={<button type="button" />} />}>
 *     <LinkPreviewMedia src={…} />
 *     <LinkPreviewBody>…</LinkPreviewBody>
 *   </DialogTrigger>
 */
function Card({
  className,
  variant,
  render,
  ...props
}: useRender.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return useRender({
    defaultTagName: "div",
    render,
    props: {
      "data-slot": "card",
      "data-variant": variant ?? "default",
      className: cn(cardVariants({ variant }), className),
      ...props,
    },
  });
}

export { Card, cardVariants };
