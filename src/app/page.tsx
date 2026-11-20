import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { BobbyStory } from "@/components/bobby-story";
import { CompareSlider } from "@/components/compare-slider";
import { KitchenHotspots } from "@/components/kitchen-hotspots";
import { Marquee } from "@/components/marquee";
import { MaskedWords } from "@/components/masked-words";
import { PageMotion } from "@/components/page-motion";
import { PortraitReveal } from "@/components/portrait-reveal";
import { photos } from "@/lib/photos";
import { kitchenSpots, offer, site } from "@/lib/site";

const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;
const revealDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

export default function HomePage() {
  const { ambassador } = site;
  const [line1, line2] = site.campaignWords;

  return (
    <div data-page>
      {/* ───────────── Hero: Live the Carysil Life ───────────── */}
      <section data-hero className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden">
        <div data-hero-media className="absolute inset-0 -z-10">
          <Image
            src={photos.ambassadorFence}
            alt={`${ambassador.name} leaning on a timber fence at golden hour`}
            fill
            preload
            sizes="100vw"
            placeholder="blur"
            className="animate-settle object-cover object-[66%_30%]"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/30 to-ink/5" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/30 to-transparent max-md:hidden" />

        <div data-hero-content className="mx-auto w-full max-w-7xl px-4 pt-32 pb-14 sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
          <p className="eyebrow animate-rise flex items-center gap-3 text-cream/90">
            <span aria-hidden="true" className="h-px w-10 bg-red-bright" />
            {site.brand} presents · with {ambassador.name}
          </p>
          <h1 className="font-display mt-6 text-[clamp(3.4rem,11vw,9.5rem)] leading-[0.92]">
            <MaskedWords text={line1} />{" "}
            <MaskedWords text={line2} start={2} className="italic" />
            <span className="sr-only">, with {ambassador.name}</span>
          </h1>
          <p className="animate-rise mt-7 max-w-md text-lg leading-relaxed text-sand/90" style={rise(520)}>
            {ambassador.name} takes Carysil outdoors. Copper, stone and fire, built to live outside.
          </p>
          <div className="animate-rise mt-9 flex flex-wrap gap-3" style={rise(660)}>
            <Link
              href="/promo"
              data-magnetic
              className="rounded-full bg-red px-7 py-3.5 text-sm font-semibold text-cream shadow-[0_10px_40px_-10px_rgba(153,0,17,0.9)] transition-colors hover:bg-red-deep"
            >
              See the launch offer
            </Link>
            <Link
              href="#bobby"
              data-magnetic
              className="rounded-full border border-cream/40 px-7 py-3.5 text-sm font-medium text-cream backdrop-blur-sm transition-colors hover:border-cream hover:bg-cream/10"
            >
              Meet the campaign
            </Link>
          </div>
        </div>

        <div className="animate-rise absolute right-6 bottom-8 hidden flex-col items-center gap-4 lg:flex" style={rise(900)}>
          <span className="eyebrow text-[0.6rem] text-sand/60 [writing-mode:vertical-rl]">Scroll</span>
          <span className="scroll-cue" aria-hidden="true" />
        </div>
      </section>

      <Marquee />

      {/* ───────────── Statement ───────────── */}
      <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36 lg:px-10 lg:py-44">
        <p data-reveal className="eyebrow flex items-center gap-3 text-red-bright">
          <span aria-hidden="true" className="h-px w-10 bg-red-bright/60" />
          {site.collection}
        </p>
        <p
          data-scrub-words
          className="font-display mt-10 max-w-5xl text-[clamp(1.9rem,4.6vw,3.9rem)] leading-[1.12] text-bone"
        >
          A kitchen that doesn&rsquo;t stop at the back door. Copper that warms in the low sun, stone that holds the
          heat, and a fire that keeps the evening going.
        </p>
      </section>

      <BobbyStory />

      {/* ───────────── Portrait pair ───────────── */}
      <section className="bg-char pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 sm:gap-5 sm:px-6 lg:px-10">
          <div data-clip className="overflow-hidden rounded-sm">
            <div data-clip-inner>
              <PortraitReveal
                mono={photos.ambassadorFenceBw}
                colour={photos.ambassadorFence}
                alt={`${ambassador.name} resting both arms on a fence rail, looking across the field`}
                sizes="(min-width: 1280px) 620px, 50vw"
                focus="70% 40%"
                className="aspect-[4/5] sm:aspect-[3/2]"
              />
            </div>
          </div>
          <div data-clip className="mt-12 overflow-hidden rounded-sm sm:mt-24">
            <div data-clip-inner>
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
        </div>
        <p data-reveal className="mx-auto mt-8 flex max-w-7xl items-center gap-3 px-4 text-sm text-stone sm:px-6 lg:px-10">
          <span aria-hidden="true" className="h-px w-10 bg-red-bright" />
          Hover or tap a portrait to bring the colour in
        </p>
      </section>

      {/* ───────────── The kitchen ───────────── */}
      <section id="collection" className="mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36 lg:px-10">
        <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-2 lg:items-end">
          <div>
            <p data-reveal className="eyebrow flex items-center gap-3 text-red-bright">
              <span aria-hidden="true" className="h-px w-10 bg-red-bright/60" />
              {site.collection}
            </p>
            <h2 data-split className="font-display mt-6 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.98]">
              Everything the evening needs, <span className="text-sand italic">in one run of stone.</span>
            </h2>
          </div>
          <p data-reveal className="max-w-md text-[1.05rem] leading-relaxed text-sand/85 lg:justify-self-end">
            Sink, tap, oven, coffee and grill, built into a single stone counter under a timber pergola. Pick a number
            to see each piece.
          </p>
        </div>
        <KitchenHotspots
          image={photos.kitchenDusk}
          alt="Outdoor stone kitchen under a timber pergola with string lights, at dusk"
          spots={kitchenSpots}
        />
      </section>

      {/* ───────────── Day to night ───────────── */}
      <section id="day-to-night" className="border-y border-line/60 bg-char">
        <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36 lg:px-10">
          <div className="mb-12 max-w-3xl">
            <p data-reveal className="eyebrow flex items-center gap-3 text-red-bright">
              <span aria-hidden="true" className="h-px w-10 bg-red-bright/60" />
              Day to night
            </p>
            <h2 data-split className="font-display mt-6 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.98]">
              Golden at six. <span className="text-ember italic">Glowing at nine.</span>
            </h2>
            <p data-reveal className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-sand/85">
              Same kitchen, same spot. Drag across to watch the light change.
            </p>
          </div>
          <div data-clip className="overflow-hidden rounded-sm">
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
        <div data-parallax="9" className="absolute inset-x-0 -inset-y-[12%] -z-10">
          <Image
            src={photos.kitchenNightWarm}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            className="object-cover object-[45%_60%]"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/25" />
        <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 sm:py-40 lg:px-10">
          <p data-reveal className="eyebrow flex items-center gap-3 text-cream">
            <span className="rounded-full bg-red px-3 py-1.5 text-[0.62rem] text-cream">Now on</span>
            {offer.short}
          </p>
          <h2 data-split className="font-display mt-6 max-w-2xl text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.98]">
            {offer.title}
          </h2>
          <ul className="mt-9 max-w-xl space-y-3 text-sand/90">
            {offer.perks.map((p, i) => (
              <li key={p.title} data-reveal style={revealDelay(i * 90)} className="flex gap-3">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-red-bright" />
                {p.title}
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-11">
            <Link
              href="/promo"
              data-magnetic
              className="inline-flex rounded-full bg-red px-8 py-4 text-sm font-semibold text-cream shadow-[0_10px_40px_-10px_rgba(153,0,17,0.9)] transition-colors hover:bg-red-deep"
            >
              See the offer
            </Link>
          </div>
        </div>
      </section>

      <PageMotion />
    </div>
  );
}
