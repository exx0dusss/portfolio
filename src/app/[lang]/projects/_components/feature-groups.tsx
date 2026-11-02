import { FeatureGrid } from "./feature-grid";
import type { FeatureGroup } from "./projects-detail";

/** Feature cards in titled groups, for a project with more than one grid's
 *  worth: each group a small heading over its own FeatureGrid. */
export function FeatureGroups({ groups }: { groups: FeatureGroup[] }) {
  return (
    <div data-slot="feature-groups" className="flex flex-col gap-8">
      {groups.map((group) => (
        <div key={group.title}>
          <h3 className="mb-3.5 text-14 font-medium text-fg">{group.title}</h3>
          <FeatureGrid features={group.features} />
        </div>
      ))}
    </div>
  );
}
