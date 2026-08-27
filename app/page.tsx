import { Nav } from "@/components/drk/Nav";
import { IntroCurtain } from "@/components/system/IntroCurtain";
import { FlowBand } from "@/components/system/FlowBand";
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
 * down and only its depth and drive change: full strength and right-anchored
 * in the hero, a faint wash through the middle that the reader's own descent
 * carries along, mirrored at full strength on the close. Three fields, not
 * one per act — see `FlowBand` for how the middle one spans two acts on a
 * single canvas.
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

        {/* The middle band — one field, two acts, driven by the descent. */}
        <FlowBand>
          <Capabilities />
          <Approach />
        </FlowBand>

        <Contact />
      </main>
    </>
  );
}
