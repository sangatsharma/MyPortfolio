"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Check, Copy, Download, Mail } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import Parallax from "@/components/ui/Parallax";
import Shape3D from "@/components/ui/Shape3D";
import { site } from "@/data/site";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // The close arrives cinematically: headline scales and sharpens into
  // place as the section fills the viewport — scrubbed, so it plays in
  // both directions rather than firing once
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.25"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the mailto link remains as fallback
    }
  };

  return (
    <section ref={ref} id="contact" className="section-pad relative scroll-mt-24 overflow-hidden border-t border-line">
      {/* Second ambient light source — anchors the closing CTA */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[28rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.07] blur-3xl"
      />
      {/* Orbit ring behind the closing headline — echoes the hero's */}
      <Parallax
        offset={30}
        className="pointer-events-none absolute left-1/2 top-16 hidden -translate-x-1/2 md:block"
      >
        <Shape3D variant="ring" size={260} />
      </Parallax>
      <div className="relative mx-auto max-w-content px-6 text-center lg:px-8">
        <motion.div style={reduce ? undefined : { scale, opacity, y }}>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent-strong">
            Contact · replies within a day
          </p>
          <h2 className="mx-auto max-w-3xl text-balance text-4xl font-semibold tracking-tight text-ink md:text-6xl">
            Let&apos;s build something that outlasts the demo.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
            {site.availability}. Whether it&apos;s a senior frontend role, a product that needs
            shipping, or an architecture that needs untangling — my inbox is open.
          </p>
        </motion.div>

        <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-base transition-opacity hover:opacity-85"
            >
              <Mail size={16} />
              {site.email}
            </a>
          </Magnetic>
          <button
            onClick={copyEmail}
            className="flex items-center gap-2 rounded-full border border-line-strong px-5 py-3.5 text-sm text-ink transition-colors hover:border-accent/50 hover:text-accent-strong"
            aria-live="polite"
          >
            {copied ? <Check size={15} className="text-accent-strong" /> : <Copy size={15} />}
            {copied ? "Copied" : "Copy email"}
          </button>
          <a
            href={site.resume}
            download
            className="flex items-center gap-2 rounded-full border border-line-strong px-5 py-3.5 text-sm text-ink transition-colors hover:border-accent/50 hover:text-accent-strong"
          >
            <Download size={15} />
            Resume
          </a>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-12 font-mono text-xs text-ink-faint">{site.location}</p>
        </Reveal>
      </div>
    </section>
  );
}
