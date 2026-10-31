"use client";

import Image from "next/image";
import { useInView, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ScreenshotsProps {
  images: string[];
  alt: string;
  sizes: string;
  /** Prev/next arrows and clickable dots. Off inside a card that is itself a link. */
  controls?: boolean;
  priority?: boolean;
  intervalMs?: number;
}

/**
 * Crossfading screenshot slideshow. Slides are stacked and only opacity
 * changes, so there is no overlay left behind to swallow clicks. It only
 * advances while on screen and not hovered, and holds still for
 * reduced motion.
 */
export default function Screenshots({
  images,
  alt,
  sizes,
  controls = false,
  priority = false,
  intervalMs = 4000,
}: ScreenshotsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  useEffect(() => {
    if (count < 2 || reduce || paused || !inView) return;
    const id = setInterval(() => setActive((i) => (i + 1) % count), intervalMs);
    return () => clearInterval(id);
  }, [count, reduce, paused, inView, intervalMs]);

  const go = (i: number) => setActive((i + count) % count);

  return (
    <div
      ref={ref}
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${alt} ${i + 1} of ${count}`}
          fill
          sizes={sizes}
          priority={priority && i === 0}
          aria-hidden={i !== active}
          className={`object-cover object-top transition-opacity duration-700 ease-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {count > 1 && (
        <>
          {/* Bottom scrim keeps the dots legible on light screenshots */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {images.map((src, i) =>
              controls ? (
                <button
                  key={src}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show screenshot ${i + 1}`}
                  aria-current={i === active}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ) : (
                <span
                  key={src}
                  aria-hidden
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ),
            )}
          </div>

          {controls && (
            <>
              <button
                type="button"
                onClick={() => go(active - 1)}
                aria-label="Previous screenshot"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-2 text-white backdrop-blur transition-colors hover:bg-black/60"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => go(active + 1)}
                aria-label="Next screenshot"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-2 text-white backdrop-blur transition-colors hover:bg-black/60"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
