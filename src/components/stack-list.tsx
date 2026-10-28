import { TechLink } from "@/components/tech-link";
import type { TechId } from "@/lib/tech";
import { cn } from "@/lib/utils/cn";

/**
 * A wrapping row of tech logo chips that link out, for the Stack tile of a
 * fact grid (project heroes, the colophon). Phones get a tighter row and
 * smaller chips, so the tile reads like the others.
 *
 *   <Fact span="full">
 *     <FactHeader>…</FactHeader>
 *     <StackList stack={["nestjs", "docker"]} />
 *   </Fact>
 */
function StackList({
  stack,
  className,
  ...props
}: React.ComponentProps<"ul"> & { stack: readonly TechId[] }) {
  return (
    <ul
      data-slot="stack-list"
      className={cn("m-0 flex list-none flex-wrap gap-2 p-0 max-phone:gap-1.5", className)}
      {...props}
    >
      {stack.map((id) => (
        <li key={id}>
          <TechLink
            id={id}
            variant="chip"
            className="max-phone:gap-1.75 max-phone:py-1 max-phone:pr-2.25 max-phone:pl-1 max-phone:text-13"
          />
        </li>
      ))}
    </ul>
  );
}

export { StackList };
