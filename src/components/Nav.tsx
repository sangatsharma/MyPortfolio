import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navSections, profile } from "../data/resume";
import { scrollToId } from "../lib/lenisRef";

/**
 * Fixed cinematic nav: monogram + section links with an active indicator driven by
 * IntersectionObserver, a top scroll-progress line, and a fullscreen mobile menu.
 */
export default function Nav() {
  const [active, setActive] = useState("hero");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto flex max-w-wide items-center justify-between px-5 py-4 md:px-10">
          <button
            onClick={() => go("hero")}
            data-cursor
            className="flex items-center gap-2 text-sm font-semibold tracking-tight"
            aria-label="Back to top"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-gradient">
              SS
            </span>
            <span className="hidden text-muted sm:inline">{profile.role}</span>
          </button>

          <nav className="hidden items-center gap-1 rounded-full border border-line bg-white/[0.02] px-2 py-1 backdrop-blur md:flex">
            {navSections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => go(id)}
                data-cursor
                className="relative rounded-full px-3.5 py-1.5 text-xs tracking-wide transition-colors"
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={active === id ? "relative text-ink" : "relative text-muted"}>
                  {label}
                </span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              data-cursor
              className="hidden rounded-full border border-line px-4 py-1.5 text-xs tracking-wide text-ink transition-colors hover:bg-white/10 sm:inline-block"
            >
              Résumé
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              data-cursor
              aria-label="Toggle menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-line md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-ink transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
                />
                <span
                  className={`absolute left-0 top-[6px] h-px w-full bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute left-0 top-[12px] h-px w-full bg-ink transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-wide px-5 md:px-10">
          <div className="h-px w-full overflow-hidden bg-line">
            <div
              className="h-full origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-3"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-[var(--bg)]/95 px-8 backdrop-blur-xl md:hidden"
          >
            {navSections.map(({ id, label }, i) => (
              <motion.button
                key={id}
                onClick={() => go(id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.05 * i } }}
                className="border-b border-line py-4 text-left text-3xl font-semibold tracking-tight"
              >
                <span className="mr-3 text-xs text-muted">0{i + 1}</span>
                {label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
