/**
 * Copy and product data for the Farmhouse Collection campaign page.
 *
 * Product names, specs and MRPs are taken from the "Bobby D. Catalog" product list
 * (2027). Showroom addresses are from the catalogue's back cover. Anything that is
 * campaign writing rather than catalogue fact is marked in the comments.
 */
import type { StaticImageData } from "next/image";
import { farm, products as productImages } from "@/lib/media";

export const collection = {
  name: "The Farmhouse Collection",
  short: "Farmhouse Collection",
  year: "2027",
  host: "Bobby Deol",
  lockup: "Live The Carysil Life",
} as const;

/** Manifesto (campaign writing). `*` marks words drawn in brass. */
export const manifesto =
  "Inspired by the *farmhouse* kitchen. Stone underfoot, *fire* on the grill, coffee before the guests arrive, and a table that keeps everyone *outside* until late.";

export type Callout = { title: string; body: string };

export type StageProduct = {
  id: string;
  name: string;
  type: string;
  line: string;
  mrp: string;
  image: StaticImageData;
  /** Product image height on the stage, as a share of the stage height. */
  scale: number;
  callouts: readonly Callout[];
};

/** The pinned product stage. Specs as printed in the catalogue. */
export const stage: readonly StageProduct[] = [
  {
    id: "faucet",
    name: "Magic 6-in-1 Faucet",
    type: "Kitchen faucet",
    line: "One faucet. Six functions.",
    mrp: "₹ 1,49,000",
    image: productImages.faucet,
    scale: 0.5,
    callouts: [
      { title: "Domestic hot & cold", body: "The everyday mixer." },
      { title: "Boiling water", body: "With a boiling safety release." },
      { title: "Chilled water", body: "Straight from the chilling unit." },
      { title: "Chilled sparkling", body: "Fed by a CO₂ cylinder for soda." },
      { title: "Ambient filtered", body: "Through a limescale water filter." },
      { title: "Touch controls", body: "Boiler and chiller units included." },
    ],
  },
  {
    id: "sink",
    name: "Retro A100",
    type: "Farmhouse granite kitchen sink",
    line: "A deep single bowl in black granite.",
    mrp: "₹ 24,900",
    image: productImages.sink,
    scale: 0.32,
    callouts: [
      { title: "865 × 540 mm", body: "Product dimensions." },
      { title: "783 × 426 × 229 mm", body: "Bowl dimensions." },
      { title: "Granite", body: "Farmhouse styling, Carysil granite." },
    ],
  },
  {
    id: "oven",
    name: "Rustic Classic Oven",
    type: "Built-in electric oven · RO OV EL 60 9F GF",
    line: "Brass rail, analogue dials, built into the stone.",
    mrp: "₹ 99,900",
    image: productImages.oven,
    scale: 0.46,
    callouts: [
      { title: "2261 W", body: "Total power load." },
      { title: "Rustic classic", body: "Black finish with a brass handle and dials." },
      { title: "Built in", body: "Set into the stone counter, as in the campaign kitchen." },
    ],
  },
  {
    id: "piccola",
    name: "Piccola",
    type: "Semi-professional coffee machine",
    line: "A professional lever group for the farmhouse counter.",
    mrp: "₹ 1,65,000",
    image: productImages.piccola,
    scale: 0.48,
    callouts: [
      { title: "1 group", body: "Single-group configuration." },
      { title: "3 L", body: "Water tank capacity." },
      { title: "1.8 L", body: "Boiler capacity." },
      { title: "1.2 kW", body: "Heat power." },
      { title: "Steam & hot water", body: "Dedicated steam and hot-water wands." },
      { title: "Tank warning", body: "Empty-tank light and a removable steel tray." },
    ],
  },
  {
    id: "chiller",
    name: "CW 77",
    type: "Wine chiller",
    line: "Seven wooden shelves, kept at cellar temperature.",
    mrp: "₹ 1,53,290",
    image: productImages.wineChiller,
    scale: 0.5,
    callouts: [
      { title: "7 shelves", body: "Wooden, slide-out." },
      { title: "Glass door", body: "A full-height glass front, lit from inside." },
    ],
  },
  {
    id: "bbq",
    name: "Barbeque Station",
    type: "Stainless steel outdoor kitchen",
    line: "Grill, plancha, sink and fridge in one run of steel.",
    mrp: "₹ 6,90,000",
    image: productImages.bbqStation,
    scale: 0.26,
    callouts: [
      { title: "27.3 kW", body: "Rated heat output." },
      { title: "276 × 63 × 120 cm", body: "Product dimensions." },
      { title: "Grill & plancha", body: "Two cooking zones side by side." },
      { title: "Chilled storage", body: "A built-in beverage refrigerator." },
    ],
  },
];

