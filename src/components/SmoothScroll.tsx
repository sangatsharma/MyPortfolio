import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { scrollSignal } from "../lib/scrollSignal";
import { setLenis } from "../lib/lenisRef";
import { usePrefersReducedMotion } from "../lib/useReducedMotion";

/**
 * Drives the whole page's smooth scroll with Lenis, synced to GSAP's ScrollTrigger
 * so scroll-driven timelines stay in lockstep with the eased scroll position.
 * Also publishes progress/velocity to the render-free scrollSignal for the WebGL scene.
 * Disabled entirely under prefers-reduced-motion (native scroll, no easing).
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ({ scroll, limit, velocity }: { scroll: number; limit: number; velocity: number }) => {
      scrollSignal.progress = limit > 0 ? scroll / limit : 0;
      scrollSignal.velocity = velocity;
      ScrollTrigger.update();
    });

    setLenis(lenis);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduced]);

  return <>{children}</>;
}
