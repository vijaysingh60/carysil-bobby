"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { collection, productGroups, productList } from "@/lib/campaign";
import { $$, useScene } from "@/lib/use-scene";

gsap.registerPlugin(Flip);

type Group = (typeof productGroups)[number]["id"];

/**
 * Product List 2027: every piece in the catalogue with its MRP, filterable by group
 * (after the product grid on "Ode to Germany"). Changing the filter reflows the grid
 * with GSAP Flip: staying cards glide to their new places, others fade in or out.
 */
export function ProductIndex() {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLUListElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [group, setGroup] = useState<Group>("all");

  useScene(root, (el) => {
    gsap.fromTo(
      $$("[data-pi-card]", el),
      { autoAlpha: 0, y: 70 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: grid.current, start: "top 80%", toggleActions: "play none none none" },
      },
    );
  });

  const choose = (g: Group) => {
    if (g === group) return;
    if (grid.current && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      flipState.current = Flip.getState($$("[data-pi-card]", grid.current));
    }
    setGroup(g);
  };

  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state) return;
    flipState.current = null;
    Flip.from(state, {
      duration: 0.8,
      ease: "expo.inOut",
      stagger: 0.03,
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.6, delay: 0.2 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.9, duration: 0.4 }),
    });
  }, [group]);

  const count = (g: Group) => (g === "all" ? productList.length : productList.filter((p) => p.group === g).length);

  return (
    <section ref={root} id="products" aria-label={`Product list ${collection.year}`} className="relative bg-linen text-graphite">
      <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-10 lg:py-36">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="kicker kicker-light text-graphite-soft">Product list {collection.year}</p>
            <h2 data-split className="mt-6 text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1.02] font-light tracking-[-0.015em]">
              Seven pieces, <span className="text-graphite/35">one farmhouse.</span>
            </h2>
          </div>
          <div role="group" aria-label="Filter the products" className="flex flex-wrap gap-2 lg:justify-end">
            {productGroups.map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={group === g.id}
                onClick={() => choose(g.id)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors duration-500 ${
                  group === g.id ? "border-graphite bg-graphite text-cream" : "border-graphite/20 hover:border-graphite/60"
                }`}
              >
                {g.label} <span className="ml-1 text-[0.75em] opacity-60 tabular-nums">{count(g.id)}</span>
              </button>
            ))}
          </div>
        </div>

        <ul ref={grid} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {productList.map((p) => {
            const shown = group === "all" || p.group === group;
            return (
              <li key={p.id} data-pi-card data-flip-id={p.id} className={shown ? "" : "hidden"}>
                <Link
                  href="/promo#book"
                  data-cursor="Enquire"
                  className="group block overflow-hidden rounded-[10px] bg-cream transition-shadow duration-700 hover:shadow-[0_30px_60px_-30px_rgba(44,45,48,0.35)]"
                >
                  <div className={`relative aspect-[4/3] overflow-hidden ${p.photo ? "" : "bg-[radial-gradient(closest-side,#fff,transparent)]"}`}>
                    <div className={`absolute ${p.photo ? "inset-0" : "inset-[12%]"} transition-transform duration-[1200ms] ease-[var(--ease-expo)] group-hover:scale-[1.06]`}>
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                        className={p.photo ? "object-cover" : "object-contain"}
                      />
                    </div>
                  </div>
                  <div className="flex items-end justify-between gap-4 border-t border-graphite/10 p-5 sm:p-6">
                    <div>
                      <p className="text-[1.05rem] font-medium">{p.name}</p>
                      <p className="mt-1 text-sm text-graphite-soft">{p.type}</p>
                    </div>
                    <p className="shrink-0 text-right">
                      <span className="eyebrow block text-[0.56rem] text-graphite-soft">MRP</span>
                      <span className="mt-1 block text-[0.95rem] tabular-nums">{p.mrp}</span>
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 text-xs text-graphite-soft">
          Prices are MRPs from the {collection.name} product list {collection.year}.
        </p>
      </div>
    </section>
  );
}
