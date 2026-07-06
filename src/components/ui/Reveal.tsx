"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { duration, easeOutExpo } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  /** Seconds to wait before animating — used for stagger between siblings. */
  delay?: number;
  className?: string;
  /** Render as a different element for semantics (default div). */
  as?: "div" | "section" | "li" | "span";
  y?: number;
}

/**
 * Scroll-triggered entrance: y-translate + blur-to-sharp on an expo curve,
 * so content settles into focus as the reader reaches it. Animates once.
 * Reduced motion: rendered in place, no animation.
 */
export default function Reveal({ children, delay = 0, className, as = "div", y = 24 }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -40px 0px" }}
      transition={{ duration: duration.large, delay, ease: easeOutExpo }}
      className={className}
    >
      {children}
    </Tag>
  );
}
