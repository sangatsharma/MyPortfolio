import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Section from "../components/Section";
import { Reveal } from "../components/Reveal";
import { skillGroups, coreSkills } from "../data/resume";

// Flattened, de-duplicated skill list for the floating constellation.
const allSkills = Array.from(
  new Set(skillGroups.flatMap((g) => g.items))
);

export default function Skills() {
  const cloudRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Whole constellation drifts subtly with the pointer for depth.
  useEffect(() => {
    if (reduced) return;
    const el = cloudRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--px", String(px));
      el.style.setProperty("--py", String(py));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  return (
    <Section id="skills" index="02" eyebrow="Skills & Tools">
      <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
        {/* Floating constellation */}
        <Reveal>
          <div
            ref={cloudRef}
            className="relative flex min-h-[340px] flex-wrap content-center items-center justify-center gap-3 rounded-3xl border border-line bg-white/[0.015] p-8"
          >
            {allSkills.map((skill, i) => {
              const core = coreSkills.includes(skill);
              // Deterministic depth so parallax + float feel organic but stable.
              const depth = ((i % 5) + 1) / 5;
              return (
                <motion.span
                  key={skill}
                  data-cursor
                  whileHover={{ scale: 1.12, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  style={{
                    transform: reduced
                      ? undefined
                      : `translate(calc(var(--px,0) * ${depth * 30}px), calc(var(--py,0) * ${depth * 24}px))`,
                    animation: reduced
                      ? undefined
                      : `floaty ${4 + (i % 4)}s ease-in-out ${i * 0.15}s infinite`,
                  }}
                  className={
                    core
                      ? "cursor-default rounded-full border border-accent/40 bg-accent/15 px-4 py-2 text-sm font-semibold text-ink shadow-[0_0_30px_-8px_var(--accent)]"
                      : "cursor-default rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-xs text-muted"
                  }
                >
                  {skill}
                </motion.span>
              );
            })}
          </div>
        </Reveal>

        {/* Grouped breakdown */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.title}
              delay={i * 0.06}
              className="bg-[var(--bg)] p-5"
            >
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-muted">
                {group.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
