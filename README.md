# Live the Carysil Life × Bobby — campaign site

Homepage and promo page for Carysil's **Live the Carysil Life** outdoor kitchen campaign featuring Bobby.
Built with Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, GSAP 3 and Lenis.

| Route    | What it is                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------------ |
| `/`      | Hero, red marquee, scroll-lit statement, Bobby story (sticky portrait B&W → colour), kitchen hotspots, day-to-night slider, offer band |
| `/promo` | Launch offer: countdown, perks, Bobby feature, four moods (pinned sideways scroll on desktop), booking form, terms |

## Brand

- **Carysil red `#990011`** (from the Carysil brand tokens) carries the nav bar, footer, buttons, marquee and
  transitions. `red-bright` (`#e8424f`) is used only for small red text on dark backgrounds, for contrast.
- **Logo:** the official international Carysil wordmark with the GERMAN ENGINEERED line, inlined as SVG in
  [`src/components/carysil-logo.tsx`](src/components/carysil-logo.tsx) so it can be cream on red or red on light.

## Motion

| Effect | Where it lives |
| ------ | -------------- |
| Red intro curtain with the logo and campaign line (first page view per session) | `intro-curtain.tsx`, `.intro` in `globals.css` |
| Red wipe on every page change | `app/template.tsx`, `.route-wipe` |
| Hero words rising out of masks, slow image settle | `masked-words.tsx`, `.mask-word`, `.animate-settle` |
| Smooth scrolling | `smooth-scroll.tsx` (Lenis on the GSAP ticker) |
| Scroll effects declared with `data-*` attributes | `page-motion.tsx` (header comment lists them all) |
| Day-to-night slider sweeps once on first view | `compare-slider.tsx` |

The intro, hero and page wipe are pure CSS, so the page never waits on JavaScript. Everything respects
`prefers-reduced-motion`: smooth scroll and scroll effects switch off and the intro is skipped.
Next.js 16 keeps visited pages mounted but hidden, so `PageMotion` scopes itself to its page's `[data-page]`
root and tears down when the page is hidden.

## Run it

```powershell
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` makes a production build; both pages are prerendered as static HTML.

## Editing copy

All brand, campaign and offer text is in [`src/lib/site.ts`](src/lib/site.ts):

- `site`: brand, campaign line ("Live the Carysil Life"), tagline, ambassador name, contact details, site URL
- `offer`: offer title, **end date** (drives the countdown and "offer ended" state), perks and terms
- `marquee`, `story`: the red running band and the three Bobby story beats
- `kitchenSpots`: the numbered markers on the kitchen photo and their text (x/y are percent of the frame)

**Before launch, replace the placeholders:** `site.url`, phone and email, the offer perks, end date and terms.
They are drafts, not approved copy.

## Booking form

The form on `/promo` posts to a server action in [`src/app/promo/actions.ts`](src/app/promo/actions.ts).
It validates the fields and has a honeypot for bots, but **for now it only logs the enquiry on the server**.
Connect it to the CRM or an email inbox at the `TODO` before going live.

## Photos

`src/assets/photos/` holds web versions of the shoot, made from the original 300 dpi TIFFs
(8256 × 5504 portraits, 5056 × 3392 kitchen) and resized to 2880 px JPEGs:

| File                                 | Source                                    |
| ------------------------------------ | ----------------------------------------- |
| `ambassador-fence(-bw).jpg`          | Bobby Set 2 / DSC_8485 Final (BW)         |
| `ambassador-closeup(-bw).jpg`        | Bobby Set 2 / DSC_8490 Final (BW) 18 Nov  |
| `ambassador-gaze(-bw).jpg`           | Bobby Set 2 / DSC_8491 Final (BW) 18 Nov  |
| `kitchen-day.jpg`                    | Kitchen high Res / Kitchen Set up 3-1     |
| `kitchen-dusk.jpg`                   | Kitchen high Res / Kitchen Set up 5-1     |
| `kitchen-night.jpg`                  | Kitchen high Res / Kitchen Set up 6-1     |
| `kitchen-night-warm.jpg`             | Kitchen high Res / Kitchen Set up 7-1     |

They are imported statically in [`src/lib/photos.ts`](src/lib/photos.ts), so `next/image` knows their size,
generates a blur placeholder and serves resized AVIF/WebP. The colour and B&W portraits are matched pairs;
the portraits on the homepage fade from B&W to colour on hover or focus.

## Project layout

```
src/
  app/
    layout.tsx         fonts (Fraunces + Inter), metadata, header, footer
    page.tsx           homepage
    promo/page.tsx     promo page
    promo/actions.ts   booking form server action
    sitemap.ts, robots.ts
  components/          header, footer, slider, hotspots, portrait reveal, countdown, form
  lib/site.ts          all copy and offer settings
  lib/photos.ts        photo imports
  assets/photos/       web-sized campaign photos
```

`next.config.ts` limits the Tailwind Turbopack loader to the project's own CSS (`condition: { not: "foreign" }`).
Without that, `next dev` fails to load the `next/font` files.
