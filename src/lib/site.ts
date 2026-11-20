/**
 * Every piece of brand, campaign and offer copy lives here, so the pages
 * can be re-pointed at a different brand or offer without touching layout code.
 *
 * PLACEHOLDERS: the brand name, ambassador name, offer perks, dates and terms
 * below are drafts. Replace them with the approved campaign copy before launch.
 */

export const site = {
  brand: "Carysil",
  campaign: "Open Air",
  campaignLong: "The Open Air Collection",
  tagline: "Cook where the evening begins.",
  description:
    "Copper, stone and fire, built to live outside. An outdoor kitchen collection made for long evenings and longer tables.",
  url: "https://example.com",
  ambassador: {
    name: "Bobby",
    role: "Campaign ambassador",
  },
  contact: {
    phone: "+91 00000 00000",
    email: "hello@example.com",
  },
} as const;

export const offer = {
  title: "The Open Air Launch Offer",
  short: "Launch offer, for a limited period",
  /** ISO date with offset. The countdown and "offer ended" state read this. */
  endsAt: "2026-12-31T23:59:59+05:30",
  perks: [
    {
      title: "Complimentary design visit",
      body: "A designer measures your terrace, garden or courtyard and plans the layout with you.",
    },
    {
      title: "Installation included",
      body: "Stonework, plumbing and fitting handled by one team, on one timeline.",
    },
    {
      title: "Extended warranty",
      body: "Additional cover on the sink, tap and built-in appliances bought under the offer.",
    },
  ],
  terms: [
    "Offer valid on orders placed between the launch date and the end date shown above.",
    "Design visits are subject to availability in your city.",
    "Installation covers standard site conditions. Civil work beyond the kitchen footprint is quoted separately.",
    "Extended warranty applies to eligible products only and is registered at the time of installation.",
    "The offer cannot be combined with other promotions and may be withdrawn without notice.",
  ],
} as const;

export const nav = [
  { href: "/#bobby", label: "The campaign" },
  { href: "/#collection", label: "The kitchen" },
  { href: "/#day-to-night", label: "Day to night" },
  { href: "/promo", label: "Launch offer" },
] as const;

/** Numbered markers on the dusk kitchen photo (x/y are percent of the frame). */
export const kitchenSpots = [
  {
    id: "tap",
    x: 17.8,
    y: 56.5,
    title: "Pull-down tap",
    body: "A copper-finish tap with a pull-down spray that reaches every corner of the bowl.",
  },
  {
    id: "sink",
    x: 24,
    y: 67,
    title: "Copper-finish sink",
    body: "A deep single bowl in warm copper, big enough to wash produce straight from the garden.",
  },
  {
    id: "espresso",
    x: 35.5,
    y: 56,
    title: "Coffee corner",
    body: "A small espresso station, so mornings start outside too.",
  },
  {
    id: "oven",
    x: 44.5,
    y: 74,
    title: "Built-in oven",
    body: "Set into the stonework for slow roasts, fresh bread and pizza nights.",
  },
  {
    id: "grill",
    x: 68.5,
    y: 63,
    title: "Grill station",
    body: "Stainless steel burners over a timber-fronted cabinet for tools, fuel and covers.",
  },
  {
    id: "pergola",
    x: 53,
    y: 21,
    title: "Pergola and lights",
    body: "A timber pergola strung with warm bulbs keeps the kitchen going long after sunset.",
  },
] as const;
