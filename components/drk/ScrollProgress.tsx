"use client";

import { useEffect, useState } from "react";

/** A single hairline of green at the top of the viewport. Nothing more. */
export function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    measure();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-px">
      <div
        className="h-full origin-left"
        style={{
          transform: `scaleX(${p})`,
          background: "linear-gradient(90deg, rgba(0,255,122,0.25), var(--color-hero))",
          boxShadow: p > 0.01 ? "0 0 10px rgba(0,255,122,0.55)" : "none",
        }}
      />
    </div>
  );
}
