import type { CSSProperties } from "react";
import { CarysilLogo } from "@/components/carysil-logo";
import { site } from "@/lib/site";

/**
 * First-visit intro: the Carysil wordmark and campaign line on a red curtain,
 * which then lifts off the hero. Driven entirely by CSS (see .intro in globals.css)
 * so it never blocks the page if JS is slow, and skipped for the rest of the session.
 */
export function IntroCurtain() {
  const words = site.campaign.split(" ");
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-panel">
        <div className="intro-content">
          <div className="intro-mask">
            <div className="intro-logo">
              <CarysilLogo markClass="h-7 sm:h-9" />
            </div>
          </div>
          <div className="intro-rule" />
          <p className="font-display intro-mask text-2xl text-cream italic sm:text-3xl">
            {words.map((w, i) => (
              <span key={i} className="intro-word mr-[0.28em] last:mr-0" style={{ "--i": i } as CSSProperties}>
                {w}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
