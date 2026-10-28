"use client";

import { useEffect, useRef, useState } from "react";

import { Button, ButtonLink } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowUpRightIcon, BrowserIcon, GlobeIcon } from "@/components/ui/icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Device = "desktop" | "phone";

/** The size each device renders the site at, before scaling to fit. */
const VIEWPORTS: Record<Device, { width: number; height: number }> = {
  desktop: { width: 1440, height: 900 },
  phone: { width: 390, height: 844 },
};

/**
 * "Try it live": a button that opens the real site in a dialog, inside a
 * desktop or phone frame scaled to fit. The iframe only exists while the
 * dialog is open, so visitors who never click load nothing from the site.
 *
 *   <LivePreview url="https://kosmetikprof.de" />
 */
function LivePreview({ url, label = "Try it live" }: { url: string; label?: string }) {
  const host = new URL(url).hostname.replace(/^www\./, "");

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="ghost" />}>
        <BrowserIcon aria-hidden /> {label}
      </DialogTrigger>
      <DialogContent className="live-preview" showCloseButton>
        <LivePreviewBody url={url} host={host} />
      </DialogContent>
    </Dialog>
  );
}

/** Mounted only while the dialog is open (Base UI unmounts closed popups). */
function LivePreviewBody({ url, host }: { url: string; host: string }) {
  const [device, setDevice] = useState<Device>(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches
      ? "phone"
      : "desktop",
  );
  const [loaded, setLoaded] = useState(false);
  const [stage, setStage] = useState({ width: 0, height: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  // Scale the fixed-size viewport to whatever room the stage has.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setStage({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const viewport = VIEWPORTS[device];
  const scale = stage.width
    ? Math.min(1, stage.width / viewport.width, stage.height / viewport.height)
    : 0;

  return (
    <>
      <div className="live-preview-bar">
        <div className="live-preview-address">
          <GlobeIcon aria-hidden />
          <DialogTitle className="live-preview-host">{host}</DialogTitle>
        </div>
        <ToggleGroup
          aria-label="Preview size"
          value={[device]}
          onValueChange={([next]) => {
            if (next !== "desktop" && next !== "phone") return;
            setDevice(next);
            setLoaded(false); // the iframe remounts at the new size
          }}
        >
          <ToggleGroupItem value="desktop">Desktop</ToggleGroupItem>
          <ToggleGroupItem value="phone">Phone</ToggleGroupItem>
        </ToggleGroup>
        <ButtonLink
          className="live-preview-open"
          variant="ghost"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in new tab <ArrowUpRightIcon aria-hidden />
        </ButtonLink>
      </div>

      <div ref={stageRef} className="live-preview-stage">
        {scale > 0 && (
          <div
            className="live-preview-frame"
            data-device={device}
            style={
              {
                "--frame-w": `${viewport.width * scale}px`,
                "--frame-h": `${viewport.height * scale}px`,
              } as React.CSSProperties
            }
          >
            {!loaded && <div className="live-preview-loading">Loading {host}…</div>}
            <iframe
              key={device}
              src={url}
              title={`${host}, live`}
              width={viewport.width}
              height={viewport.height}
              referrerPolicy="no-referrer"
              onLoad={() => setLoaded(true)}
              style={{ "--frame-scale": scale } as React.CSSProperties}
            />
          </div>
        )}
      </div>

      <DialogDescription className="live-preview-note">
        The real site, loaded from {host}. It may set its own cookies.
      </DialogDescription>
    </>
  );
}

export { LivePreview };
