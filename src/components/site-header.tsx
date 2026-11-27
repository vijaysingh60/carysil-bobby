"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CampaignLogo } from "@/components/campaign-logo";
import { nav, site } from "@/lib/site";

/**
 * Light glass bar with the campaign lockup (after the sternhagen.com header). Slides away
 * while scrolling down, comes back on scroll up.
 */
export function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  const progress = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const wasOpen = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 160);
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Hold the page still behind the open menu.
    document.body.style.overflow = open ? "hidden" : "";
    if (open) window.__lenis?.stop();
    else if (wasOpen.current) window.__lenis?.start();
    wasOpen.current = open;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-graphite/10 bg-cream/85 text-graphite backdrop-blur-xl transition-transform duration-500 ease-[var(--ease-expo)] ${
        hidden && !open ? "-translate-y-full" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[4.5rem] lg:px-10">
        <Link
          href="/"
          aria-label={`${site.brand}: ${site.campaign}, home`}
          className="transition-opacity hover:opacity-85"
          onClick={() => setOpen(false)}
        >
          <CampaignLogo variant="light" title={null} className="w-[8.5rem] md:w-[10rem]" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex xl:gap-9">
          {nav.slice(0, -1).map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative py-1 ${i === 2 || i === 3 ? "hidden xl:inline-block" : ""} text-[0.68rem] font-medium tracking-[0.18em] text-graphite/70 uppercase transition-colors hover:text-graphite`}
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-red transition-transform duration-500 ease-[var(--ease-expo)] group-hover:origin-left group-hover:scale-x-100" />
            </Link>
          ))}
          <Link
            href="/promo"
            data-magnetic
            aria-current={pathname === "/promo" ? "page" : undefined}
            className="btn btn-red px-5 py-3"
          >
            <span className="roll">
              <span data-text="Launch offer">Launch offer</span>
            </span>
          </Link>
        </nav>

        <button
          type="button"
          className="relative -mr-2 flex size-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute h-px w-6 bg-graphite transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`}
          />
          <span
            className={`absolute h-px w-6 bg-graphite transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`}
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-graphite/10 bg-cream px-4 pt-6 pb-10 lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="title animate-[rise_0.8s_var(--ease-expo)_both] border-b border-graphite/10 py-5 text-4xl text-graphite"
              style={{ animationDelay: `${80 + i * 70}ms` } as CSSProperties}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="eyebrow mt-10 text-graphite-soft">
          {site.collection} × {site.ambassador.name}
        </p>
      </div>

      {/* Reading progress */}
      <span
        ref={progress}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-red"
      />
    </header>
  );
}
