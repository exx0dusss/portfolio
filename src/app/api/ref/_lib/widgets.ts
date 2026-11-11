/**
 * The two Telegram widgets ref links use (Bot API 10.4, HTML widgets): one
 * per visit, listing its events as they arrive, and the /stats table with a
 * Refresh button. A widget's code is fixed when it is sent; afterwards only
 * its chat data and caption change. Each caption says the same thing in
 * text, for an app that doesn't draw widgets.
 *
 * Native look: Telegram's theme variables, system type, the client's own
 * button. Code stays small: Telegram allows 32 KB, 4 KB compressed.
 */
import { escapeHtml } from "./telegram";
import type { Stats, Visit } from "./visits";

const STYLE = `*{box-sizing:border-box}body{margin:0;padding:.5em .75em calc(.6em + var(--tg-content-safe-area-inset-bottom,0px));font:15px/1.35 -apple-system,system-ui,sans-serif;color:var(--tg-theme-text-color);background:transparent}
.h{color:var(--tg-theme-hint-color);font-size:.8em}
.row{display:flex;gap:.6em;align-items:baseline;padding:.28em 0;border-top:1px solid color-mix(in srgb,var(--tg-theme-hint-color) 22%,transparent)}
.row:first-child{border-top:0}.g{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.n{font-variant-numeric:tabular-nums;white-space:nowrap}b{font-weight:600}
button{display:block;width:100%;margin-top:.6em;padding:.55em;border:0;border-radius:.6em;font:inherit;font-weight:600;color:var(--tg-theme-button-text-color);background:var(--tg-theme-button-color)}
button:active{opacity:.6}button:disabled{opacity:.4}`;

const HELPERS = `var W=window.TelegramWidget;
function D(){try{return JSON.parse(W&&W.chatData||"{}")||{}}catch(e){return{}}}
function E(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function T(s){var d=new Date(s*1e3),n=new Date(),p=function(x){return(x<10?"0":"")+x},h=p(d.getHours())+":"+p(d.getMinutes());
return d.toDateString()===n.toDateString()?h:d.getDate()+" "+d.toLocaleString("en",{month:"short"})+" "+h}`;

const EVENT_TEXT = {
  open: "opened the link",
  page: "opened",
  cv: "took the CV",
  contact: "clicked the email",
  outbound: "left for",
};

/** One visit: its events, newest last. */
export const VISIT_WIDGET = `<style>${STYLE}</style><div id="l"></div><script>${HELPERS}
var X=${JSON.stringify(EVENT_TEXT)};
function draw(){var d=D(),l=document.getElementById("l");l.textContent="";
(d.e||[]).forEach(function(e){var r=E("div","row");r.appendChild(E("span","h n",T(e[0])));
r.appendChild(E("span","g",e[1]==="page"?"opened "+e[2]:X[e[1]]+(e[3]?" "+e[3]:e[1]==="open"?" on "+e[2]:"")));l.appendChild(r)})}
if(W)W.onEvent("chatDataChanged",draw);draw();W&&W.ready&&W.ready();</script>`;

/** /stats: a row per ref, the latest visits, and Refresh. */
export const STATS_WIDGET = `<style>${STYLE}</style><div id="l"></div><div class="h" id="u" style="margin-top:.5em"></div><button id="b">Refresh</button><script>${HELPERS}
function draw(){var d=D(),l=document.getElementById("l");l.textContent="";
if(!(d.r||[]).length)l.appendChild(E("div","h","No ref visits yet."));
(d.r||[]).forEach(function(s){var r=E("div","row"),g=E("span","g");g.appendChild(E("b",null,s.n));
g.appendChild(document.createTextNode("  "+s.v+" visit"+(s.v===1?"":"s")+" · "+s.p+" pages"+(s.c?" · CV "+s.c:"")+(s.m?" · email "+s.m:"")+(s.o?" · out "+s.o:"")));
r.appendChild(g);r.appendChild(E("span","h n",s.l?T(s.l):""));l.appendChild(r);
if(s.top&&s.top.length)l.appendChild(E("div","h",s.top.join("  ")))});
if((d.v||[]).length){l.appendChild(E("div","h","Latest visits")).style.marginTop=".7em";
d.v.forEach(function(v){var r=E("div","row");r.appendChild(E("span","g",v.n+(v.c?" · "+v.c:"")+" · "+v.e+" events"));r.appendChild(E("span","h n",T(v.t)));l.appendChild(r)})}
document.getElementById("u").textContent=d.t?"Updated "+T(d.t):""}
var b=document.getElementById("b");b.addEventListener("click",function(){if(!W||!W.request||b.disabled)return;b.disabled=true;
W.request("r").then(function(){b.disabled=false},function(){b.disabled=false})});
if(W)W.onEvent("chatDataChanged",draw);draw();W&&W.ready&&W.ready();</script>`;

/** The visit's chat data: only what the widget draws. */
export function visitData(visit: Visit): string {
  return JSON.stringify({ e: visit.events });
}

function eventText([, name, path, detail]: Visit["events"][number]): string {
  if (name === "page") return `opened ${path}`;
  const text = EVENT_TEXT[name as keyof typeof EVENT_TEXT] ?? name;
  return detail ? `${text} ${detail}` : name === "open" ? `${text} on ${path}` : text;
}

/** The visit in text, above its widget. */
export function visitCaption(visit: Visit): string {
  const where = [visit.country, visit.device].filter(Boolean).join(" · ");
  const last = visit.events.at(-1);
  const count = visit.events.length;
  return [
    `🔗 <b>${escapeHtml(visit.ref)}</b> · ${escapeHtml(where)}`,
    `${count} event${count === 1 ? "" : "s"}${last ? ` · last: ${escapeHtml(eventText(last))}` : ""}`,
  ].join("\n");
}

/** The stats in text, above their widget. */
export function statsCaption(stats: Stats): string {
  const visits = stats.r.reduce((sum, ref) => sum + ref.v, 0);
  const lines = stats.r
    .slice(0, 8)
    .map(
      (ref) =>
        `<b>${escapeHtml(ref.n)}</b>: ${ref.v} visit${ref.v === 1 ? "" : "s"}, ${ref.p} pages${ref.c ? `, CV ${ref.c}` : ""}`,
    );
  return [`📊 <b>Ref links</b> · ${stats.r.length} refs · ${visits} visits`, ...lines].join("\n");
}
