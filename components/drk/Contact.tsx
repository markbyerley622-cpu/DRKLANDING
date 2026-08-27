"use client";

import { LiquidField } from "@/components/system/LiquidField";
import { Logo } from "@/components/drk/Logo";
import { Button } from "@/components/ui/Button";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import { contact, brand } from "@/content/drk";

/**
 * CONTACT — the door.
 *
 * The liquid returns at full strength here, mirrored to the left of the
 * frame, so the page closes on the same surface it opened on. Everything the
 * site deliberately withholds — the walkthrough, the record, the economics —
 * is on the other side of these two handles.
 *
 * The handles are rendered exactly as supplied. They are never completed or
 * guessed: a wrong handle sends someone to a stranger.
 */
export function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[92svh] w-full items-center overflow-hidden"
    >
      {/* The field, flipped — the close mirrors the open. */}
      <div className="pointer-events-none absolute inset-0" style={{ transform: "scaleX(-1)" }}>
        <LiquidField level={0.85} turbulence={0.8} zoom={1.12} edge="hero" sink={false} />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(268deg, var(--color-obsidian) 0%, rgba(8,13,12,0.84) 28%, rgba(8,13,12,0.28) 48%, transparent 64%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{ background: "linear-gradient(180deg, var(--color-obsidian), transparent)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-28 sm:px-8 sm:py-32 lg:px-12">
        <div className="flex flex-col items-end text-right">
          <Reveal>
            <Eyebrow>{contact.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={90} className="mt-6">
            <h2 className="display text-[clamp(2.6rem,7vw,5.4rem)] text-ink">
              {contact.headline.replace(/\.$/, "")}
              <span aria-hidden className="text-ink">
                .
              </span>
            </h2>
          </Reveal>

          <Reveal delay={170} className="mt-5">
            <p className="text-[15.5px] leading-[1.65] text-ink-muted sm:text-[17px]">
              {contact.body}
            </p>
          </Reveal>

          {/* The two handles. Verbatim. */}
          <Reveal delay={250} className="mt-10 w-full">
            <ul className="ml-auto flex w-full max-w-[420px] flex-col gap-px">
              {contact.people.map((p) => (
                <li key={p.key}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between gap-6 py-5 transition-colors duration-500"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-faint">
                      Telegram
                    </span>
                    <span className="font-display text-[17px] font-semibold tracking-[-0.015em] text-ink transition-colors duration-500 group-hover:text-hero sm:text-[19px]">
                      {p.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={330} className="mt-11">
            <Button href={contact.cta.href} size="lg" variant="primary" spread>
              {contact.cta.label}
            </Button>
          </Reveal>
        </div>

        {/* Footer, on the same grid. */}
        <div
          className="mt-24 flex flex-col gap-5 pt-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <Logo size="sm" />
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-faint">
            {brand.surfaceLine}
          </span>
        </div>
      </div>
    </section>
  );
}
