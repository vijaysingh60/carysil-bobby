import type { Metadata, Viewport } from "next";
import { Archivo, Barlow } from "next/font/google";
import { Cursor } from "@/components/cursor";
import { IntroSignature } from "@/components/intro-signature";
import { RevealObserver } from "@/components/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { farm } from "@/lib/media";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * Same type pairing as carysil.com: Archivo and Barlow. Barlow light in caps (.title)
 * carries the Sternhagen-style headings; Archivo keeps its width axis for the promo page.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.collection} × ${site.ambassador.name} | ${site.campaign}`,
    template: `%s | ${site.campaign}`,
  },
  description: `${site.tagline} ${site.description}`,
  openGraph: {
    type: "website",
    siteName: `${site.brand}: ${site.campaign}`,
    images: [{ url: farm.bobbyFence.src, width: farm.bobbyFence.width, height: farm.bobbyFence.height }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0f0d0b",
  colorScheme: "dark",
};

/**
 * Runs before first paint:
 * - .js lets CSS hide scroll-reveal elements only when JS can reveal them again.
 * - .motion-ok marks a visitor who hasn't asked for reduced motion, so the scroll scenes
 *   (hero, product stage, day gallery) can lay themselves out before React hydrates.
 * - .intro-seen skips the signature intro after the first page view this session.
 * - Manual scroll restoration: the pinned scenes are scrubbed to the scroll position, so a
 *   reload starts at the top instead of being restored halfway through a scene.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{history.scrollRestoration='manual'}catch(e){}try{if(matchMedia('(prefers-reduced-motion: no-preference)').matches)d.classList.add('motion-ok')}catch(e){}try{if(sessionStorage.getItem('cl-intro'))d.classList.add('intro-seen');else sessionStorage.setItem('cl-intro','1')}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${barlow.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-dvh">
        <IntroSignature />
        <a
          href="#main"
          className="sr-only z-[60] bg-cream px-4 py-2 text-red focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealObserver />
        <SmoothScroll />
        <Cursor />
      </body>
    </html>
  );
}
