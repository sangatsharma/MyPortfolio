"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Tilt from "@/components/ui/Tilt";
import Parallax from "@/components/ui/Parallax";
import Reveal from "@/components/ui/Reveal";
import Shape3D from "@/components/ui/Shape3D";
import { projects } from "@/data/projects";
import { duration, easeOutExpo, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const filters = ["All", "SaaS", "Real-time", "Full-stack", "Architecture", "AI"] as const;

/**
 * Featured work grid with domain filtering. Cards lead to full case
 * studies — the grid sells the click, the case study earns the trust.
 */
export default function Projects() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const visible = useMemo(
    () => projects.filter((p) => filter === "All" || p.domains.includes(filter)),
    [filter],
  );

  return (
    <section id="work" className="section-pad relative scroll-mt-24">
      {/* Depth accent drifting against scroll in the section's top-right corner */}
      <Parallax
        offset={40}
        className="pointer-events-none absolute right-[8%] top-24 hidden lg:block"
      >
        <Shape3D variant="cube" size={56} />
      </Parallax>
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <SectionHeading
          eyebrow={`Featured work · ${projects.length} case studies`}
          title="Software built for real users, real scale."
          description="Commercial platforms and personal builds — each one a full case study covering the problem, architecture, trade-offs and what I'd do differently."
        />

        <Reveal className="mb-10 flex flex-wrap gap-2" delay={0.1}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                filter === f
                  ? "border-accent/50 bg-accent-soft text-accent-strong"
                  : "border-line text-ink-muted hover:border-line-strong hover:text-ink",
              )}
            >
              {f}
            </button>
          ))}
        </Reveal>

        <motion.ul layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.li
                layout
                key={project.slug}
                initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{
                  opacity: 0,
                  scale: 0.97,
                  transition: { duration: duration.standard, ease: "easeIn" },
                }}
                // i % 2: left column leads its row; a flat i * stagger would
                // grow the delay unbounded down the grid
                transition={{
                  duration: duration.entrance,
                  ease: easeOutExpo,
                  delay: (i % 2) * stagger * 2,
                }}
              >
                <Tilt className="h-full">
                  <SpotlightCard className="h-full">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex h-full flex-col p-7"
                    aria-label={`${project.name} case study`}
                  >
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                          {project.kind} · {project.year}
                        </p>
                        <h3 className="text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent-strong">
                          {project.name}
                        </h3>
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="mt-1 shrink-0 text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-strong"
                      />
                    </div>

                    <p className="mb-6 text-base leading-relaxed text-ink-muted">{project.tagline}</p>

                    {project.image && (
                      <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-lg border border-line">
                        {/* Image drifts inside its frame with scroll; bleed absorbs the travel */}
                        <Parallax offset={12} className="absolute -inset-y-4 inset-x-0">
                          <Image
                            src={project.image}
                            alt={`${project.name} screenshot`}
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </Parallax>
                      </div>
                    )}

                    <div className="mt-auto flex flex-wrap items-center gap-2">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-line px-2 py-1 font-mono text-[11px] text-ink-faint"
                        >
                          {t}
                        </span>
                      ))}
                      <span className="ml-auto flex items-center gap-3 text-ink-faint">
                        {project.github && <Github size={14} aria-label="Has public repository" />}
                        {project.live && <Globe size={14} aria-label="Has live demo" />}
                      </span>
                    </div>
                  </Link>
                  </SpotlightCard>
                </Tilt>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
