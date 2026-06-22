"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMouseParallax } from "@/hooks/useMousePosition";

interface FloatingElement {
  content: string;
  x: number;
  y: number;
  scrollSpeed: number;
  mouseSensitivity: number;
  className: string;
}

const elements: FloatingElement[] = [
  { content: "{ }", x: 5, y: 15, scrollSpeed: 30, mouseSensitivity: 15, className: "text-6xl font-mono text-primary/5" },
  { content: "</>", x: 85, y: 30, scrollSpeed: -20, mouseSensitivity: 10, className: "text-5xl font-mono text-accent/5" },
  { content: "const", x: 75, y: 65, scrollSpeed: 25, mouseSensitivity: 12, className: "text-2xl font-mono text-secondary/5" },
  { content: "=>", x: 10, y: 70, scrollSpeed: -35, mouseSensitivity: 8, className: "text-4xl font-mono text-primary/5" },
  { content: "npm i", x: 90, y: 80, scrollSpeed: 15, mouseSensitivity: 18, className: "text-lg font-mono text-green-500/5" },
  { content: "git push", x: 8, y: 45, scrollSpeed: -15, mouseSensitivity: 14, className: "text-lg font-mono text-orange-500/5" },
  { content: "./dir", x: 50, y: 10, scrollSpeed: 40, mouseSensitivity: 20, className: "text-xl font-mono text-blue-500/5" },
];

function FloatingElement({ el, index }: { el: FloatingElement; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], [el.scrollSpeed, -el.scrollSpeed]);
  const { x: mx, y: my } = useMouseParallax(el.mouseSensitivity);

  return (
    <div ref={ref} className="absolute" style={{ left: `${el.x}%`, top: `${el.y}%` }}>
      <motion.div style={{ y: scrollY, x: scrollY }}>
        <motion.div
          animate={{ x: mx, y: my }}
          transition={{ type: "spring", stiffness: 40, damping: 15 }}
        >
          <div className={el.className}>{el.content}</div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function ParallaxBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el, i) => (
        <FloatingElement key={i} el={el} index={i} />
      ))}
    </div>
  );
}
