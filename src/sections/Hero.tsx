import { motion, useReducedMotion } from "framer-motion";
import HeroVisual from "../three/HeroVisual";
import { MaskText } from "../components/Reveal";
import { profile } from "../data/resume";
import { scrollToId } from "../lib/lenisRef";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 text-center"
    >
      {/* 3D centerpiece sits behind the type */}
      <HeroVisual />

      {/* Availability pill */}
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        className="glass relative z-10 mb-8 flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-wide"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
        </span>
        Frontend Developer · {profile.location}
      </motion.div>

      {/* Headline */}
      <h1 className="display relative z-10 text-[clamp(2.75rem,11vw,9rem)]">
        <MaskText lines={profile.statement[0]} trigger="mount" delay={0.35} />
        <MaskText
          lines={profile.statement[1]}
          lineClassName="text-gradient"
          trigger="mount"
          delay={0.47}
        />
        <MaskText lines={profile.statement[2]} trigger="mount" delay={0.59} />
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.7 }}
        className="relative z-10 mt-8 max-w-xl text-balance text-sm leading-relaxed text-muted md:text-base"
      >
        {profile.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
        className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <button
          onClick={() => scrollToId("projects")}
          data-cursor
          className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-[var(--bg)] transition-transform hover:scale-[1.03]"
        >
          View selected work
        </button>
        <button
          onClick={() => scrollToId("contact")}
          data-cursor
          className="rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:bg-white/10"
        >
          Get in touch
        </button>
      </motion.div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[0.65rem] tracking-[0.3em] text-muted">SCROLL</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-line pt-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full bg-ink"
            style={{ animation: "scrollHint 1.8s ease-in-out infinite" }}
          />
        </span>
      </div>
    </section>
  );
}
