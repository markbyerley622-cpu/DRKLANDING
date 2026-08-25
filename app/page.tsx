import { Nav } from "@/components/drk/Nav";
import { IntroCurtain } from "@/components/system/IntroCurtain";
import { Undercurrent } from "@/components/system/Undercurrent";
import { SystemTelemetry } from "@/components/system/SystemTelemetry";
import { Seam } from "@/components/system/Seam";
import { Hero } from "@/components/drk/Hero";
import { Problem } from "@/components/drk/Problem";
import { EngineModel } from "@/components/drk/EngineModel";
import { ProductProof } from "@/components/drk/ProductProof";
import { Evidence } from "@/components/drk/Evidence";
import { Architecture } from "@/components/drk/Architecture";
import { Market } from "@/components/drk/Market";
import { Integration } from "@/components/drk/Integration";
import { Lifecycle } from "@/components/drk/Lifecycle";
import { ControlLayer } from "@/components/drk/ControlLayer";
import { Application } from "@/components/drk/Application";
import { BusinessEngine } from "@/components/drk/BusinessEngine";
import { FinalCTA } from "@/components/drk/FinalCTA";

/**
 * DRK — one descent, not fourteen sections.
 *
 * `Undercurrent` is the persistent world: the same system runs beneath every
 * act for the whole document, revealing itself as you go down and retreating
 * at the end. `Seam` carries the signal across each join, so no act ever
 * simply stops and the next one starts.
 *
 * The camera moves:
 *   MACRO → RESTRICTED → EXPANSION → DETAIL → QUIET → IMMERSION →
 *   COMPLEXITY → SATISFACTION → CONTINUITY → PRODUCT → DEPTH →
 *   SYSTEMIC → ACCELERATION → VOID
 */
export default function Page() {
  return (
    <>
      <IntroCurtain />
      <Undercurrent />
      <SystemTelemetry />
      <Nav />

      <main id="main" className="relative z-10">
        {/* MACRO — the system is already running */}
        <Hero />
        <Seam from={0.5} to={0.34} label="Assets in" />

        {/* RESTRICTED — the black box */}
        <Problem />
        <Seam from={0.34} to={0.5} label="Observable" />

        {/* EXPANSION — one engine, two operators */}
        <EngineModel />
        <Seam from={0.5} to={0.62} />

        {/* DETAIL — attribution */}
        <ProductProof />
        <Seam from={0.62} to={0.28} label="Evidence" />

        {/* QUIET — the camera pulls back */}
        <Evidence />
        <Seam from={0.28} to={0.5} />

        {/* IMMERSION — the stack assembles */}
        <Architecture />
        <Seam from={0.5} to={0.7} />

        {/* COMPLEXITY — the surface expands */}
        <Market />
        <Seam from={0.7} to={0.4} />

        {/* SATISFACTION — activation */}
        <Integration />
        <Seam from={0.4} to={0.5} label="Active" />

        {/* CONTINUITY — DRK stays connected */}
        <Lifecycle />
        <Seam from={0.5} to={0.5} />

        {/* PRODUCT — the topology becomes the interface */}
        <ControlLayer />
        <Seam from={0.5} to={0.5} label="Deeper" />

        {/* DEPTH — inside the runtime */}
        <Application />
        <Seam from={0.5} to={0.5} />

        {/* SYSTEMIC + ACCELERATION — the engine returns, the loop widens */}
        <BusinessEngine />

        {/* VOID — everything goes beneath the surface */}
        <FinalCTA />
      </main>
    </>
  );
}
