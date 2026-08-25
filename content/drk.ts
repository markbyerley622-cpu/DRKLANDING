/**
 * DRK — CONTENT SOURCE OF TRUTH
 * ---------------------------------------------------------------------------
 * Every word and number rendered by the site originates here.
 *
 * RULE: nothing in this file may be invented. Where the supplied brief
 * referenced data that was NOT actually provided (launch P/L, market
 * statistics, three-year projections, revenue figures, Telegram handles), the
 * entry carries `pending: true` and the UI renders a qualitative,
 * non-numeric treatment instead of a fabricated one.
 *
 * Search this file for `pending: true` to find everything awaiting
 * founder approval before it can go public.
 */

/* -------------------------------------------------------------------------- */
/* BRAND                                                                      */
/* -------------------------------------------------------------------------- */

export const brand = {
  name: "DRK",
  /**
   * NOTE: the brand sheet's secondary lockup reads "DARK MARKET MAKERS".
   * Per the positioning constraint, that lockup is not used anywhere in the
   * site chrome. The primary "DRK." mark plus the surface-line is used instead.
   */
  surfaceLine: "Liquidity beneath the surface.",
  positioning: "Programmatic trading & liquidity infrastructure for market operations.",
  contactEmail: "hello@drk.io", // pending: confirm the real inbound address
  contactPending: true,
} as const;

export const nav = [
  { label: "Launch", href: "#lifecycle" },
  { label: "Wallets", href: "#control" },
  { label: "Liquidity", href: "#architecture" },
  { label: "Execution", href: "#proof" },
  { label: "Reporting", href: "#evidence" },
] as const;

