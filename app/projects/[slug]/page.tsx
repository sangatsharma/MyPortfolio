import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github, Globe } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";
import { getProject, projects } from "@/data/projects";
import { site } from "@/data/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
    openGraph: {
      title: `${project.name} · ${site.name}`,
      description: project.tagline,
      type: "article",
    },
  };
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" className="border-t border-line py-12">
      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <h2 className="font-mono text-[13px] uppercase tracking-[0.2em] text-accent-strong">
          {label}
        </h2>
        <div className="max-w-2xl text-lg">{children}</div>
      </div>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="mx-auto max-w-content px-6 pb-24 pt-32 lg:px-8">
      <Reveal>
        <Link
          href="/#work"
          className="mb-12 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={15} /> All work
        </Link>

        <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
          {project.kind} · {project.year}
        </p>
        <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          {project.name}
        </h1>
        <p className="mt-4 max-w-2xl text-xl leading-relaxed text-ink-muted">{project.tagline}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-base transition-opacity hover:opacity-85"
            >
              <Globe size={15} /> Live demo <ArrowUpRight size={14} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent/50 hover:text-accent-strong"
            >
              <Github size={15} /> Source
            </a>
          )}
          {!project.live && !project.github && (
            <p className="font-mono text-xs text-ink-faint">
              Commercial product · private codebase
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-ink-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </Reveal>

      {project.image && (
        <Reveal className="mt-14">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line shadow-card">
            <Parallax offset={28} className="absolute -inset-y-10 inset-x-0">
              <Image
                src={project.image}
                alt={`${project.name} screenshot`}
                fill
                priority
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover object-top"
              />
            </Parallax>
          </div>
        </Reveal>
      )}

      <div className="mt-16">
        <Block label="Overview">
          <p className="leading-relaxed text-ink-muted">{project.overview}</p>
        </Block>

        <Block label="The Problem">
          <p className="leading-relaxed text-ink-muted">{project.problem}</p>
        </Block>

        <Block label="The Solution">
          <p className="leading-relaxed text-ink-muted">{project.solution}</p>
        </Block>

        <Block label="Architecture">
          <ul className="space-y-3">
            {project.architecture.map((a) => (
              <li key={a} className="flex gap-3 leading-relaxed text-ink-muted">
                <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-accent/60" />
                {a}
              </li>
            ))}
          </ul>
        </Block>

        <Block label="Key Features">
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {project.features.map((f) => (
              <li
                key={f}
                className="rounded-lg border border-line bg-base-soft px-4 py-3 text-base leading-relaxed text-ink-muted"
              >
                {f}
              </li>
            ))}
          </ul>
        </Block>

        <Block label="Challenges">
          <div className="space-y-6">
            {project.challenges.map((c) => (
              <div key={c.title}>
                <h3 className="mb-1.5 text-xl font-medium text-ink">{c.title}</h3>
                <p className="text-base leading-relaxed text-ink-muted">{c.detail}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block label="Performance">
          <ul className="space-y-3">
            {project.performance.map((p) => (
              <li key={p} className="flex gap-3 leading-relaxed text-ink-muted">
                <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-accent/60" />
                {p}
              </li>
            ))}
          </ul>
        </Block>

        <Block label="Lessons Learned">
          <div className="space-y-4">
            {project.lessons.map((l) => (
              <p key={l} className="border-l-2 border-accent/40 pl-4 leading-relaxed text-ink-muted">
                {l}
              </p>
            ))}
          </div>
        </Block>
      </div>

      <Reveal className="mt-8 border-t border-line pt-12">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
          Next case study
        </p>
        <Link
          href={`/projects/${next.slug}`}
          className="group inline-flex items-center gap-3 text-2xl font-semibold tracking-tight text-ink transition-colors hover:text-accent-strong"
        >
          {next.name}
          <ArrowUpRight
            size={22}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </Reveal>
    </article>
  );
}
