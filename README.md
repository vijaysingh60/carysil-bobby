# The Farmhouse Collection × Bobby Deol — campaign site

Homepage and promo page for Carysil's **Farmhouse Collection** with Bobby Deol, under the
**Live The Carysil Life** campaign lockup (product list 2027: Magic 6-in-1 faucet, Retro A100 granite sink,
rustic built-in oven, Piccola coffee machine, CW 77 wine chiller, built-in grill and Barbeque Station).
Built with Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, GSAP 3 and Lenis.

| Route    | What it is                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------------ |
| `/`      | Bobby hero, manifesto, pinned product stage, product list 2027, the host, a day at the farmhouse, four lights, Barbeque Station drawing, experience centres |
| `/promo` | Launch offer: countdown, perks, Bobby feature, four moods (pinned sideways scroll on desktop), booking form, terms |

## Brand

- **Lockup:** "Live The CARYSIL life" from the brand PDF (`new images/Logo of LVCL (1).pdf`), traced to vector
  paths in [`src/lib/campaign-logo-paths.ts`](src/lib/campaign-logo-paths.ts) and drawn by
  [`campaign-logo.tsx`](src/components/campaign-logo.tsx) in the PDF's variants (light, dark, white). The script
  words and each wordmark letter are separate paths, which is how the intro, header and footer animate it.
- **Colour:** a daytime palette: white and beige surfaces (cream `#f7f3ec`, Ode-to-Germany paper `#f1ebe2`, linen
  `#e6ddcf`), graphite type, the lockup red `#890606` as the accent and brass from the Magic faucet. No black surfaces.
- **Main line:** "Live the Carysil Life". The Farmhouse Collection × Bobby Deol sits under it as the smaller line.
- **Type:** Archivo and Barlow as on carysil.com. Headings are Barlow light in caps (`.title`), standing in for the
  DIN headings on sternhagen.com.
- **References:** sternhagen.com, its Shü page (blurred words coming into
  focus, the glowing product stage with callouts, the pinned gallery, the finish switcher, the technical drawing) and
  "An Ode to Germany" (letter-by-letter titles, banners opening from the bottom, the filterable product grid).

## Motion

Homepage sections, top to bottom:

| Section | Effect | File |
| ------- | ------ | ---- |
| Intro | On a white sheet the lockup signs itself: "Live The" writes on, CARYSIL rises letter by letter, "life" signs off, then the sheet lifts (first view per session, pure CSS) | `intro-signature.tsx`, `.sig` |
| Hero | Bobby full bleed: after the intro the photo settles from a slight zoom, the "Live The CARYSIL life" lockup signs itself and the copy rises; on scroll the photo sinks and the copy lifts away | `hero.tsx`, `.hero-sign`, `page-motion.tsx` |
| Manifesto | Words come into focus out of a blur; a rounded photo opens; an outlined word band slides with the scroll | `manifesto.tsx` |
| The collection | Pinned white stage: six products hand over with a glow, turning rings, names rising out of a mask and callouts drawn toward the product | `product-stage.tsx` |
| Product list 2027 | Cards rise in; filters reflow the grid with GSAP Flip; Piccola, grill and Barbeque Station carry an "Available in January" badge | `product-index.tsx` |
| The host | Three banners open from the bottom in a stagger and drift at different speeds | `host-banners.tsx` |
| A day at the farmhouse | Desktop: pinned sideways strip, photos drifting in their frames. Touch: swipe strip | `day-gallery.tsx` |
| Four lights | The same kitchen in four lights; each opens out of a circle; plays through until someone picks one | `light-switcher.tsx` |
| Barbeque Station | On a drafting grid: the station slides on, dimension lines draw, the figures count up | `bbq-blueprint.tsx` |
| Experience centres | On red with the catalogue's zigzag lines drifting; each city opens to its address | `experience-centres.tsx` |
| Footer | The full-width lockup signs itself on scroll | `footer-lockup.tsx` |

Site-wide: red page wipe on navigation (`app/template.tsx`), Lenis smooth scroll (`smooth-scroll.tsx`), a red
cursor dot that swells into a labelled disc over `[data-cursor]` (`cursor.tsx`), magnetic buttons, heading line
reveals (`page-motion.tsx`) and a brass reading-progress line under the glass header.

