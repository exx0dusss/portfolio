"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

const RESET_MS = 1400;

/** Email CTA that copies the address to the clipboard and confirms inline. */
export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard?.writeText(email);
    } finally {
      setCopied(true);
      setTimeout(() => setCopied(false), RESET_MS);
    }
  }

  return (
    <Button variant="primary" className="copy-btn" onClick={copy}>
      <span className="em">{copied ? "copied" : email}</span>{" "}
      <span className="arrow">{copied ? "✓" : "⧉"}</span>
    </Button>
  );
}
