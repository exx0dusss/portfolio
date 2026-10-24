import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@/components/ui/icons";

import { Backlink } from "./backlink";
import type { Openness, ProjectHeroData } from "./projects-detail";

/** Access label with a tone dot — maps the openness tone onto .openness.*. */
function OpennessBadge({ openness }: { openness: Openness }) {
  return (
    <span className={`openness ${openness.tone}`}>
      <span className="od" />
      {openness.label}
    </span>
  );
}

/**
 * Project-detail hero: backlink, name, tagline, the role/dates/stack
 * meta grid (with an access badge), and optional action buttons. Shared by all
 * four project pages — only the data differs.
 */
export function ProjectHero({ name, tagline, meta, openness, actions }: ProjectHeroData) {
  return (
    <header className="card p-hero">
      <Backlink />
      <h1 className="p-name">{name}</h1>
      <p className="p-tag">{tagline}</p>
      <div className="p-meta">
        {meta.map((item) => (
          <div className="m" key={item.key}>
            <span className="mk">{item.key}</span>
            <span className="mv">{item.value}</span>
          </div>
        ))}
        <div className="m">
          <span className="mk">Access</span>
          <span className="mv">
            <OpennessBadge openness={openness} />
          </span>
        </div>
      </div>
      {actions && actions.length > 0 && (
        <div className="p-actions">
          {actions.map((action) =>
            action.href.startsWith("#") ? (
              <Button key={action.label} variant={action.variant} asChild>
                <a href={action.href}>{action.label}</a>
              </Button>
            ) : (
              <Button key={action.label} variant={action.variant} asChild>
                <a href={action.href} target="_blank" rel="noopener">
                  {action.label} {action.external && <ArrowUpRightIcon aria-hidden />}
                </a>
              </Button>
            ),
          )}
        </div>
      )}
    </header>
  );
}
