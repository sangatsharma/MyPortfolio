"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Fixed navbar: transparent over the hero, glass once scrolling starts.
 * On case-study pages the anchors point back to the home sections.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const home = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={home ? link.href : `/${link.href}`}
              className="rounded-full px-3.5 py-1.5 text-[15px] text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={openPalette}
            aria-label="Open command palette"
            className="ml-2 flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-ink-faint transition-colors hover:border-line-strong hover:text-ink-muted"
          >
            <span className="text-[11px]">⌘K</span>
          </button>
          <a
            href={site.resume}
            download
            className="ml-1 rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-base transition-opacity hover:opacity-85"
          >
            Resume
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
                download
                className="mt-2 rounded-lg bg-ink px-3 py-2.5 text-center text-sm font-medium text-base"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
