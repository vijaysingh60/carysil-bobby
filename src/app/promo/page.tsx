import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Countdown } from "@/components/countdown";
import { EnquiryForm } from "@/components/enquiry-form";
import { Marquee } from "@/components/marquee";
import { MaskedWords } from "@/components/masked-words";
import { PageMotion } from "@/components/page-motion";
import { farm } from "@/lib/media";
import { offer, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Launch offer",
  description: `${offer.title}: ${offer.perks.map((p) => p.title.toLowerCase()).join(", ")}. Book a Carysil design visit for your outdoor kitchen.`,
  openGraph: {
    images: [{ url: farm.kitchenNight.src, width: farm.kitchenNight.width, height: farm.kitchenNight.height }],
  },
};

const endDate = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Kolkata",
}).format(new Date(offer.endsAt));

// "Complimentary design visit, installation included and extended warranty"
const perkList = new Intl.ListFormat("en", { type: "conjunction" }).format(
  offer.perks.map((p, i) => (i === 0 ? p.title : p.title.toLowerCase())),
);

const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;
const revealDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

const moods = [
  { img: farm.kitchenDay, label: "Golden hour", alt: "The outdoor kitchen in late afternoon sun" },
  { img: farm.kitchenDusk, label: "Dusk", alt: "The outdoor kitchen at dusk with the string lights on" },
  { img: farm.kitchenNight, label: "Lights on", alt: "The outdoor kitchen at night under a starry sky" },
  { img: farm.kitchenNightWarm, label: "Last guests", alt: "The outdoor kitchen late at night, lit warm from below" },
];

const promoMarquee = [offer.title, `Until ${endDate}`, ...offer.perks.map((p) => p.title)];

