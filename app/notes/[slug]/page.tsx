import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { getNote, notes } from "@/data/notes";
import { site } from "@/data/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.summary,
    openGraph: {
      title: `${note.title} — ${site.name}`,
      description: note.summary,
      type: "article",
      publishedTime: note.date,
    },
  };
}

const dateFormat = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default async function NotePage({ params }: PageProps) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const index = notes.findIndex((n) => n.slug === slug);
  const next = notes[(index + 1) % notes.length];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: note.title,
    description: note.summary,
    datePublished: note.date,
    author: { "@type": "Person", name: site.name, url: site.url },
  };

  return (
    <article className="mx-auto max-w-content px-6 pb-24 pt-32 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Reveal>
        <Link
          href="/#notes"
          className="mb-12 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={15} />
          All notes
        </Link>

        <header className="max-w-3xl">
          <p className="mb-4 flex flex-wrap items-center gap-3 font-mono text-[13px] text-ink-faint">
            <span className="rounded-md border border-line px-2 py-0.5 text-accent-strong">
              {note.tag}
            </span>
            <time dateTime={note.date}>{dateFormat.format(new Date(note.date))}</time>
            <span>· {note.readingTime} read</span>
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-5xl">
            {note.title}
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-ink-muted">{note.summary}</p>
        </header>
      </Reveal>

      <div className="mt-16 max-w-3xl">
        <Reveal className="space-y-5 border-t border-line pt-10">
          {note.intro.map((p) => (
            <p key={p.slice(0, 32)} className="text-lg leading-relaxed text-ink-muted">
              {p}
            </p>
          ))}
        </Reveal>

        {note.sections.map((section) => (
          <Reveal as="section" key={section.heading} className="mt-14">
            <h2 className="mb-5 text-2xl font-semibold tracking-tight text-ink">
              {section.heading}
            </h2>
            <div className="space-y-5">
              {section.body.map((p) => (
                <p key={p.slice(0, 32)} className="text-lg leading-relaxed text-ink-muted">
                  {p}
                </p>
              ))}
            </div>
            {section.code && (
              <figure className="mt-7 overflow-hidden rounded-xl border border-line bg-base-soft">
                <figcaption className="border-b border-line px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                  {section.code.label}
                </figcaption>
                <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-ink-muted">
                  <code>{section.code.snippet}</code>
                </pre>
              </figure>
            )}
          </Reveal>
        ))}

        <Reveal className="mt-16 rounded-2xl border border-line bg-base-soft p-7 md:p-8">
          <p className="mb-5 font-mono text-[13px] uppercase tracking-[0.2em] text-accent-strong">
            What to take away
          </p>
          <ul className="space-y-3.5">
            {note.takeaways.map((t) => (
              <li key={t} className="flex gap-3 text-base leading-relaxed text-ink-muted">
                <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-accent/60" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-16 border-t border-line pt-10">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
            Next note
          </p>
          <Link
            href={`/notes/${next.slug}`}
            className="group inline-flex items-baseline gap-2 text-xl font-medium text-ink transition-colors hover:text-accent-strong"
          >
            {next.title}
            <ArrowUpRight
              size={17}
              className="self-center transition-transform duration-200 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
