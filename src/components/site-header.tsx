"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        solid
          ? "border-b border-line/70 bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-ink/70 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-10">
        <Link href="/" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="text-[0.95rem] font-semibold tracking-[0.32em] text-bone uppercase">
            {site.brand}
          </span>
          <span className="font-display text-sm text-copper-bright italic transition-colors group-hover:text-ember">
            {site.campaign}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.slice(0, -1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-sand/80 transition-colors hover:text-bone"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/promo"
            className="rounded-full bg-copper px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-copper-bright"
          >
            Launch offer
          </Link>
        </nav>

        <button
          type="button"
          className="relative -mr-2 flex size-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`absolute h-px w-6 bg-bone transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-1"
            }`}
          />
          <span
            className={`absolute h-px w-6 bg-bone transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-1"
            }`}
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line/70 bg-ink px-4 pt-8 pb-10 md:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-display border-b border-line/60 py-5 text-3xl text-bone"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="mt-10 text-sm text-muted">{site.tagline}</p>
      </div>
    </header>
  );
}
