import Link from "next/link";
import { CarysilLogo } from "@/components/carysil-logo";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-red text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-20 pb-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <CarysilLogo markClass="h-6 md:h-7" className="items-start!" />
          <p className="font-display mt-8 max-w-sm text-2xl leading-snug text-cream/90">{site.tagline}</p>
        </div>
        <div>
          <p className="eyebrow text-cream/60">Explore</p>
          <ul className="mt-5 space-y-3 text-sm text-cream/85">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-cream/60">Talk to us</p>
          <ul className="mt-5 space-y-3 text-sm text-cream/85">
            <li>
              <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                {site.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Oversized campaign line, rises in as the footer scrolls up (see data-footer-type in motion.tsx). */}
      <p
        data-footer-type
        className="font-display px-4 text-[clamp(3.2rem,12.5vw,13rem)] leading-[0.85] whitespace-nowrap text-cream italic sm:px-6 lg:px-10"
      >
        {site.campaign}
      </p>

      <div className="mt-8 border-t border-cream/15">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-cream/60 sm:px-6 lg:px-10">
          © {site.brand}. {site.campaign} with {site.ambassador.name}. Products shown are styled for photography.
        </p>
      </div>
    </footer>
  );
}
