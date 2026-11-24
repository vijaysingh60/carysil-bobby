"use client";

import { useRef } from "react";
import gsap from "gsap";
import { CampaignLogo } from "@/components/campaign-logo";
import { $, $$, useScene } from "@/lib/use-scene";

/** The full-width lockup at the foot of every page: it signs itself as it scrolls into view. */
export function FooterLockup() {
  const root = useRef<HTMLDivElement>(null);

  useScene(root, (el) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" } });
    tl.fromTo($("[data-logo-live]", el), { clipPath: "inset(-40% 100% -40% 0%)" }, { clipPath: "inset(-40% 0% -40% 0%)", duration: 1, ease: "power2.inOut" }, 0)
      .fromTo($$("[data-logo-letter]", el), { y: 48 }, { y: 0, duration: 0.9, ease: "expo.out", stagger: 0.06 }, 0.55)
      .fromTo($("[data-logo-life]", el), { clipPath: "inset(-40% 100% -40% 0%)" }, { clipPath: "inset(-40% 0% -40% 0%)", duration: 0.7, ease: "power2.inOut" }, 1.1);
  });

  return (
    <div ref={root} className="px-4 sm:px-6 lg:px-10">
      <CampaignLogo variant="dark" className="mx-auto w-full max-w-[110rem]" />
    </div>
  );
}
