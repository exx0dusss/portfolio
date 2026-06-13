import { Button } from "@/components/ui/button";

import { Backlink } from "./backlink";
import type { Openness, ProjectHeroData } from "./projects-detail";

/** Coloured access pill — maps the openness tone onto its .openness.* class. */
function OpennessBadge({ openness }: { openness: Openness }) {
  return (
    <span className={`openness ${openness.tone}`}>
      <span className="od" />
      {openness.label}
    </span>
  );
}

/**
 * Project-detail hero: backlink, icon + name, tagline, the role/dates/stack
 * meta grid (with an access badge), and optional action buttons. Shared by all
 * four project pages — only the data differs.
 */
export function ProjectHero({ icon, name, tagline, meta, openness, actions }: ProjectHeroData) {
  return (
    <header className="card p-hero">
      <Backlink />
      <div className="p-top">
        <div className="p-ico">{icon}</div>
        <div>
          <div className="p-name">{name}</div>
        </div>
      </div>
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
                  {action.label} {action.external && <span className="arrow">↗</span>}
                </a>
              </Button>
            ),
          )}
        </div>
      )}
    </header>
  );
}
