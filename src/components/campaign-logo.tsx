import { useId, type CSSProperties } from "react";
import { LOGO_CARYSIL, LOGO_LIFE, LOGO_LIVE, LOGO_VIEWBOX } from "@/lib/campaign-logo-paths";

type Variant = "light" | "dark" | "white" | "mono";

/**
 * Colours of the three lockups in the brand PDF:
 *   light: graphite script, red wordmark (on white / paper)
 *   dark:  white script, red wordmark (on black)
 *   white: all white (on Carysil red or over photos)
 *   mono:  everything in currentColor
 */
const colours: Record<Variant, { script: string; mark: string }> = {
  light: { script: "text-[#2c2d30]", mark: "var(--color-red)" },
  dark: { script: "text-white", mark: "var(--color-red)" },
  white: { script: "text-white", mark: "#fff" },
  mono: { script: "", mark: "currentColor" },
};

type Props = {
  variant?: Variant;
  className?: string;
  /** Accessible name. Pass null when the lockup is decorative (a visible heading says the same). */
  title?: string | null;
};

/**
 * "Live The CARYSIL life". Animation hooks for CSS / GSAP:
 *   [data-logo-live], [data-logo-life]   the script words (wipe on left to right)
 *   [data-logo-letter]                   the seven wordmark letters (rise inside a clip)
 */
export function CampaignLogo({ variant = "light", className = "", title = "Live The Carysil Life" }: Props) {
  const id = useId().replace(/:/g, "");
  const c = colours[variant];
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={`campaign-logo block h-auto ${c.script} ${className}`}
      role={title ? "img" : undefined}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
      overflow="visible"
    >
      <defs>
        {/* Letters rise from below this line, so they appear out of nowhere. */}
        <clipPath id={`${id}-mark`}>
          <rect x="185" y="-20" width="365" height="78" />
        </clipPath>
      </defs>
      <g data-logo-live fill="currentColor">
        {LOGO_LIVE.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g clipPath={`url(#${id}-mark)`} style={{ fill: c.mark }}>
        {LOGO_CARYSIL.map((d, i) => (
          <path key={i} d={d} data-logo-letter style={{ "--l": i } as CSSProperties} />
        ))}
      </g>
      <g data-logo-life fill="currentColor">
        {LOGO_LIFE.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}
