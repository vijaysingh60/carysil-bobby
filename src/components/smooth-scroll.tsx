"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Lenis smooth scrolling on GSAP's ticker, so ScrollTrigger animations stay in
 * step with the eased scroll. Off when the visitor prefers reduced motion.
 * Also holds the page still while the first-visit intro curtain plays.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    const introPlaying = !html.classList.contains("intro-seen");
    // After the intro, shorten the hero delay for every later page in this session.
    const doneTimer = window.setTimeout(() => html.classList.add("intro-seen"), 5000);

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => window.clearTimeout(doneTimer);
    }

    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95 });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    let startTimer: number | undefined;
    if (introPlaying) {
      lenis.stop();
      startTimer = window.setTimeout(() => lenis.start(), 2300);
    }

    return () => {
      window.clearTimeout(doneTimer);
      window.clearTimeout(startTimer);
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // New page: jump to the top (or to the #section in the link) without easing.
  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;
    const hash = window.location.hash;
    const target = hash ? document.querySelector<HTMLElement>(hash) : null;
    requestAnimationFrame(() => {
      if (target) lenis.scrollTo(target, { offset: -72, immediate: true, force: true });
      else lenis.scrollTo(0, { immediate: true, force: true });
      ScrollTrigger.refresh();
    });
  }, [pathname]);

  return null;
}
