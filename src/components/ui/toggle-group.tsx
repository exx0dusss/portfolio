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
      className={cn("toggle-group", className)}
      {...props}
    />
  );
}

function ToggleGroupItem({ className, ...props }: TogglePrimitive.Props) {
  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      className={cn("toggle-group-item", className)}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem };
