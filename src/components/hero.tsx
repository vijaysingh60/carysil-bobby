import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { CampaignLogo } from "@/components/campaign-logo";
import { collection } from "@/lib/campaign";
import { farm } from "@/lib/media";
import { site } from "@/lib/site";

const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

/** Warm umber (not black) used to shade the photo where the white type sits. */
const SHADE = "#2a2018";

/**
 * Hero: Bobby at golden hour, full bleed. After the intro the photo settles from a slight
 * zoom, the "Live The CARYSIL life" lockup signs itself (.hero-sign, same pen strokes as the
 * intro) and the copy rises in. All CSS, so it plays before hydration; on scroll
 * page-motion.tsx sinks the photo and lifts the copy away ([data-hero]).
 */
export function Hero() {
  return (
    <section
      data-hero
      aria-label={`${site.campaign}: ${collection.name} with ${collection.host}`}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden"
      style={{ backgroundColor: SHADE }}
    >
      <div data-hero-media className="absolute inset-0 -z-10">
        <div className="hero-settle absolute inset-0">
          <Image
            src={farm.bobbyFence}
            alt={`${collection.host} leaning on a timber fence rail at golden hour`}
            fill
            preload
            sizes="100vw"
            placeholder="blur"
            className="object-cover object-[48%_30%] md:object-[64%_30%]"
          />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ backgroundImage: `linear-gradient(to top, ${SHADE}cc, ${SHADE}40 45%, transparent)` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 max-md:hidden"
        style={{ backgroundImage: `linear-gradient(to right, ${SHADE}99, ${SHADE}26 40%, transparent 65%)` }}
      />

      <div data-hero-content className="mx-auto w-full max-w-7xl px-4 pt-28 pb-12 sm:px-6 sm:pb-16 lg:px-10 lg:pb-20">
        <h1 className="hero-sign">
          <CampaignLogo variant="white" title={site.campaign} className="w-[min(36rem,86vw)] md:w-[min(36rem,50vw)]" />
        </h1>
        <p className="animate-rise title mt-7 text-[clamp(1.25rem,2.3vw,1.9rem)] text-cream" style={rise(1100)}>
          {collection.name} <span className="text-brass">× {collection.host}</span>
        </p>
        <p className="animate-rise mt-5 max-w-md text-[1.05rem] leading-relaxed text-cream/85" style={rise(1250)}>
          Faucet, sink, oven, coffee, wine and fire for the outdoor kitchen. Seven pieces, one farmhouse, hosted by{" "}
          {collection.host}.
        </p>
        <div className="animate-rise mt-8 flex flex-wrap gap-3" style={rise(1400)}>
          <Link href="#collection" data-magnetic className="btn btn-red">
            <span className="roll">
              <span data-text="Explore the collection">Explore the collection</span>
            </span>
          </Link>
          <Link href="/promo" data-magnetic className="btn btn-line">
            <span className="roll">
              <span data-text="Launch offer">Launch offer</span>
            </span>
          </Link>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="animate-rise absolute right-4 bottom-8 hidden flex-col items-center gap-3 text-cream/80 sm:flex lg:right-10"
        style={rise(1600)}
      >
        <span className="eyebrow text-[0.58rem] [writing-mode:vertical-rl]">Scroll</span>
        <span className="scroll-cue" />
      </div>
    </section>
  );
}
