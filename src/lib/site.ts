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
  collection: "The Farmhouse Collection",
  tagline: "Cook where the evening begins.",
  description:
    "The Farmhouse Collection with Bobby Deol: the Magic 6-in-1 faucet, a granite farmhouse sink, a rustic built-in oven, the Piccola coffee machine, a wine chiller, a built-in grill and a barbeque station for the outdoor kitchen.",
  url: "https://example.com",
  ambassador: {
    /** Carysil signed Bobby Deol as brand ambassador in October 2026. */
    name: "Bobby Deol",
    firstName: "Bobby",
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
  { href: "/#collection", label: "The collection" },
  { href: "/#products", label: "Product list" },
  { href: "/#host", label: "The host" },
  { href: "/#day", label: "A day outside" },
  { href: "/#visit", label: "Experience centres" },
  { href: "/promo", label: "Launch offer" },
] as const;

/** Running line in the red marquee band (promo page). */
export const marquee = [
  "Live the Carysil Life",
  "The Farmhouse Collection",
  "Carysil × Bobby Deol",
  "German Engineered",
] as const;

/** Second, outlined marquee row that runs the other way. */
export const marqueeAlt = ["Faucet", "Sink", "Oven", "Coffee", "Wine", "Grill"] as const;
