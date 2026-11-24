"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { CampaignLogo } from "@/components/campaign-logo";
import { collection } from "@/lib/campaign";
import { farm } from "@/lib/media";
import { $, $$, useScene } from "@/lib/use-scene";

/** The pergola's front opening in kitchen-day, as fractions of the photo (measured on the frame). */
const OPENING = { x: 0.318, y: 0.3, w: 0.497, h: 0.23 };

const TITLE = ["The Farmhouse", "Collection"];

const LOUVRES = 9;

/**
 * Hero, in two beats on one pinned stage:
 *
 * 1. On load, timber louvres (the pergola's roof slats, stood on end) swing open one
 *    after another to show the kitchen, which settles from a slight zoom while the title
 *    rises letter by letter. Pure CSS transforms, so it runs before hydration and stays
 *    on the compositor.
 * 2. Scrolling lifts the title away, dims the kitchen, and pushes the camera through the
 *    pergola's opening, where Bobby is waiting (after the arch on the sternhagen.com
 *    homepage); then the campaign line lands.
 *
 * The photo sits in a frame with the photo's own aspect ratio, so the opening can be
 * measured in percent of the frame. The camera scales the frame around the opening's
 * centre; Bobby's layer is clipped to wherever the opening is on screen, so the window
 * grows until it fills the stage.
 *
 * Without motion the stage is a plain full-height hero: Bobby, the lockup and the copy.
 */