Pinned scenes are tall sections with a CSS sticky stage (`.scene` / `.scene-stage`, or `.scene-lg` for desktop-only
pins), not GSAP pin spacers, so they behave the same with Lenis, on touch, and when Next.js re-shows a hidden page.
Each scene runs through [`src/lib/use-scene.ts`](src/lib/use-scene.ts), a `gsap.matchMedia` wrapper that skips
reduced motion and reverts on unmount. Elements that GSAP moves never carry Tailwind `translate-*`/`rotate-*`
classes (GSAP resets the CSS `translate`/`rotate` properties); centring sits on a static parent instead.

**Reduced motion:** an inline script adds `html.motion-ok` before first paint only when the visitor hasn't asked for
reduced motion. Without it the hero is a plain full-height frame of Bobby with the copy, the product stage becomes a
list, the gallery is a swipe strip, and the intro and smooth scroll are off. The same script sets manual scroll
restoration, so a reload starts at the top rather than halfway through a scrubbed scene.

## Run it

```powershell
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` makes a production build; both pages are prerendered as static HTML.

## Editing copy

- [`src/lib/campaign.ts`](src/lib/campaign.ts): the collection name, manifesto, the six stage products (name, type,
  line, callouts, image size, `available` for pieces not in stores yet — `JANUARY`), the day gallery, the four lights, the Barbeque Station figures, Product List 2027
  (with filters) and the experience-centre addresses. Specs and addresses are from the "Bobby D. Catalog" PDF. Prices are deliberately not shown.
- [`src/lib/site.ts`](src/lib/site.ts): brand, campaign line, ambassador, contact details, site URL, navigation, the
  promo marquee, and the launch `offer` (end date drives the countdown; perks and terms).

**Before launch, replace the placeholders:** `site.url`, phone and email, the offer perks, end date and terms.
They are drafts, not approved copy. Check the experience-centre addresses too: they are transcribed from the
catalogue (spelling tidied, e.g. Hyderabad, Sindhu Bhavan Road).

## Booking form

The form on `/promo` posts to a server action in [`src/app/promo/actions.ts`](src/app/promo/actions.ts).
It validates the fields and has a honeypot for bots, but **for now it only logs the enquiry on the server**.
Connect it to the CRM or an email inbox at the `TODO` before going live.

## Photos

Sources are in `new images/` (the Farmhouse shoot as 8256 px WebP, the four kitchen set-ups, the catalogue PDF and the
logo PDF). That folder is about 205 MB and is not referenced by the build; keep it out of git or move it to shared
storage.

- `src/assets/farmhouse/`: the shoot resized to 2400 px WebP (2880 px for the hero photo of Bobby).
- `src/assets/products/`: product cut-outs and detail shots lifted from the catalogue PDF (transparent WebP).

All of them are imported statically in [`src/lib/media.ts`](src/lib/media.ts), so `next/image` knows their size,
makes blur placeholders and serves resized AVIF/WebP.

## Project layout

```
src/
  app/
    layout.tsx         fonts (Archivo + Barlow), metadata, boot script, intro, header, footer, cursor
    page.tsx           homepage (one component per section, see Motion above)
    promo/page.tsx     promo page
    promo/actions.ts   booking form server action
    sitemap.ts, robots.ts
  components/          one file per section (see Motion above), plus header, footer, countdown, form
  lib/campaign.ts      collection copy, products, specs, showrooms
  lib/site.ts          brand, nav, contact and offer settings
  lib/campaign-logo-paths.ts  the traced "Live The CARYSIL life" lockup
  lib/use-scene.ts     GSAP matchMedia wrapper every scroll scene runs through
  lib/media.ts         photo and product imports
  assets/farmhouse/    web-sized campaign photos
  assets/products/     catalogue product cut-outs
```

`next.config.ts` limits the Tailwind Turbopack loader to the project's own CSS (`condition: { not: "foreign" }`).
Without that, `next dev` fails to load the `next/font` files.
