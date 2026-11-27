import { Fragment } from "react";
import { marquee, marqueeAlt } from "@/lib/site";

function Row({ items, outline, copy }: { items: readonly string[]; outline?: boolean; copy: number }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={copy > 0}>
      {items.map((text, i) => (
        <Fragment key={`${copy}-${i}`}>
          <span
            className={`font-display px-6 whitespace-nowrap uppercase sm:px-10 ${
              outline ? "outline-text font-normal" : i % 2 === 0 ? "font-light" : "font-thin"
            }`}
          >
            {text}
          </span>
          <svg viewBox="0 0 24 24" className="size-4 shrink-0 opacity-60 sm:size-5" aria-hidden="true">
            <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="currentColor" />
          </svg>
        </Fragment>
      ))}
    </div>
  );
}

/**
 * Two running bands: the campaign line on Carysil red, and the range in outline type
 * running the other way. Each list is rendered twice so the loop at -50% is seamless.
 * page-motion.tsx ties their speed and direction to the scroll and leans the type
 * with scroll velocity.
 */
export function Marquee({ items = marquee, alt = marqueeAlt }: { items?: readonly string[]; alt?: readonly string[] | null }) {
  return (
    <div data-marquee className="relative overflow-hidden">
      <div className="border-y border-red-deep bg-red py-5 text-cream sm:py-7">
        <div data-marquee-track="1" className="marquee-track text-[clamp(1.8rem,4.2vw,3.6rem)] leading-none">
          <Row items={items} copy={0} />
          <Row items={items} copy={1} />
        </div>
      </div>
      {alt && (
        <div className="bg-cream py-4 text-brass-deep/60 sm:py-6">
          <div data-marquee-track="-1" className="marquee-track reverse text-[clamp(2.4rem,6vw,5.4rem)] leading-none">
            <Row items={alt} outline copy={0} />
            <Row items={alt} outline copy={1} />
          </div>
        </div>
      )}
    </div>
  );
}
