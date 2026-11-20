import Image from "next/image";
import { photos } from "@/lib/photos";
import { site, story } from "@/lib/site";

/**
 * Three story beats scroll past a sticky portrait of Bobby, which warms from
 * black and white into colour as they go (scrubbed in page-motion.tsx).
 * Without JS, or with reduced motion, the colour portrait simply shows.
 */
export function BobbyStory() {
  const { ambassador } = site;
  return (
    <section id="bobby" data-story className="relative bg-char">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 sm:py-32 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-0">
        {/* Portrait: sticky on desktop */}
        <div className="lg:sticky lg:top-0 lg:order-2 lg:flex lg:h-svh lg:items-center">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-smoke lg:aspect-auto lg:h-[min(80svh,54rem)]">
            <div data-story-frame className="absolute inset-0">
              <Image
                src={photos.ambassadorCloseupBw}
                alt={`${ambassador.name}, close-up portrait at golden hour, one hand raised to the brow`}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                placeholder="blur"
                className="object-cover object-[52%_30%]"
              />
              <div data-story-colour className="absolute inset-0">
                <Image
                  src={photos.ambassadorCloseup}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-[52%_30%]"
                />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-cream sm:inset-x-7 sm:bottom-7">
              <p className="eyebrow text-[0.65rem] text-cream/80">
                {ambassador.name} for {site.brand}
              </p>
              <p className="font-display text-sm tabular-nums">
                <span data-story-count className="text-3xl text-cream">
                  01
                </span>
                <span className="text-cream/50"> / {String(story.length).padStart(2, "0")}</span>
              </p>
            </div>
            <div className="absolute top-0 left-0 h-1 w-24 bg-red" />
          </div>
        </div>

        {/* Story beats */}
        <div className="flex flex-col gap-20 lg:order-1 lg:gap-0">
          {story.map((beat, i) => {
            const Heading = i === 0 ? "h2" : "h3";
            return (
              <div
                key={beat.eyebrow}
                data-story-step
                className="story-step flex flex-col justify-center lg:min-h-[85svh]"
              >
                <p className="eyebrow flex items-center gap-3 text-red-bright">
                  <span className="font-display text-base tracking-normal text-cream/40 normal-case">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="h-px w-8 bg-red-bright/60" />
                  {beat.eyebrow}
                </p>
                <Heading data-split className="font-display mt-6 text-[clamp(2.4rem,5.4vw,4.5rem)] leading-[1]">
                  {beat.title[0]} <span className="text-sand italic">{beat.title[1]}</span>
                </Heading>
                <p data-reveal className="mt-7 max-w-md text-[1.05rem] leading-relaxed text-sand/85">
                  {beat.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
