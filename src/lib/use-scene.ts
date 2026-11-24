"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type SceneConditions = { desktop: boolean; fine: boolean };
type Setup = (root: HTMLElement, when: SceneConditions) => void | (() => void);

/**
 * Runs a component's GSAP scene inside a matchMedia context scoped to `ref`:
 * - skipped entirely when the visitor prefers reduced motion,
 * - rebuilt when the desktop / fine-pointer breakpoints flip,
 * - reverted on unmount, which also covers Next.js hiding a visited page (React Activity
 *   runs effect cleanups when a page is hidden and re-runs them when it is shown again).
 */
export function useScene(ref: RefObject<HTMLElement | null>, setup: Setup) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 1024px)",
        fine: "(hover: hover) and (pointer: fine)",
      },
      (ctx) => {
        const { motion, desktop, fine } = ctx.conditions as Record<string, boolean>;
        if (!motion) return;
        return setup(root, { desktop, fine });
      },
      root,
    );
    return () => mm.revert();
    // The setup closure is defined inline by each scene and only reads refs and props
    // that are fixed for the life of the component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode) => root.querySelector<T>(sel);
export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode) =>
  Array.from(root.querySelectorAll<T>(sel));
