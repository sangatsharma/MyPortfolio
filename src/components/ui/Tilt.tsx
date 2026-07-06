"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { useRef } from "react";
import { springFeedback } from "@/lib/motion";

/**
 * Subtle 3D tilt (max ~5°), spring-damped. Gives cards physical presence
 * on pointer devices; renders inert on touch and under reduced motion.
 */
export default function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Tilt only makes sense with a hover-capable fine pointer; checked once,
  // lazily, since matchMedia isn't available during SSR
  const fine = useRef<boolean | null>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, springFeedback);
  const sry = useSpring(ry, springFeedback);

  const onMove = (e: MouseEvent) => {
    fine.current ??= window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine.current || reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(py * -5);
    ry.set(px * 5);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
