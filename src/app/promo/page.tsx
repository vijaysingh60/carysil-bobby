import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Countdown } from "@/components/countdown";
import { EnquiryForm } from "@/components/enquiry-form";
import { photos } from "@/lib/photos";
import { offer, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Launch offer",
  description: `${offer.title}: ${offer.perks.map((p) => p.title.toLowerCase()).join(", ")}. Book a design visit for your outdoor kitchen.`,
  openGraph: {
    images: [{ url: photos.kitchenNight.src, width: photos.kitchenNight.width, height: photos.kitchenNight.height }],
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

const delay = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;
const revealDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

const moods = [
  { img: photos.kitchenDay, label: "Golden hour", alt: "The outdoor kitchen in late afternoon sun" },
  { img: photos.kitchenDusk, label: "Dusk", alt: "The outdoor kitchen at dusk with the string lights on" },
  { img: photos.kitchenNight, label: "Lights on", alt: "The outdoor kitchen at night under a starry sky" },
  { img: photos.kitchenNightWarm, label: "Last guests", alt: "The outdoor kitchen late at night, lit warm from below" },
];

export default function PromoPage() {
  const { ambassador } = site;

  return (
    <div className="pb-20 md:pb-0">
      {/* ───────────── Hero ───────────── */}
      <section className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden">
        <Image
          src={photos.kitchenNight}
          alt="Outdoor stone kitchen under a pergola of string lights on a starry night"
          fill
          preload
          sizes="100vw"
          placeholder="blur"
          className="animate-settle -z-10 object-cover object-[55%_50%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />

        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 pt-32 pb-14 sm:px-6 sm:pb-20 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:px-10 lg:pb-24">
          <div>
            <p className="eyebrow animate-rise text-ember">
              {site.brand} {site.campaign} · Until {endDate}
            </p>
            <h1
              className="font-display animate-rise mt-5 text-[clamp(3rem,9vw,7.5rem)] leading-[0.92]"
              style={delay(120)}
            >
              Bring the evening <span className="text-ember italic">home.</span>
            </h1>
            <p className="animate-rise mt-6 max-w-lg text-lg leading-relaxed text-sand/90" style={delay(260)}>
              {perkList} on the outdoor kitchen from the {ambassador.name} campaign.
            </p>
            <div className="animate-rise mt-9 flex flex-wrap gap-3" style={delay(400)}>
              <Link
                href="#book"
                className="rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-copper-bright"
              >
                Book a design visit
              </Link>
              <Link
                href="#terms"
                className="rounded-full border border-bone/40 px-7 py-3.5 text-sm font-medium text-bone transition-colors hover:border-bone hover:bg-bone/10"
              >
                Offer terms
              </Link>
            </div>
          </div>
          <div className="animate-rise lg:justify-self-end" style={delay(520)}>
            <p className="eyebrow mb-3 text-sand/70">Offer ends in</p>
            <Countdown endsAt={offer.endsAt} />
          </div>
        </div>
      </section>

      {/* ───────────── Perks ───────────── */}
      <section className="bg-bone text-ink">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <h2 data-reveal className="font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.98]">
              What the offer <span className="text-copper italic">includes.</span>
            </h2>
            <p data-reveal className="max-w-md text-[1.05rem] leading-relaxed text-ink/70 lg:justify-self-end">
              Three things that usually cost extra, included on outdoor kitchens ordered before {endDate}.
            </p>
          </div>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-sm bg-ink/15 md:grid-cols-3">
            {offer.perks.map((perk, i) => (
              <li key={perk.title} data-reveal style={revealDelay(i * 120)} className="bg-bone p-8 sm:p-10">
                <span className="font-display text-5xl text-copper">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display mt-8 text-2xl leading-tight">{perk.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/70">{perk.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── Bobby feature ───────────── */}
      <section className="relative isolate overflow-hidden bg-char">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div data-reveal className="relative aspect-[4/5] sm:aspect-[3/2] lg:aspect-auto lg:min-h-[44rem]">
            <Image
              src={photos.ambassadorGaze}
              alt={`${ambassador.name} in a black shirt, leaning on a fence at golden hour`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              placeholder="blur"
              className="object-cover object-[45%_35%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-char via-transparent to-transparent lg:bg-gradient-to-l" />
          </div>
          <div className="flex flex-col justify-center px-4 py-16 sm:px-6 lg:px-16 lg:py-24">
            <p data-reveal className="eyebrow text-copper-bright">
              As seen in the campaign
            </p>
            <h2 data-reveal className="font-display mt-5 text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.98]">
              The kitchen from {ambassador.name}&rsquo;s evening, <span className="text-sand italic">built for yours.</span>
            </h2>
            <p data-reveal className="mt-7 max-w-md text-[1.05rem] leading-relaxed text-sand/85">
              The copper sink, the tap, the oven set into the stone: the same pieces from the shoot, planned around
              your garden, terrace or farmhouse.
            </p>
            <div data-reveal className="mt-9">
              <Link
                href="/#collection"
                className="inline-flex items-center gap-3 text-sm font-medium text-bone underline decoration-copper decoration-2 underline-offset-8 transition-colors hover:text-copper-bright"
              >
                Explore the kitchen piece by piece
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Mood strip ───────────── */}
      <section aria-label="The kitchen from day to night" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <p data-reveal className="eyebrow text-copper-bright">
            One kitchen, four moods
          </p>
        </div>
        <ul className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 sm:gap-4 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-4 lg:overflow-visible lg:px-10 [scrollbar-width:none]">
          {moods.map((m, i) => (
            <li
              key={m.label}
              data-reveal
              style={revealDelay(i * 100)}
              className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-auto"
            >
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-smoke">
                  <Image
                    src={m.img}
                    alt={m.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 44vw, 78vw"
                    placeholder="blur"
                    className="object-cover object-[50%_60%] transition-transform duration-1000 hover:scale-105"
                  />
                </div>
                <figcaption className="mt-3 flex items-center justify-between text-sm text-sand/80">
                  {m.label}
                  <span className="eyebrow text-[0.6rem] text-stone">{String(i + 1).padStart(2, "0")}/04</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      {/* ───────────── Booking form ───────────── */}
      <section id="book" className="border-t border-line/60 bg-char">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-[1fr_1.2fr] lg:px-10">
          <div>
            <p data-reveal className="eyebrow text-copper-bright">
              Book a design visit
            </p>
            <h2 data-reveal className="font-display mt-5 text-[clamp(2.5rem,5vw,4.25rem)] leading-[0.98]">
              Tell us about <span className="text-sand italic">your space.</span>
            </h2>
            <p data-reveal className="mt-7 max-w-sm text-[1.05rem] leading-relaxed text-sand/85">
              Leave your details and a design consultant will call to fix a visit. No cost, no obligation.
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
            <span className="font-display text-2xl">Offer terms and conditions</span>
            <span
              aria-hidden="true"
              className="flex size-9 items-center justify-center rounded-full border border-line text-xl transition-transform group-open:rotate-45"
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
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line/70 bg-ink/90 px-4 py-3 backdrop-blur-xl md:hidden">
        <Link
          href="#book"
          className="flex w-full items-center justify-center rounded-full bg-copper py-3.5 text-sm font-semibold text-ink"
        >
          Book a design visit
        </Link>
      </div>
    </div>
  );
}
