import { Fragment } from "react";

import { isTelegramEmojiName, TelegramEmoji } from "@/components/telegram-emoji";

import {
  TelegramActions,
  TelegramAudio,
  TelegramButton,
  TelegramCaption,
  TelegramFooter,
  TelegramHeading,
  TelegramKeyboardRow,
  TelegramList,
  TelegramPhoto,
  TelegramQuote,
  TelegramSectionLabel,
  TelegramVideo,
} from "./telegram-chat";

type Node =
  | { type: "text"; value: string }
  | { type: "element"; tag: string; attrs: Record<string, string>; children: Node[] };

const VOID = new Set(["br", "hr", "img"]);
const TOKEN = /<(\/?)([a-z][a-z0-9-]*)((?:\s+[a-z-]+="[^"]*")*)\s*(\/?)>|([^<]+)/g;
const ATTR = /([a-z-]+)="([^"]*)"/g;
const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'" };

const decode = (text: string) => text.replace(/&(amp|lt|gt|quot|#39);/g, (_, e) => ENTITIES[e]);

/** Parses the bot's rich HTML (the subset its `card()` writes) into a tree. */
function parse(html: string): Node[] {
  const root: Node[] = [];
  const stack: Extract<Node, { type: "element" }>[] = [];
  const add = (node: Node) => (stack.at(-1)?.children ?? root).push(node);
  for (const [, closing, tag, rawAttrs, selfClosing, text] of html.matchAll(TOKEN)) {
    if (text !== undefined) {
      add({ type: "text", value: decode(text) });
    } else if (closing) {
      if (stack.pop()?.tag !== tag) throw new Error(`rich text: unexpected </${tag}>`);
    } else {
      const attrs = Object.fromEntries(
        [...rawAttrs.matchAll(ATTR)].map(([, name, value]) => [name, decode(value)]),
      );
      const element = { type: "element" as const, tag, attrs, children: [] };
      add(element);
      if (!selfClosing && !VOID.has(tag)) stack.push(element);
    }
  }
  if (stack.length > 0) throw new Error(`rich text: <${stack[0].tag}> is never closed`);
  return root;
}

const isButtonRow = (node: Node) => node.type === "element" && node.tag === "tg-button-row";

/** Renders siblings, gathering each run of button rows into the card's
 *  embedded actions, as Telegram stacks them. */
function renderNodes(nodes: Node[]): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  for (let i = 0; i < nodes.length; i++) {
    if (isButtonRow(nodes[i])) {
      const rows: Node[] = [];
      while (i < nodes.length && isButtonRow(nodes[i])) rows.push(nodes[i++]);
      i--;
      out.push(<TelegramActions key={i}>{rows.map(renderNode)}</TelegramActions>);
    } else {
      out.push(renderNode(nodes[i], i));
    }
  }
  return out;
}

const HASHTAG = /(#[\p{L}\p{N}_]+)/u;

/** Text as Telegram shows it: hashtags turn into links on their own. */
function renderText(text: string, key: number): React.ReactNode {
  const parts = text.split(HASHTAG);
  if (parts.length === 1) return text;
  return (
    <Fragment key={key}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="text-tg-link">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </Fragment>
  );
}

function renderNode(node: Node, key: number): React.ReactNode {
  if (node.type === "text") return renderText(node.value, key);
  const children = renderNodes(node.children);
  const { attrs } = node;
  switch (node.tag) {
    case "b":
      return <b key={key}>{children}</b>;
    case "i":
      return <i key={key}>{children}</i>;
    case "br":
      return <br key={key} />;
    case "p":
      return <p key={key}>{children}</p>;
    case "a":
      return (
        <span key={key} className="text-tg-link">
          {children}
        </span>
      );
    case "tg-time":
    case "figure":
      return <Fragment key={key}>{children}</Fragment>;
    case "tg-emoji": {
      // The site keys its saved animations by name, so `emoji-id` names one;
      // without a saved animation the emoji's own character stands in.
      const name = attrs["emoji-id"] ?? "";
      return isTelegramEmojiName(name) ? (
        <TelegramEmoji key={key} name={name} className="size-4.5" />
      ) : (
        <Fragment key={key}>{children}</Fragment>
      );
    }
    case "h5":
      return <TelegramHeading key={key}>{children}</TelegramHeading>;
    case "h6":
      return <TelegramSectionLabel key={key}>{children}</TelegramSectionLabel>;
    case "figcaption":
      return <TelegramCaption key={key}>{children}</TelegramCaption>;
    case "video":
      // `duration`, `poster` and the size (and an audio's `title` and
      // `performer`) are the site's: Telegram reads them from the file the
      // `src` points at
      return (
        <TelegramVideo
          key={key}
          duration={attrs.duration}
          poster={attrs.poster}
          wide={attrs.width !== undefined && Number(attrs.width) > Number(attrs.height)}
        />
      );
    case "audio":
      return (
        <TelegramAudio
          key={key}
          title={attrs.title ?? ""}
          performer={attrs.performer ?? ""}
          duration={attrs.duration ?? ""}
        />
      );
    case "img":
      return <TelegramPhoto key={key} />;
    case "blockquote":
      return <TelegramQuote key={key}>{children}</TelegramQuote>;
    case "footer":
      return <TelegramFooter key={key}>{children}</TelegramFooter>;
    case "hr":
      return null;
    case "ul":
      return <TelegramList key={key}>{children}</TelegramList>;
    case "li":
      return <li key={key}>{children}</li>;
    case "tg-button-row":
      return <TelegramKeyboardRow key={key}>{children}</TelegramKeyboardRow>;
    case "tg-button":
      // Only links to the bot itself open: the posts on the page are made up,
      // so their buttons keep Telegram's link mark but go nowhere.
      return (
        <TelegramButton
          key={key}
          url={attrs.type === "url"}
          href={attrs.url?.startsWith("https://t.me/") ? attrs.url : undefined}
          variant={attrs.style === "primary" ? "primary" : undefined}
        >
          {children}
        </TelegramButton>
      );
    default:
      throw new Error(`rich text: <${node.tag}> isn't drawn yet`);
  }
}

/**
 * A Rich Message's text drawn from the bot's own rich HTML, the markup its
 * `card()` sends to Telegram (`<h5>`, `<figure>` with a `<figcaption>`,
 * `<tg-button-row>`…), with each tag mapped onto the chat's parts. Media is
 * a placeholder: the case study shows the bot's message, not anyone's post.
 *
 *   <TelegramRichText html={`<h5><tg-emoji emoji-id="tiktok">🎵</tg-emoji> TikTok video</h5>`} />
 */
export function TelegramRichText({ html }: { html: string }) {
  return <>{renderNodes(parse(html))}</>;
}
