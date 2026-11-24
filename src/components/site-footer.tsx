import Link from "next/link";
import { CarysilLogo } from "@/components/carysil-logo";
import { FooterLockup } from "@/components/footer-lockup";
import { centres, collection } from "@/lib/campaign";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-24 text-bone lg:pt-32">
      <FooterLockup />

      <div className="mx-auto mt-20 grid max-w-7xl gap-12 border-t border-line px-4 pt-14 pb-12 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-10">
        <div>
          <CarysilLogo markClass="h-5 md:h-6" className="items-start! text-cream" />
          <p className="mt-8 max-w-xs text-[1.05rem] leading-relaxed text-sand/80">
            {collection.name} × {collection.host}. {site.tagline}
          </p>
        </div>
        <div>
          <p className="eyebrow text-[0.62rem] text-stone">Explore</p>
          <ul className="mt-5 space-y-3 text-sm text-sand/85">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-[0.62rem] text-stone">Experience centres</p>
          <ul className="mt-5 space-y-3 text-sm text-sand/85">
            {centres.map((c) => (
              <li key={c.city}>
                <Link href="/#visit" className="transition-colors hover:text-cream">
                  {c.city}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-[0.62rem] text-stone">Talk to us</p>
          <ul className="mt-5 space-y-3 text-sm text-sand/85">
            <li>
              <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-cream">
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-cream">
                {site.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-4 py-6 text-xs text-stone sm:px-6 lg:px-10">
          <p>
            © {site.brand}. {collection.name} with {collection.host}.
          </p>
          <p>Products shown are styled for photography and may vary.</p>
        </div>
      </div>
    </footer>
  );
}
