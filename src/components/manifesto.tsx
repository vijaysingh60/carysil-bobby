"use client";

import Image from "next/image";
import { Fragment, useRef } from "react";
import gsap from "gsap";
import { collection, manifesto } from "@/lib/campaign";
import { farm } from "@/lib/media";
import { $, $$, useScene } from "@/lib/use-scene";

const words = manifesto.split(" ").map((w) => ({ text: w.replace(/\*/g, ""), lit: w.startsWith("*") }));
const band = ["Farmhouse", "Stone", "Fire", "Coffee", "Wine", collection.host];

/**
 * After the Shü page: words come into focus out of a blur as they scroll through,
 * a rounded photo opens beside the "for those who host" copy, and an outlined band of
 * words slides with the scroll.
 */
export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useScene(root, (el) => {
    const ws = $$(".focus-word", el);
    gsap.to(ws, {
      opacity: 1,
      filter: "blur(0px)",
      ease: "none",
      stagger: 0.12,
      scrollTrigger: { trigger: $("[data-focus]", el), start: "top 82%", end: "bottom 42%", scrub: 0.6 },
    });

    const photo = $("[data-mf-photo]", el)!;
    gsap.fromTo(
      photo,
      { clipPath: "inset(14% 18% 14% 18% round 28px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 28px)",
        ease: "none",
        scrollTrigger: { trigger: photo, start: "top 92%", end: "top 30%", scrub: 0.6 },
      },
    );
    gsap.fromTo(
      $("[data-mf-photo-img]", el),
      { yPercent: -8, scale: 1.18 },
      { yPercent: 8, scale: 1.05, ease: "none", scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: true } },
    );

    const track = $("[data-mf-band]", el)!;
    gsap.fromTo(
      track,
      { xPercent: 0 },
      { xPercent: -38, ease: "none", scrollTrigger: { trigger: track, start: "top bottom", end: "bottom top", scrub: 0.5 } },
    );
  });

  return (
    <section ref={root} id="story" className="relative overflow-hidden bg-ink text-bone">
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-20 sm:px-6 lg:px-10 lg:pt-40 lg:pb-28">
        <div className="eyebrow flex flex-wrap justify-between gap-4 text-[0.62rem] text-stone">
          <p>A new collection by Carysil</p>
          <p>
            Introducing <span className="text-brass">{collection.name}</span>
          </p>
        </div>
        <p data-focus className="mt-14 max-w-6xl text-[clamp(2rem,4.8vw,4.4rem)] leading-[1.08] font-light tracking-[-0.01em] lg:mt-20">
          {words.map((w, i) => (
            <Fragment key={i}>
              {i > 0 && " "}
              <span className={`focus-word ${w.lit ? "text-brass" : ""}`}>{w.text}</span>
            </Fragment>
          ))}
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-24 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-10 lg:pb-36">
        <figure data-mf-photo className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[5/4] lg:aspect-[4/5]">
          <div data-mf-photo-img className="absolute inset-0">
            <Image
              src={farm.bobbyCoffee}
              alt={`${collection.host} with an espresso beside the Piccola coffee machine`}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              placeholder="blur"
              className="object-cover object-[35%_40%]"
            />
          </div>
        </figure>
        <div className="lg:max-w-md">
          <h2 data-split className="text-[clamp(2rem,3.8vw,3.3rem)] leading-[1.05] font-light text-cream">
            For those who host.
          </h2>
          <p data-reveal className="mt-8 text-[1.05rem] leading-relaxed text-sand/85">
            {collection.name} is Carysil&rsquo;s outdoor kitchen for long weekends and longer tables: granite under the
            tap, brass on the faucet, steel on the grill and timber on the wine shelves.
          </p>
          <p data-reveal className="mt-5 text-[1.05rem] leading-relaxed text-sand/85">
            The materials of a working farmhouse, finished to Carysil&rsquo;s German-engineered standard, so cooking outside
            becomes the main event rather than the overflow.
          </p>
          <p data-reveal className="eyebrow mt-10 flex items-center gap-3 text-[0.62rem] text-brass">
            <span aria-hidden="true" className="h-px w-10 bg-brass/60" />
            Live the Carysil life
          </p>
        </div>
      </div>

      {/* Outlined band that slides with the scroll */}
      <div aria-hidden="true" className="border-y border-line/70 py-6 lg:py-8">
        <div data-mf-band className="flex w-max items-center gap-10 text-[clamp(3rem,9vw,8.5rem)] leading-none text-brass/80 lg:gap-16">
          {[...band, ...band, ...band].map((w, i) => (
            <Fragment key={i}>
              <span className="outline-text title whitespace-nowrap">{w}</span>
              <span className="size-3 shrink-0 rotate-45 bg-red lg:size-4" />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
