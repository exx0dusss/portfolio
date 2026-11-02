"use client";
// Client component on purpose, like link-preview: the photo is requested only
// once the avatar renders in the browser (for PersonLink, when its card
// opens), and the fallback shows until it has loaded.

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";

import { cn } from "@/lib/utils/cn";

/**
 * shadcn avatar (base-nova) on Base UI's Avatar, on the site's tokens: a
 * round photo with a fallback while it loads or if it fails.
 *
 *   <Avatar>
 *     <AvatarImage src="/people/jacek-buczny.webp" alt="" />
 *     <AvatarFallback>JB</AvatarFallback>
 *   </Avatar>
 */
function Avatar({ className, ...props }: AvatarPrimitive.Root.Props) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full border border-line select-none",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "grid size-full place-items-center bg-card-2 text-13 font-medium text-fg-dim",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage };
