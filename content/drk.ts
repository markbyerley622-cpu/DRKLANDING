/**
 * DRK — CONTENT SOURCE OF TRUTH
 * ---------------------------------------------------------------------------
 * This site is a FRONT DOOR, not a deck. Four screens, then the door.
 *
 * THE COPY RULE: say it in a line or cut it. The page sells a conversation,
 * not the product — the walkthrough, the record, the economics and the raise
 * are shared privately, behind "Get in touch". Anything that reads like a
 * paragraph belongs in that conversation, not here.
 *
 * The other three rules still hold:
 *   1. NO SENSITIVE MATERIAL. No client data, no P/L, no revenue, no
 *      projections, no market statistics, no performance claims.
 *   2. NO "MARKET MAKING". The phrase appears nowhere on the public site.
 *   3. PLAIN LANGUAGE. Not "runtime", not "operating layer". Say what the
 *      thing does: wallets, liquidity, trading, reporting.
 */

/* -------------------------------------------------------------------------- */
/* BRAND                                                                      */
/* -------------------------------------------------------------------------- */

export const brand = {
  name: "DRK",
  descriptor: "Liquidity infrastructure",
  surfaceLine: "Liquidity beneath the surface.",
} as const;

/* -------------------------------------------------------------------------- */
/* CONTACT                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * The two Telegram handles are the ONLY contact details DRK has supplied, and
 * they are the real ones — taken verbatim from the pitch deck build. They are
 * never derived, completed or guessed: a wrong handle sends someone to a
 * stranger. There is deliberately no email address.
 */
export const contact = {
  eyebrow: "Contact",
  headline: "Get Liquid.",
  body: "Direct line to the team.",
  cta: { label: "Get in touch", href: "https://t.me/unicorrrrnnnnn" },
  people: [
    { key: "unicorn", handle: "@unicorrrrnnnnn", url: "https://t.me/unicorrrrnnnnn" },
    { key: "gokusan", handle: "@GokuSan0x", url: "https://t.me/GokuSan0x" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* OPENING CURTAIN                                                            */
/* -------------------------------------------------------------------------- */

/**
 * DRK's own title card — the wordmark and nothing else.
 */
export const curtain = {
  src: "/intro.mp4",
  skip: "Skip",
  boot: ["Initializing", "Connecting", "Syncing", "Ready"],
} as const;

export const nav = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
] as const;

/* -------------------------------------------------------------------------- */
/* 01 — HERO                                                                  */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Liquidity infrastructure",
  /** Two words. The dot is the mark, not punctuation. */
  headline: "Get Liquid",
  body: [
    "DRK brings institutional-grade liquidity management",
    "built for performance, execution, and scale.",
  ],
  cta: { label: "Get in touch", href: "#contact" },
} as const;

/* -------------------------------------------------------------------------- */
/* 02 — CAPABILITIES                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Labels, not claims. Each line states what the system handles — no
 * adjectives, no promises, no comparison to anyone else.
 */
export const capabilities = {
  eyebrow: "Capabilities",
  headline: "What DRK handles.",
  items: [
    { key: "wallets", title: "Wallets", line: "Custody, funding and balances." },
    { key: "liquidity", title: "Liquidity", line: "Placement and management across venues." },
    { key: "execution", title: "Execution", line: "Programmatic order flow." },
    { key: "reporting", title: "Reporting", line: "Positions, activity and attribution." },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 03 — APPROACH                                                              */
/* -------------------------------------------------------------------------- */

export const approach = {
  eyebrow: "Approach",
  headline: "How it works.",
  steps: [
    { n: "01", title: "Connect", line: "Assets are funded into wallets DRK operates." },
    { n: "02", title: "Operate", line: "Liquidity and execution run as a defined program." },
    { n: "03", title: "Report", line: "Activity is reported back with attribution." },
  ],
} as const;
