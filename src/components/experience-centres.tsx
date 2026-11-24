"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { centres } from "@/lib/campaign";
import { $, $$, useScene } from "@/lib/use-scene";

/**
 * Experience centres, on Carysil red with the catalogue back cover's zigzag lines
 * drifting behind. Each city opens to its address (the catalogue's list); the rows
 * rise in as the section arrives.
 */
export function ExperienceCentres() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useScene(root, (el) => {
    gsap.fromTo(
      $$("[data-centre]", el),
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: $("[data-centres]", el), start: "top 80%", toggleActions: "play none none none" },
      },
    );
    gsap.fromTo(
      $("[data-zigzag]", el),
      { yPercent: -6 },
      { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
    );
  });

  return (
    <section ref={root} id="visit" aria-label="Experience centres" className="relative isolate overflow-hidden bg-red text-cream">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -inset-1/2 rotate-[-32deg]">
          <div data-zigzag className="zigzag size-full opacity-[0.22]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-red via-red/60 to-transparent" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-16 px-4 py-28 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-24 lg:px-10 lg:py-36">
        <div>
          <p className="eyebrow flex items-center gap-3 text-cream/70">
            <span aria-hidden="true" className="h-px w-10 bg-cream/60" />
            Experience centres
          </p>
          <h2 data-split className="mt-6 text-[clamp(2.4rem,5vw,4.6rem)] leading-[1] font-light tracking-[-0.015em]">
            Bring the farmhouse home.
          </h2>
          <p data-reveal className="mt-6 max-w-sm text-[1.05rem] leading-relaxed text-cream/80">
            See the collection in person at a Carysil experience centre, or book a design visit and we&rsquo;ll come to
            you.
          </p>
          <div data-reveal className="mt-10 flex flex-wrap gap-3">
            <Link href="/promo#book" data-magnetic className="btn btn-cream">
              <span className="roll">
                <span data-text="Book a design visit">Book a design visit</span>
              </span>
            </Link>
            <Link href="/promo" data-magnetic className="btn btn-line">
              <span className="roll">
                <span data-text="Launch offer">Launch offer</span>
              </span>
            </Link>
          </div>
        </div>

        <ul data-centres className="border-t border-cream/25">
          {centres.map((c, i) => {
            const isOpen = open === i;
            const id = `centre-${i}`;
            const query = encodeURIComponent(`Carysil ${c.address.join(", ")}`);
            return (
              <li key={c.city} data-centre className="border-b border-cream/25">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center gap-5 py-6 text-left sm:py-7"
                  >
                    <span className="w-8 text-xs text-cream/55 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="title flex-1 text-[clamp(1.9rem,4vw,3.4rem)] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2">
                      {c.city}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex size-10 items-center justify-center rounded-full border border-cream/40 text-xl transition-transform duration-500 ease-[var(--ease-expo)] ${
                        isOpen ? "rotate-45 bg-cream text-red" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={id}
                  className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-expo)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-wrap items-end justify-between gap-6 pb-7 pl-[3.25rem]">
                      <address className="text-[0.98rem] leading-relaxed text-cream/85 not-italic">
                        {c.address.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${query}`}
                        target="_blank"
                        rel="noreferrer"
                        tabIndex={isOpen ? undefined : -1}
                        className="text-sm text-cream underline decoration-cream/40 underline-offset-4 hover:decoration-cream"
                      >
                        Directions ↗
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
