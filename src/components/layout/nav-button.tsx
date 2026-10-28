import { cn } from "@/lib/utils/cn";

/** Round 34px icon button in the nav bar (theme toggle, menu toggle).
 *
 *   <NavButton aria-label="Open menu" onClick={toggle}><ListIcon aria-hidden /></NavButton>
 */
export function NavButton({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="nav-button"
      className={cn(
        "grid size-8.5 cursor-pointer place-items-center rounded-full bg-transparent p-0 text-fg-dim transition-colors duration-150 ease-standard hover:bg-card-2 hover:text-fg [&_svg]:size-4.5",
        className,
      )}
      {...props}
    />
  );
}
