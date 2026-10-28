"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";

import { cn } from "@/lib/utils/cn";

/**
 * shadcn dropdown menu (base-nova) on Base UI, with the parts the site uses,
 * painted like the hover card's popup.
 *
 *   <DropdownMenu>
 *     <DropdownMenuTrigger aria-label="Language">EN <CaretDownIcon aria-hidden /></DropdownMenuTrigger>
 *     <DropdownMenuContent align="end">
 *       <DropdownMenuLinkItem render={<Link href="/uk" />}>Українська</DropdownMenuLinkItem>
 *     </DropdownMenuContent>
 *   </DropdownMenu>
 *
 * The trigger is a small ghost pill that takes its type from its parent
 * (font, size), so it sits in a row of text controls.
 */
function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger({ className, ...props }: MenuPrimitive.Trigger.Props) {
  return (
    <MenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      className={cn(
        "inline-flex cursor-pointer items-center gap-1 rounded-6 bg-transparent px-1.75 py-1.25 text-fg-dim transition-colors duration-150 ease-standard hover:bg-card-2 hover:text-fg data-popup-open:bg-card-2 data-popup-open:text-fg [&_svg]:size-3 [&_svg]:transition-transform [&_svg]:duration-200 [&_svg]:ease-pop data-popup-open:[&_svg]:rotate-180",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuContent({
  align = "start",
  sideOffset = 6,
  className,
  ...props
}: MenuPrimitive.Popup.Props & Pick<MenuPrimitive.Positioner.Props, "align" | "sideOffset">) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner className="z-60" align={align} sideOffset={sideOffset}>
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "min-w-40 origin-(--transform-origin) rounded-card border border-line-strong bg-card p-1 shadow-popover outline-none transition duration-160 ease-pop data-ending-style:translate-y-1 data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:translate-y-1 data-starting-style:scale-98 data-starting-style:opacity-0",
            className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

/** A menu entry that navigates; `render` swaps in a router link. The page
 *  you're on (aria-current="page") reads in full ink. */
function DropdownMenuLinkItem({ className, ...props }: MenuPrimitive.LinkItem.Props) {
  return (
    <MenuPrimitive.LinkItem
      data-slot="dropdown-menu-link-item"
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-7 px-2.5 py-2 text-13.5 text-fg-dim outline-none select-none data-highlighted:bg-card-2 data-highlighted:text-fg aria-[current=page]:text-fg [&_svg]:size-4",
        className,
      )}
      {...props}
    />
  );
}

export { DropdownMenu, DropdownMenuContent, DropdownMenuLinkItem, DropdownMenuTrigger };
