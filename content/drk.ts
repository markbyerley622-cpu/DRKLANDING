/**
 * DRK — CONTENT SOURCE OF TRUTH
 * ---------------------------------------------------------------------------
 * This site is a FRONT DOOR, not a deck.
 *
 * Its job is to say what DRK is, show that there is real infrastructure
 * behind it, and make the reader get in touch. Everything else — the
 * application walkthrough, launch results, economics, projections and the
 * raise — lives behind "Contact DRK" and is shared privately.
 *
 * THREE RULES
 *
 *  1. NO SENSITIVE MATERIAL. No client data, no P/L, no revenue, no
 *     projections, no market statistics, no performance claims. If a number
 *     is not approved for public view it does not appear — show SYSTEM STATE
 *     instead (Live, Connected, Routed, Attributed, Reconciled).
 *
 *  2. NO "MARKET MAKING". The phrase appears nowhere on the public site.
 *
 *  3. PLAIN LANGUAGE. "Runtime", "operating layer" and "telemetry" are
 *     insider words — they wash out for the people this page is for. Say what
 *     the thing does: wallets, liquidity, trading, reporting.
 */

/* -------------------------------------------------------------------------- */
/* BRAND                                                                      */
/* -------------------------------------------------------------------------- */

export const brand = {
  name: "DRK",
  descriptor: "Programmatic trading & liquidity infrastructure",
  surfaceLine: "Liquidity beneath the surface.",
  /**
   * The full positioning line. Used once, in the closing act — the hero keeps
   * the short descriptor so the headline carries the weight.
   */
  positioning:
    "We combine technical and trading infrastructure with hands-on execution to help build and scale high-conviction blockchain projects.",
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
  label: "Contact",
  strap: "Direct line to the team.",
  people: [
    { key: "unicorn", handle: "@unicorrrrnnnnn", url: "https://t.me/unicorrrrnnnnn" },
    { key: "gokusan", handle: "@GokuSan0x", url: "https://t.me/GokuSan0x" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* OPENING CURTAIN                                                            */
/* -------------------------------------------------------------------------- */

/**
 * DRK's own title card. The clip contains the wordmark and nothing else — no
 * product, no data — so it stays while the application reel goes.
 *
 * The boot lines are brand language, not status. Nothing is being initialised
 * while they are on screen and none of them names a venue, chain or figure.
 */
export const curtain = {
  src: "/intro.mp4",
  skip: "Skip",
  boot: ["Initializing", "Connecting", "Syncing", "Ready"],
} as const;

export const nav = [
  { label: "System", href: "#system" },
  { label: "Infrastructure", href: "#infrastructure" },
  { label: "Contact", href: "#contact" },
] as const;

/* -------------------------------------------------------------------------- */
/* 01 — THE SURFACE                                                           */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Programmatic trading & liquidity infrastructure",
  headline: ["We turn token launches", "into visible", "trading programs."],
  /** The word revealed from beneath the dark layer, on line 1. */
  emphasisIndex: 1,
  /** Plain language: no "runtime", no "operating layer". */
  body: "One system for the wallets, the liquidity, the trading and the reporting.",
  statement: "You see all of it.",
  ctaPrimary: { label: "See the system", href: "#system" },
  ctaSecondary: { label: "Contact", href: "#contact" },
  /** The four signals that wake in sequence, and recur across the page. */
  signals: ["Wallets", "Liquidity", "Execution", "Reporting"],
} as const;

/* -------------------------------------------------------------------------- */
/* 02 — THE PROBLEM                                                           */
/* -------------------------------------------------------------------------- */

export const problem = {
  eyebrow: "01",
  headline: "Legacy market operations are built on opacity.",
  /** One line, not four cards. */
  body:
    "Capital goes in. A number comes back. What happened in between belongs to somebody else.",
  legacy: ["Assets", "?", "Result"],
  drk: ["Assets", "Programs", "Execution", "P/L"],
  payoff: "Every stage between assets and outcomes is named, attributed and observable.",
} as const;

/* -------------------------------------------------------------------------- */
/* 03 — THE ENGINE                                                            */
/* -------------------------------------------------------------------------- */

export const engine = {
  eyebrow: "02",
  headline: ["One system.", "Different operators."],
  modes: [
    {
      id: "drk",
      key: "DRK operates",
      title: "We run it for you",
      detail: "Our traders operate the system on your behalf.",
    },
    {
      id: "client",
      key: "Client operates",
      title: "Or your team runs it",
      detail: "The same system, licensed and deployed to your desk.",
    },
  ],
  payoff: ["Same infrastructure.", "Same visibility."],
} as const;

/* -------------------------------------------------------------------------- */
/* 04 — THE SYSTEM                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Controlled glimpses, not a dashboard. Every line is a STATE, never a value —
 * there is no client data and no fabricated metric anywhere in this act.
 */
export const system = {
  eyebrow: "03",
  headline: "See what is happening.",
  body: "Controlled visibility into a system that is already running.",
  modules: [
    {
      id: "programs",
      label: "Programs",
      lines: ["Named strategies.", "Defined inputs.", "Measured outputs."],
      state: "Attributed",
    },
    {
      id: "wallets",
      label: "Wallets",
      lines: ["Client-controlled.", "Mapped.", "Reconciled."],
      state: "Reconciled",
    },
    {
      id: "execution",
      label: "Execution",
      lines: ["Routed.", "Timestamped.", "Attributed."],
      state: "Routing",
    },
    {
      id: "risk",
      label: "Risk",
      lines: ["Monitored.", "Limited.", "Enforced."],
      state: "Enforced",
    },
    {
      id: "reporting",
      label: "Reporting",
      lines: ["Live.", "Program-level.", "Continuous."],
      state: "Live",
    },
  ],
  note: "Interface states only. No client data is shown.",
} as const;

/* -------------------------------------------------------------------------- */
/* 05 — THE INFRASTRUCTURE                                                    */
/* -------------------------------------------------------------------------- */

export const infrastructure = {
  eyebrow: "04",
  headline: "We own the stack.",
  body: "The interface is what you see. This is what makes it work.",
  layers: [
    { id: "l4", index: "04", name: "Data & Insights" },
    { id: "l3", index: "03", name: "Risk & Controls" },
    { id: "l2", index: "02", name: "Routing" },
    { id: "l1", index: "01", name: "Liquidity Engine" },
  ],
  inputs: ["Chains", "Pools", "Launches", "Venues"],
  outputs: ["Execution", "Reporting"],
  payoff: "Our traders operate our software.",
} as const;

/* -------------------------------------------------------------------------- */
/* 06 — THE LIFECYCLE                                                         */
/* -------------------------------------------------------------------------- */

export const lifecycle = {
  eyebrow: "05",
  headline: "Present from the first block onward.",
  stages: [
    {
      id: "p1",
      index: "01",
      name: "Pre-launch",
      detail: "Wallets and programs designed before supply exists.",
    },
    {
      id: "p2",
      index: "02",
      name: "First block",
      detail: "Trading begins the moment the market does.",
    },
    {
      id: "p3",
      index: "03",
      name: "Migration",
      detail: "Liquidity moves across venues without losing continuity.",
    },
    {
      id: "p4",
      index: "04",
      name: "Liquidity",
      detail: "Depth is built and held as a position, not a favour.",
    },
    {
      id: "p5",
      index: "05",
      name: "Growth",
      detail: "Programs widen as the market does.",
    },
  ],
  payoff: ["The market changes shape.", "The system stays connected."],
} as const;

/* -------------------------------------------------------------------------- */
/* 07 — CLOSING                                                               */
/* -------------------------------------------------------------------------- */

export const closing = {
  /**
   * Source line read "The next market maker is not a black box." Reframed per
   * the positioning constraint; meaning preserved.
   */
  headline: ["The next market operator", "is not a black box."],
  statement: ["It is a transparent operating system", "with traders behind it."],
  cta: "Contact DRK",
  /** The deeper material is shared privately, on request. */
  invitation:
    "The application, the launch record and the full operating detail are shared directly.",
  signOff: "Liquidity beneath the surface.",
} as const;

export const footer = {
  legal: "© 2026 DRK. All rights reserved.",
  note: "Programmatic trading & liquidity infrastructure.",
} as const;
