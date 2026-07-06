"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { duration, easeOutExpo } from "@/lib/motion";

const STORAGE_KEY = "portfolio-preloaded";

/**
 * First-visit-only loading moment: a fast counter behind the site's own
 * tokens, gone in about a second. Session-gated so navigation and repeat
 * visits never see it; skipped entirely under reduced motion.
 */
export default function Preloader() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    window.sessionStorage.setItem(STORAGE_KEY, "1");

    let value = 0;
    let hide: ReturnType<typeof setTimeout>;
    const raf = requestAnimationFrame(() => setShow(true));
    const tick = setInterval(() => {
      value = Math.min(value + 14 + Math.random() * 16, 100);
      setProgress(Math.round(value));
      if (value >= 100) {
        clearInterval(tick);
        hide = setTimeout(() => setShow(false), 250);
      }
    }, 70);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(tick);
      clearTimeout(hide);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          exit={{
            opacity: 0,
            filter: "blur(6px)",
            transition: { duration: duration.entrance, ease: easeOutExpo },
          }}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-6 bg-base"
        >
          <p className="font-mono text-sm text-ink-muted">
            <span className="text-accent-strong">❯</span> mounting portfolio
          </p>
          <p className="font-mono text-4xl font-semibold tabular-nums text-ink">{progress}%</p>
          <div className="h-px w-40 bg-line">
            <div
              className="h-full w-full origin-left bg-accent-strong transition-transform duration-150 ease-out"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
