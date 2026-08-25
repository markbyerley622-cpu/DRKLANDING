"use client";

/**
 * DRK wordmark — heavy grotesk + the signature green terminal dot.
 * The "DARK MARKET MAKERS" lockup from the brand sheet is intentionally
 * not used in site chrome (see content/drk.ts).
 */
export function Logo({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const scale = { sm: "text-[19px]", md: "text-[23px]", lg: "text-[30px]" }[size];
  const dot = { sm: "h-[5px] w-[5px]", md: "h-[6px] w-[6px]", lg: "h-[8px] w-[8px]" }[size];

  return (
    <span
      className={`group inline-flex items-end gap-[3px] font-display font-black
        leading-none tracking-[-0.045em] text-ink ${scale} ${className}`}
      aria-label="DRK"
    >
      <span>DRK</span>
      <span
        aria-hidden
        className={`mb-[3px] rounded-full bg-hero transition-shadow duration-500 ${dot}`}
        style={{ boxShadow: "0 0 10px 1px rgba(0,255,122,0.7)" }}
      />
    </span>
  );
}
