"use client";

import { motion, useReducedMotion } from "framer-motion";
import { duration, easeOutExpo } from "@/lib/motion";

/**
 * Route transition: content rises in on every navigation instead of an
 * instant cut. Entrance-only (App Router remounts templates per route),
 * fast enough to never feel like a loader.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.entrance, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}