export function HeroPortal() {
  const root = useRef<HTMLElement>(null);

  useScene(root, () => {
    const el = root.current!;
    const stage = $(".scene-stage", el)!;
    const frame = $("[data-hp-frame]", el)!;
    const dim = $("[data-hp-dim]", el)!;
    const titleLines = $$("[data-hp-line]", el);
    const furniture = $$("[data-hp-furniture]", el);
    const bobby = $("[data-hp-bobby]", el)!;
    const bobbyImg = $("[data-hp-bobby-img]", el)!;
    const veil = $("[data-hp-veil]", el)!;
    const ins = $$("[data-hp-in]", el);

    // Geometry of the opening on screen at scale 1, and the scale at which it covers the stage.
    let g = { W: 0, H: 0, ox: 0, oy: 0, ww: 0, wh: 0, end: 1 };
    const measure = () => {
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const fw = frame.offsetWidth;
      const fh = frame.offsetHeight;
      const ww = OPENING.w * fw;
      const wh = OPENING.h * fh;
      const cx = OPENING.x * fw + ww / 2; // opening centre inside the frame
      const cy = OPENING.y * fh + wh / 2;
      // Slide the frame so the opening is centred, without showing the frame's edges.
      const slack = Math.max(0, (fw - W) / 2);
      const shift = gsap.utils.clamp(-slack, slack, fw / 2 - cx);
      const ox = (W - fw) / 2 + shift + cx;
      const oy = (H - fh) / 2 + cy;
      const end = Math.max((2 * ox) / ww, (2 * (W - ox)) / ww, (2 * oy) / wh, (2 * (H - oy)) / wh) * 1.04;
      g = { W, H, ox, oy, ww, wh, end };
      gsap.set(frame, { xPercent: -50, yPercent: -50, x: shift, y: 0, transformOrigin: `${cx}px ${cy}px` });
    };

    const cam = { t: 0 };
    const apply = () => {
      const { W, H, ox, oy, ww, wh, end } = g;
      const s = 1 + (end - 1) * cam.t;
      gsap.set(frame, { scale: s });
      const l = ox - (ww / 2) * s;
      const r = ox + (ww / 2) * s;
      const t = oy - (wh / 2) * s;
      const b = oy + (wh / 2) * s;
      bobby.style.clipPath = `inset(${t.toFixed(1)}px ${(W - r).toFixed(1)}px ${(H - b).toFixed(1)}px ${l.toFixed(1)}px)`;
    };
    measure();
    apply();
    gsap.set(ins, { y: 36 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onRefresh: () => {
          measure();
          apply();
        },
      },
    });

    // 1 → 2: the title lifts away and the kitchen dims while the camera starts to move.
    tl.to(titleLines, { yPercent: -112, duration: 0.5, stagger: 0.07, ease: "power2.in" }, 0)
      .to(furniture, { autoAlpha: 0, y: -16, duration: 0.35, stagger: 0.03 }, 0)
      .fromTo(dim, { opacity: 0 }, { opacity: 0.5, duration: 1, ease: "power1.in" }, 0.35)
      // Through the pergola.
      .to(bobby, { opacity: 1, duration: 0.3 }, 0.4)
      .to(cam, { t: 1, duration: 1.7, ease: "power2.in", onUpdate: apply }, 0.4)
      .fromTo(bobbyImg, { scale: 1.32 }, { scale: 1, duration: 1.7, ease: "power1.out" }, 0.4)
      .to(veil, { opacity: 1, duration: 0.5 }, 1.7)
      .to(ins, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, 1.8)
      .to({}, { duration: 0.45 });
  });

  return (
    <section
      ref={root}
      aria-label={`${collection.name} with ${collection.host}`}
      className="scene relative bg-ink"
      style={{ "--scene-length": "230svh" } as CSSProperties}
    >
      <div className="scene-stage">
        {/* The kitchen. The frame is what the camera scales; the inner layer settles on load. */}
        <div
          data-hp-frame
          className="absolute top-1/2 left-1/2 aspect-[3000/2013] w-[max(100%,149svh)] will-change-transform"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <div className="hp-settle absolute inset-0">
            <Image
              src={farm.kitchenDay}
              alt="The Farmhouse Collection outdoor kitchen under a timber pergola at golden hour"
              fill
              preload
              sizes="(min-width: 1024px) 110vw, 330vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
        </div>
        <div data-hp-dim aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink opacity-0" />

        {/* Title over the kitchen: letters rise one by one. The CSS fade-in sits on wrappers
            (.hp-fade) and GSAP fades their children, so the two never fight over opacity. */}
        <div aria-hidden="true" className="hp-title pointer-events-none absolute inset-0">
          <div className="hp-fade">
            <div data-hp-furniture>
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/55 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-ink/85 via-ink/40 to-transparent" />
              <div className="absolute bottom-6 left-4 flex items-center gap-3 sm:left-6 lg:bottom-8 lg:left-10">
                <span className="scroll-cue h-10 text-cream" />
                <span className="eyebrow text-[0.6rem] text-cream/80">Scroll to step inside</span>
              </div>
              <div className="eyebrow absolute right-4 bottom-6 text-[0.6rem] text-cream/70 sm:right-6 lg:right-10 lg:bottom-8">
                Product list {collection.year}
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 px-4 pb-20 sm:px-6 sm:pb-24 lg:px-10 lg:pb-24">
            <div className="mx-auto max-w-7xl">
              <div className="hp-fade">
                <p data-hp-furniture className="kicker text-cream/85">
                  Carysil × {collection.host}
                </p>
              </div>
              <p className="title mt-5 text-[clamp(2.6rem,8.4vw,9rem)] text-cream">
                {TITLE.map((line, li) => (
                  <span key={line} className="block overflow-hidden pb-[0.04em]">
                    <span data-hp-line className="block">
                      {Array.from(line).map((ch, ci) => (
                        <span key={ci} className="hp-letter" style={{ "--i": li * 14 + ci } as CSSProperties}>
                          {ch === " " ? "\u00a0" : ch}
                        </span>
                      ))}
                    </span>
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* Louvres that swing open on load (motion only) */}
        <div aria-hidden="true" className="hp-louvres pointer-events-none absolute inset-0 z-20">
          {Array.from({ length: LOUVRES }, (_, i) => (
            <span key={i} className="hp-louvre" style={{ "--s": i } as CSSProperties} />
          ))}
        </div>

        {/* Bobby, behind the pergola's opening */}
        <div data-hp-bobby className="absolute inset-0 overflow-hidden bg-ink">
          <div data-hp-bobby-img className="absolute inset-0">
            <Image
              src={farm.bobbyFence}
              alt={`${collection.host} leaning on a timber fence rail at golden hour`}
              fill
              sizes="100vw"
              placeholder="blur"
              className="object-cover object-[64%_30%]"
            />
          </div>
          <div data-hp-veil className="absolute inset-0 opacity-100 [html.motion-ok_&]:opacity-0">
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/20 to-transparent max-md:hidden" />
          </div>

          <div data-hp-copy className="relative flex h-full items-end">
            <div className="mx-auto w-full max-w-7xl px-4 pt-28 pb-12 sm:px-6 sm:pb-16 lg:px-10 lg:pb-20">
              <div data-hp-in>
                <CampaignLogo variant="white" title={null} className="w-[min(32rem,82vw)]" />
              </div>
              <h1 data-hp-in className="title mt-8 text-[clamp(2.4rem,6.2vw,5.6rem)] text-cream">
                {collection.name}
                <span className="mt-3 block text-[0.42em] tracking-[0.08em] text-brass">× {collection.host}</span>
              </h1>
              <p data-hp-in className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-sand">
                Faucet, sink, oven, coffee, wine and fire for the outdoor kitchen. Seven pieces, one farmhouse, hosted by{" "}
                {collection.host}.
              </p>
              <div data-hp-in className="mt-8 flex flex-wrap gap-3">
                <Link href="#collection" data-magnetic className="btn btn-red">
                  <span className="roll">
                    <span data-text="Explore the collection">Explore the collection</span>
                  </span>
                </Link>
                <Link href="/promo" data-magnetic className="btn btn-line">
                  <span className="roll">
                    <span data-text="Launch offer">Launch offer</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
