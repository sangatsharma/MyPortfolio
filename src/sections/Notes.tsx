import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { notes } from "@/data/notes";

/**
 * Engineering notes from production work — each card opens the full
 * article at /notes/[slug].
 */
export default function Notes() {
  return (
    <section id="notes" className="section-pad scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <SectionHeading
          eyebrow={`Notes · ${notes.length} published`}
          title="Lessons worth writing down."
          description="Deep dives drawn from production incidents, architecture decisions and performance work."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {notes.map((note, i) => (
            <Reveal key={note.slug} delay={i * 0.08}>
              <SpotlightCard className="h-full">
                <Link
                  href={`/notes/${note.slug}`}
                  aria-label={`Read note: ${note.title}`}
                  className="group flex h-full flex-col p-6"
                >
                  <div className="mb-4 flex items-center gap-3 font-mono text-[11px] text-ink-faint">
                    <span className="rounded-md border border-line px-2 py-0.5 text-accent-strong">
                      {note.tag}
                    </span>
                    <span>{note.readingTime}</span>
                  </div>
                  <h3 className="mb-3 text-lg font-medium leading-snug text-ink transition-colors group-hover:text-accent-strong">
                    {note.title}
                  </h3>
                  <p className="text-base leading-relaxed text-ink-muted">{note.summary}</p>
                  <p className="mt-auto pt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint transition-colors group-hover:text-accent-strong">
                    Read note →
                  </p>
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
