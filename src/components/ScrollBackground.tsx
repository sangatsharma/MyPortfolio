"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useEffect } from "react";

/**
 * Global living background, fixed behind all content.
 *
 * A static gradient wash keeps the page from ever reading as flat black,
 * even before any motion kicks in. On top of it, four reactive inputs:
 * - scroll position: the grid drifts and two aurora glows wander in
 *   opposite directions — bound to position, so motion reverses with
 *   scroll direction
 * - scroll progress: a third "core" glow and a slow conic mesh sweep
 *   fade in around the middle of the page, then recede near the footer
 * - scroll velocity: glows swell slightly while scrolling, settle at rest
 * - pointer: the whole light field leans gently toward the cursor
 * Transform/opacity-only (no layout/paint), static under reduced motion.
 */
export default function ScrollBackground() {
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();

  // Grid loops every cell (64px) so it drifts forever without drifting away
  const gridY = useTransform(scrollY, (v) => -((v * 0.08) % 64));

  // Glow A: top-left, wanders right and down the page
  const aX = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 140, -60, 100]);
  const aY = useTransform(scrollYProgress, [0, 1], [0, 560]);
  // Glow B: bottom-right, counters A for parallax depth
  const bX = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, -160, 40, -120]);
  const bY = useTransform(scrollYProgress, [0, 1], [0, -480]);
  // Glow C: a brighter core that only reveals itself mid-page, giving the
  // middle of the scroll its own moment instead of a uniform wash
  const cOpacity = useTransform(scrollYProgress, [0, 0.35, 0.6, 0.85, 1], [0, 0.8, 1, 0.8, 0]);
  const cX = useTransform(scrollYProgress, [0, 1], [-40, 60]);

  // Velocity breathing — spring-smoothed so it eases in and out
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { stiffness: 80, damping: 30 });
  const glowScale = useTransform(smoothVelocity, [-1600, 0, 1600], [1.14, 1, 1.14]);

  // Mesh sweep visibility — subtle everywhere, a touch stronger past the hero
  const meshOpacity = useTransform(scrollYProgress, [0, 0.15, 1], [0.5, 1, 0.7]);

  // Pointer lean
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 20 });
  const smy = useSpring(my, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 40);
      my.set((e.clientY / window.innerHeight - 0.5) * 28);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  // Layered radial gradients — the non-negotiable base tone. Present even
  // under reduced motion so the page never reads as flat black.
  const wash = (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(91,91,214,0.14), transparent 60%), " +
          "radial-gradient(ellipse 70% 50% at 100% 20%, rgba(123,91,214,0.08), transparent 60%), " +
          "radial-gradient(ellipse 80% 60% at 0% 100%, rgba(91,91,214,0.07), transparent 65%)",
      }}
    />
  );

  if (reduce) {
    return (
      <div aria-hidden className="fixed inset-0 -z-10">
        {wash}
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_55%_at_50%_25%,black,transparent)]" />
        <div className="absolute left-[12%] top-[-8%] h-[34rem] w-[34rem] rounded-full bg-accent/[0.08] blur-3xl" />
      </div>
    );
  }

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      {wash}

      {/* Slow-rotating conic mesh — a living gradient sweep behind everything */}
      <motion.div
        style={{ opacity: meshOpacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="h-[140vmax] w-[140vmax] animate-mesh-spin blur-[110px]"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 45%, rgba(91,91,214,0.10), transparent 22%, transparent 45%, rgba(123,91,214,0.08), transparent 68%, transparent 88%, rgba(91,91,214,0.10))",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: gridY }}
        className="absolute -inset-y-16 inset-x-0 bg-grid [mask-image:radial-gradient(ellipse_80%_55%_at_50%_25%,black,transparent)]"
      />
      <motion.div style={{ x: smx, y: smy }} className="absolute inset-0">
        <motion.div
          style={{ x: aX, y: aY, scale: glowScale }}
          className="absolute left-[8%] top-[-10%] h-[36rem] w-[36rem]"
        >
          <div className="h-full w-full animate-aurora-a rounded-full bg-accent/[0.11] blur-3xl" />
        </motion.div>
        <motion.div
          style={{ x: bX, y: bY, scale: glowScale }}
          className="absolute bottom-[-16%] right-[4%] h-[30rem] w-[30rem]"
        >
          <div className="h-full w-full animate-aurora-b rounded-full bg-[#7b5bd6]/[0.08] blur-3xl" />
        </motion.div>
        <motion.div
          style={{ x: cX, opacity: cOpacity, scale: glowScale }}
          className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="h-full w-full rounded-full bg-accent-strong/[0.07] blur-3xl" />
        </motion.div>
      </motion.div>
    </div>
  );
}
