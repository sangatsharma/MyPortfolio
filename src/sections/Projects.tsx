"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import { useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";
import { projects, type Project } from "@/data/projects";

const featured = projects.filter((p) => p.featured);
const rest = projects.filter((p) => !p.featured);

/**
 * Featured work as a pinned deck: each case study holds the viewport,
 * then scales back and dims as the next one slides over it — the scroll
 * scrubs the whole exchange, so it plays in both directions. Remaining
 * builds follow as a compact index. Cards lead to full case studies.
 */
export default function Projects() {
  const reduce = useReducedMotion();
  const deckRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" className="section-pad scroll-mt-24">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <SectionHeading
          eyebrow={`Featured work · ${featured.length} case studies`}
          title="Software built for real users, real scale."
          description="Commercial platforms and personal builds — each one a full case study covering the problem, architecture, trade-offs and what I'd do differently."
        />
      </div>

      {reduce ? (
        <div className="mx-auto max-w-content space-y-8 px-6 lg:px-8">
          {featured.map((project, i) => (
            <DeckCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      ) : (
        /* Negative top margin closes the approach gap between the section
           heading and the first pinned card */
        <div ref={deckRef} className="-mt-10 sm:-mt-16">
          {featured.map((project, i) => (
            <StackedCard
              key={project.slug}
              project={project}
              index={i}
              total={featured.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      )}

      {/* The rest, as a dense index — the deck is the film, this is the credits */}
      <div className="mx-auto max-w-content px-6 pt-8 sm:pt-12 lg:px-8">
        <Reveal>
          <p className="mb-2 font-mono text-[13px] uppercase tracking-[0.2em] text-accent-strong">
            More builds
          </p>
        </Reveal>
        <ul>
          {rest.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i * 0.06}>
              <Link
                href={`/projects/${project.slug}`}
                className="group flex items-baseline gap-4 border-t border-line py-6 transition-colors hover:bg-white/[0.02] sm:gap-6"
              >
                <span className="font-mono text-[13px] text-ink-faint">{project.year}</span>
                <span className="min-w-0">
                  <span className="block text-lg font-medium text-ink transition-colors group-hover:text-accent-strong">
                    {project.name}
                  </span>
                  <span className="mt-0.5 block truncate text-base text-ink-muted">
                    {project.tagline}
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="ml-auto shrink-0 self-center text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-strong"
                />
              </Link>
            </Reveal>
          ))}
        </ul>
        <div className="border-t border-line" />
      </div>
    </section>
  );
}

/** One sticky viewport-height slot; the card inside recedes as the deck advances. */
function StackedCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Once this card's segment of the deck is past, it shrinks toward a
  // resting scale — deeper cards end smaller, giving the stack its depth
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  // Receding cards also fall into shadow so the active one owns the light
  const dim = useTransform(
    progress,
    [index / total, 1],
    [0, index === total - 1 ? 0 : 0.55],
  );

  return (
    <div className="sticky top-0 flex h-svh items-center justify-center px-4 sm:px-6">
      <motion.div
        style={{ scale, top: `calc(3svh + ${index * 22}px)` }}
        className="relative w-full max-w-6xl origin-top"
      >
        <DeckCard project={project} index={index} />
        <motion.div
          aria-hidden
          style={{ opacity: dim }}
          className="pointer-events-none absolute inset-0 rounded-3xl bg-base"
        />
      </motion.div>
    </div>
  );
}

/** The card itself — shared between the animated deck and the reduced-motion list. */
function DeckCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-white/[0.14] bg-[#101018]/70 shadow-pop backdrop-blur-xl">
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`${project.name} case study`}
        className="group grid min-h-[60svh] gap-8 p-8 sm:p-12 lg:min-h-[68svh] lg:grid-cols-[1.1fr_1fr] lg:gap-14"
      >
        <div className="flex min-w-0 flex-col">
          <div className="mb-7 flex items-baseline justify-between gap-4">
            {/* Deck position — the reading order of the case studies */}
            <span className="font-mono text-base text-ink-faint">
              {String(index + 1).padStart(2, "0")} <span className="text-line-strong">/</span>{" "}
              {project.kind} · {project.year}
            </span>
            <span className="flex items-center gap-3 text-ink-faint">
              {project.github && <Github size={17} aria-label="Has public repository" />}
              {project.live && <Globe size={17} aria-label="Has live demo" />}
            </span>
          </div>

          <h3 className="text-4xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent-strong sm:text-5xl">
            {project.name}
          </h3>
          <p className="mt-4 text-xl leading-relaxed text-ink-muted">{project.tagline}</p>

          <ul className="mt-7 hidden space-y-3 sm:block">
            {project.features.slice(0, 3).map((f) => (
              <li key={f} className="flex gap-3 text-lg leading-relaxed text-ink-muted">
                <span aria-hidden className="mt-[13px] h-px w-3 shrink-0 bg-accent/60" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-10">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-md border border-line px-2.5 py-1.5 font-mono text-xs text-ink-faint"
              >
                {t}
              </span>
            ))}
            <span className="ml-auto flex items-center gap-1.5 text-base font-medium text-accent-strong">
              Case study
              <ArrowUpRight
                size={17}
                className="transition-transform duration-200 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>

        {project.image ? (
          <div className="relative hidden overflow-hidden rounded-xl border border-line lg:block">
            {/* Screenshot drifts inside its frame with scroll; bleed absorbs the travel */}
            <Parallax offset={14} className="absolute -inset-y-5 inset-x-0">
              <Image
                src={project.image}
                alt={`${project.name} screenshot`}
                fill
                sizes="(min-width: 1024px) 40vw, 0px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </Parallax>
          </div>
        ) : (
          /* No screenshot (client work) — the architecture is the picture */
          <div className="hidden flex-col justify-center rounded-xl border border-line bg-white/[0.03] p-8 lg:flex">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">
              System shape
            </p>
            <ul className="space-y-4">
              {project.architecture.slice(0, 4).map((a) => (
                <li key={a} className="flex gap-3 font-mono text-sm leading-relaxed text-ink-muted">
                  <span aria-hidden className="text-accent-strong">▸</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Link>
    </article>
  );
}
