"use client";

import { Section, Reveal } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { LiquidityField } from "./LiquidityField";
import { Logo } from "./Logo";
import { closing, footer, brand } from "@/content/drk";

/**
 * ACT 15 — FINAL STATEMENT
 * Extremely simple. One statement, one action, then the page fades back
 * into the dark it came out of.
 *
 * The source line read "The next market maker is not a black box." It is
 * reframed here per the positioning constraint; the meaning is preserved.
 */
export function FinalCTA() {
  return (
    <>
      <Section
        id="contact"
        bleed
        className="relative flex min-h-[92svh] flex-col justify-center overflow-hidden pb-24 pt-32 sm:pt-40"
      >
        {/* ---- Atmosphere: the field returns, quieter ---------------------- */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(100% 80% at 50% 78%, rgba(21,23,22,0.75) 0%, rgba(8,13,12,1) 66%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-[62%] opacity-70">
            <LiquidityField intensity={0.65} />
          </div>
          <div
            className="absolute inset-x-0 bottom-0 h-1/2"
            style={{
              background:
                "radial-gradient(55% 100% at 50% 108%, rgba(0,255,122,0.14), transparent 68%)",
            }}
          />
          {/* Fade in from the previous act */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-obsidian to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center text-center">
            <Reveal y={30}>
              <h2 className="display max-w-[15ch] text-[clamp(2.3rem,6.4vw,5.4rem)] text-ink">
                The next market operator is not a{" "}
                <span className="text-ink-faint">black box.</span>
              </h2>
            </Reveal>

            <Reveal delay={140} className="mt-8 max-w-[620px]">
              <p className="text-[16.5px] leading-[1.65] text-ink-muted sm:text-[19px]">
                It is a{" "}
                <span className="text-tint">transparent operating system</span> with
                traders behind it.
              </p>
            </Reveal>

            <Reveal delay={260} className="mt-12">
              <Button href={`mailto:${brand.contactEmail}`} size="lg" variant="primary">
                {closing.cta.label}
              </Button>
            </Reveal>

            {/* Channels — rendered only once approved handles exist */}
            {!closing.channelsPending && closing.channels.length > 0 && (
              <Reveal delay={330} className="mt-9">
                <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
                  {closing.channels.map((c) => (
                    <li key={c.handle}>
                      <a
                        href={c.href}
                        className="group inline-flex items-center gap-2.5 font-mono text-[11.5px]
                          tracking-[0.06em] text-ink-muted transition-colors duration-500 hover:text-hero"
                      >
                        <span className="text-ink-ghost">{c.label}</span>
                        {c.handle}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>

        {/* ---- Sign-off: sits on its own band of dark before the footer ----- */}
        <div className="relative z-10 mt-24 sm:mt-32">
          {/* A local scrim so the line never competes with the field behind it */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-10 h-32"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 50%, rgba(8,13,12,0.92) 0%, rgba(8,13,12,0.6) 55%, transparent 100%)",
            }}
          />
          <Reveal delay={400}>
            <p
              className="relative text-center font-mono text-[10px] uppercase tracking-[0.4em] text-ink-muted sm:text-[11.5px]"
              style={{ textShadow: "0 0 26px rgba(8,13,12,0.95), 0 0 44px rgba(0,255,122,0.14)" }}
            >
              {closing.signOff}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---- Minimal footer ------------------------------------------------- */}
      <footer className="relative border-t border-white/[0.05]">
        <div
          className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-6 py-9 sm:flex-row
            sm:items-center sm:justify-between sm:px-8 lg:px-12"
        >
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <span aria-hidden className="h-3 w-px bg-white/10" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-ghost">
              {footer.note}
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.1em] text-ink-ghost">
            {footer.legal}
          </span>
        </div>
      </footer>
    </>
  );
}
