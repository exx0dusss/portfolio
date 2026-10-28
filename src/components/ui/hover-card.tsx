"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";

import { cn } from "@/lib/utils/cn";

/**
 * shadcn hover-card (base-nova) on Base UI's Preview Card: a card that opens
 * when a link is hovered or focused. Same parts and props as the registry
 * component; the surface is painted by `.hover-card` in globals.css instead of
 * utility classes, to match the site's own cards.
 */
function HoverCard({ ...props }: PreviewCardPrimitive.Root.Props) {
  return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />;
}

/** Renders an `<a>`: give it `href`, plus `target="_blank"` for external sites. */
function HoverCardTrigger({
  delay = 250,
  closeDelay = 120,
  ...props
}: PreviewCardPrimitive.Trigger.Props) {
  return (
    <PreviewCardPrimitive.Trigger
      data-slot="hover-card-trigger"
      delay={delay}
      closeDelay={closeDelay}
      {...props}
    />
  );
}

function HoverCardContent({
  className,
  side = "top",
  sideOffset = 8,
  align = "start",
  alignOffset = 0,
  collisionPadding = 16,
  ...props
}: PreviewCardPrimitive.Popup.Props &
  Pick<
    PreviewCardPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "collisionPadding"
  >) {
  return (
    <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
      <PreviewCardPrimitive.Positioner
        className="hover-card-positioner"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          className={cn("hover-card", className)}
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardContent, HoverCardTrigger };
