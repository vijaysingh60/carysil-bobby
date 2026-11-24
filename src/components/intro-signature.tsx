import { CampaignLogo } from "@/components/campaign-logo";
import { collection } from "@/lib/campaign";

/**
 * First-visit intro: the "Live The CARYSIL life" lockup signs itself on warm black
 * ("Live The" is written on, the wordmark rises letter by letter, "life" signs off),
 * then the black lifts away. Pure CSS (see .sig in globals.css), skipped for the rest
 * of the session and for reduced motion.
 */
export function IntroSignature() {
  return (
    <div className="sig" aria-hidden="true">
      <div className="sig-inner">
        <CampaignLogo variant="dark" title={null} />
        <div className="sig-rule" />
      </div>
      <div className="sig-meta eyebrow text-[0.62rem]">
        <span>
          {collection.name} × {collection.host}
        </span>
        <span>Product list {collection.year}</span>
      </div>
    </div>
  );
}
