import { BbqBlueprint } from "@/components/bbq-blueprint";
import { DayGallery } from "@/components/day-gallery";
import { ExperienceCentres } from "@/components/experience-centres";
import { HeroPortal } from "@/components/hero-portal";
import { HostBanners } from "@/components/host-banners";
import { LightSwitcher } from "@/components/light-switcher";
import { Manifesto } from "@/components/manifesto";
import { PageMotion } from "@/components/page-motion";
import { ProductIndex } from "@/components/product-index";
import { ProductStage } from "@/components/product-stage";

/**
 * The Farmhouse Collection × Bobby Deol, top to bottom:
 *  1. HeroPortal         pencil drawing draws itself → develops into the photo →
 *                        camera pushes through the pergola into Bobby
 *  2. Manifesto          words come into focus; rounded photo opens; outlined band slides
 *  3. HostBanners        Ode-style banners open from the bottom; the host copy
 *  4. ProductStage       pinned dark stage: six pieces with glow, rings and callouts
 *  5. DayGallery         pinned sideways strip, first coffee to last light
 *  6. LightSwitcher      one kitchen in four lights, each opening out of a circle
 *  7. BbqBlueprint       Barbeque Station on a drafting grid; dimensions draw, figures count
 *  8. ProductIndex       Product List 2027 with MRPs, filtered with GSAP Flip
 *  9. ExperienceCentres  the five showrooms on red with the catalogue's zigzag lines
 */
export default function HomePage() {
  return (
    <div data-page>
      <HeroPortal />
      <Manifesto />
      <HostBanners />
      <ProductStage />
      <DayGallery />
      <LightSwitcher />
      <BbqBlueprint />
      <ProductIndex />
      <ExperienceCentres />
      <PageMotion />
    </div>
  );
}
