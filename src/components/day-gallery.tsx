"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { day } from "@/lib/campaign";
import { $, $$, useScene } from "@/lib/use-scene";

/**
 * "A day at the farmhouse": six scenes from first coffee to last light, in the style
 * of the pinned "A daily ritual, reimagined" gallery on the Shü page. On desktop the
 * stage pins and the strip slides sideways with the scroll, each photo drifting inside
 * its frame; on touch screens it is a native swipe strip with snap points.
 */
export function DayGallery() {
  const root = useRef<HTMLElement>(null);

  useScene(root, (el, { desktop }) => {
    if (!desktop) return;
    const track = $("[data-day-track]", el)!;
    const bar = $("[data-day-bar]", el)!;
    const distance = () => track.scrollWidth - window.innerWidth;

    const slide = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
      },
    });

    $$("[data-day-card]", el).forEach((card) => {
      const img = $("[data-day-img]", card)!;
      gsap.fromTo(
        img,
        { xPercent: -7 },
        {
          xPercent: 7,
          ease: "none",
          scrollTrigger: { trigger: card, containerAnimation: slide, start: "left right", end: "right left", scrub: true },
        },
      );
    });
  });

  return (
    <section
      ref={root}
      id="day"
      aria-label="A day at the farmhouse"
      className="scene-lg relative bg-white text-graphite"
      style={{ "--scene-length": "300svh" } as CSSProperties}
    >
      <div className="scene-lg-stage flex flex-col justify-center py-24 lg:py-0">
        <div className="mx-auto mb-10 flex w-full max-w-7xl items-end justify-between gap-8 px-4 sm:px-6 lg:mb-12 lg:px-10">
          <div>
            <p className="kicker kicker-light text-graphite-soft">A day at the farmhouse</p>
            <h2 className="mt-6 text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1.02] font-light tracking-[-0.015em]">
              From first coffee <span className="text-graphite/35">to last light.</span>
            </h2>
          </div>
          <div className="hidden w-48 lg:block" aria-hidden="true">
            <div className="h-px bg-graphite/15">
              <div data-day-bar className="h-px origin-left scale-x-0 bg-red" />
            </div>
          </div>
        </div>

        <div
          data-day-track
          className="day-track flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:gap-5 sm:px-6 lg:w-max lg:gap-8 lg:px-10 lg:pb-0"
        >
          {day.map((scene, i) => (
            <figure
              key={scene.title}
              data-day-card
              className="w-[82vw] shrink-0 snap-start sm:w-[58vw] lg:w-[44vw] xl:w-[40vw]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[6px] bg-linen sm:aspect-[16/11]">
                <div data-day-img className="absolute inset-y-0 -inset-x-[8%]">
                  <Image
                    src={scene.image}
                    alt={`${scene.title}: ${scene.line}`}
                    fill
                    sizes="(min-width: 1024px) 48vw, 85vw"
                    placeholder="blur"
                    className="object-cover"
                    style={{ objectPosition: scene.focus }}
                  />
                </div>
                <span className="absolute top-4 left-4 rounded-full bg-white/85 px-3 py-1.5 text-[0.72rem] tracking-[0.12em] text-graphite tabular-nums backdrop-blur">
                  {scene.time}
                </span>
              </div>
              <figcaption className="mt-4 flex items-baseline gap-4">
                <span className="text-[0.72rem] text-red tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-lg font-medium">{scene.title}</span>
                  <span className="mt-1 block text-[0.95rem] text-graphite-soft">{scene.line}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
