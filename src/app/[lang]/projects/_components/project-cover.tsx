import { cn } from "@/lib/utils/cn";

/**
 * The framed cover shot under a project's hero, in its own full-width section.
 *
 *   <section className="card">
 *     <ProjectCover>
 *       <GalleryCover cover={COVER} />
 *     </ProjectCover>
 *   </section>
 */
export function ProjectCover({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="project-cover"
      className={cn("overflow-hidden rounded-card border border-line bg-card-2", className)}
      {...props}
    />
  );
}