/** A day at the farmhouse: the sideways gallery (campaign writing). */
export const day = [
  { time: "07:30", title: "First coffee", line: "The Piccola is warm before anyone else is up.", image: farm.bobbyCoffeeSmile, focus: "38% 40%" },
  { time: "10:00", title: "At the sink", line: "Boiling, chilled or sparkling, from one brass tap.", image: farm.hostSink, focus: "45% 45%" },
  { time: "13:00", title: "Into the oven", line: "Bread in the rustic oven by lunch.", image: farm.hostOven, focus: "40% 50%" },
  { time: "17:30", title: "On the grill", line: "Four burners for the afternoon crowd.", image: farm.hostGrill, focus: "55% 50%" },
  { time: "20:30", title: "The long table", line: "Dinner under the pergola.", image: farm.nightDuo, focus: "50% 45%" },
  { time: "23:00", title: "Last light", line: "The stone stays warm long after.", image: farm.kitchenNightWarm, focus: "50% 55%" },
] as const;

/** One kitchen, four lights: the switcher (all four shots share one camera position). */
export const lights = [
  { id: "golden", label: "Golden hour", line: "Sun low, stone warm.", image: farm.kitchenDay },
  { id: "dusk", label: "Dusk", line: "The bulbs come on over the pergola.", image: farm.kitchenDusk },
  { id: "night", label: "Night", line: "Stars over the grill.", image: farm.kitchenNight },
  { id: "lantern", label: "Lantern", line: "Lit warm from below for the last guests.", image: farm.kitchenNightWarm },
] as const;

/** Barbeque Station, as specified in the catalogue. */
export const bbq = {
  dims: { w: 276, d: 63, h: 120 },
  specs: [
    { value: 27.3, decimals: 1, unit: "kW", label: "Rated heat output" },
    { value: 4, decimals: 0, unit: "× 3.9 kW", label: "Main burners" },
    { value: 4.5, decimals: 1, unit: "kW", label: "Rotisserie burner" },
    { value: 2, decimals: 0, unit: "× 3.8 kW", label: "Plancha burners" },
  ],
  areas: [
    { value: "65 × 45 cm", label: "Main cooking area" },
    { value: "59 × 42 cm", label: "Griddle cooking area" },
  ],
  details: [
    { title: "Two cooking zones", body: "The main grill and a separate plancha, side by side.", image: productImages.bbqGrillPlancha },
    { title: "Chilled storage", body: "A built-in beverage refrigerator beside the cooking area.", image: productImages.bbqChiller },
    { title: "Three-layer drawer", body: "Keeps the essentials within reach.", image: productImages.bbqDrawers },
  ],
  notes: ["Four SUS304 stainless steel cooking grids", "Integrated sink, faucet, refrigerator and illuminated controls"],
  mrp: "₹ 6,90,000",
} as const;

export type IndexProduct = {
  id: string;
  name: string;
  type: string;
  mrp: string;
  group: "kitchen" | "drinks" | "outdoor";
  image: StaticImageData;
  /** Photo rather than a cut-out: fills the card instead of sitting on it. */
  photo?: boolean;
};

/** Product List 2027: every product in the catalogue, with its MRP. */
export const productList: readonly IndexProduct[] = [
  { id: "faucet", name: "Magic 6-in-1 Faucet", type: "Kitchen faucet", mrp: "₹ 1,49,000", group: "kitchen", image: productImages.faucet },
  { id: "sink", name: "Retro A100", type: "Farmhouse granite sink", mrp: "₹ 24,900", group: "kitchen", image: productImages.sink },
  { id: "oven", name: "RO OV EL 60 9F GF", type: "Rustic classic electric oven", mrp: "₹ 99,900", group: "kitchen", image: productImages.oven },
  { id: "piccola", name: "Piccola", type: "Semi-professional coffee machine", mrp: "₹ 1,65,000", group: "drinks", image: productImages.piccola },
  { id: "chiller", name: "CW 77", type: "Wine chiller", mrp: "₹ 1,53,290", group: "drinks", image: productImages.wineChiller },
  { id: "grill", name: "Built-in Grill, 4 Burner", type: "4 × 2.93 kW main burners", mrp: "₹ 99,900", group: "outdoor", image: productImages.grillControls, photo: true },
  { id: "bbq", name: "Barbeque Station", type: "Grill, plancha, sink and fridge", mrp: "₹ 6,90,000", group: "outdoor", image: productImages.bbqStation },
];

export const productGroups = [
  { id: "all", label: "All" },
  { id: "kitchen", label: "Kitchen" },
  { id: "drinks", label: "Coffee & wine" },
  { id: "outdoor", label: "Outdoor cooking" },
] as const;

/** Experience centres, from the catalogue's back cover. */
export const centres = [
  { city: "Ahmedabad", address: ["Showroom No. 6, Binori B Square III", "Sindhu Bhavan Road, Bodakdev", "Ahmedabad 380054"] },
  { city: "Gurugram", address: ["SCO 298, Sector 29", "Gurugram, Haryana 122001"] },
  { city: "Pune", address: ["Shop No. 6 & 7, Shangrila Garden", "Bund Garden Road", "Pune, Maharashtra 411001"] },
  { city: "Mumbai", address: ["Unit No. 14, Ground Floor, Laxmi Business Park", "New Link Road, Laxmi Industrial Estate, Andheri West", "Mumbai, Maharashtra 400053"] },
  { city: "Hyderabad", address: ["Shop No. 101, Raichanani Capital", "D. No. 8-2-680/1/C/101 & 201, Road No. 12, Banjara Hills", "Hyderabad 500034"] },
] as const;
