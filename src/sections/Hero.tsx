"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import Magnetic from "@/components/ui/Magnetic";
import Shape3D from "@/components/ui/Shape3D";
import Telemetry from "@/components/Telemetry";
import { site } from "@/data/site";
import { duration, easeOutExpo } from "@/lib/motion";

const stats = [
  { value: "2+", label: "years in production" },
  { value: "3", label: "platforms shipped at scale" },
  { value: "1000s", label: "of daily users served" },
];

/** Headline words; the last two carry the accent. */
const words: { text: string; accent?: boolean }[] = [
  { text: "I" },
  { text: "build" },
  { text: "frontend" },
  { text: "systems" },
  { text: "that" },
  { text: "survive", accent: true },
  { text: "production.", accent: true },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  /** Entrance: y + blur-to-sharp on the expo curve, sequenced by delay. */
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24, filter: "blur(6px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: duration.large, delay, ease: easeOutExpo },
        };

  // Depth on exit: text and portrait leave at different speeds, and the
  // separation reverses when scrolling back up
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      aria-label="Intro"
    >
      <div className="relative mx-auto flex w-full max-w-content items-center gap-12 px-6 pb-24 pt-32 lg:px-8">
        <motion.div style={reduce ? undefined : { y: textY, opacity: fade }} className="min-w-0 flex-1">
          {/* Signature: live production telemetry — the thesis, rendered */}
          <motion.div {...enter(0)} className="mb-8">
            <Telemetry />
          </motion.div>

          {/* Headline enters word by word — mask + y-translate, 60ms stagger */}
          <h1 className="max-w-4xl text-balance text-[clamp(2.5rem,6.5vw,4.75rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                <motion.span
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: duration.large,
                    delay: 0.15 + i * 0.06,
                    ease: easeOutExpo,
                  }}
                  className={
                    "inline-block " +
                    (word.accent
                      ? "bg-gradient-to-r from-accent-strong to-accent bg-clip-text text-transparent"
                      : "")
                  }
                >
                  {word.text}
                </motion.span>
                {i < words.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </h1>

          <motion.p
            {...enter(0.5)}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl"
          >
            {site.subline}
          </motion.p>

          <motion.div {...enter(0.62)} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#work"
                className="group flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-base shadow-card transition-opacity duration-200 hover:opacity-85"
              >
                View my work
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Magnetic>
            <a
              href="#contact"
              className="rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:border-accent/60 hover:text-accent-strong"
            >
              Get in touch
            </a>
            <p className="hidden font-mono text-xs text-ink-faint lg:block">
              press <kbd className="rounded border border-line px-1.5 py-0.5">⌘K</kbd> to explore
            </p>
          </motion.div>

          <motion.dl
            {...enter(0.74)}
            className="mt-20 flex flex-wrap gap-x-14 gap-y-6 border-t border-line pt-8"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight text-ink tabular-nums md:text-4xl">
                  {s.value}
                </dd>
                <dd className="mt-1 text-sm text-ink-faint">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Portrait — counter-parallax to the text for depth; hidden below lg
            so the headline keeps the stage on small screens */}
        <motion.div {...enter(0.4)} className="hidden shrink-0 lg:block">
          <motion.div style={reduce ? undefined : { y: portraitY, opacity: fade }}>
            <div className="relative h-64 w-64 xl:h-72 xl:w-72">
              <div
                aria-hidden
                className="absolute -inset-6 rounded-full bg-accent/[0.10] blur-2xl"
              />
              {/* Tilted orbit ring — the one 3D accent this view gets */}
              <Shape3D
                variant="ring"
                size={340}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
              <Image
                src="/images/introImagea.jpg"
                alt="Portrait of Sangat Sharma"
                fill
                priority
                sizes="(min-width: 1280px) 288px, 256px"
                className="rounded-full border border-line-strong object-cover shadow-card saturate-[0.9]"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#work"
        aria-label="Scroll to work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-faint transition-colors hover:text-ink"
      >
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="block"
        >
          <ArrowDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}
