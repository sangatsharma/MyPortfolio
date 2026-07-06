"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * 2px reading-progress bar under the navbar — orientation for a long
 * single-page layout without a visual footprint.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent-strong/80"
    />
  );
}
