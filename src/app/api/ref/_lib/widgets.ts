/**
 * The two Telegram widgets ref links use (Bot API 10.4, HTML widgets): one
 * per visit, a timeline of its events as they arrive, and /stats, with
 * totals, a card per ref, the latest visits and a Refresh button. A widget's
 * code is fixed when it is sent; afterwards only its chat data and caption
 * change. The caption names the visit in text, for the notification and for
 * an app that doesn't draw widgets.
 *
 * Native look: Telegram's theme variables, system type, the client's own
 * button. Surfaces are tints of the text colour, so they sit on any bubble
 * in either theme. Code stays small: Telegram allows 32 KB, 4 KB compressed.
 */
import { escapeHtml } from "./telegram";
import type { Stats, Visit } from "./visits";

const STYLE = `*{box-sizing:border-box}
body{margin:0;padding:.35em .7em calc(.7em + var(--tg-content-safe-area-inset-bottom,0px));font:15px/1.35 -apple-system,system-ui,sans-serif;color:var(--tg-theme-text-color);background:transparent;--s:color-mix(in srgb,var(--tg-theme-text-color) 7%,transparent);--l:color-mix(in srgb,var(--tg-theme-text-color) 12%,transparent);--h:var(--tg-theme-hint-color)}
.card{background:var(--s);border-radius:12px;padding:.15em .75em;margin-top:.5em}
.lab{margin:.95em .2em 0;color:var(--h);font-size:.7em;font-weight:600;letter-spacing:.05em;text-transform:uppercase}
.row{display:flex;gap:.6em;align-items:center;padding:.5em 0;border-top:1px solid var(--l)}
.row:first-child{border-top:0}
.g{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.t{color:var(--h);font-size:.8em;font-variant-numeric:tabular-nums;white-space:nowrap}
.chips{display:flex;flex-wrap:wrap;gap:.35em}
.chip{background:var(--l);border-radius:99px;padding:.12em .65em;font-size:.8em;white-space:nowrap}
.m{font:.85em ui-monospace,SFMono-Regular,Menlo,monospace;background:var(--l);border-radius:6px;padding:.05em .4em}
.dot{flex:none;width:.6em;height:.6em;border-radius:50%;background:var(--h)}
b{font-weight:600}
.tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:.4em}
.tile{background:var(--s);border-radius:12px;padding:.5em .3em;text-align:center}
.tile b{display:block;font-size:1.3em;line-height:1.15;font-variant-numeric:tabular-nums}
.tile span{color:var(--h);font-size:.7em}
.foot{display:flex;align-items:center;gap:.6em;margin-top:.7em}
button{flex:none;padding:.5em 1.1em;border:0;border-radius:10px;font:inherit;font-weight:600;color:var(--tg-theme-button-text-color);background:var(--tg-theme-button-color)}
button:active{opacity:.6}button:disabled{opacity:.4}`;

const HELPERS = `var W=window.TelegramWidget,$=function(i){return document.getElementById(i)};
function D(){try{return JSON.parse(W&&W.chatData||"{}")||{}}catch(e){return{}}}
function E(t,c,x,p){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;if(p)p.appendChild(e);return e}
function T(s){var d=new Date(s*1e3),n=new Date(),p=function(x){return(x<10?"0":"")+x},h=p(d.getHours())+":"+p(d.getMinutes());
return d.toDateString()===n.toDateString()?h:d.getDate()+" "+d.toLocaleString("en",{month:"short"})+" "+h}
function F(c){return c&&c.length===2?String.fromCodePoint(127397+c.charCodeAt(0),127397+c.charCodeAt(1))+" "+c:""}
function N(n,w){return n+" "+w+(n===1?"":"s")}`;

/** What each event reads as: its label and the colour of its dot. */
const EVENTS = {
  open: ["Opened the link", "var(--tg-theme-button-color)"],
  page: ["Viewed", ""],
  cv: ["Downloaded the CV", "#34c759"],
  contact: ["Clicked the email", "#ff9f0a"],
  outbound: ["Left for", "#bf5af2"],
};

/** One visit: where from and how long, then its events as a timeline. */
export const VISIT_WIDGET = `<style>${STYLE}</style><div class="chips" id="c"></div><div class="card" id="l"></div><script>${HELPERS}
var X=${JSON.stringify(EVENTS)};
function draw(){var d=D(),e=d.e||[],c=$("c"),l=$("l");c.textContent="";l.textContent="";
if(F(d.c))E("span","chip",F(d.c),c);if(d.d)E("span","chip",d.d==="phone"?"Phone":"Desktop",c);
E("span","chip",N(e.length,"event"),c);
if(e.length>1){var m=Math.round((e[e.length-1][0]-e[0][0])/60);E("span","chip",m<1?"under a minute":m+" min",c)}
e.forEach(function(v){var x=X[v[1]]||[v[1],""],r=E("div","row",null,l),o=E("span","dot",null,r),g=E("span","g",null,r);
if(x[1])o.style.background=x[1];g.appendChild(document.createTextNode(x[0]+" "));
var k=v[1]==="outbound"?v[3]:v[1]==="page"||v[1]==="open"?v[2]:"";if(k)E("span","m",k,g);E("span","t",T(v[0]),r)})}
if(W)W.onEvent("chatDataChanged",draw);draw();W&&W.ready&&W.ready();</script>`;

