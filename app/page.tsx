import { Nav } from "@/components/drk/Nav";
import { IntroCurtain } from "@/components/system/IntroCurtain";
import { SystemTelemetry } from "@/components/system/SystemTelemetry";
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
 * DRK — the narrative runs:
 *   Opacity → Visibility → Infrastructure → Execution → Evidence → Scale → Compounding
 */
export default function Page() {
  return (
    <>
      <IntroCurtain />
      <SystemTelemetry />
      <Nav />

      <main id="main">
        {/* ACT 01 — Activation */}
        <Hero />

        {/* ACT 02 — The problem: opacity becomes observability */}
        <Problem />

        {/* ACT 03 — One engine, two operating modes */}
        <EngineModel />

        {/* ACT 04 — Product proof */}
        <ProductProof />

        {/* ACT 05 — Evidence */}
        <Evidence />

        {/* ACT 06 — The stack */}
        <Architecture />

        {/* ACT 07 — Expanding market */}
        <Market />

        {/* ACT 08 — Integration speed */}
        <Integration />

        {/* ACT 09 — Launch lifecycle */}
        <Lifecycle />

        {/* ACT 10 — The control layer */}
        <ControlLayer />

        {/* ACT 11 — The live application */}
        <Application />

        {/* ACTS 12 + 13 — Business engine & compounding */}
        <BusinessEngine />

        {/* ACT 14 — Final statement + footer */}
        <FinalCTA />
      </main>
    </>
  );
}
