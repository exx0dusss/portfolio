import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import {
  LinkPreview,
  LinkPreviewBody,
  LinkPreviewDescription,
  LinkPreviewFooter,
  LinkPreviewSite,
  LinkPreviewTitle,
} from "@/components/ui/link-preview";
import { initialsOf, PEOPLE, type PersonId } from "@/lib/people";

import { techLinkVariants } from "./tech-link";

/**
 * A person's name, linked to their public profile, that previews who they
 * are on hover or focus: their photo (or initials), name and role, affiliation and a line
 * about them. Styled like an inline TechLink, from the same HoverCard and
 * LinkPreview parts; data comes from src/lib/people.ts.
 *
 *   <PersonLink id="jacek-buczny" />          → "Jacek Buczny"
 *   <PersonLink id="piotr-gago">Piotr</PersonLink>
 */
function PersonLink({ id, children }: { id: PersonId; children?: React.ReactNode }) {
  const person = PEOPLE[id];

  return (
    <HoverCard>
      <HoverCardTrigger
        href={person.href}
        target="_blank"
        rel="noopener noreferrer"
        data-slot="person-link"
        // the classes are TechLink's inline variant; the rule only reads inline cva() calls
        // eslint-disable-next-line shadcn/require-static-classes
        className={techLinkVariants({ variant: "inline" })}
      >
        {children ?? person.name}
      </HoverCardTrigger>
      <HoverCardContent>
        <LinkPreview>
          <LinkPreviewBody>
            <div className="flex items-center gap-3">
              <Avatar aria-hidden>
                {person.photo && <AvatarImage src={person.photo} alt="" />}
                <AvatarFallback>{initialsOf(person.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <LinkPreviewTitle className="mt-0">{person.name}</LinkPreviewTitle>
                <div className="mt-0.5 text-12 text-fg-dim">{person.role}</div>
              </div>
            </div>
            <LinkPreviewSite className="mt-3">{person.affiliation}</LinkPreviewSite>
            <LinkPreviewDescription>{person.about}</LinkPreviewDescription>
            <LinkPreviewFooter>
              {new URL(person.href).hostname.replace(/^www\./, "")} · Opens in a new tab{" "}
              <ArrowUpRightIcon aria-hidden />
            </LinkPreviewFooter>
          </LinkPreviewBody>
        </LinkPreview>
      </HoverCardContent>
    </HoverCard>
  );
}

export { PersonLink };
