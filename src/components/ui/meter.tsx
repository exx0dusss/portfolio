"use client";

import { Meter as MeterPrimitive } from "@base-ui/react/meter";
import { createContext, useContext } from "react";

import { cn } from "@/lib/utils/cn";

const MeterContext = createContext({ value: 0, min: 0, max: 5 });

/**
 * A segmented meter on Base UI's Meter (role="meter" with value, min and max
 * for assistive tech). The value is drawn as filled segments, one per step:
 *
 *   <Meter value={1} max={5} aria-label="Difficulty" aria-valuetext="Very easy, 1 of 5">
 *     <MeterSegments />
 *     <MeterLabel>Very easy</MeterLabel>
 *   </Meter>
 *
 * From a server component pass `aria-valuetext` (a string), not
 * `getAriaValueText`: functions can't cross into this client component.
 */
function Meter({ className, value, min = 0, max = 5, ...props }: MeterPrimitive.Root.Props) {
  return (
    <MeterContext.Provider value={{ value, min, max }}>
      <MeterPrimitive.Root
        data-slot="meter"
        className={cn("flex flex-wrap items-center gap-x-2.25 gap-y-1.5", className)}
        value={value}
        min={min}
        max={max}
        {...props}
      />
    </MeterContext.Provider>
  );
}

/** One segment per step from min to max; steps up to the value are filled. */
function MeterSegments({ className, ...props }: MeterPrimitive.Track.Props) {
  const { value, min, max } = useContext(MeterContext);
  return (
    <MeterPrimitive.Track
      data-slot="meter-segments"
      className={cn("inline-flex gap-0.75", className)}
      {...props}
    >
      {Array.from({ length: max - min }, (_, step) => (
        <span
          key={step}
          data-filled={step < value - min ? "" : undefined}
          className="h-1.5 w-3.5 rounded-2 bg-line-strong data-filled:bg-accent"
        />
      ))}
    </MeterPrimitive.Track>
  );
}

/** Visible wording for the value. Screen readers get `aria-valuetext` instead. */
function MeterLabel({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="meter-label" aria-hidden className={className} {...props} />;
}

export { Meter, MeterLabel, MeterSegments };