/* -------------------------------------------------------------------------- */
/* ACT 01 — ACTIVATION                                                        */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Programmatic trading & liquidity infrastructure",
  headline: ["We turn token launches", "into visible", "trading programs."],
  /** The word rendered in mint on line 1. */
  emphasisIndex: 1,
  body: "One runtime for wallets, liquidity, execution, and reporting.",
  statement: "DRK is an operating layer.",
  ctaPrimary: { label: "Let's talk", href: "#contact" },
  ctaSecondary: { label: "See the system", href: "#proof" },
  telemetry: [
    { label: "Runtime", value: "Operational" },
    { label: "Programs", value: "Attributed" },
    { label: "Reporting", value: "Live" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* ACT 02 — THE PROBLEM                                                       */
/* -------------------------------------------------------------------------- */

export const problem = {
  eyebrow: "01 — The problem",
  /** Reframed from the source deck's "legacy market making" per brand rule. */
  headline: "Legacy market operations are built on opacity.",
  body:
    "Capital goes in. A number comes back. The mechanism in between belongs to somebody else — and so does everything it learns.",
  costs: [
    {
      id: "loans",
      label: "Token loans",
      detail: "Your supply is lent out and its use is unobservable.",
    },
    {
      id: "retainers",
      label: "Upfront retainers",
      detail: "You pay for capacity before a single outcome is produced.",
    },
    {
      id: "pools",
      label: "Pool-by-pool charges",
      detail: "Every venue is re-priced as if it were a new engagement.",
    },
    {
      id: "adaptation",
      label: "Slow adaptation",
      detail: "Conditions move in minutes. The desk responds in weeks.",
    },
  ],
  transform: {
    title: "What you put in → what you get back",
    legacy: { label: "Traditional", chain: ["Assets", "???"] },
    drk: {
      label: "DRK",
      chain: ["Assets", "Programs", "Execution", "P/L", "Observable"],
    },
  },
} as const;

/* -------------------------------------------------------------------------- */
/* ACT 03 — ONE ENGINE                                                        */
/* -------------------------------------------------------------------------- */

export const engine = {
  eyebrow: "02 — The engine",
  headline: "One proprietary engine. Two scalable businesses.",
  body: "Performance revenue today. Recurring software revenue at scale.",
  modes: [
    {
      id: "drk-operates",
      key: "DRK operates",
      title: "Managed trading and execution",
      detail:
        "Our traders run the runtime on your behalf. You hold the assets, you see the programs, you keep the attribution.",
      revenue: "Performance revenue",
      horizon: "Today",
    },
    {
      id: "client-operates",
      key: "Client operates",
      title: "Licensed runtime",
      detail:
        "The same engine, deployed to your desk. Your operators, our infrastructure, identical telemetry.",
      revenue: "Recurring software revenue",
      horizon: "At scale",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* ACT 04 — PRODUCT PROOF                                                     */
/* -------------------------------------------------------------------------- */

export const proof = {
  eyebrow: "03 — Product proof",
  headline: "Clients see what black-box operators hide.",
  body: "Every output is visible, attributed and measured.",
  /**
   * Interface content is structural (module names + states), not financial.
   * No P/L values are asserted here — the demo surface animates shape only
   * and is labelled as an interface preview.
   */
  modules: [
    { id: "programs", label: "Programs", meta: "Attributed" },
    { id: "wallets", label: "Wallets", meta: "Enumerated" },
    { id: "executions", label: "Executions", meta: "Timestamped" },
    { id: "threats", label: "Threats", meta: "Monitored" },
    { id: "position", label: "Position", meta: "Reconciled" },
    { id: "execution", label: "Execution", meta: "Routed" },
    { id: "pnl", label: "P/L", meta: "Measured" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* ACT 05 — EVIDENCE                                                          */
/* -------------------------------------------------------------------------- */

export const evidence = {
  eyebrow: "04 — Evidence",
  headline: "Two launches. Weak market.",
  body:
    "Both programs were operated into risk-off conditions and both completed. Outcomes were produced by the runtime, attributed to programs, and reported to the client.",
  /**
   * pending: true on every quantitative field.
   * The brief referenced client profit / DRK capture figures but did not
   * supply them. They are deliberately NOT rendered as numbers.
   */
  launches: [
    {
      id: "l1",
      window: "Late July 2026",
      market: "Risk-off",
      clientProfit: { value: null, qualitative: "Positive", pending: true },
      drkCapture: { value: null, qualitative: "Performance-linked", pending: true },
      status: "Completed",
    },
    {
      id: "l2",
      window: "Early August 2026",
      market: "Risk-off",
      clientProfit: { value: null, qualitative: "Positive", pending: true },
      drkCapture: { value: null, qualitative: "Performance-linked", pending: true },
      status: "Completed",
    },
  ],
  disclaimer:
    "Market context shown is illustrative of direction only and carries no axis values. Program-level figures are withheld pending disclosure approval.",
} as const;

/* -------------------------------------------------------------------------- */
/* ACT 06 — THE STACK                                                         */
/* -------------------------------------------------------------------------- */

export const architecture = {
  eyebrow: "05 — Architecture",
  headline: "We own the stack.",
  body: "Our traders operate our software.",
  layers: [
    {
      id: "l4",
      index: "04",
      name: "Data & Insights",
      detail: "Attribution, telemetry and reporting across every program.",
    },
    {
      id: "l3",
      index: "03",
      name: "Risk & Controls",
      detail: "Limits, threat monitoring and operator guardrails.",
    },
    {
      id: "l2",
      index: "02",
      name: "Routing Layer",
      detail: "Venue selection, order shaping and execution paths.",
    },
    {
      id: "l1",
      index: "01",
      name: "Liquidity Engine",
      detail: "Wallet orchestration and programmatic liquidity deployment.",
    },
  ],
  inputs: ["Chains", "Pools", "Launchpads", "Perps", "Venues"],
  outputs: ["Execution", "Reporting"],
} as const;

/* -------------------------------------------------------------------------- */
/* ACT 07 — EXPANDING MARKET                                                  */
/* -------------------------------------------------------------------------- */

export const market = {
  eyebrow: "06 — Market",
  headline: "The surface area keeps expanding.",
  body:
    "Every step widens the operating problem — and narrows the set of desks that can actually run it.",
  /**
   * pending: the brief referenced supporting market statistics and sources,
   * but none were supplied. The sequence is rendered qualitatively.
   * Do not add figures here without a verified public source.
   */
  statsPending: true,
  sequence: [
    { id: "m1", step: "01", title: "Capital moves onchain" },
    { id: "m2", step: "02", title: "Volume follows" },
    { id: "m3", step: "03", title: "Onchain activity expands" },
    { id: "m4", step: "04", title: "Markets fragment" },
    { id: "m5", step: "05", title: "Liquidity complexity increases" },
    { id: "m6", step: "06", title: "Institutional flow arrives" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* ACT 08 — INTEGRATION SPEED                                                 */
/* -------------------------------------------------------------------------- */

export const integration = {
  eyebrow: "07 — Integration",
  headline: "We integrate in days, not years.",
  contrast: [
    { id: "trad", label: "Traditional", unit: "Quarters", tone: "muted" },
    { id: "drk", label: "DRK", unit: "Days", tone: "hero" },
  ],
  states: [
    { id: "s0", label: "Unconnected" },
    { id: "s1", label: "Detected" },
    { id: "s2", label: "Route formed" },
    { id: "s3", label: "Engine linked" },
    { id: "s4", label: "Telemetry" },
    { id: "s5", label: "Active" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* ACT 09 — LAUNCH LIFECYCLE                                                  */
/* -------------------------------------------------------------------------- */

export const lifecycle = {
  eyebrow: "08 — Lifecycle",
  headline: "Present from the first block onward.",
  body:
    "A launch is not an event. It is an operating state that changes shape five times in its first weeks.",
  stages: [
    {
      id: "p1",
      index: "01",
      name: "Pre-launch",
      detail: "Wallet topology, program design and venue mapping before supply exists.",
    },
    {
      id: "p2",
      index: "02",
      name: "First block",
      detail: "Execution begins at the moment the market does. No warm-up window.",
    },
    {
      id: "p3",
      index: "03",
      name: "Migration",
      detail: "Liquidity is carried across venues without surrendering continuity.",
    },
    {
      id: "p4",
      index: "04",
      name: "Liquidity",
      detail: "Depth is built and held as a programmatic position, not a favour.",
    },
    {
      id: "p5",
      index: "05",
      name: "Growth",
      detail: "Programs widen as the market does, under the same attribution.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* ACT 10 — THE CONTROL LAYER                                                 */
/* -------------------------------------------------------------------------- */

export const control = {
  eyebrow: "09 — Control layer",
  headline: "The DRK control layer.",
  body: "Not a service with a report attached. A system with operators inside it.",
  tabs: [
    {
      id: "overview",
      label: "Overview",
      caption: "Operating state across every active program.",
      rows: [
        { k: "Runtime", v: "Operational" },
        { k: "Active programs", v: "Attributed" },
        { k: "Market condition", v: "Risk-off" },
        { k: "Reporting", v: "Live" },
      ],
    },
    {
      id: "wallets",
      label: "Wallets",
      caption: "Every address enumerated, grouped and reconciled.",
      rows: [
        { k: "Topology", v: "Mapped" },
        { k: "Balances", v: "Reconciled" },
        { k: "Custody", v: "Client-held" },
        { k: "Attribution", v: "Per program" },
      ],
    },
    {
      id: "programs",
      label: "Programs",
      caption: "Named strategies with defined inputs and measured outputs.",
      rows: [
        { k: "Definition", v: "Explicit" },
        { k: "Inputs", v: "Declared" },
        { k: "Outputs", v: "Measured" },
        { k: "Lifecycle", v: "Tracked" },
      ],
    },
    {
      id: "execution",
      label: "Execution",
      caption: "Order-level detail, routed and timestamped.",
      rows: [
        { k: "Routing", v: "Venue-aware" },
        { k: "Fills", v: "Timestamped" },
        { k: "Slippage", v: "Recorded" },
        { k: "Controls", v: "Enforced" },
      ],
    },
    {
      id: "pnl",
      label: "P/L",
      caption: "Performance attributed to the program that produced it.",
      rows: [
        { k: "Basis", v: "Program-level" },
        { k: "Reconciliation", v: "Continuous" },
        { k: "Client view", v: "Unfiltered" },
        { k: "Capture", v: "Performance-linked" },
      ],
    },
    {
      id: "analytics",
      label: "Analytics",
      caption: "Telemetry from the engine, not a monthly summary.",
      rows: [
        { k: "Granularity", v: "Per execution" },
        { k: "Latency", v: "Live" },
        { k: "History", v: "Retained" },
        { k: "Export", v: "Available" },
      ],
    },
    {
      id: "launches",
      label: "Launches",
      caption: "Lifecycle state for every mandate in flight.",
      rows: [
        { k: "Stage", v: "Tracked" },
        { k: "Conditions", v: "Recorded" },
        { k: "Status", v: "Completed / active" },
        { k: "Reporting", v: "Delivered" },
      ],
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* ACT 11 — THE LIVE APPLICATION                                              */
/* -------------------------------------------------------------------------- */

export const application = {
  eyebrow: "10 — The application",
  headline: "The system behind the operation.",
  body:
    "One environment. The token, the runtime that trades it, the pools it lives in, the programs acting on it, and the result.",
  rail: ["Token", "Runtime", "Pools", "Programs", "Operate", "P/L"] as const,
} as const;

/* -------------------------------------------------------------------------- */
/* ACT 12 — THE BUSINESS ENGINE                                               */
/* -------------------------------------------------------------------------- */

export const business = {
  eyebrow: "11 — Business model",
  headline: "One engine. Multiple monetisation layers.",
  body: "Managed operations today. Licensed infrastructure over time.",
  /**
   * pending: the brief referenced specific revenue streams, economics and
   * projections "exactly as approved" — but no figures were supplied.
   * Layers below are named from the supplied narrative only. No amounts.
   */
  figuresPending: true,
  layers: [
    {
      id: "b1",
      horizon: "Today",
      title: "Managed operations",
      detail: "Performance-linked capture on programs DRK operates directly.",
      basis: "Performance revenue",
    },
    {
      id: "b2",
      horizon: "Scaling",
      title: "Licensed runtime",
      detail: "Recurring software revenue as client desks operate the engine themselves.",
      basis: "Recurring software revenue",
    },
    {
      id: "b3",
      horizon: "Compounding",
      title: "Operating liquidity",
      detail: "Balance-sheet liquidity increases the capacity the engine can deploy.",
      basis: "Capacity revenue",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* ACT 13 — COMPOUNDING                                                       */
/* -------------------------------------------------------------------------- */

export const compounding = {
  eyebrow: "12 — Compounding",
  headline: "The loop that widens itself.",
  body:
    "Capacity produces performance. Performance produces revenue. Revenue returns to capacity.",
  loop: [
    "Capital",
    "Liquidity deployment",
    "Market programs",
    "Performance",
    "Revenue",
    "More liquidity",
    "More capacity",
  ],
  /**
   * pending: Year 1 / 2 / 3 program counts, average earnings, revenue and
   * mandate sizes were referenced but not supplied. Rendered as structural
   * dimensions with no values until approved.
   */
  projectionsPending: true,
  years: [
    { id: "y1", label: "Year 1", posture: "Prove the runtime", scale: "Concentrated mandates" },
    { id: "y2", label: "Year 2", posture: "Widen the programs", scale: "Repeat mandates" },
    { id: "y3", label: "Year 3", posture: "License the engine", scale: "Client-operated desks" },
  ],
  dimensions: ["Programs", "Average earnings", "Revenue", "Mandate size", "Scale"],
} as const;

/* -------------------------------------------------------------------------- */
/* ACT 14 — THE RAISE                                                         */
/* -------------------------------------------------------------------------- */

export const raise = {
  eyebrow: "13 — The raise",
  headline: "$1.5M seed round.",
  body: "80% productive. 20% platform.",
  /** These four figures WERE supplied in the brief and are used verbatim. */
  allocation: [
    {
      id: "productive",
      amount: "$1.2M",
      share: 80,
      title: "Operating balance-sheet liquidity",
      detail: "Deployed directly into productive market capacity.",
      tone: "hero" as const,
    },
    {
      id: "platform",
      amount: "$300K",
      share: 20,
      title: "Growth and operating capital",
      detail: "Engineering, operations and platform scale.",
      tone: "muted" as const,
    },
  ],
  statement:
    "Capital is deployed into productive market capacity while the platform scales.",
  disclaimer:
    "Forward-looking statements regarding deployment, capacity and returns are projections, not guarantees. Capital deployed into market operations is at risk. Nothing on this page is an offer to sell or a solicitation to buy securities, and it does not constitute investment advice.",
} as const;

/* -------------------------------------------------------------------------- */
/* ACT 15 — FINAL STATEMENT                                                   */
/* -------------------------------------------------------------------------- */

export const closing = {
  /**
   * Source line read "The next market maker is not a black box."
   * Reframed per the brand constraint; meaning preserved.
   */
  headline: "The next market operator is not a black box.",
  statement: "It is a transparent operating system with traders behind it.",
  cta: { label: "Let's talk", href: "#contact" },
  /** pending: Telegram handles were referenced but not supplied. */
  channelsPending: true,
  channels: [] as { label: string; handle: string; href: string }[],
  signOff: "Liquidity beneath the surface.",
} as const;

export const footer = {
  legal: `© ${2026} DRK. All rights reserved.`,
  note: "Programmatic trading & liquidity infrastructure.",
} as const;
