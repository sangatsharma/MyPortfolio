"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useEffect } from "react";

/**
 * Focus-orb waypoints: where the reader's attention should be at each
 * point of the page, as (progress, x vw from center, y vh from top).
 * Repeated positions create dwells — the orb rests on the content,
 * then steps to the next stop. Tuned to the home page's section order:
 * hero text → project deck → timeline → manifesto → principle cards →
 * stack → github → closing CTA.
 */
const FOCUS = {
  at: [0, 0.05, 0.1, 0.36, 0.44, 0.52, 0.58, 0.63, 0.68, 0.76, 0.84, 0.9, 1],
  x: [-16, -16, 0, 0, -18, -18, -10, 10, 0, -4, 0, 0, 0],
  y: [42, 42, 50, 50, 46, 46, 36, 48, 46, 44, 46, 46, 48],
};

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
  // Focus orb: steps between content waypoints and settles on a spring,
  // so the brightest light always sits where the reader should be looking
  const focusX = useSpring(useTransform(scrollYProgress, FOCUS.at, FOCUS.x), {
    stiffness: 50,
    damping: 18,
  });
  const focusY = useSpring(useTransform(scrollYProgress, FOCUS.at, FOCUS.y), {
    stiffness: 50,
    damping: 18,
  });
  const focusTransform = useMotionTemplate`translate3d(calc(${focusX}vw - 50%), calc(${focusY}vh - 50%), 0)`;

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
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        {wash}
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_55%_at_50%_25%,black,transparent)]" />
        <div className="absolute left-[12%] top-[-8%] h-[34rem] w-[34rem] rounded-full bg-accent/[0.08] blur-3xl" />
      </div>
    );
  }

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
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
          <div className="h-full w-full animate-aurora-a rounded-full bg-accent/[0.12] blur-3xl" />
        </motion.div>
        <motion.div
          style={{ x: bX, y: bY, scale: glowScale }}
          className="absolute bottom-[-16%] right-[4%] h-[30rem] w-[30rem]"
        >
          <div className="h-full w-full animate-aurora-b rounded-full bg-[#7b5bd6]/[0.09] blur-3xl" />
        </motion.div>
        {/* Focus orb — three nested layers give it a bright readable core
            with soft falloff, noticeably lighter than the ambient glows */}
        <motion.div style={{ transform: focusTransform }} className="absolute left-1/2 top-0">
          <motion.div style={{ scale: glowScale }} className="relative h-[34rem] w-[34rem]">
            {/* Tinted toward the page base so the glow sits in the dark
                instead of on top of it */}
            <div className="absolute inset-0 rounded-full bg-[#2c2c6e]/[0.13] blur-3xl" />
            <div className="absolute inset-[20%] rounded-full bg-accent/[0.12] blur-2xl" />
            <div className="absolute inset-[38%] rounded-full bg-[#6f6fd8]/[0.06] blur-xl" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
