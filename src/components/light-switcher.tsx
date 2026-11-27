"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { lights } from "@/lib/campaign";
import { useScene } from "@/lib/use-scene";

const AUTO_MS = 4800;

/**
 * One kitchen, four lights (after the finish switcher on the Shü page). The four
 * shots share one camera position, so switching opens the next light out of a circle
 * over the last one and nothing in the frame moves. Plays through on its own while in
 * view until someone picks a light; reduced motion swaps instantly.
 */
export function LightSwitcher() {
  const root = useRef<HTMLElement>(null);
  const shots = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const shown = useRef(0);

  // Frame opens as the section arrives.
  useScene(root, (el) => {
    gsap.fromTo(
      el.querySelector("[data-light-frame]"),
      { clipPath: "inset(8% 10% 8% 10% round 10px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 10px)",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 85%", end: "top 25%", scrub: 0.6 },
      },
    );
  });

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !inView) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % lights.length), AUTO_MS);
    return () => window.clearTimeout(t);
  }, [active, auto, inView]);

  // Open the chosen light over the current one.
  useEffect(() => {
    const prev = shown.current;
    if (prev === active) return;
    shown.current = active;
    const next = shots.current[active];
    if (!next) return;
    shots.current.forEach((s, i) => s && gsap.set(s, { zIndex: i === active ? 2 : i === prev ? 1 : 0 }));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(next, { clipPath: "circle(150% at 50% 50%)" });
      return;
    }
    const tween = gsap.timeline();
    tween
      .fromTo(next, { clipPath: "circle(0% at 12% 70%)" }, { clipPath: "circle(150% at 12% 70%)", duration: 1.5, ease: "expo.inOut" })
      .fromTo(next.firstElementChild, { scale: 1.12 }, { scale: 1, duration: 2.4, ease: "expo.out" }, 0);
    return () => {
      tween.kill();
    };
  }, [active]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <section ref={root} id="lights" aria-label="One kitchen, four lights" className="relative overflow-hidden bg-linen text-graphite">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-28 sm:px-6 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16 lg:px-10 lg:py-36">
        <div>
          <p className="kicker kicker-light text-graphite-soft">Four lights</p>
          <h2 data-split className="mt-6 text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.02] font-light tracking-[-0.015em] text-graphite">
            One kitchen. <span className="text-graphite/35">Four lights.</span>
          </h2>
          <p data-reveal className="mt-6 max-w-sm leading-relaxed text-graphite-soft">
            The same stone, steel and timber from golden hour to the last lantern. Pick a light.
          </p>
          <div role="group" aria-label="Choose the light" className="mt-10 flex flex-wrap gap-2 lg:flex-col lg:items-start lg:gap-3">
            {lights.map((l, i) => (
              <button
                key={l.id}
                type="button"
                aria-pressed={active === i}
                onClick={() => pick(i)}
                className={`group flex items-center gap-3 rounded-full border px-4 py-2.5 text-sm transition-colors duration-500 ${
                  active === i ? "border-red bg-white text-graphite" : "border-graphite/15 text-graphite-soft hover:border-graphite/40 hover:text-graphite"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`relative size-3 rounded-full border transition-colors duration-500 ${active === i ? "border-red bg-red" : "border-graphite/35"}`}
                />
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div data-light-frame className="relative aspect-[3/2] overflow-hidden rounded-[10px] bg-paper">
            {lights.map((l, i) => (
              <div
                key={l.id}
                ref={(node) => {
                  shots.current[i] = node;
                }}
                className="absolute inset-0"
                style={{ zIndex: i === 0 ? 2 : 0 }}
              >
                <div className="absolute inset-0">
                  <Image
                    src={l.image}
                    alt={`The Farmhouse Collection kitchen: ${l.label.toLowerCase()}`}
                    fill
                    sizes="(min-width: 1024px) 62vw, 100vw"
                    placeholder="blur"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
          <p aria-live="polite" className="mt-4 text-[0.95rem] text-graphite">
            <span className="eyebrow mr-3 text-[0.6rem] text-red">{lights[active].label}</span>
            {lights[active].line}
          </p>
        </div>
      </div>
    </section>
  );
}
