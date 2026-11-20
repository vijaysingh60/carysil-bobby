import { Fragment } from "react";
import { marquee } from "@/lib/site";

/** Red running band. The list is rendered twice so the loop at -50% is seamless. */
export function Marquee({ items = marquee }: { items?: readonly string[] }) {
  const row = (copy: number) => (
    <div className="flex shrink-0 items-center" aria-hidden={copy > 0}>
      {items.map((text, i) => (
        <Fragment key={`${copy}-${i}`}>
          <span
            className={`px-6 whitespace-nowrap sm:px-10 ${
              i % 2 === 0 ? "font-display italic" : "eyebrow text-[0.8rem] tracking-[0.3em] not-italic sm:text-sm"
            }`}
          >
            {text}
          </span>
          <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-cream/60 sm:size-5" aria-hidden="true">
            <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="currentColor" />
          </svg>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div data-marquee className="relative overflow-hidden border-y border-red-deep bg-red py-5 text-cream sm:py-7">
      <div className="marquee-track text-[clamp(1.6rem,3.6vw,3rem)] leading-none">
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}
