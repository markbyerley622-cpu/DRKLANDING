"use client";

import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { Scrub } from "@/components/system/Stage";
import { GlassSurface } from "@/components/system/GlassSurface";
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
 * ACT 07 — THE CLOSE
 *
 * Everything converges into one last glass surface. The global Undercurrent
 * is already retreating across this act, so the page ends in the dark it
 * opened in.
 *
 * This is also the door: the application, the launch record and the operating
 * detail are deliberately not on this site, and this is where the reader is
 * told where to get them.
 */
export function FinalCTA() {
  return (
    <>
      <Scrub
        as="section"
        id="contact"
        phase="Beneath the surface"
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-20 pt-32 sm:px-8 sm:pt-40 lg:px-12"
        start={0.95}
        end={0.1}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(100% 80% at 50% 82%, rgba(21,23,22,0.28) 0%, rgba(8,13,12,0.9) 68%)",
            }}
          />
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

        <div className="relative z-10 mx-auto w-full max-w-[1000px]">
          {/* ---- The statement ------------------------------------------ */}
          <div className="flex flex-col items-center text-center">
            <h2
              className="display max-w-[16ch] text-[clamp(2.2rem,6vw,5rem)] text-ink"
              style={{
                opacity: "clamp(0, calc(var(--p) / 0.26), 1)",
                transform:
                  "translate3d(0, calc((1 - clamp(0, calc(var(--p) / 0.26), 1)) * 24px), 0)",
              }}
            >
              {closing.headline[0]}{" "}
              <span className="text-ink-faint">{closing.headline[1]}</span>
            </h2>

            <p
              className="mt-7 max-w-[560px] text-[16px] leading-[1.6] text-ink-muted sm:text-[18.5px]"
              style={{
                opacity: "clamp(0, calc((var(--p) - 0.14) / 0.22), 1)",
                transform:
                  "translate3d(0, calc((1 - clamp(0, calc((var(--p) - 0.14) / 0.22), 1)) * 16px), 0)",
              }}
            >
              {closing.statement[0]}{" "}
              <span className="text-tint">{closing.statement[1]}</span>
            </p>
          </div>

          {/* ---- The door ------------------------------------------------ */}
          <div
            className="mt-14 sm:mt-16"
            style={{
              opacity: "clamp(0, calc((var(--p) - 0.28) / 0.24), 1)",
              transform:
                "translate3d(0, calc((1 - clamp(0, calc((var(--p) - 0.28) / 0.24), 1)) * 18px), 0)",
            }}
          >
            <GlassSurface lift={0.9} glow={0.5} radius={24} className="px-7 py-10 sm:px-12 sm:py-12">
              <div className="flex flex-col items-center text-center">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-ink-faint">
                  {contact.label}
                </span>
                <p className="mt-3.5 max-w-[46ch] text-[14.5px] leading-[1.6] text-ink-muted">
                  {closing.invitation}
                </p>

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
                          <TelegramIcon className="h-[17px] w-[17px] shrink-0 text-ink-faint transition-colors duration-500 group-hover:text-hero" />
                          <span className="display text-[clamp(1.15rem,3.6vw,1.9rem)] text-ink transition-colors duration-500 group-hover:text-tint">
                            {person.handle}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className="mt-2 block h-px w-full origin-center scale-x-[0.5] bg-hero/30 transition-all duration-700 ease-[var(--ease-drk)] group-hover:scale-x-100 group-hover:bg-hero/90"
                        />
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Button
                    href={contact.people[0].url}
                    size="lg"
                    variant="primary"
                    ariaLabel={`Message ${contact.people[0].handle} on Telegram`}
                  >
                    {closing.cta}
                  </Button>
                </div>
              </div>
            </GlassSurface>
          </div>

          {/* ---- Sign-off ------------------------------------------------ */}
          <p
            className="relative mt-16 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-ink-muted sm:mt-20 sm:text-[11.5px]"
            style={{
              opacity: "clamp(0, calc((var(--p) - 0.5) / 0.24), 1)",
              textShadow: "0 0 26px rgba(8,13,12,0.95), 0 0 44px rgba(0,255,122,0.14)",
            }}
          >
            {closing.signOff}
          </p>
        </div>
      </Scrub>

      {/* ---- Footer ---------------------------------------------------------- */}
      <footer className="relative z-10 border-t border-white/[0.05]">
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
        {/* The full positioning line, stated once, at the very bottom. */}
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-9 sm:px-8 lg:px-12">
          <p className="max-w-[70ch] text-[12.5px] leading-[1.7] text-ink-faint">
            {brand.positioning}
          </p>
        </div>
      </footer>
    </>
  );
}
