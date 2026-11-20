"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Scroll animations for one page, declared with data attributes in the markup:
 *
 *   data-split          heading lines rise out of a mask on enter
 *   data-scrub-words    words light up one by one as you scroll through
 *   data-clip           image box wipes open from the bottom; [data-clip-inner] zooms out
 *   data-parallax="12"  element drifts ±12% against the scroll
 *   data-hero           hero: [data-hero-media] sinks, [data-hero-content] lifts and fades
 *   data-marquee        running band; speed and direction follow the scroll
 *   data-story          sticky portrait turns from B&W to colour; [data-story-step] beats
 *   data-pop-group      children marked [data-pop] spring in
 *   data-hscroll        (desktop) section pins and [data-hscroll-track] scrolls sideways
 *   data-magnetic       (fine pointer) buttons lean toward the cursor
 *   data-footer-type    the footer's campaign line rises in
 *
 * Next.js keeps visited pages mounted but hidden (React Activity), so everything is
 * scoped to this page's [data-page] root and torn down when the page is hidden.
 */
export function PageMotion() {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const scope = marker.current?.closest<HTMLElement>("[data-page]");
    if (!scope) return;
    const q = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = scope) =>
      Array.from(root.querySelectorAll<T>(sel));
    const html = document.documentElement;

    const mm = gsap.matchMedia();
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 1024px)",
        fine: "(hover: hover) and (pointer: fine)",
      },
      (ctx) => {
        const { motion, desktop, fine } = ctx.conditions as Record<string, boolean>;
        if (!motion) return;
        html.classList.add("motion-on");
        const cleanups: Array<() => void> = [];

        // Headings: lines rise from a mask.
        q("[data-split]").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 118,
                duration: 1.3,
                ease: "expo.out",
                stagger: 0.1,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          });
        });

        // Statement paragraph: words light up with the scroll.
        q("[data-scrub-words]").forEach((el) => {
          const split = SplitText.create(el, { type: "words" });
          gsap.fromTo(
            split.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 42%", scrub: 0.6 },
            },
          );
        });

        // Images: wipe open from the bottom while the photo inside eases out of a zoom.
        q("[data-clip]").forEach((el) => {
          const inner = el.querySelector("[data-clip-inner]");
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 86%", once: true } });
          tl.fromTo(
            el,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" },
          );
          if (inner) tl.fromTo(inner, { scale: 1.35 }, { scale: 1, duration: 2.1, ease: "expo.out" }, 0.15);
        });

        // Parallax drift.
        q("[data-parallax]").forEach((el) => {
          const amt = parseFloat(el.dataset.parallax || "10");
          gsap.fromTo(
            el,
            { yPercent: -amt },
            {
              yPercent: amt,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        // Hero scroll-out.
        q("[data-hero]").forEach((hero) => {
          const st = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
          const media = hero.querySelector("[data-hero-media]");
          const content = hero.querySelector("[data-hero-content]");
          if (media) gsap.to(media, { yPercent: 22, ease: "none", scrollTrigger: st });
          if (content)
            gsap.to(content, { yPercent: -18, opacity: 0, ease: "none", scrollTrigger: { ...st, end: "bottom 25%" } });
        });

        // Marquee: steady drift, pushed faster by scroll speed, reversed by scroll direction.
        q("[data-marquee]").forEach((band) => {
          const track = band.querySelector<HTMLElement>(".marquee-track");
          if (!track) return;
          const setX = gsap.quickSetter(track, "xPercent");
          const wrap = gsap.utils.wrap(-50, 0);
          const base = 50 / 36; // percent per second
          let x = 0;
          let dir = 1;
          let boost = 0;
          const st = ScrollTrigger.create({
            trigger: band,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              dir = self.direction;
              boost = Math.min(Math.abs(self.getVelocity()) / 260, 6);
            },
          });
          const tick = (_t: number, dt: number) => {
            boost *= 0.93;
            x = wrap(x - dir * base * (1 + boost) * (dt / 1000));
            setX(x);
          };
          gsap.ticker.add(tick);
          cleanups.push(() => {
            gsap.ticker.remove(tick);
            st.kill();
          });
        });

        // Sticky story: the portrait warms from B&W to colour, beats highlight in turn.
        q("[data-story]").forEach((section) => {
          const colour = section.querySelector("[data-story-colour]");
          const frame = section.querySelector("[data-story-frame]");
          const counter = section.querySelector("[data-story-count]");
          if (colour)
            gsap.fromTo(
              colour,
              { opacity: 0 },
              { opacity: 1, ease: "none", scrollTrigger: { trigger: section, start: "top 20%", end: "bottom 80%", scrub: true } },
            );
          if (frame)
            gsap.fromTo(
              frame,
              { scale: 1.14 },
              { scale: 1, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom bottom", scrub: true } },
            );
          q("[data-story-step]", section).forEach((step, i) => {
            ScrollTrigger.create({
              trigger: step,
              start: "top 60%",
              end: "bottom 60%",
              onToggle: (self) => {
                step.classList.toggle("is-active", self.isActive);
                if (self.isActive && counter) counter.textContent = String(i + 1).padStart(2, "0");
              },
            });
          });
        });

        // Markers spring in.
        q("[data-pop-group]").forEach((group) => {
          gsap.from(q("[data-pop]", group), {
            scale: 0,
            opacity: 0,
            duration: 0.9,
            ease: "back.out(2.2)",
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: "top 70%", once: true },
          });
        });

        // Desktop: pin a section and scroll its track sideways.
        if (desktop) {
          q("[data-hscroll]").forEach((section) => {
            const track = section.querySelector<HTMLElement>("[data-hscroll-track]");
            if (!track) return;
            const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);
            gsap.to(track, {
              x: () => -distance(),
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${distance()}`,
                pin: true,
                scrub: 0.8,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            });
          });
        }

        // Footer campaign line (the footer sits outside the page root, in the layout).
        const footerType = document.querySelector("[data-footer-type]");
        if (footerType)
          gsap.fromTo(
            footerType,
            { yPercent: 70, xPercent: 8 },
            {
              yPercent: 0,
              xPercent: 0,
              ease: "none",
              scrollTrigger: { trigger: footerType, start: "top bottom", end: "bottom bottom", scrub: true },
            },
          );

        // Magnetic buttons, here and in the header.
        if (fine) {
          [...q("[data-magnetic]"), ...Array.from(document.querySelectorAll<HTMLElement>("header [data-magnetic]"))].forEach(
            (el) => {
              const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
              const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
              const move = (e: PointerEvent) => {
                const r = el.getBoundingClientRect();
                xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
                yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
              };
              const leave = () => {
                xTo(0);
                yTo(0);
              };
              el.addEventListener("pointermove", move);
              el.addEventListener("pointerleave", leave);
              cleanups.push(() => {
                el.removeEventListener("pointermove", move);
                el.removeEventListener("pointerleave", leave);
                gsap.set(el, { clearProps: "x,y" });
              });
            },
          );
        }

        // Layout can shift once fonts and images land; re-measure then.
        const refresh = () => ScrollTrigger.refresh();
        document.fonts?.ready.then(refresh);
        window.addEventListener("load", refresh);
        const late = window.setTimeout(refresh, 1200);
        cleanups.push(() => {
          window.removeEventListener("load", refresh);
          window.clearTimeout(late);
        });

        // .motion-on stays once set: another visible page may already rely on it.
        return () => cleanups.forEach((fn) => fn());
      },
      scope,
    );

    return () => mm.revert();
  }, []);

  return <span ref={marker} hidden />;
}
