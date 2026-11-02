"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

/**
 * shadcn code-block (base-nova), on the site's tokens: a block of code with
 * optional actions, at the default size or `sm` for code beside prose. Without its Shiki highlighter: callers colour the code
 * themselves, if at all. Actions placed directly in the block float in its
 * corner and show on hover or focus, and always on touch screens.
 *
 *   <CodeBlock>
 *     <CodeBlockActions>
 *       <CodeBlockCopyButton value={commands} />
 *     </CodeBlockActions>
 *     <CodeBlockContent>{commands}</CodeBlockContent>
 *   </CodeBlock>
 */
function CodeBlock({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="code-block"
      data-size={size}
      className={cn(
        "group/code-block relative flex w-full min-w-0 flex-col overflow-hidden rounded-7 bg-card-2 text-12.5 text-fg has-[>[data-slot=code-block-content]:focus-visible]:outline-2 has-[>[data-slot=code-block-content]:focus-visible]:outline-accent data-[size=sm]:text-12 data-[size=sm]:text-fg-dim",
        className,
      )}
      {...props}
    />
  );
}

function CodeBlockActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-actions"
      className={cn(
        "absolute end-2 top-2 z-10 flex items-center gap-1 opacity-0 transition-opacity group-focus-within/code-block:opacity-100 group-hover/code-block:opacity-100 *:data-[slot=code-block-copy-button]:bg-card pointer-coarse:opacity-100",
        className,
      )}
      {...props}
    />
  );
}

/** Copies `value` and swaps to a check for two seconds; the change is also
 *  announced to screen readers. */
function CodeBlockCopyButton({
  value,
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button> & { value: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <>
      <Button
        data-slot="code-block-copy-button"
        data-copied={copied || undefined}
        variant="ghost"
        size="icon"
        aria-label={copied ? "Copied" : "Copy"}
        className={className}
        onClick={(event) => {
          onClick?.(event);
          navigator.clipboard
            .writeText(value)
            .then(() => setCopied(true))
            .catch(() => {});
        }}
        {...props}
      >
        {copied ? <CheckIcon aria-hidden /> : <CopyIcon aria-hidden />}
      </Button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </>
  );
}

/** The scrolling code itself. `wrap` breaks long lines instead of scrolling
 *  them. A string child is split into lines; pass CodeBlockLines to style
 *  each line. */
function CodeBlockContent({
  className,
  children,
  wrap = false,
  ...props
}: React.ComponentProps<"pre"> & { wrap?: boolean }) {
  return (
    <pre
      data-slot="code-block-content"
      data-wrap={wrap || undefined}
      dir="ltr"
      tabIndex={0}
      className={cn(
        "m-0 min-h-0 min-w-0 overflow-auto px-4 py-3.5 text-start font-mono leading-copy outline-none data-wrap:break-words data-wrap:whitespace-pre-wrap",
        className,
      )}
      {...props}
    >
      <code
        data-slot="code-block-code"
        className="grid min-h-lh min-w-max content-start in-data-wrap:min-w-0"
      >
        {typeof children === "string"
          ? children
              .replace(/\n$/, "")
              .split("\n")
              .map((line, index) => <CodeBlockLine key={index}>{line}</CodeBlockLine>)
          : children}
      </code>
    </pre>
  );
}

function CodeBlockLine({ className, children, ...props }: React.ComponentProps<"span">) {
  // an empty line holds a newline, so copying a selection keeps blank lines
  const empty =
    children === undefined ||
    children === null ||
    children === "" ||
    (Array.isArray(children) && children.length === 0);

  return (
    <span data-slot="code-block-line" className={cn("block min-h-lh", className)} {...props}>
      {empty ? "\n" : children}
    </span>
  );
}

export { CodeBlock, CodeBlockActions, CodeBlockContent, CodeBlockCopyButton, CodeBlockLine };
