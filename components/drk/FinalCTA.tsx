"use client";

import { Section } from "@/components/ui/Primitives";
import { Button } from "@/components/ui/Button";
import { LiquidityField } from "./LiquidityField";
import { Logo } from "./Logo";
import { Scrub } from "@/components/system/Stage";
import { useIsCompact } from "@/lib/scroll";
import { closing, footer, brand, contact } from "@/content/drk";

/** Telegram glyph. Inlined so the contact block costs no extra request. */
function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M21.94 4.6 18.9 19.2c-.23 1.02-.84 1.27-1.7.79l-4.7-3.46-2.27 2.18c-.25.25-.46.46-.94.46l.34-4.78L18.4 6.9c.38-.34-.08-.53-.59-.19L7.05 13.4l-4.63-1.45c-1-.32-1.02-1 .21-1.49l18.1-6.98c.84-.3 1.57.2 1.21 1.12Z" />
    </svg>
  );
}

/**
 * ACT 14 — EVERYTHING COLLAPSES INTO ONE STATEMENT
 *
 * Complexity retreats. The network lines sink beneath the surface as the
 * statement resolves, and the field keeps running quietly after the copy has
 * landed — the system does not stop because the page ended.
 *
 * Contact is deliberately prominent here: the address is shown as readable
 * text at display size, not hidden behind a button label.
 */
export function FinalCTA() {
  const compact = useIsCompact();

  return (
    <>
      <Scrub
        as="section"
        id="contact"
        phase="Beneath the surface"
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-20 pt-32 sm:pt-40"
        start={0.95}
        end={0.1}
      >
        {/* ---- The network retreating beneath the surface ---------------- */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(100% 80% at 50% 82%, rgba(21,23,22,0.7) 0%, rgba(8,13,12,1) 68%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[58%]"
            style={{
              // Sinks and dims as the statement takes over.
              transform: "translate3d(0, calc(var(--p) * 12%), 0)",
              opacity: "calc(0.8 - var(--p) * 0.42)",
            }}
          >
            <LiquidityField intensity={compact ? 0.22 : 0.34} />
          </div>
          <div
            className="absolute inset-x-0 bottom-0 h-1/2"
            style={{
              background:
                "radial-gradient(55% 100% at 50% 112%, rgba(0,255,122,0.06), transparent 68%)",
              opacity: "calc(0.5 + var(--p) * 0.5)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-obsidian to-transparent" />
        </div>

        {/* ---- The statement ---------------------------------------------- */}
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center text-center">
            <h2
              className="display max-w-[15ch] text-[clamp(2.3rem,6.4vw,5.4rem)] text-ink"
              style={{
                opacity: "clamp(0, calc(var(--p) / 0.28), 1)",
                transform:
                  "translate3d(0, calc((1 - clamp(0, calc(var(--p) / 0.28), 1)) * 26px), 0)",
              }}
            >
              The next market operator is not a{" "}
              <span className="text-ink-faint">black box.</span>
            </h2>

            <p
              className="mt-8 max-w-[620px] text-[16.5px] leading-[1.65] text-ink-muted sm:text-[19px]"
              style={{
                opacity: "clamp(0, calc((var(--p) - 0.16) / 0.24), 1)",
                transform:
                  "translate3d(0, calc((1 - clamp(0, calc((var(--p) - 0.16) / 0.24), 1)) * 18px), 0)",
              }}
            >
              It is a <span className="text-tint">transparent operating system</span> with
              traders behind it.
            </p>

            {/* ---- CONTACT — the two Telegram handles, at display size ---
                These are DRK's only supplied contact details and they are the
                real ones. Shown as readable text, not buried behind a label. */}
            <div
              className="mt-14 flex w-full flex-col items-center"
              style={{
                opacity: "clamp(0, calc((var(--p) - 0.3) / 0.26), 1)",
                transform:
                  "translate3d(0, calc((1 - clamp(0, calc((var(--p) - 0.3) / 0.26), 1)) * 16px), 0)",
              }}
            >
              <span className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-ink-faint">
                {contact.label}
              </span>
              <p className="mt-3 text-[14px] text-ink-muted">{contact.strap}</p>

              <ul className="mt-8 flex w-full flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-12">
                {contact.people.map((person) => (
                  <li key={person.key}>
                    <a
                      href={person.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex flex-col items-center"
                      aria-label={`Message ${person.handle} on Telegram`}
                    >
                      <span className="inline-flex items-center gap-2.5">
                        <TelegramIcon className="h-[18px] w-[18px] shrink-0 text-ink-faint transition-colors duration-500 group-hover:text-hero sm:h-5 sm:w-5" />
                        <span
                          className="display text-[clamp(1.25rem,4.2vw,2.3rem)] text-ink transition-colors duration-500 group-hover:text-tint"
                          style={{ textShadow: "0 0 44px rgba(0,255,122,0.18)" }}
                        >
                          {person.handle}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="mt-2 block h-px w-full origin-center scale-x-[0.55] bg-hero/35 transition-all duration-700 ease-[var(--ease-drk)] group-hover:scale-x-100 group-hover:bg-hero/90"
                      />
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-11">
                <Button
                  href={contact.people[0].url}
                  size="lg"
                  variant="primary"
                  ariaLabel={`Message ${contact.people[0].handle} on Telegram`}
                >
                  {closing.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Sign-off: the system keeps running ------------------------- */}
        <div className="relative z-10 mt-20 sm:mt-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-10 h-32"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 50%, rgba(8,13,12,0.92) 0%, rgba(8,13,12,0.6) 55%, transparent 100%)",
            }}
          />
          <p
            className="relative text-center font-mono text-[10px] uppercase tracking-[0.4em] text-ink-muted sm:text-[11.5px]"
            style={{
              opacity: "clamp(0, calc((var(--p) - 0.5) / 0.24), 1)",
              textShadow: "0 0 26px rgba(8,13,12,0.95), 0 0 44px rgba(0,255,122,0.14)",
            }}
          >
            {closing.signOff}
          </p>
        </div>
      </Scrub>

      {/* ---- Minimal footer ------------------------------------------------- */}
      <footer className="relative border-t border-white/[0.05]">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Logo size="sm" />
            <span aria-hidden className="hidden h-3 w-px bg-white/10 sm:block" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
              {footer.note}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {contact.people.map((person) => (
              <a
                key={person.key}
                href={person.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.06em] text-ink-muted transition-colors duration-500 hover:text-hero"
              >
                <TelegramIcon className="h-3 w-3" />
                {person.handle}
              </a>
            ))}
            <span aria-hidden className="hidden h-3 w-px bg-white/10 sm:block" />
            <span className="font-mono text-[10px] tracking-[0.1em] text-ink-faint">
              {footer.legal}
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
