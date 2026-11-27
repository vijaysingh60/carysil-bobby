"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * A small red dot trails the pointer. Over anything marked [data-cursor="Label"] it
 * swells into a red disc carrying that label (the native cursor is hidden there).
 * Fine pointers with motion allowed only; everywhere else it never renders (CSS).
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = dot.current;
    const text = label.current;
    if (!el || !text) return;
    const mq = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    let current: string | null = null;
    let visible = false;
    let px = -1;
    let py = -1;

    // Label for whatever is under the pointer now. Also run on scroll, because content
    // moves under a still mouse without any pointermove.
    const update = (under: Element | null) => {
      const target = under?.closest<HTMLElement>("[data-cursor]");
      const next = target?.dataset.cursor ?? null;
      if (next === current) return;
      current = next;
      // Cancel the previous swell/shrink, including a label fade-in still waiting on its
      // delay, so a quick in-and-out never leaves the label showing on the small dot.
      gsap.killTweensOf(el, "width,height");
      gsap.killTweensOf(text);
      if (next) {
        text.textContent = next;
        gsap.to(el, { width: 92, height: 92, duration: 0.5, ease: "expo.out" });
        gsap.to(text, { opacity: 1, scale: 1, duration: 0.4, delay: 0.05, ease: "expo.out" });
      } else {
        gsap.to(el, { width: 10, height: 10, duration: 0.45, ease: "expo.out" });
        gsap.to(text, { opacity: 0, scale: 0.6, duration: 0.2 });
      }
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      if (!visible) {
        visible = true;
        gsap.set(el, { x: px, y: py });
        gsap.to(el, { autoAlpha: 1, duration: 0.3 });
      }
      xTo(px);
      yTo(py);
      update(e.target as Element | null);
    };
    let raf = 0;
    const scroll = () => {
      if (px < 0 || raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update(document.elementFromPoint(px, py));
      });
    };
    const out = (e: PointerEvent) => {
      if (!e.relatedTarget) {
        visible = false;
        gsap.to(el, { autoAlpha: 0, duration: 0.3 });
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("pointerout", out);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("pointerout", out);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="cursor pointer-events-none invisible fixed top-0 left-0 z-[80] flex size-2.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red opacity-0"
    >
      <span ref={label} className="eyebrow scale-60 text-[0.6rem] tracking-[0.18em] whitespace-nowrap text-cream opacity-0" />
    </div>
  );
}
