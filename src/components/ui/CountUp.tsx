"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { easeOutExpo } from "@/lib/motion";

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  /** Locale-format the number (1,024) — for large values. */
  format?: boolean;
  duration?: number;
  className?: string;
}

/**
 * Number that counts up from zero when it scrolls into view.
 * Server-renders the final value so no-JS and SEO see real numbers;
 * the count runs once as an enhancement. Static under reduced motion.
 */
export default function CountUp({
  to,
  prefix = "",
  suffix = "",
  format = false,
  duration = 1.4,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: easeOutExpo,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format ? value.toLocaleString() : value}
      {suffix}
    </span>
  );
}
