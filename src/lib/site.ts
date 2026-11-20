/**
 * Every piece of brand, campaign and offer copy lives here, so the pages
 * can be re-pointed without touching layout code.
 *
 * PLACEHOLDERS: contact details, site URL, offer perks, dates and terms
 * are drafts. Replace them with the approved campaign copy before launch.
 */

export const site = {
  brand: "Carysil",
  brandTagline: "German Engineered",
  /** Campaign line. Shown in the hero, intro, marquee and footer. */
  campaign: "Live the Carysil Life",
  campaignWords: ["Live the", "Carysil Life"],
  collection: "The Outdoor Kitchen",
  tagline: "Cook where the evening begins.",
  description:
    "Copper, stone and fire, built to live outside. Carysil's outdoor kitchen, with Bobby, for long evenings and longer tables.",
  url: "https://example.com",
  ambassador: {
    name: "Bobby",
    role: "The face of the campaign",
  },
  contact: {
    phone: "+91 00000 00000",
    email: "hello@example.com",
  },
} as const;

export const offer = {
  title: "The Carysil Life launch offer",
  short: "Launch offer · Limited period",
  /** ISO date with offset. The countdown and "offer ended" state read this. */
  endsAt: "2026-12-31T23:59:59+05:30",
  perks: [
    {
      title: "Complimentary design visit",
      body: "A Carysil designer measures your terrace, garden or courtyard and plans the layout with you.",
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

/** Running line in the red marquee band. */
export const marquee = [
  "Live the Carysil Life",
  "Featuring Bobby",
  "German Engineered",
  "The Outdoor Kitchen",
] as const;

/** Story beats beside the sticky portrait. The portrait turns from B&W to colour as they scroll by. */
export const story = [
  {
    eyebrow: "The face of the campaign",
    title: ["Bobby,", "at home outdoors."],
    body: "Shot at golden hour on open farmland, the campaign follows Bobby through one long evening: from the last light on the fence rails to the first lights strung over the grill.",
  },
  {
    eyebrow: "Golden hour",
    title: ["The light turns gold.", "The stone holds the heat."],
    body: "As the sun drops, the copper starts to glow and the kitchen takes over from the day. This is the hour the whole set-up was built for.",
  },
  {
    eyebrow: "Live the Carysil Life",
    title: ["Made to be lived in,", "not looked at."],
    body: "German-engineered sinks, taps and built-in appliances, set into stone and timber, for evenings that run long.",
  },
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
