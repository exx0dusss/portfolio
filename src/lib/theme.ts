/** localStorage key for the visitor's explicit theme choice; absent means
 *  "follow the OS". Shared by THEME_SCRIPT and the nav's ThemeToggle. */
export const THEME_KEY = "theme";

/** Runs in <head> before first paint so a saved theme never flashes the
 *  other one. Kept out of the client component so the server layout gets
 *  the string itself, not a client reference. */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}})()`;
