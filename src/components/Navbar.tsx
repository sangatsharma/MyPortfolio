"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { scrollToTop } from "@/lib/scroll";

/**
 * Fixed navbar: transparent over the hero, glass once scrolling starts.
 * On case-study pages the anchors point back to the home sections.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Scrollspy target and the link currently under the pointer; the pill
  // sits on hovered when present, else on the section being read
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const home = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // Above the first section nothing is "current"
      if (window.scrollY < 200) setActive(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Watch the home sections and mark the one crossing the reading line
  useEffect(() => {
    if (!home) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const link of navLinks) {
      const el = document.getElementById(link.href.slice(1));
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [home]);

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled || open
          ? "border-b border-line bg-base/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-content items-center justify-between px-6 lg:px-8"
      >
        <Link
          href="/"
          onClick={(e) => {
            // Already home: scroll back to the hero instead of a no-op route
            if (home) {
              e.preventDefault();
              setOpen(false);
              scrollToTop();
            }
          }}
          aria-label="Sangat Sharma, back to top"
          className="group flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-ink transition-colors hover:text-accent-strong"
        >
          <Image
            src="/images/logo-mark.png"
            alt=""
            width={71}
            height={117}
            className="h-7 w-auto opacity-90 transition-opacity group-hover:opacity-100"
          />
          sangat<span className="text-accent-strong">.</span>sharma
        </Link>

        <div
          className="hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {navLinks.map((link) => {
            // Off the home page there's no section to be "in"
            const current = home ? active : null;
            const pillHere = (hovered ?? current) === link.href;
            return (
              <a
                key={link.href}
                href={home ? link.href : `/${link.href}`}
                onMouseEnter={() => setHovered(link.href)}
                onFocus={() => setHovered(link.href)}
                onBlur={() => setHovered(null)}
                className="relative rounded-full px-3.5 py-1.5 text-[15px]"
              >
                {/* One shared pill glides between links via layoutId */}
                {pillHere && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full border border-line bg-white/[0.05]"
                  />
                )}
                <span
                  className={cn(
                    "relative transition-colors duration-200",
                    pillHere ? "text-ink" : "text-ink-muted",
                  )}
                >
                  {link.label}
                </span>
                {/* The section being read keeps its dot even while the
                    pill follows the pointer */}
                {current === link.href && (
                  <motion.span
                    layoutId="nav-dot"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 mx-auto h-[3px] w-[3px] rounded-full bg-accent-strong"
                  />
                )}
              </a>
            );
          })}
          <button
            onClick={openPalette}
            aria-label="Open command palette"
            className="ml-2 flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-ink-faint transition-all duration-200 hover:border-accent/50 hover:text-accent-strong hover:shadow-[0_0_16px_rgba(91,91,214,0.25)]"
          >
            <span className="text-[11px]">⌘K</span>
          </button>
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative ml-1 overflow-hidden rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-base transition-opacity hover:opacity-90"
          >
            {/* Sheen sweep across the button on hover */}
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-full motion-reduce:hidden"
            />
            <span className="relative">Resume</span>
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={cn(
              "h-px w-5 bg-ink transition-transform",
              open && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-px w-5 bg-ink transition-transform",
              open && "-translate-y-[3.5px] -rotate-45",
            )}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={home ? link.href : `/${link.href}`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-lg bg-ink px-3 py-2.5 text-center text-sm font-medium text-base"
              >
                Open resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
