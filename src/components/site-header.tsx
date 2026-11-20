"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CarysilLogo } from "@/components/carysil-logo";
import { nav, site } from "@/lib/site";

/** Carysil red bar. Slides away while scrolling down, comes back on scroll up. */
export function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const wasOpen = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
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
      className={`fixed inset-x-0 top-0 z-50 bg-red text-cream shadow-[0_1px_0_rgba(0,0,0,0.25)] transition-transform duration-500 ease-[var(--ease-expo)] ${
        hidden && !open ? "-translate-y-full" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[4.5rem] lg:px-10">
        <Link
          href="/"
          aria-label={`${site.brand} home`}
          className="transition-opacity hover:opacity-85"
          onClick={() => setOpen(false)}
        >
          <CarysilLogo markClass="h-[15px] md:h-[18px]" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {nav.slice(0, -1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative py-1 text-[0.82rem] font-medium tracking-wide text-cream/85 transition-colors hover:text-cream"
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-cream transition-transform duration-500 ease-[var(--ease-expo)] group-hover:origin-left group-hover:scale-x-100" />
            </Link>
          ))}
          <Link
            href="/promo"
            data-magnetic
            aria-current={pathname === "/promo" ? "page" : undefined}
            className="rounded-full bg-cream px-5 py-2.5 text-[0.82rem] font-semibold text-red transition-colors hover:bg-white"
          >
            Launch offer
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
            className={`absolute h-px w-6 bg-cream transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`}
          />
          <span
            className={`absolute h-px w-6 bg-cream transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`}
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-cream/15 bg-red px-4 pt-6 pb-10 lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="animate-[rise_0.8s_var(--ease-expo)_both] border-b border-cream/15 py-5 font-display text-4xl text-cream"
              style={{ animationDelay: `${80 + i * 70}ms` } as CSSProperties}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="font-display mt-10 text-xl text-cream/80 italic">{site.campaign}</p>
      </div>
    </header>
  );
}
