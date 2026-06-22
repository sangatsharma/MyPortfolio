import { useEffect, useRef } from "react";
import Section from "../components/Section";
import { Reveal } from "../components/Reveal";
import { gsap } from "../lib/gsap";
import { usePrefersReducedMotion } from "../lib/useReducedMotion";
import { experience } from "../data/resume";

export default function Experience() {
  const railRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  // The vertical line fills from top to bottom in sync with scroll progress.
  useEffect(() => {
    if (reduced) return;
    const rail = railRef.current;
    const line = lineRef.current;
    if (!rail || !line) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rail,
            start: "top 60%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <Section id="experience" index="03" eyebrow="Experience">
      <Reveal className="mb-14 max-w-2xl">
        <h2 className="display text-[clamp(2rem,5vw,3.4rem)]">
          From intern to <span className="text-gradient">leading delivery</span> in 18 months.
        </h2>
      </Reveal>

      <div ref={railRef} className="relative pl-8 md:pl-0">
        {/* Center rail (left on mobile) */}
        <div className="absolute left-[7px] top-2 h-full w-px bg-line md:left-1/2 md:-translate-x-1/2">
          <div
            ref={lineRef}
            className="h-full w-full origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3"
            style={reduced ? undefined : { transform: "scaleY(0)" }}
          />
        </div>

        <div className="space-y-16 md:space-y-24">
          {experience.map((job, i) => {
            const right = i % 2 === 1;
            return (
              <div
                key={job.level}
                className="relative md:grid md:grid-cols-2 md:gap-12"
              >
                {/* Node */}
                <span className="absolute -left-[27px] top-2 z-10 grid h-4 w-4 place-items-center md:left-1/2 md:-translate-x-1/2">
                  <span className="h-3 w-3 rounded-full border-2 border-accent-2 bg-[var(--bg)]" />
                </span>

                <Reveal
                  x={reduced ? 0 : right ? 40 : -40}
                  y={0}
                  className={
                    right
                      ? "md:col-start-2"
                      : "md:col-start-1 md:text-right"
                  }
                >
                  <div className="glass rounded-2xl p-6 transition-colors hover:border-white/20">
                    <div
                      className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${
                        right ? "" : "md:justify-end"
                      }`}
                    >
                      <span className="text-lg font-semibold">{job.company}</span>
                      <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                        {job.level}
                      </span>
                    </div>
                    <div
                      className={`mt-1 flex flex-wrap items-center gap-2 text-xs text-muted ${
                        right ? "" : "md:justify-end"
                      }`}
                    >
                      <span>{job.role}</span>
                      <span>·</span>
                      <span>{job.period}</span>
                    </div>

                    <span
                      className={`text-gradient mt-4 block text-2xl font-bold tracking-tight ${
                        right ? "" : "md:text-right"
                      }`}
                    >
                      {job.metaphor}
                    </span>

                    <ul
                      className={`mt-3 space-y-2 text-sm leading-relaxed text-muted ${
                        right ? "" : "md:text-right"
                      }`}
                    >
                      {job.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
