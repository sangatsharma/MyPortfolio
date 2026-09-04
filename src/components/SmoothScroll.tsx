"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerLenis } from "@/lib/scroll";

/**
 * Lenis smooth scrolling, mounted once at the root. The instance is
 * registered globally so app-triggered scrolling goes through Lenis
 * instead of fighting it with native smooth scrolling.
 * Disabled automatically for users preferring reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.12, anchors: true });
    registerLenis(lenis);
    let raf: number;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
