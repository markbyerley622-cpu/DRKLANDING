"use client";

import { Section, Reveal, Eyebrow, Chip } from "@/components/ui/Primitives";
import { Sparkline, TickingLabel } from "./Sparkline";
import { useScrollProgress, range, smooth } from "@/lib/motion";
import { application } from "@/content/drk";

/**
 * ACT 11 — THE LIVE APPLICATION
 * Full-bleed. The environment rises out of the page as you scroll into it —
 * no device mockup, no frame. The page itself becomes the application.
 */
export function Application() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>({ start: 0.95, end: 0.35 });
  const rise = smooth(range(progress, 0, 0.55));

  return (
    <Section id="application" bleed className="relative py-28 sm:py-36 lg:py-44">
      {/* Environment bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 62%, rgba(0,255,122,0.07), transparent 70%)",
          opacity: rise,
          transition: "opacity 900ms var(--ease-drk)",
        }}
      />

      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Eyebrow>{application.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={100} className="mt-6">
            <h2 className="display max-w-[16ch] text-[clamp(2.1rem,5vw,4.2rem)] text-ink">
              The system behind the operation.
            </h2>
          </Reveal>
          <Reveal delay={190} className="mt-6 max-w-[560px]">
            <p className="text-[15.5px] leading-[1.65] text-ink-muted sm:text-[16.5px]">
              {application.body}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ---- The environment ------------------------------------------------ */}
      <div ref={ref} className="relative mt-16 lg:mt-20">
        <div
          className="mx-auto w-full max-w-[1440px] px-3 sm:px-6"
          style={{
            transform: `translateY(${(1 - rise) * 60}px) scale(${0.965 + rise * 0.035})`,
            opacity: 0.25 + rise * 0.75,
            transition: "transform 180ms linear, opacity 400ms linear",
          }}
        >
          <div
            className="relative overflow-hidden rounded-t-[22px] border-x border-t"
            style={{
              borderColor: "rgba(255,255,255,0.09)",
              background:
                "linear-gradient(180deg, rgba(24,29,28,0.7) 0%, rgba(13,17,16,0.9) 40%, rgba(8,13,12,1) 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.14), 0 -40px 100px -50px rgba(0,255,122,0.35)",
            }}
          >
            {/* Top rail */}
            <div className="scroll-x flex items-center gap-4 border-b border-white/[0.06] px-4 py-3.5 sm:px-7">
              <span className="shrink-0 font-display text-[15px] font-bold tracking-[-0.03em] text-ink">
                DRK
              </span>
              <span aria-hidden className="h-3.5 w-px shrink-0 bg-white/10" />
              <nav
                aria-label="Application areas"
                className="flex shrink-0 items-center gap-1"
              >
                {application.rail.map((r, i) => (
                  <span
                    key={r}
                    className="rounded-full px-3 py-[6px] font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-700"
                    style={{
                      color: i === 0 ? "var(--color-ink)" : "var(--color-ink-faint)",
                      background:
                        i === 0 ? "linear-gradient(180deg, rgba(34,37,35,0.9), rgba(13,17,16,0.95))" : "transparent",
                      border: `1px solid ${i === 0 ? "rgba(0,255,122,0.26)" : "transparent"}`,
                    }}
                  >
                    {r}
                  </span>
                ))}
              </nav>
              <span className="ml-auto shrink-0">
                <Chip tone="live">Operating</Chip>
              </span>
            </div>

            {/* Workspace */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_0.85fr]">
              {/* Column 1 — runtime state */}
              <div className="border-b border-white/[0.06] p-5 sm:p-7 md:border-b-0 md:border-r">
                <ColHead label="Runtime" />
                <div className="mt-5 space-y-2.5">
                  {["Wallets", "Liquidity", "Execution", "Reporting"].map((k, i) => (
                    <div
                      key={k}
                      className="flex items-center justify-between rounded-[10px] border border-white/[0.055] px-3.5 py-3"
                      style={{ background: "rgba(21,23,22,0.5)" }}
                    >
                      <span className="font-mono text-[11px] tracking-[0.06em] text-ink-muted">{k}</span>
                      <span className="flex items-center gap-2">
                        <span
                          aria-hidden
                          className="h-[4px] w-[4px] rounded-full bg-hero"
                          style={{
                            boxShadow: "0 0 7px rgba(0,255,122,0.8)",
                            animation: `drk-pulse ${2.4 + i * 0.35}s ease-in-out infinite`,
                          }}
                        />
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-hero">
                          Online
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2 — programs */}
              <div className="border-b border-white/[0.06] p-5 sm:p-7 md:border-b-0 md:border-r">
                <ColHead label="Programs" />
                <div className="mt-5 space-y-2.5">
                  {["Program A", "Program B", "Program C"].map((p, i) => (
                    <div
                      key={p}
                      className="rounded-[10px] border border-white/[0.055] p-3.5"
                      style={{
                        background:
                          i === 0
                            ? "linear-gradient(160deg, rgba(34,37,35,0.7), rgba(13,17,16,0.85))"
                            : "rgba(21,23,22,0.45)",
                        borderColor: i === 0 ? "rgba(0,255,122,0.2)" : "rgba(255,255,255,0.055)",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] tracking-[0.06em] text-ink">{p}</span>
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint">
                          <TickingLabel
                            values={["Executing", "Routing", "Attributed"] as const}
                            intervalMs={2800 + i * 500}
                          />
                        </span>
                      </div>
                      <Sparkline seed={53 + i * 9} height={34} drift={0.24} fill={false} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3 — P/L */}
              <div className="p-5 sm:p-7">
                <ColHead label="P/L" />
                <div className="mt-5 rounded-[12px] border border-white/[0.06] bg-obsidian/55 p-4">
                  <Sparkline seed={97} height={120} drift={0.34} />
                  <div className="mt-4 space-y-2.5 border-t border-white/[0.06] pt-4">
                    {[
                      ["Basis", "Program-level"],
                      ["Reconciliation", "Continuous"],
                      ["Client view", "Unfiltered"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-3">
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.15em] text-ink-ghost">
                          {k}
                        </span>
                        <span className="font-mono text-[11px] text-ink">{v}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 font-mono text-[9px] leading-[1.6] tracking-[0.05em] text-ink-faint">
                    Interface preview — figures withheld pending disclosure approval.
                  </p>
                </div>
              </div>
            </div>

            {/* The environment dissolves back into the page */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
              style={{
                background: "linear-gradient(180deg, transparent, var(--color-obsidian) 92%)",
              }}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

function ColHead({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-ghost">
        {label}
      </span>
      <span aria-hidden className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
    </div>
  );
}
