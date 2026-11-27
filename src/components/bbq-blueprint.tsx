"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { bbq, JANUARY } from "@/lib/campaign";
import { products } from "@/lib/media";
import { $, $$, useScene } from "@/lib/use-scene";

/**
 * "Built to the centimetre": the Barbeque Station on a drafting grid (after the
 * technical drawing on the Shü page). Dimension lines draw out from the middle, the
 * station slides onto the sheet, and the catalogue's figures count up.
 */
export function BbqBlueprint() {
  const root = useRef<HTMLElement>(null);

  useScene(root, (el) => {
    const sheet = $("[data-bp-sheet]", el)!;
    const tl = gsap.timeline({ scrollTrigger: { trigger: sheet, start: "top 72%", toggleActions: "play none none none" } });
    tl.fromTo($("[data-bp-product]", el), { autoAlpha: 0, x: 80 }, { autoAlpha: 1, x: 0, duration: 1.4, ease: "expo.out" }, 0)
      .fromTo($$("[data-bp-dim='x']", el), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "expo.inOut" }, 0.3)
      .fromTo($$("[data-bp-dim='y']", el), { scaleY: 0 }, { scaleY: 1, duration: 1.1, ease: "expo.inOut" }, 0.45)
      .fromTo($$("[data-bp-label]", el), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 }, 1);

    $$("[data-count]", el).forEach((node) => {
      const to = Number(node.dataset.count);
      const decimals = Number(node.dataset.decimals ?? 0);
      const v = { n: 0 };
      gsap.to(v, {
        n: to,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: { trigger: node, start: "top 88%", toggleActions: "play none none none" },
        onUpdate: () => {
          node.textContent = v.n.toFixed(decimals);
        },
      });
    });

    gsap.fromTo(
      $$("[data-bp-detail]", el),
      { autoAlpha: 0, y: 50 },
      { autoAlpha: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.12, scrollTrigger: { trigger: $("[data-bp-details]", el), start: "top 80%" } },
    );
  });

  return (
    <section ref={root} id="engineered" aria-label="Barbeque Station, engineered" className="relative bg-paper text-graphite">
      <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-10 lg:py-36">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="kicker kicker-light text-graphite-soft">Barbeque Station</p>
            <h2 data-split className="mt-6 text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1.02] font-light tracking-[-0.015em]">
              Built to the centimetre.
            </h2>
            <p data-reveal className="mt-5 max-w-md leading-relaxed text-graphite-soft">
              A stainless steel outdoor kitchen with grill, plancha, sink and beverage refrigerator in one run.
            </p>
          </div>
          <p data-reveal>
            <span className="inline-block rounded-full bg-red px-3.5 py-1.5 text-[0.72rem] font-medium tracking-[0.06em] text-cream">
              {JANUARY}
            </span>
          </p>
        </div>

        {/* Drawing sheet */}
        <div
          data-bp-sheet
          className="relative mt-14 overflow-hidden rounded-[10px] border border-graphite/10 bg-[#f6f2ea] px-10 pt-10 pb-20 sm:px-16 sm:pt-14 sm:pb-24 lg:px-24"
          style={{
            backgroundImage:
              "linear-gradient(rgb(44 45 48 / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(44 45 48 / 0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          <div className="eyebrow absolute top-4 left-5 text-[0.56rem] text-graphite/50">Fig. 02 · Front elevation</div>
          <div className="eyebrow absolute top-4 right-5 text-[0.56rem] text-graphite/50">Dimensions in cm</div>

          <div className="relative mx-auto max-w-4xl">
            <div data-bp-product className="relative aspect-[1679/836]">
              <Image
                src={products.bbqStation}
                alt="The Barbeque Station: grill, plancha, sink, drawers and a glass-door refrigerator in stainless steel"
                fill
                sizes="(min-width: 1024px) 56rem, 90vw"
                className="object-contain mix-blend-multiply"
              />
            </div>

            {/* Width */}
            <div data-bp-dim="x" aria-hidden="true" className="absolute inset-x-[3%] -bottom-8 h-px bg-graphite/60 sm:-bottom-10">
              <span className="absolute -top-1.5 left-0 h-3 w-px bg-graphite/60" />
              <span className="absolute -top-1.5 right-0 h-3 w-px bg-graphite/60" />
            </div>
            <p className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-sm tabular-nums sm:-bottom-[4.5rem]">
              <span data-bp-label className="block">
                {bbq.dims.w} cm
              </span>
            </p>

            {/* Height */}
            <div data-bp-dim="y" aria-hidden="true" className="absolute inset-y-[3%] -left-5 w-px bg-graphite/60 sm:-left-8">
              <span className="absolute top-0 -left-1.5 h-px w-3 bg-graphite/60" />
              <span className="absolute bottom-0 -left-1.5 h-px w-3 bg-graphite/60" />
            </div>
            <p className="absolute top-1/2 -left-12 -translate-y-1/2 -rotate-90 text-sm whitespace-nowrap tabular-nums sm:-left-16">
              <span data-bp-label className="block">
                {bbq.dims.h} cm
              </span>
            </p>
            <p data-bp-label className="absolute -right-2 -bottom-16 text-xs text-graphite-soft sm:-bottom-[4.5rem]">
              {bbq.dims.d} cm deep
            </p>
          </div>
        </div>

        {/* Figures */}
        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-graphite/15 pt-10 lg:grid-cols-6">
          {bbq.specs.map((s) => (
            <div key={s.label}>
              <dt className="text-sm text-graphite-soft">{s.label}</dt>
              <dd className="mt-2 text-[clamp(1.8rem,3vw,2.6rem)] leading-none font-light tabular-nums">
                <span data-count={s.value} data-decimals={s.decimals}>
                  {s.value.toFixed(s.decimals)}
                </span>
                <span className="ml-1.5 text-[0.5em] text-graphite-soft">{s.unit}</span>
              </dd>
            </div>
          ))}
          {bbq.areas.map((a) => (
            <div key={a.label}>
              <dt className="text-sm text-graphite-soft">{a.label}</dt>
              <dd className="mt-2 text-[clamp(1.4rem,2.2vw,1.9rem)] leading-none font-light tabular-nums">{a.value}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-graphite-soft">
          {bbq.notes.map((n) => (
            <li key={n} className="flex items-center gap-2">
              <span aria-hidden="true" className="size-1.5 rotate-45 bg-red" />
              {n}
            </li>
          ))}
        </ul>

        {/* Details */}
        <ul data-bp-details className="mt-16 grid gap-5 sm:grid-cols-3">
          {bbq.details.map((d) => (
            <li key={d.title} data-bp-detail>
              <div className="group relative aspect-[5/4] overflow-hidden rounded-[8px] bg-linen">
                <Image
                  src={d.image}
                  alt={d.title}
                  fill
                  sizes="(min-width: 640px) 30vw, 90vw"
                  className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-105"
                />
              </div>
              <p className="mt-4 font-medium">{d.title}</p>
              <p className="mt-1 text-sm text-graphite-soft">{d.body}</p>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-14">
          <Link href="/promo#book" data-magnetic className="btn btn-red">
            <span className="roll">
              <span data-text="Plan an outdoor kitchen">Plan an outdoor kitchen</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
