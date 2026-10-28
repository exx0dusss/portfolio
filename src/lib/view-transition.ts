/** Shared `<ViewTransition name>` for a project's title, so the name in the
 *  work list and the case-study heading morph into each other. Built from
 *  the title, which both places already have. */
export function projectTitleTransition(title: string): string {
  return `project-title-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}
