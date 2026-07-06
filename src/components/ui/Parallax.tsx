"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

interface ParallaxProps {
  children: ReactNode;
  /** Max translation in px; element travels +offset → −offset while crossing the viewport. */
  offset?: number;
  className?: string;
}

/**
 * Scroll-position-bound parallax: motion is a pure function of where the
 * element sits in the viewport, so it plays forward and backward with
 * scroll direction. Used for depth on images and floating elements.
 */
export default function Parallax({ children, offset = 24, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}
