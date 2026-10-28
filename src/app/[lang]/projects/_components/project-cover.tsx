import { cn } from "@/lib/utils/cn";

/**
 * The framed cover shot under a project's hero, in its own full-width section.
 *
 *   <Section>
 *     <ProjectCover>
 *       <GalleryCover cover={COVER} />
 *     </ProjectCover>
 *   </Section>
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
