"use client";

import { Button } from "@/components/ui/button";

/** Triggers the browser print dialog for the résumé sheet. */
export function PrintButton() {
  return (
    <Button variant="primary" onClick={() => window.print()}>
      Print
    </Button>
  );
}
