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
      <DialogContent size="viewer" showCloseButton>
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
      {/* pr-11 leaves room for the close button */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5 pr-11">
        <div className="flex min-w-0 grow basis-50 items-center gap-2 rounded-full border border-line bg-card-2 px-3.5 py-2 text-fg-faint [&_svg]:size-3.75 [&_svg]:flex-none">
          <GlobeIcon aria-hidden />
          <DialogTitle size="sm">{host}</DialogTitle>
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
        <ButtonLink variant="ghost" size="sm" href={url} target="_blank" rel="noopener noreferrer">
          Open in new tab <ArrowUpRightIcon aria-hidden />
        </ButtonLink>
      </div>

      <div
        ref={stageRef}
        className="grid min-h-0 place-items-center overflow-hidden rounded-card border border-line bg-card-2 p-4 max-phone:p-2.5"
      >
        {/* the iframe renders at the device's fixed viewport and is scaled
            (--frame-scale) to fit the stage; the frame takes the scaled size */}
        {scale > 0 && (
          <div
            className="relative h-(--frame-h) w-(--frame-w) overflow-hidden rounded-8 bg-frame shadow-frame data-[device=phone]:rounded-28 data-[device=phone]:shadow-frame-phone"
            data-device={device}
            style={
              {
                "--frame-w": `${viewport.width * scale}px`,
                "--frame-h": `${viewport.height * scale}px`,
              } as React.CSSProperties
            }
          >
            {!loaded && (
              <div className="absolute inset-0 z-1 grid place-items-center bg-frame text-13 text-frame-ink">
                Loading {host}…
              </div>
            )}
            <iframe
              key={device}
              src={url}
              title={`${host}, live`}
              className="absolute top-0 left-0 origin-top-left scale-(--frame-scale) border-0 bg-frame"
              width={viewport.width}
              height={viewport.height}
              referrerPolicy="no-referrer"
              onLoad={() => setLoaded(true)}
              style={{ "--frame-scale": scale } as React.CSSProperties}
            />
          </div>
        )}
      </div>

      <DialogDescription size="sm">
        The real site, loaded from {host}. It may set its own cookies.
      </DialogDescription>
    </>
  );
}

export { LivePreview };