/** /stats: totals, a card per ref, the latest visits, and Refresh. */
export const STATS_WIDGET = `<style>${STYLE}</style><div class="tiles" id="s"></div><div id="l"></div><div class="foot"><span class="t g" id="u"></span><button id="b">Refresh</button></div><script>${HELPERS}
function draw(){var d=D(),r=d.r||[],l=$("l"),s=$("s"),a=[0,0,0,0];l.textContent="";s.textContent="";
r.forEach(function(x){a[0]+=x.v;a[1]+=x.p;a[2]+=x.c;a[3]+=x.m});
["Visits","Pages","CV","Email"].forEach(function(n,i){var t=E("div","tile",null,s);E("b",null,a[i],t);E("span",null,n,t)});
E("div","lab",r.length?"Refs":"No ref visits yet",l);
r.forEach(function(x){var c=E("div","card",null,l),h=E("div","row",null,c);E("b","g",x.n,h);E("span","t",x.l?T(x.l):"",h);
var k=E("div","row",null,c),p=E("div","chips",null,k);E("span","chip",N(x.v,"visit"),p);E("span","chip",N(x.p,"page"),p);
if(x.c)E("span","chip","CV "+x.c,p);if(x.m)E("span","chip","Email "+x.m,p);if(x.o)E("span","chip","Out "+x.o,p);
(x.top||[]).forEach(function(q){var w=E("div","row",null,c),g=E("span","g",null,w);E("span","m",q[0],g);E("span","t",q[1],w)})});
if((d.v||[]).length){E("div","lab","Latest visits",l);var c=E("div","card",null,l);
d.v.forEach(function(v){var w=E("div","row",null,c),g=E("span","g",null,w);E("b",null,v.n,g);
g.appendChild(document.createTextNode("  "+(F(v.c)?F(v.c)+" · ":"")+N(v.e,"event")));E("span","t",T(v.t),w)})}
$("u").textContent=d.t?"Updated "+T(d.t):""}
var b=$("b");b.addEventListener("click",function(){if(!W||!W.request||b.disabled)return;b.disabled=true;
W.request("r").then(function(){b.disabled=false},function(){b.disabled=false})});
if(W)W.onEvent("chatDataChanged",draw);draw();W&&W.ready&&W.ready();</script>`;

/** The visit's chat data: only what the widget draws. */
export function visitData(visit: Visit): string {
  return JSON.stringify({ c: visit.country, d: visit.device, e: visit.events });
}

function eventText([, name, path, detail]: Visit["events"][number]): string {
  const label = EVENTS[name as keyof typeof EVENTS]?.[0] ?? name;
  if (name === "outbound") return `${label} ${detail ?? ""}`.trim();
  return name === "page" || name === "open" ? `${label} ${path}` : label;
}

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? "" : "s"}`;

/** The visit in text, above its widget: who, and the latest thing they did. */
export function visitCaption(visit: Visit): string {
  const last = visit.events.at(-1);
  return [`🔗 <b>${escapeHtml(visit.ref)}</b>`, last ? escapeHtml(eventText(last)) : ""]
    .filter(Boolean)
    .join("\n");
}

/** A lone event as a plain message, for when nothing can collect. */
export function eventMessage(visit: Visit): string {
  const where = [visit.country, visit.device].filter(Boolean).join(" · ");
  return `${visitCaption(visit)}\n${escapeHtml(where)}`;
}

/** The stats' title, above their widget. */
export function statsCaption(stats: Stats): string {
  const visits = stats.r.reduce((sum, ref) => sum + ref.v, 0);
  return `📊 <b>Ref links</b> · ${plural(stats.r.length, "ref")} · ${plural(visits, "visit")}`;
}

/** The stats as a plain message, for a server without widgets. */
export function statsText(stats: Stats): string {
  const lines = stats.r
    .slice(0, 12)
    .map(
      (ref) =>
        `<b>${escapeHtml(ref.n)}</b>: ${plural(ref.v, "visit")}, ${plural(ref.p, "page")}${ref.c ? `, CV ${ref.c}` : ""}${ref.m ? `, email ${ref.m}` : ""}`,
    );
  return [statsCaption(stats), ...lines].join("\n");
}
