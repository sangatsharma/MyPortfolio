import { motion } from "framer-motion";
import { MaskText } from "../components/Reveal";
import { profile } from "../data/resume";

const links = [
  { label: "Email", href: `mailto:${profile.email}`, handle: profile.email },
  { label: "GitHub", href: profile.github, handle: "@sangatsharma" },
  { label: "LinkedIn", href: profile.linkedin, handle: "in/sangatsharma" },
  { label: "Résumé", href: profile.resume, handle: "PDF" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto flex min-h-[90svh] w-full max-w-wide flex-col justify-center px-5 py-28 md:px-10"
    >
      <div className="eyebrow mb-10 flex items-center gap-4">
        <span className="text-gradient">06</span>
        <span>Contact</span>
        <span className="hairline flex-1" />
      </div>

      <h2 className="display text-[clamp(2.6rem,12vw,9rem)] leading-[0.92]">
        <MaskText lines="Let's build" />
        <MaskText lines="something" lineClassName="text-gradient" delay={0.1} />
        <MaskText lines="great." delay={0.2} />
      </h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-8 max-w-md text-sm leading-relaxed text-muted md:text-base"
      >
        Open to frontend roles and ambitious products. The fastest way to reach me is
        email — I usually reply within a day.
      </motion.p>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            data-cursor
            className="group flex items-center justify-between bg-[var(--bg)] p-6 transition-colors hover:bg-white/[0.04]"
          >
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-muted">
                {l.label}
              </div>
              <div className="mt-1 text-lg font-medium">{l.handle}</div>
            </div>
            <span className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink">
              ↗
            </span>
          </a>
        ))}
      </div>

      <footer className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Designed & built in {profile.location} · React · Three.js · GSAP</span>
      </footer>
    </section>
  );
}
