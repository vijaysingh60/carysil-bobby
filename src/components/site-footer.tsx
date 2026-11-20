import Link from "next/link";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line/70 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <p className="text-[0.95rem] font-semibold tracking-[0.32em] uppercase">{site.brand}</p>
          <p className="font-display mt-4 max-w-sm text-2xl leading-snug text-sand">
            {site.tagline}
          </p>
        </div>
        <div>
          <p className="eyebrow text-stone">Explore</p>
          <ul className="mt-5 space-y-3 text-sm text-sand/80">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-bone">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-stone">Talk to us</p>
          <ul className="mt-5 space-y-3 text-sm text-sand/80">
            <li>
              <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-bone">
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-bone">
                {site.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line/50">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-stone sm:px-6 lg:px-10">
          © {site.brand}. {site.campaignLong}. Products shown are styled for photography.
        </p>
      </div>
    </footer>
  );
}
