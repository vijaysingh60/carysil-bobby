import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { IntroCurtain } from "@/components/intro-curtain";
import { RevealObserver } from "@/components/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.campaign} with ${site.ambassador.name} | ${site.brand}`,
    template: `%s | ${site.campaign}`,
  },
  description: `${site.tagline} ${site.description}`,
  openGraph: {
    type: "website",
    siteName: `${site.brand}: ${site.campaign}`,
    images: [
      { url: photos.ambassadorFence.src, width: photos.ambassadorFence.width, height: photos.ambassadorFence.height },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#990011",
  colorScheme: "dark",
};

/**
 * Runs before first paint:
 * - .js lets CSS hide scroll-reveal elements only when JS can reveal them again.
 * - .intro-seen skips the red intro curtain after the first page view this session.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('cl-intro'))d.classList.add('intro-seen');else sessionStorage.setItem('cl-intro','1')}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-dvh">
        <IntroCurtain />
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-cream px-4 py-2 text-red focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealObserver />
        <SmoothScroll />
      </body>
    </html>
  );
}
