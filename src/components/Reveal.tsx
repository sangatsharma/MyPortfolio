import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Directional reveal: element slides + fades in once when it enters the viewport.
 * Honors reduced-motion by collapsing to a simple opacity fade with no transform.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  x = 0,
  once = true,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  once?: boolean;
  as?: keyof typeof motion;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y, x: reduced ? 0 : x },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.9, ease: EASE, delay },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Mask reveal for headings: each line is clipped by an overflow-hidden wrapper and
 * the inner line is translated up from below — the classic editorial "wipe up".
 * Pass an array of strings (one per line) or a single string.
 */
export function MaskText({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.12,
  trigger = "inView",
}: {
  lines: string | string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** "mount" for above-the-fold headlines, "inView" for scroll-triggered ones. */
  trigger?: "mount" | "inView";
}) {
  const reduced = useReducedMotion();
  const arr = Array.isArray(lines) ? lines : [lines];
  const shown = { y: 0, opacity: 1 };
  // On mount we animate immediately; in-view we wait for the viewport.
  const animateProps =
    trigger === "mount"
      ? { animate: shown }
      : { whileInView: shown, viewport: { once: true, margin: "-10% 0px" } };

  return (
    <span className={className}>
      {arr.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em]">
          <motion.span
            className={"block " + (lineClassName ?? "")}
            initial={{ y: reduced ? 0 : "110%", opacity: reduced ? 0 : 1 }}
            {...animateProps}
            transition={{ duration: 1, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
