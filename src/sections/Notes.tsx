import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { notes } from "@/data/notes";

/**
 * Engineering notes from production work. Entries without a URL are
 * shown honestly as "publishing soon" rather than pretending a blog
 * exists — the thinking itself is the signal.
 */
export default function Notes() {
  return (
    <section id="notes" className="section-pad scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <SectionHeading
          eyebrow={`Notes · ${notes.length} in the pipeline`}
          title="Lessons worth writing down."
          description="Deep dives drawn from production incidents, architecture decisions and performance work — currently being written up."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {notes.map((note, i) => (
            <Reveal key={note.title} delay={i * 0.08}>
              <SpotlightCard className="h-full">
                <article className="flex h-full flex-col p-6">
                  <div className="mb-4 flex items-center gap-3 font-mono text-[11px] text-ink-faint">
                    <span className="rounded-md border border-line px-2 py-0.5 text-accent-strong">
                      {note.tag}
                    </span>
                    <span>{note.readingTime}</span>
                  </div>
                  <h3 className="mb-3 text-lg font-medium leading-snug text-ink">{note.title}</h3>
                  <p className="text-base leading-relaxed text-ink-muted">{note.summary}</p>
                  <p className="mt-auto pt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                    {note.url ? "Read note →" : "Publishing soon"}
                  </p>
                </article>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
