"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { nav } from "@/content/drk";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 24);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Highlight the nav item whose section is currently occupying the viewport */
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  /* Lock scroll behind the mobile sheet */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[var(--ease-drk)]"
        style={{
          height: "var(--nav-h)",
          backgroundColor: scrolled ? "rgba(8,13,12,0.72)" : "transparent",
          backdropFilter: scrolled ? "blur(18px) saturate(120%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px) saturate(120%)" : "none",
          borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.07)" : "transparent"}`,
        }}
      >
        <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between px-6 sm:px-8 lg:px-12">
          <a href="#top" aria-label="DRK — back to top" className="shrink-0">
            <Logo />
          </a>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const isActive = active === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="group relative px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.16em]
                    transition-colors duration-500"
                  style={{ color: isActive ? "var(--color-tint)" : "var(--color-ink-faint)" }}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-3.5 bottom-1 h-px origin-left bg-hero/70
                      transition-transform duration-500 ease-[var(--ease-drk)] group-hover:scale-x-100"
                    style={{ transform: `scaleX(${isActive ? 1 : 0})` }}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Button href="#contact" size="md" variant="primary">
                Contact
              </Button>
            </div>

            {/* Mobile trigger */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-[12px] lg:hidden"
              style={{
                background: "linear-gradient(180deg, rgba(34,37,35,0.6), rgba(8,13,12,0.8))",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <span className="relative block h-[10px] w-[17px]">
                <span
                  className="absolute left-0 block h-px w-full bg-ink transition-all duration-400 ease-[var(--ease-drk)]"
                  style={{ top: open ? "5px" : "0", transform: open ? "rotate(45deg)" : "none" }}
                />
                <span
                  className="absolute left-0 block h-px w-full bg-ink transition-all duration-400 ease-[var(--ease-drk)]"
                  style={{
                    bottom: open ? "4px" : "0",
                    transform: open ? "rotate(-45deg)" : "none",
                  }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        className="fixed inset-0 z-40 lg:hidden"
        style={{
          pointerEvents: open ? "auto" : "none",
          opacity: open ? 1 : 0,
          transition: "opacity 500ms var(--ease-drk)",
        }}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-obsidian/92 backdrop-blur-2xl" />
        <nav
          aria-label="Mobile"
          className="relative flex h-full flex-col justify-center gap-1 px-8"
        >
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display border-b border-white/[0.06] py-5 text-[clamp(2rem,9vw,2.75rem)] text-ink
                transition-all duration-500 ease-[var(--ease-drk)]"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(18px)",
                transitionDelay: `${open ? 120 + i * 55 : 0}ms`,
              }}
            >
              <span className="mr-4 font-mono text-[11px] align-middle text-ink-ghost">
                0{i + 1}
              </span>
              {item.label}
            </a>
          ))}
          <div
            className="mt-10 transition-all duration-500"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(18px)",
              transitionDelay: open ? "420ms" : "0ms",
            }}
          >
            <Button href="#contact" size="lg" variant="primary">
              Contact
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
