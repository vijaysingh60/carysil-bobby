import { BbqBlueprint } from "@/components/bbq-blueprint";
import { DayGallery } from "@/components/day-gallery";
import { ExperienceCentres } from "@/components/experience-centres";
import { Hero } from "@/components/hero";
import { HostBanners } from "@/components/host-banners";
import { LightSwitcher } from "@/components/light-switcher";
import { Manifesto } from "@/components/manifesto";
import { PageMotion } from "@/components/page-motion";
import { ProductIndex } from "@/components/product-index";
import { ProductStage } from "@/components/product-stage";

/**
 * Live the Carysil Life: The Farmhouse Collection × Bobby Deol, top to bottom.
 * The manifesto comes second, then the products:
 *  1. Hero               Bobby full bleed; the photo settles, the lockup signs itself,
 *                        the copy rises; on scroll the photo sinks and the copy lifts
 *  2. Manifesto          words come into focus; rounded photo opens; outlined band slides
 *  3. ProductStage       pinned white stage: six pieces with glow, rings and callouts
 *  4. ProductIndex       Product List 2027, filtered with GSAP Flip
 *  5. HostBanners        Ode-style banners open from the bottom; the host copy
 *  6. DayGallery         pinned sideways strip, first coffee to last light
 *  7. LightSwitcher      one kitchen in four lights, each opening out of a circle
 *  8. BbqBlueprint       Barbeque Station on a drafting grid; dimensions draw, figures count
 *  9. ExperienceCentres  the five showrooms on red with the catalogue's zigzag lines
 */
export default function HomePage() {
  return (
    <div data-page>
      <Hero />
      <Manifesto />
      <ProductStage />
      <ProductIndex />
      <HostBanners />
      <DayGallery />
      <LightSwitcher />
      <BbqBlueprint />
      <ExperienceCentres />
      <PageMotion />
    </div>
  );
}
