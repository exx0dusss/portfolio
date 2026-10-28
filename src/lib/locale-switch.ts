import { useEffect, useState } from "react";

/**
 * Switching language shows the same page in another language, but Next mounts
 * it afresh (the [lang] segment changed), so anything that animates on mount
 * would play again: entrances, fades, the case-study banner. A switch is
 * marked when a language link is clicked and ended once the new page has
 * mounted; mount animations ask useLocaleSwitched() and start settled, and
 * anything with state to carry over hands it on in useBeforeLocaleSwitch().
 *
 * Client-side only: the server never starts a switch, so the first render
 * always matches the server HTML.
 */
let switching = false;
const beforeSwitch = new Set<() => void>();

/** Mark a language switch (a language link's onClick). */
export function startLocaleSwitch() {
  switching = true;
  for (const callback of beforeSwitch) callback();
}

/** Run `callback` when a language switch starts, while this page is still
 *  mounted: the moment to save state for the page that replaces it, which
 *  renders before this one unmounts. */
export function useBeforeLocaleSwitch(callback: () => void) {
  useEffect(() => {
    beforeSwitch.add(callback);
    return () => {
      beforeSwitch.delete(callback);
    };
  }, [callback]);
}

/** Whether this component mounted as part of a language switch. Read once,
 *  at mount. */
export function useLocaleSwitched(): boolean {
  const [switched] = useState(() => switching);
  return switched;
}

/** Ends the switch after the commit that mounted the new page. Called by a
 *  component every page mounts (the nav); effects run after the whole
 *  commit has rendered, so every component of the new page has read it. */
export function useEndLocaleSwitch() {
  useEffect(() => {
    switching = false;
  }, []);
}
