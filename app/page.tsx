import { Nav } from "@/components/drk/Nav";
import { IntroCurtain } from "@/components/system/IntroCurtain";
import { LiquidField } from "@/components/system/LiquidField";
import { Hero } from "@/components/drk/Hero";
import { Capabilities } from "@/components/drk/Capabilities";
import { Approach } from "@/components/drk/Approach";
import { Contact } from "@/components/drk/Contact";

/**
 * DRK — a front door, not a deck.
 *
 * Four screens. Say what DRK is, show what it handles, and open the door.
 * The walkthrough, the record, the economics and the raise are not on this
 * site — they are shared privately, on request.
 *
 *   01 HERO          the surface, and the liquid running under it
 *   02 CAPABILITIES  what the system handles
 *   03 APPROACH      how it runs
 *   04 CONTACT       the door
 *
 * THE LIQUID IS THE CONTINUITY. The same body of fluid runs the whole way
 * down and only its depth changes: full strength and right-anchored in the
 * hero, a faint wash through the middle, mirrored at full strength on the
 * close. Three fields, not one per act — and the middle one is a single
 * sticky viewport-height canvas spanning both middle acts, so the flow does
 * not restart at the section join and the canvas never has to be as tall as
 * the band it covers.
 *
 * Each field parks its rAF loop the moment it leaves the viewport, so at
 * most one is ever drawing.
 */
export default function Page() {
  return (
    <>
      <IntroCurtain />
      <Nav />

      <main id="main" className="relative z-10">
        <Hero />

        {/* The middle band — one field, two acts. */}
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
              <LiquidField
                level={0.42}
                turbulence={0.55}
                zoom={1.4}
                edge="wash"
                sink={false}
              />
              {/* The type column keeps its ground. Copy in these acts is
                  ink-muted, and mid-grey chrome under it would cost the
                  contrast the palette is built on — so the flow is held to
                  the right of the frame and veiled everywhere the text runs. */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-obsidian) 0%, rgba(8,13,12,0.94) 42%, rgba(8,13,12,0.66) 72%, rgba(8,13,12,0.2) 100%)",
                }}
              />
            </div>
          </div>

          <Capabilities />
          <Approach />
        </div>

        <Contact />
      </main>
    </>
  );
}
