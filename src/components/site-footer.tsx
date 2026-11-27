import Link from "next/link";
import { CarysilLogo } from "@/components/carysil-logo";
import { FooterLockup } from "@/components/footer-lockup";
import { centres, collection } from "@/lib/campaign";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-cream pt-24 text-graphite lg:pt-32">
      <FooterLockup />

      <div className="mx-auto mt-20 grid max-w-7xl gap-12 border-t border-graphite/10 px-4 pt-14 pb-12 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1fr] lg:px-10">
        <div>
          <CarysilLogo markClass="h-5 md:h-6" className="items-start! text-red" />
          <p className="mt-8 max-w-xs text-[1.05rem] leading-relaxed text-graphite-soft">
            {site.campaign}. {collection.name} × {collection.host}.
          </p>
        </div>
        <div>
          <p className="eyebrow text-[0.62rem] text-graphite-soft">Explore</p>
          <ul className="mt-5 space-y-3 text-sm text-graphite/80">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-red">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-[0.62rem] text-graphite-soft">Experience centres</p>
          <ul className="mt-5 space-y-3 text-sm text-graphite/80">
            {centres.map((c) => (
              <li key={c.city}>
                <Link href="/#visit" className="transition-colors hover:text-red">
                  {c.city}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-[0.62rem] text-graphite-soft">Talk to us</p>
          <ul className="mt-5 space-y-3 text-sm text-graphite/80">
            <li>
              <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-red">
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="hover:text-red">
                {site.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-graphite/10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-4 py-6 text-xs text-graphite-soft sm:px-6 lg:px-10">
          <p>
            © {site.brand}. {collection.name} with {collection.host}.
          </p>
          <p>Products shown are styled for photography and may vary.</p>
        </div>
      </div>
    </footer>
  );
}
