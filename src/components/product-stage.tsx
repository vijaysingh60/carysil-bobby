"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { stage, type StageProduct } from "@/lib/campaign";
import { $, $$, useScene } from "@/lib/use-scene";

const pad = (n: number) => String(n).padStart(2, "0");
const STEP = 2; // timeline seconds per product
const n = stage.length;

/**
 * The collection, one piece at a time, on a dark stage (after the product section of
 * Sternhagen's Shü page): a warm glow and turning rings behind the piece, the name
 * rising out of a mask, and callouts that slide in from both sides with a rule drawn
 * toward the product. The stage pins while the six pieces hand over to each other.
 *
 * Without motion the stage collapses into a simple list of the same pieces.
 */
export function ProductStage() {
  const root = useRef<HTMLDivElement>(null);

  useScene(root, (el, { desktop }) => {
    if (getComputedStyle(el).display === "none") return;
    const items = $$("[data-st-item]", el);
    const rings = $("[data-st-rings]", el)!;
    const count = $("[data-st-count]", el)!;
    const fills = $$("[data-st-fill]", el);

    const parts = items.map((item) => ({
      item,
      name: $("[data-st-name]", item)!,
      meta: $$("[data-st-meta]", item),
      img: $("[data-st-img]", item)!,
      left: $$("[data-st-callout='l']", item),
      right: $$("[data-st-callout='r']", item),
      rules: $$("[data-st-rule]", item),
      foot: $$("[data-st-foot]", item),
    }));

    const enter = (p: (typeof parts)[number], tl: gsap.core.Timeline, at: number) => {
      tl.fromTo(p.name, { yPercent: 110, y: 0 }, { yPercent: 0, duration: 0.7, ease: "power3.out" }, at)
        .fromTo(p.meta, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06 }, at + 0.15)
        .fromTo(
          p.img,
          { autoAlpha: 0, y: 70, scale: 0.86, filter: "blur(16px)" },
          { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
          at,
        )
        .fromTo(p.left, { autoAlpha: 0, x: desktop ? -40 : 0, y: desktop ? 0 : 12 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.5, stagger: 0.08 }, at + 0.35)
        .fromTo(p.right, { autoAlpha: 0, x: desktop ? 40 : 0, y: desktop ? 0 : 12 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.5, stagger: 0.08 }, at + 0.4)
        .fromTo(p.rules, { scaleX: 0 }, { scaleX: 1, duration: 0.6, stagger: 0.06, ease: "power2.out" }, at + 0.5)
        .fromTo(p.foot, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, at + 0.5);
    };
    // fromTo with immediateRender off, so scrolling back always returns to the shown state.
    const leave = (p: (typeof parts)[number], tl: gsap.core.Timeline, at: number) => {
      const ir = { immediateRender: false };
      tl.fromTo(p.name, { yPercent: 0, y: 0 }, { yPercent: -110, duration: 0.55, ease: "power2.in", ...ir }, at)
        .fromTo([...p.meta, ...p.foot], { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.35, ...ir }, at)
        .fromTo([...p.left, ...p.right], { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.35, ...ir }, at)
        .fromTo(
          p.img,
          { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" },
          { autoAlpha: 0, y: -50, scale: 1.08, filter: "blur(12px)", duration: 0.6, ease: "power2.in", ...ir },
          at,
        )
        .set(p.item, { autoAlpha: 0 }, at + 0.62);
    };

    gsap.set(items.slice(1), { autoAlpha: 0 });

    // One scrubbed timeline. It starts while the section is still rising into place, so the
    // first piece arrives (over the first OFF seconds) just before the stage pins.
    const OFF = 1.1;
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: el,
        start: "top 55%",
        end: "bottom bottom",
        scrub: 0.7,
        onUpdate: (self) => {
          const t = self.progress * (self.animation?.duration() ?? 0) - OFF;
          const i = Math.min(n - 1, Math.max(0, Math.round((t - 0.4) / STEP)));
          count.textContent = pad(i + 1);
        },
      },
    });
    enter(parts[0], tl, 0);
    tl.fromTo(rings, { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.1, ease: "power3.out" }, 0);
    tl.fromTo(fills[0], { scaleX: 0 }, { scaleX: 1, duration: STEP, ease: "none" }, OFF);
    for (let i = 1; i < n; i++) {
      const at = OFF + i * STEP - 0.4;
      leave(parts[i - 1], tl, at - 0.6);
      tl.set(parts[i].item, { autoAlpha: 1 }, at - 0.05);
      enter(parts[i], tl, at);
      tl.fromTo(rings, { scale: 0.92, rotate: (i - 1) * 40 }, { scale: 1, rotate: i * 40, duration: 1.2, immediateRender: false }, at - 0.6);
      tl.fromTo(fills[i], { scaleX: 0 }, { scaleX: 1, duration: STEP, ease: "none" }, OFF + i * STEP);
    }
    tl.to({}, { duration: 0.6 });
  });

  return (
    <section id="collection" aria-label="The collection">
      <div ref={root} className="scene motion-only relative bg-ink text-bone" style={{ "--scene-length": `${n * 80}svh` } as CSSProperties}>
        <div className="scene-stage">
          {/* Glow and rings behind every piece */}
          <div className="pointer-events-none absolute top-[62%] left-1/2 size-[min(120vw,120svh)] -translate-x-1/2 -translate-y-1/2 lg:top-[64%]">
            <div className="stage-glow absolute inset-0" />
            <div data-st-rings className="absolute inset-[16%]">
              <div className="spin-slow absolute inset-0 rounded-full border border-brass/20" />
              <div className="absolute inset-[9%] rounded-full border border-dashed border-brass/25 [animation:spin_40s_linear_infinite_reverse]" />
              <div className="absolute inset-[22%] rounded-full border border-cream/[0.06]" />
            </div>
          </div>

          {/* Header row */}
          <div className="absolute inset-x-0 top-[calc(4rem+2svh)] z-10 px-4 sm:px-6 lg:top-[calc(4.5rem+3svh)] lg:px-10">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
              <p className="kicker text-[0.62rem] text-stone">The collection</p>
              <div className="flex items-center gap-4">
                <p className="font-sans text-sm text-cream tabular-nums">
                  <span data-st-count>01</span>
                  <span className="text-stone"> / {pad(n)}</span>
                </p>
                <div className="hidden w-40 gap-1 sm:flex">
                  {stage.map((p) => (
                    <span key={p.id} className="h-px flex-1 overflow-hidden bg-cream/15">
                      <span data-st-fill className="block h-full origin-left scale-x-0 bg-brass" />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {stage.map((p, i) => (
            <StageItem key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>

      {/* Still: the same pieces as a list */}
      <div className="still-only bg-ink px-4 py-24 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="kicker text-stone">The collection</p>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-3">
            {stage.map((p) => (
              <li key={p.id} className="bg-char p-8">
                <div className="relative mx-auto h-56">
                  <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-contain" />
                </div>
                <p className="eyebrow mt-8 text-[0.6rem] text-brass">{p.type}</p>
                <h3 className="title mt-3 text-3xl text-cream">{p.name}</h3>
                <ul className="mt-4 space-y-1 text-sm text-sand/80">
                  {p.callouts.map((c) => (
                    <li key={c.title}>
                      <span className="text-cream">{c.title}</span> · {c.body}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-stone">MRP {p.mrp}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function StageItem({ p, i }: { p: StageProduct; i: number }) {
  const half = Math.ceil(p.callouts.length / 2);
  const left = p.callouts.slice(0, half);
  const right = p.callouts.slice(half);
  const ratio = p.image.width / p.image.height;

  return (
    <article data-st-item aria-label={p.name} className="absolute inset-0">
      {/* Name */}
      <div className="absolute inset-x-0 top-[calc(4rem+9svh)] px-4 text-center sm:px-6 lg:top-[calc(4.5rem+10svh)]">
        <p data-st-meta className="eyebrow text-[0.6rem] text-brass sm:text-[0.66rem]">
          {pad(i + 1)} · {p.type}
        </p>
        <h3 className="mt-3 overflow-hidden pb-[0.05em]">
          <span data-st-name className="title block text-[clamp(2.3rem,6.4vw,6.2rem)] text-cream">
            {p.name}
          </span>
        </h3>
        <p data-st-meta className="mx-auto mt-3 max-w-md text-[0.95rem] text-sand/75 sm:text-base">
          {p.line}
        </p>
      </div>

      {/* Product: the outer box centres and sizes it, the inner one is what animates */}
      <div
        className="absolute top-[58%] left-1/2 max-w-[78vw] -translate-x-1/2 -translate-y-1/2 [--st-k:0.78] lg:top-[64%] lg:max-w-[46vw] lg:[--st-k:1]"
        style={{ height: `calc(${p.scale * 100}svh * var(--st-k))`, aspectRatio: ratio } as CSSProperties}
      >
        <div data-st-img className="relative size-full">
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(min-width: 1024px) 46vw, 78vw"
            className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
          />
        </div>
      </div>

      {/* Callouts: two columns on desktop, chips on small screens */}
      <ul className="absolute top-[64%] left-[4vw] hidden w-[22vw] -translate-y-1/2 space-y-9 lg:block xl:left-[6vw]">
        {left.map((c) => (
          <Callout key={c.title} c={c} side="l" />
        ))}
      </ul>
      <ul className="absolute top-[64%] right-[4vw] hidden w-[22vw] -translate-y-1/2 space-y-9 text-right lg:block xl:right-[6vw]">
        {right.map((c) => (
          <Callout key={c.title} c={c} side="r" />
        ))}
      </ul>
      <ul className="absolute inset-x-4 bottom-[4.75rem] flex flex-wrap justify-center gap-2 sm:inset-x-6 lg:hidden">
        {p.callouts.map((c, ci) => (
          <li
            key={c.title}
            data-st-callout={ci < half ? "l" : "r"}
            className="rounded-full border border-brass/30 bg-ink/60 px-3 py-1.5 text-[0.72rem] text-sand backdrop-blur"
          >
            {c.title}
          </li>
        ))}
      </ul>

      {/* Footer row */}
      <div className="absolute inset-x-0 bottom-5 px-4 sm:px-6 lg:bottom-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <p data-st-foot className="text-sm text-sand/80">
            <span className="eyebrow mr-2 text-[0.58rem] text-stone">MRP</span>
            {p.mrp}
          </p>
          <Link
            data-st-foot
            href="/promo#book"
            className="group inline-flex items-center gap-2 text-sm text-cream"
            aria-label={`Enquire about the ${p.name}`}
          >
            Enquire
            <span aria-hidden="true" className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function Callout({ c, side }: { c: { title: string; body: string }; side: "l" | "r" }) {
  return (
    <li data-st-callout={side} className="relative">
      {/* A rule drawn from the callout toward the product, ending in a brass dot */}
      <span
        data-st-rule
        aria-hidden="true"
        className={`absolute top-[0.8rem] h-px w-[3.2vw] bg-brass/45 ${
          side === "l" ? "left-[calc(100%+1rem)] origin-left" : "right-[calc(100%+1rem)] origin-right"
        }`}
      >
        <span
          className={`absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-brass ${
            side === "l" ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
          }`}
        />
      </span>
      <p className="text-[1.05rem] font-medium text-cream">{c.title}</p>
      <p className="mt-1 text-sm leading-relaxed text-sand/70">{c.body}</p>
    </li>
  );
}
