import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Section from "../components/Section";
import { Reveal } from "../components/Reveal";
import { projects } from "../data/resume";

// Each project gets a distinct generative gradient as its visual metaphor.
const gradients = [
  "linear-gradient(135deg,#7c5cff,#18c8ff)",
  "linear-gradient(135deg,#ff5cc8,#7c5cff)",
  "linear-gradient(135deg,#18c8ff,#5cff9d)",
];

export default function Projects() {
  const [open, setOpen] = useState<number | null>(0);
  const [hover, setHover] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Floating gradient preview tracks the cursor over the project list (desktop only).
  const onMove = (e: React.MouseEvent) => {
    if (reduced || !previewRef.current) return;
    previewRef.current.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 90}px)`;
  };

  return (
    <Section id="projects" index="04" eyebrow="Selected Work">
      <Reveal className="mb-12 max-w-2xl">
        <h2 className="display text-[clamp(2rem,5vw,3.4rem)]">
          Products people <span className="text-gradient">actually use</span>.
        </h2>
      </Reveal>

      <div onMouseMove={onMove} className="border-t border-line">
        {projects.map((p, i) => {
          const isOpen = open === i;
          return (
            <div key={p.name} className="border-b border-line">
              <button
                data-cursor
                onClick={() => setOpen(isOpen ? null : i)}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="group flex w-full items-center justify-between gap-4 py-6 text-left md:py-8"
              >
                <div className="flex items-baseline gap-4 md:gap-8">
                  <span className="text-xs text-muted">0{i + 1}</span>
                  <span className="display text-[clamp(1.6rem,5vw,3.2rem)] text-muted transition-colors duration-300 group-hover:text-ink">
                    {p.name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden text-xs text-muted sm:block">{p.kind}</span>
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-full border border-line transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-white/10" : ""
                    }`}
                  >
                    +
                  </span>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 pb-10 md:grid-cols-[1fr_1.4fr]">
                      <div
                        className="relative h-44 overflow-hidden rounded-2xl md:h-full"
                        style={{ background: gradients[i % gradients.length] }}
                      >
                        <span className="absolute bottom-4 left-4 rounded-full bg-black/30 px-3 py-1 text-xs font-medium backdrop-blur">
                          {p.metaphor}
                        </span>
                      </div>
                      <div>
                        <p className="text-balance text-base text-ink/90">{p.blurb}</p>
                        <ul className="mt-4 space-y-2 text-sm text-muted">
                          {p.highlights.map((h) => (
                            <li key={h} className="flex gap-2">
                              <span className="text-accent-2">—</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {p.stack.map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Cursor-following preview */}
      {!reduced && (
        <div
          ref={previewRef}
          className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
          style={{ willChange: "transform" }}
        >
          <AnimatePresence>
            {hover !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                className="h-28 w-44 rounded-xl border border-white/20 shadow-2xl"
                style={{ background: gradients[hover % gradients.length] }}
              >
                <span className="absolute bottom-2 left-3 text-xs font-semibold text-white/90">
                  {projects[hover].metaphor}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </Section>
  );
}
