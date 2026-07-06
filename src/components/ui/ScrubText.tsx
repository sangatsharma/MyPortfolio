"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

interface ScrubTextProps {
  text: string;
  className?: string;
}

/**
 * Text that comes into focus word by word, scrubbed by scroll position —
 * the reveal tracks reading pace and plays backward when scrolling up.
 * Words are always legible (dimmed, never hidden); reduced motion
 * renders the text at full strength with no scroll binding.
 */
export default function ScrubText({ text, className }: ScrubTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // Starts as the block enters the lower third, finishes past center —
    // the reveal stays just ahead of the reader's eye
    offset: ["start 0.9", "start 0.35"],
  });

  const words = text.split(" ");

  if (reduce) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className="inline">
        {children}
      </motion.span>{" "}
    </>
  );
}
