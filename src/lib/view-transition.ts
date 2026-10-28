/** Shared `<ViewTransition name>` for a project's title, so the name in the
 *  work list and the case-study heading morph into each other. Built from
 *  the title, which both places already have. */
export function projectTitleTransition(title: string): string {
  return `project-title-${slugOf(title)}`;
}

/** The same for a project's favicon, which flies beside its title. */
export function projectIconTransition(title: string): string {
  return `project-icon-${slugOf(title)}`;
}

/** Transition type for the language switch (Link `transitionTypes`): the
 *  same page in another language, so nothing should morph. */
export const LOCALE_SWITCH = "locale-switch";

/** `share` for a project's title and favicon: morph between the work list
 *  and the case study, but not when switching language, where the element
 *  stays in place and a morph would only blur it. */
export const PROJECT_MORPH = { [LOCALE_SWITCH]: "none", default: "morph" };

function slugOf(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
