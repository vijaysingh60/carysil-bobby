import Image, { type StaticImageData } from "next/image";

type Props = {
  mono: StaticImageData;
  colour: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  /** Crop focus, e.g. "70% 40%". */
  focus?: string;
  priority?: boolean;
};

/**
 * The black-and-white frame warms into colour on hover or keyboard focus.
 * The shoot delivered matched mono/colour pairs, so the two layers line up exactly.
 */
export function PortraitReveal({ mono, colour, alt, sizes, className = "", focus = "50% 50%", priority }: Props) {
  return (
    <figure
      tabIndex={0}
      className={`group relative overflow-hidden bg-char outline-offset-4 ${className}`}
    >
      <Image
        src={mono}
        alt={alt}
        fill
        sizes={sizes}
        placeholder="blur"
        priority={priority}
        className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.03] group-focus:scale-[1.03]"
        style={{ objectPosition: focus }}
      />
      <Image
        src={colour}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        className="object-cover opacity-0 transition-[opacity,transform] duration-[1400ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.03] group-hover:opacity-100 group-focus:scale-[1.03] group-focus:opacity-100"
        style={{ objectPosition: focus }}
      />
    </figure>
  );
}
