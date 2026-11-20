"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type Props = {
  before: StaticImageData;
  after: StaticImageData;
  beforeLabel: string;
  afterLabel: string;
  alt: string;
};

/** Drag (or use arrow keys) to wipe between two shots of the same scene. */
export function CompareSlider({ before, after, beforeLabel, afterLabel, alt }: Props) {
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false);

  // First time it scrolls into view, sweep from day to dusk so people see it moves.
  useEffect(() => {
    const el = frame.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) setPos(97); // still off-screen: park it on "day"
    else return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || touched.current) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          if (touched.current) return;
          const t = Math.min(1, (now - start) / 2400);
          setPos(97 - 47 * easeInOut(t));
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.55 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const moveTo = useCallback((clientX: number) => {
    touched.current = true;
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div
      ref={frame}
      className="relative aspect-[3/4] w-full touch-pan-y overflow-hidden rounded-sm bg-char select-none sm:aspect-[16/10] lg:aspect-[3/2]"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        moveTo(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Image
        src={after}
        alt={`${alt}, ${afterLabel.toLowerCase()}`}
        fill
        sizes="(min-width: 1280px) 1200px, 100vw"
        placeholder="blur"
        className="pointer-events-none object-cover object-[60%_50%]"
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        aria-hidden="true"
      >
        <Image
          src={before}
          alt=""
          fill
          sizes="(min-width: 1280px) 1200px, 100vw"
          placeholder="blur"
          className="pointer-events-none object-cover object-[60%_50%]"
        />
      </div>

      <span className="eyebrow pointer-events-none absolute top-5 left-5 rounded-full bg-ink/60 px-3 py-1.5 text-bone backdrop-blur">
        {beforeLabel}
      </span>
      <span className="eyebrow pointer-events-none absolute top-5 right-5 rounded-full bg-ink/60 px-3 py-1.5 text-ember backdrop-blur">
        {afterLabel}
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-red shadow-[0_0_28px_rgba(153,0,17,0.9)]"
        style={{ left: `${pos}%` }}
      />
      <div
        role="slider"
        tabIndex={0}
        aria-label={`Compare ${beforeLabel.toLowerCase()} and ${afterLabel.toLowerCase()}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% ${beforeLabel.toLowerCase()}`}
        onKeyDown={(e) => {
          touched.current = true;
          const step = e.shiftKey ? 10 : 4;
          if (e.key === "ArrowLeft" || e.key === "ArrowDown") setPos((p) => Math.max(0, p - step));
          else if (e.key === "ArrowRight" || e.key === "ArrowUp") setPos((p) => Math.min(100, p + step));
          else if (e.key === "Home") setPos(0);
          else if (e.key === "End") setPos(100);
          else return;
          e.preventDefault();
        }}
        className="absolute top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-red text-cream shadow-[0_10px_40px_rgba(153,0,17,0.55)] transition-transform hover:scale-110"
        style={{ left: `${pos}%` }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
