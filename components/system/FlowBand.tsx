"use client";

import { useRef, type ReactNode } from "react";
import { LiquidField } from "@/components/system/LiquidField";

/**
 * THE FLOW BAND — the middle of the page, carried on one body of liquid.
 *
 * The field here is a single sticky viewport-height canvas spanning every act
 * inside the band, so the flow does not restart at a section join and the
 * canvas never has to be as tall as the band it covers.
 *
 * Unlike the hero and the close, this field is SCROLL-DRIVEN: the band's own
 * traversal advances the fbm flow and sweeps the specular across the frame,
 * so descending the page is what moves the liquid. Time keeps running
 * underneath at a low rate, so it is alive when the reader is still — the
 * scroll is a current on top of that, not a switch.
 *
 * The veil is not decoration. Copy in these acts is `ink-muted`, and mid-grey
 * chrome underneath it would cost the contrast ratio the palette is built on,
 * so the flow is held to the side of the frame the type does not occupy.
 */
export function FlowBand({ children }: { children: ReactNode }) {
  const bandRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={bandRef} className="relative">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          <LiquidField
            level={0.42}
            turbulence={0.55}
            zoom={1.4}
            edge="wash"
            sink={false}
            scrollRef={bandRef}
            travel={1}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, var(--color-obsidian) 0%, rgba(8,13,12,0.94) 42%, rgba(8,13,12,0.66) 72%, rgba(8,13,12,0.2) 100%)",
            }}
          />
        </div>
      </div>

      {children}
    </div>
  );
}
