import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { CompareSlider } from "@/components/compare-slider";
import { KitchenHotspots } from "@/components/kitchen-hotspots";
import { PortraitReveal } from "@/components/portrait-reveal";
import { photos } from "@/lib/photos";
import { kitchenSpots, offer, site } from "@/lib/site";

const delay = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;
const revealDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

export default function HomePage() {
  const { ambassador } = site;

  return (
    <>
      {/* ───────────── Hero: Bobby at the fence ───────────── */}
      <section className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden">
        <Image
          src={photos.ambassadorFence}
          alt={`${ambassador.name} leaning on a timber fence at golden hour`}
          fill
          preload
          sizes="100vw"
          placeholder="blur"
          className="animate-settle -z-10 object-cover object-[66%_30%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/35 to-ink/10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/25 to-transparent max-md:hidden" />

        <div className="mx-auto w-full max-w-7xl px-4 pt-32 pb-14 sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
          <p className="eyebrow animate-rise text-copper-bright">{site.brand} presents</p>
          <h1 className="font-display mt-5 max-w-3xl leading-[0.9]">
            <span className="animate-rise block text-[clamp(3.75rem,13vw,10rem)]" style={delay(120)}>
              {site.campaign}
            </span>
            <span
              className="animate-rise mt-2 block text-[clamp(1.75rem,5vw,3.5rem)] text-sand italic"
              style={delay(260)}
            >
              with {ambassador.name}
            </span>
          </h1>
          <p className="animate-rise mt-7 max-w-md text-lg leading-relaxed text-sand/90" style={delay(400)}>
            {site.tagline} Copper, stone and fire, built to live outside.
          </p>
          <div className="animate-rise mt-9 flex flex-wrap gap-3" style={delay(540)}>
            <Link
              href="/promo"
              className="rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-copper-bright"
            >
              See the launch offer
            </Link>
            <Link
              href="#bobby"
              className="rounded-full border border-bone/40 px-7 py-3.5 text-sm font-medium text-bone transition-colors hover:border-bone hover:bg-bone/10"
            >
              Meet the campaign
            </Link>
          </div>
        </div>

        <p className="eyebrow absolute right-6 bottom-8 hidden text-[0.62rem] text-sand/60 [writing-mode:vertical-rl] lg:block">
          {ambassador.name} · {site.campaignLong}
        </p>
      </section>

      {/* ───────────── Statement ───────────── */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-10 lg:py-40">
        <p data-reveal className="eyebrow text-copper-bright">
          {site.campaignLong}
        </p>
        <p
          data-reveal
          className="font-display mt-8 max-w-5xl text-[clamp(1.9rem,4.6vw,3.9rem)] leading-[1.12] text-bone"
        >
          A kitchen that doesn&rsquo;t stop at the back door. Copper that warms in the low sun, stone that holds
          the heat, <span className="text-copper-bright italic">and a fire that keeps the evening going.</span>
        </p>
      </section>

      {/* ───────────── Bobby portraits ───────────── */}
      <section id="bobby" className="border-t border-line/60 bg-char">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:px-10">
          <div data-reveal className="lg:col-span-7">
            <PortraitReveal
              mono={photos.ambassadorCloseupBw}
              colour={photos.ambassadorCloseup}
              alt={`Black and white close-up of ${ambassador.name}, one hand raised to the brow`}
              sizes="(min-width: 1024px) 58vw, 100vw"
              focus="52% 35%"
              className="aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5]"
            />
          </div>
          <div className="flex flex-col justify-end lg:col-span-5 lg:pb-6">
            <p data-reveal className="eyebrow text-copper-bright">
              {ambassador.role}
            </p>
            <h2 data-reveal className="font-display mt-5 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.98]">
              {ambassador.name}, <span className="text-sand italic">at home outdoors.</span>
            </h2>
            <p data-reveal className="mt-7 max-w-md text-[1.05rem] leading-relaxed text-sand/85">
              Shot at golden hour on open farmland, the campaign follows {ambassador.name} through one long
              evening: from the last light on the fence rails to the first lights strung over the grill.
            </p>
            <p data-reveal className="mt-8 flex items-center gap-3 text-sm text-stone">
              <span aria-hidden="true" className="h-px w-10 bg-copper" />
              Hover or tap a portrait to bring the colour in
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 pb-20 sm:gap-4 sm:px-6 sm:pb-28 lg:px-10">
          <div data-reveal>
            <PortraitReveal
              mono={photos.ambassadorFenceBw}
              colour={photos.ambassadorFence}
              alt={`${ambassador.name} resting both arms on a fence rail, looking across the field`}
              sizes="(min-width: 1280px) 620px, 50vw"
              focus="70% 40%"
              className="aspect-[4/5] sm:aspect-[3/2]"
            />
          </div>
          <div data-reveal style={revealDelay(120)}>
            <PortraitReveal
              mono={photos.ambassadorGazeBw}
              colour={photos.ambassadorGaze}
              alt={`${ambassador.name} in a black shirt, one arm on the fence, looking off to the side`}
              sizes="(min-width: 1280px) 620px, 50vw"
              focus="48% 35%"
              className="aspect-[4/5] sm:aspect-[3/2]"
            />
          </div>
        </div>
      </section>

      {/* ───────────── The kitchen ───────────── */}
      <section id="collection" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
        <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-2 lg:items-end">
          <div>
            <p data-reveal className="eyebrow text-copper-bright">
              The kitchen
            </p>
            <h2 data-reveal className="font-display mt-5 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.98]">
              Everything the evening needs, <span className="text-sand italic">in one run of stone.</span>
            </h2>
          </div>
          <p data-reveal className="max-w-md text-[1.05rem] leading-relaxed text-sand/85 lg:justify-self-end">
            Sink, tap, oven, coffee and grill, built into a single stone counter under a timber pergola. Pick a
            number to see each piece.
          </p>
        </div>
        <div data-reveal>
          <KitchenHotspots
            image={photos.kitchenDusk}
            alt="Outdoor stone kitchen under a timber pergola with string lights, at dusk"
            spots={kitchenSpots}
          />
        </div>
      </section>

      {/* ───────────── Day to night ───────────── */}
      <section id="day-to-night" className="border-y border-line/60 bg-char">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
          <div className="mb-12 max-w-3xl">
            <p data-reveal className="eyebrow text-copper-bright">
              Day to night
            </p>
            <h2 data-reveal className="font-display mt-5 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.98]">
              Golden at six. <span className="text-ember italic">Glowing at nine.</span>
            </h2>
            <p data-reveal className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-sand/85">
              Same kitchen, same spot. Drag across to watch the light change.
            </p>
          </div>
          <div data-reveal>
            <CompareSlider
              before={photos.kitchenDay}
              after={photos.kitchenNight}
              beforeLabel="Golden hour"
              afterLabel="After dark"
              alt="The outdoor kitchen"
            />
          </div>
        </div>
      </section>

      {/* ───────────── Offer band ───────────── */}
      <section className="grain relative isolate overflow-hidden">
        <Image
          src={photos.kitchenNightWarm}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          className="-z-10 object-cover object-[45%_60%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36 lg:px-10">
          <p data-reveal className="eyebrow text-ember">
            {offer.short}
          </p>
          <h2 data-reveal className="font-display mt-5 max-w-2xl text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.98]">
            {offer.title}
          </h2>
          <ul data-reveal className="mt-8 max-w-xl space-y-3 text-sand/90">
            {offer.perks.map((p) => (
              <li key={p.title} className="flex gap-3">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-copper" />
                {p.title}
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-10">
            <Link
              href="/promo"
              className="inline-flex rounded-full bg-copper px-8 py-4 text-sm font-semibold text-ink transition-colors hover:bg-copper-bright"
            >
              See the offer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
