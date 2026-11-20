"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

export type Hotspot = {
  id: string;
  /** Position on the photo, in percent of width and height. */
  x: number;
  y: number;
  title: string;
  body: string;
};

type Props = { image: StaticImageData; alt: string; spots: readonly Hotspot[] };

export function KitchenHotspots({ image, alt, spots }: Props) {
  const [active, setActive] = useState<string>(spots[0]?.id ?? "");
  const current = spots.find((s) => s.id === active);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-end">
      <div data-clip className="relative overflow-hidden rounded-sm bg-char">
        <div data-clip-inner data-pop-group className="relative aspect-[3/2]">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 70vw, 100vw"
            placeholder="blur"
            className="object-cover"
          />
          {spots.map((s, i) => {
            const on = s.id === active;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                aria-pressed={on}
                aria-label={s.title}
                data-pop
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
              >
                {!on && <span className="hotspot-ring absolute inset-0 rounded-full bg-red/70" />}
                <span
                  className={`relative flex size-7 items-center justify-center rounded-full border text-[0.7rem] font-semibold transition-all duration-300 sm:size-9 ${
                    on
                      ? "scale-110 border-cream bg-red text-cream shadow-[0_0_0_6px_rgba(153,0,17,0.35)]"
                      : "border-cream/80 bg-ink/60 text-cream backdrop-blur group-hover:border-red group-hover:bg-red"
                  }`}
                >
                  {i + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <ol className="space-y-1">
          {spots.map((s, i) => {
            const on = s.id === active;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setActive(s.id)}
                  aria-pressed={on}
                  className={`group/item flex w-full items-baseline gap-4 border-b py-3 text-left transition-colors duration-300 ${
                    on ? "border-red text-bone" : "border-line/70 text-muted hover:text-sand"
                  }`}
                >
                  <span className={`eyebrow w-6 shrink-0 tabular-nums ${on ? "text-red-bright" : ""}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display text-xl transition-transform duration-500 ease-[var(--ease-expo)] ${
                      on ? "translate-x-2" : "group-hover/item:translate-x-1"
                    }`}
                  >
                    {s.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <p aria-live="polite" className="mt-6 min-h-[4.5rem] text-[0.95rem] leading-relaxed text-sand/85">
          <span key={current?.id} className="block animate-[rise_0.7s_var(--ease-expo)_both]">
            {current?.body}
          </span>
        </p>
      </div>
    </div>
  );
}
