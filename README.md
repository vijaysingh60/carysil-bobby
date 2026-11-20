# Carysil Open Air × Bobby — campaign site

Homepage and promo page for the Carysil **Open Air** outdoor kitchen campaign featuring Bobby.
Built with Next.js 16 (App Router, Turbopack), React 19 and Tailwind CSS 4.

| Route    | What it is                                                                                     |
| -------- | ---------------------------------------------------------------------------------------------- |
| `/`      | Campaign homepage: Bobby hero, portraits, kitchen hotspots, day-to-night slider, offer band   |
| `/promo` | Launch offer page: countdown, offer perks, Bobby feature, four moods, booking form, terms     |

## Run it

```powershell
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` makes a production build; both pages are prerendered as static HTML.

## Editing copy

All brand, campaign and offer text is in [`src/lib/site.ts`](src/lib/site.ts):

- `site`: brand, campaign name, tagline, ambassador name, contact details, site URL
- `offer`: offer title, **end date** (drives the countdown and "offer ended" state), perks and terms
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
