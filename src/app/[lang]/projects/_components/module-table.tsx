import { Reveal } from "@/components/motion/reveal";

import type { BotModule } from "./projects-detail";

const requiresOf = (mod: BotModule) => (mod.requires.length ? mod.requires.join(", ") : "—");

/** A bot's feature modules in the order they run: each one's name, the
 *  chats it handles, the modules it requires, and what it owns. On a phone
 *  the chats and requirements fold under the name, so nothing scrolls. */
export function ModuleTable({ modules }: { modules: BotModule[] }) {
  return (
    <Reveal className="rounded-card border border-line">
      <table data-slot="module-table" className="w-full border-collapse text-left text-13">
        <thead className="text-12 text-fg-faint">
          <tr className="border-b border-line">
            <th className="px-4 py-2.5 font-normal">Module</th>
            <th className="px-4 py-2.5 font-normal max-phone:hidden">Chats</th>
            <th className="px-4 py-2.5 font-normal max-phone:hidden">Requires</th>
            <th className="px-4 py-2.5 font-normal">Owns</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((mod) => (
            <tr key={mod.name} className="border-b border-line align-top last:border-b-0">
              <td className="px-4 py-2.5">
                <span className="font-mono text-12.5 text-accent-ink">{mod.name}</span>
                <span className="mt-1 hidden font-mono text-11 leading-copy text-fg-faint max-phone:block">
                  {mod.chats} · {requiresOf(mod)}
                </span>
              </td>
              <td className="px-4 py-2.5 text-fg-dim max-phone:hidden">{mod.chats}</td>
              <td className="px-4 py-2.5 font-mono text-12 text-fg-dim max-phone:hidden">
                {requiresOf(mod)}
              </td>
              <td className="px-4 py-2.5 leading-copy text-fg-dim">{mod.owns}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  );
}
