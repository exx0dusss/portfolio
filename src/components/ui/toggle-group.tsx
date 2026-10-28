"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";

import { cn } from "@/lib/utils/cn";

/**
 * Segmented control on Base UI's ToggleGroup: one pressed item at a time
 * unless `multiple`. The pressed item is marked `data-pressed`.
 *
 *   <ToggleGroup value={[view]} onValueChange={([next]) => next && setView(next)}>
 *     <ToggleGroupItem value="desktop">Desktop</ToggleGroupItem>
 *     <ToggleGroupItem value="phone">Phone</ToggleGroupItem>
 *   </ToggleGroup>
 */
function ToggleGroup({ className, ...props }: ToggleGroupPrimitive.Props) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      className={cn(
        "inline-flex gap-0.5 rounded-full border border-line bg-card-2 p-0.75",
        className,
      )}
      {...props}
    />
  );
}

function ToggleGroupItem({ className, ...props }: TogglePrimitive.Props) {
  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      className={cn(
        "cursor-pointer rounded-full bg-transparent px-3.25 py-1.5 text-13 font-medium text-fg-dim transition duration-150 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent data-pressed:bg-card data-pressed:text-fg data-pressed:shadow-pressed",
        className,
      )}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem };
