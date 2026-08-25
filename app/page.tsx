import { Nav } from "@/components/drk/Nav";
import { IntroCurtain } from "@/components/system/IntroCurtain";
import { Undercurrent } from "@/components/system/Undercurrent";
import { SystemTelemetry } from "@/components/system/SystemTelemetry";
import { Seam } from "@/components/system/Seam";
import { Hero } from "@/components/drk/Hero";
import { Problem } from "@/components/drk/Problem";
import { EngineModel } from "@/components/drk/EngineModel";
import { System } from "@/components/drk/System";
import { Infrastructure } from "@/components/drk/Infrastructure";
import { Lifecycle } from "@/components/drk/Lifecycle";
import { FinalCTA } from "@/components/drk/FinalCTA";

/**
 * DRK — a front door, not a deck.
 *
 * Seven acts. The job is to say what DRK is, show there is real
 * infrastructure behind it, and make the reader get in touch. The
 * application, the launch record, the economics and the raise are not on
 * this site — they are shared privately, on request.
 *
 *   01 SURFACE         the system is already running
 *   02 PROBLEM         opacity becomes observable
 *   03 ENGINE          one system, different operators
 *   04 SYSTEM          controlled glimpses of the product
 *   05 INFRASTRUCTURE  descend beneath the interface
 *   06 LIFECYCLE       the market moves, the system stays connected
 *   07 CLOSE           everything converges, then the door
 *
 * `Undercurrent` is the persistent world beneath every act; `Seam` carries
 * the signal across each join so the page reads as one descent.
 */
export default function Page() {
  return (
    <>
      <IntroCurtain />
      <Undercurrent />
      <SystemTelemetry />
      <Nav />

      <main id="main" className="relative z-10">
        <Hero />
        <Seam from={0.5} to={0.36} label="Assets in" />

        <Problem />
        <Seam from={0.36} to={0.5} label="Observable" />

        <EngineModel />
        <Seam from={0.5} to={0.6} />

        <System />
        <Seam from={0.6} to={0.42} label="Beneath" />

        <Infrastructure />
        <Seam from={0.42} to={0.5} />

        <Lifecycle />
        <Seam from={0.5} to={0.5} />

        <FinalCTA />
      </main>
    </>
  );
}
