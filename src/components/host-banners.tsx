"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { collection } from "@/lib/campaign";
import { farm } from "@/lib/media";
import { $$, useScene } from "@/lib/use-scene";

type Banner = { img: StaticImageData; alt: string; box: string; focus: string };

const banners: Banner[] = [
  {
    img: farm.bobbyBrowBw,
    alt: `${collection.host} in black and white, leaning on a fence rail`,
    box: "col-span-7 aspect-[4/5] lg:col-span-5",
    focus: "62% 30%",
  },
  {
    img: farm.nightDuo,
    alt: "Dinner for two under the pergola at night",
    box: "col-span-5 mt-[38%] aspect-[3/4] lg:col-span-4 lg:mt-[22%] lg:aspect-[4/5]",
    focus: "52% 40%",
  },
  {
    img: farm.hostCounter,
    alt: "Sitting on the stone counter of the outdoor kitchen in riding boots",
    box: "hidden aspect-[3/4] lg:col-span-3 lg:mt-[46%] lg:block",
    focus: "50% 40%",
  },
];

/**
 * After the banners on "Ode to Germany": each photo box opens from the bottom while the
 * photo inside settles from a zoom, in a stagger, and the boxes drift at different
 * speeds as the section scrolls.
 */
export function HostBanners() {
  const root = useRef<HTMLElement>(null);

  useScene(root, (el) => {
    const boxes = $$("[data-banner]", el);
    const imgs = $$("[data-banner-img]", el);
    gsap.fromTo(
      boxes,
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.5,
        ease: "expo.inOut",
        stagger: 0.16,
        scrollTrigger: { trigger: el, start: "top 70%", once: true },
      },
    );
    gsap.fromTo(imgs, { scale: 1.3 }, { scale: 1.06, duration: 2.2, ease: "expo.out", stagger: 0.16, scrollTrigger: { trigger: el, start: "top 70%", once: true } });
    boxes.forEach((box, i) => {
      gsap.fromTo(box, { y: 60 * i }, { y: -50 * i, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    });
  });

  return (
    <section ref={root} id="host" className="relative bg-paper text-graphite">
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-6 lg:px-10 lg:pt-36 lg:pb-32">
        <p className="kicker kicker-light text-graphite-soft">The host</p>
        <div className="mt-12 grid grid-cols-12 items-start gap-3 sm:gap-4 lg:mt-16 lg:gap-6">
          {banners.map((b) => (
            <figure key={b.alt} data-banner className={`relative overflow-hidden rounded-[4px] bg-linen ${b.box}`}>
              <div data-banner-img className="absolute inset-0">
                <Image
                  src={b.img}
                  alt={b.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 60vw"
                  placeholder="blur"
                  className="object-cover"
                  style={{ objectPosition: b.focus }}
                />
              </div>
            </figure>
          ))}
        </div>

        <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-2 lg:gap-20">
          <h2 data-split className="text-[clamp(2.4rem,5.2vw,4.6rem)] leading-[1] font-light tracking-[-0.015em]">
            Every evening <span className="text-graphite/35">needs a host.</span>
          </h2>
          <div className="lg:pt-3">
            <p data-reveal className="text-[1.08rem] leading-relaxed text-graphite-soft">
              {collection.host} fronts {collection.name}: at the coffee machine at first light, at the grill through the
              afternoon, and at the head of the table long after dark. The campaign follows one long day at the farmhouse,
              from the first espresso to the last ember.
            </p>
            <div data-reveal className="mt-10 border-t border-graphite/15 pt-6">
              <p className="text-[0.95rem] font-medium text-graphite">{collection.host}</p>
              <p className="mt-1 text-sm text-graphite-soft">Brand ambassador, Carysil</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