export default function PromoPage() {
  const { ambassador } = site;

  return (
    <div data-page className="pb-20 md:pb-0">
      {/* ───────────── Hero ───────────── */}
      <section data-hero className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden">
        <div data-hero-media className="absolute inset-0 -z-10">
          <Image
            src={farm.kitchenNight}
            alt="Outdoor stone kitchen under a pergola of string lights on a starry night"
            fill
            preload
            sizes="100vw"
            placeholder="blur"
            className="animate-settle object-cover object-[55%_50%]"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/45 to-ink/15" />

        <div
          data-hero-content
          className="mx-auto grid w-full max-w-7xl gap-10 px-4 pt-32 pb-14 sm:px-6 sm:pb-20 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:px-10 lg:pb-24"
        >
          <div>
            <p className="eyebrow animate-rise flex flex-wrap items-center gap-3 text-cream/90">
              <span className="bg-red px-3 py-1.5 text-[0.62rem] text-cream">{site.campaign}</span>
              Until {endDate}
            </p>
            <h1 className="font-display mt-6 text-[clamp(3rem,9vw,7.5rem)] leading-[0.92] font-extralight uppercase">
              <MaskedWords text="Bring the evening" />{" "}
              <MaskedWords text="home." start={3} className="font-light text-ember" />
            </h1>
            <p className="animate-rise mt-7 max-w-lg text-lg leading-relaxed text-sand/90" style={rise(480)}>
              {perkList} on the outdoor kitchen from the {ambassador.name} campaign.
            </p>
            <div className="animate-rise mt-9 flex flex-wrap gap-3" style={rise(620)}>
              <Link href="#book" data-magnetic className="btn btn-red">
                <span className="roll">
                  <span data-text="Book a design visit">Book a design visit</span>
                </span>
              </Link>
              <Link href="#terms" data-magnetic className="btn btn-line">
                <span className="roll">
                  <span data-text="Offer terms">Offer terms</span>
                </span>
              </Link>
            </div>
          </div>
          <div className="animate-rise lg:justify-self-end" style={rise(760)}>
            <p className="eyebrow mb-3 text-sand/70">Offer ends in</p>
            <Countdown endsAt={offer.endsAt} />
          </div>
        </div>
      </section>

      <Marquee items={promoMarquee} />

      {/* ───────────── Perks ───────────── */}
      <section className="bg-cream text-graphite">
        <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <h2 data-split className="font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.98] font-light">
              What the offer <span className="text-red">includes.</span>
            </h2>
            <p data-reveal className="max-w-md text-[1.05rem] leading-relaxed text-graphite-soft lg:justify-self-end">
              Three things that usually cost extra, included on Carysil outdoor kitchens ordered before {endDate}.
            </p>
          </div>
          <ol className="mt-16 grid gap-px overflow-hidden bg-graphite/15 md:grid-cols-3">
            {offer.perks.map((perk, i) => (
              <li
                key={perk.title}
                data-reveal
                style={revealDelay(i * 130)}
                className="group relative overflow-hidden bg-cream p-8 transition-colors duration-500 hover:bg-red sm:p-10"
              >
                <span className="font-display text-6xl font-thin text-red transition-colors duration-500 group-hover:text-cream">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-10 text-2xl leading-tight font-normal transition-colors duration-500 group-hover:text-cream">
                  {perk.title}
                </h3>
                <p className="mt-3 leading-relaxed text-graphite-soft transition-colors duration-500 group-hover:text-cream/85">
                  {perk.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── Bobby feature ───────────── */}
      <section className="relative isolate overflow-hidden bg-ink">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div data-clip className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/2] lg:aspect-auto lg:min-h-[46rem]">
            <div data-clip-inner className="absolute inset-0">
              <Image
                src={farm.bobbyBrow}
                alt={`${ambassador.name} in a black shirt, leaning on a fence at golden hour`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                placeholder="blur"
                className="object-cover object-[45%_35%]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-char via-transparent to-transparent lg:bg-gradient-to-l" />
            <div className="absolute top-0 left-0 h-1 w-24 bg-red" />
          </div>
          <div className="flex flex-col justify-center px-4 py-20 sm:px-6 lg:px-16 lg:py-28">
            <p data-reveal className="eyebrow flex items-center gap-3 text-red-bright">
              <span aria-hidden="true" className="h-px w-10 bg-red-bright/60" />
              As seen in the campaign
            </p>
            <h2 data-split className="font-display mt-6 text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.98] font-light">
              The kitchen from {ambassador.firstName}&rsquo;s evening, <span className="font-thin text-sand">built for yours.</span>
            </h2>
            <p data-reveal className="mt-7 max-w-md text-[1.05rem] leading-relaxed text-sand/85">
              The granite farmhouse sink, the Magic 6-in-1 faucet, the rustic oven set into the stone: the same pieces from
              the shoot, planned around your garden, terrace or farmhouse.
            </p>
            <div data-reveal className="mt-10">
              <Link
                href="/#collection"
                className="group inline-flex items-center gap-3 text-sm font-medium text-cream"
              >
                <span className="relative">
                  Explore the kitchen piece by piece
                  <span className="absolute inset-x-0 -bottom-1.5 h-0.5 origin-left bg-red-bright transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-x-50" />
                </span>
                <span
                  aria-hidden="true"
                  className="flex size-9 items-center justify-center rounded-full bg-red transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1.5"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Four moods: pinned sideways scroll on desktop ───────────── */}
      <section
        data-hscroll
        aria-label="The kitchen from day to night"
        className="overflow-hidden py-24 sm:py-28 lg:flex lg:h-svh lg:items-center lg:py-0"
      >
        <div
          data-hscroll-track
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:gap-5 sm:px-6 lg:snap-none lg:gap-8 lg:overflow-visible lg:px-10 lg:pb-0"
        >
          <div className="flex w-[78vw] shrink-0 snap-start flex-col justify-end sm:w-[44vw] lg:w-[30vw]">
            <p className="eyebrow flex items-center gap-3 text-red-bright">
              <span aria-hidden="true" className="h-px w-10 bg-red-bright/60" />
              One kitchen
            </p>
            <h2 className="font-display mt-6 text-[clamp(2.5rem,4.6vw,4.5rem)] leading-[0.98] font-light">
              Four moods. <span className="font-thin text-sand">One long evening.</span>
            </h2>
            <p className="mt-6 max-w-xs text-sand/80 max-lg:hidden">Keep scrolling: the light moves from gold to dark.</p>
          </div>
          {moods.map((m, i) => (
            <figure key={m.label} className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[36vw]">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-smoke lg:aspect-auto lg:h-[68svh]">
                <Image
                  src={m.img}
                  alt={m.alt}
                  fill
                  sizes="(min-width: 1024px) 36vw, (min-width: 640px) 44vw, 78vw"
                  placeholder="blur"
                  className="object-cover object-[50%_60%] transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-105"
                />
                <span className="font-display absolute top-5 left-5 text-5xl font-thin text-cream/90 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <figcaption className="mt-4 flex items-center justify-between text-sand/85">
                <span className="font-display text-xl font-light">{m.label}</span>
                <span className="eyebrow text-[0.6rem] text-stone">{String(i + 1).padStart(2, "0")} / 04</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ───────────── Booking form ───────────── */}
      <section id="book" className="border-t border-line/60 bg-char">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-28 sm:px-6 sm:py-36 lg:grid-cols-[1fr_1.2fr] lg:px-10">
          <div>
            <p data-reveal className="eyebrow flex items-center gap-3 text-red-bright">
              <span aria-hidden="true" className="h-px w-10 bg-red-bright/60" />
              Book a design visit
            </p>
            <h2 data-split className="font-display mt-6 text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.98] font-light">
              Tell us about <span className="font-thin text-sand">your space.</span>
            </h2>
            <p data-reveal className="mt-7 max-w-sm text-[1.05rem] leading-relaxed text-sand/85">
              Leave your details and a Carysil design consultant will call to fix a visit. No cost, no obligation.
            </p>
            <dl data-reveal className="mt-10 space-y-4 text-sm">
              <div>
                <dt className="eyebrow text-[0.62rem] text-stone">Call</dt>
                <dd className="mt-1 text-bone">
                  <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>{site.contact.phone}</a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-[0.62rem] text-stone">Email</dt>
                <dd className="mt-1 text-bone">
                  <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                </dd>
              </div>
            </dl>
          </div>
          <div data-reveal className="relative">
            <EnquiryForm />
          </div>
        </div>
      </section>

      {/* ───────────── Terms ───────────── */}
      <section id="terms" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
        <details className="group border-y border-line/70">
          <summary className="flex cursor-pointer list-none items-center justify-between py-6 [&::-webkit-details-marker]:hidden">
            <span className="font-display text-2xl font-light">Offer terms and conditions</span>
            <span
              aria-hidden="true"
              className="flex size-10 items-center justify-center rounded-full bg-red text-xl text-cream transition-transform duration-500 ease-[var(--ease-expo)] group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <ol className="list-decimal space-y-3 pb-8 pl-5 text-sm leading-relaxed text-sand/80 marker:text-stone">
            <li>Offer ends {endDate}.</li>
            {offer.terms.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
        </details>
      </section>

      {/* ───────────── Sticky mobile CTA ───────────── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-red-deep bg-red px-4 py-3 md:hidden">
        <Link href="#book" className="btn btn-cream w-full">
          Book a design visit
        </Link>
      </div>

      <PageMotion />
    </div>
  );
}
