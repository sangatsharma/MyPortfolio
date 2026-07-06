"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Copy,
  Download,
  FileText,
  FolderGit2,
  Github,
  Home,
  Linkedin,
  Mail,
  Terminal as TerminalIcon,
  User,
} from "lucide-react";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { springFeedback } from "@/lib/motion";
import Terminal, { type TerminalActions } from "@/components/Terminal";

interface Command {
  id: string;
  label: string;
  hint?: string;
  section: string;
  icon: React.ReactNode;
  run: () => void;
}

/**
 * Keyboard-first navigation (⌘K / Ctrl+K). Sections, case studies,
 * social links and quick actions — the whole site from one input.
 */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"search" | "terminal">("search");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const close = useCallback(() => {
    setOpen(false);
    setMode("search");
    setQuery("");
    setActive(0);
  }, []);

  const goTo = useCallback(
    (hash: string) => {
      close();
      if (pathname === "/") {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/${hash}`);
      }
    },
    [close, pathname, router],
  );

  const commands = useMemo<Command[]>(
    () => [
      { id: "home", label: "Home", section: "Navigate", icon: <Home size={15} />, run: () => { close(); router.push("/"); } },
      { id: "work", label: "Featured Work", section: "Navigate", icon: <FolderGit2 size={15} />, run: () => goTo("#work") },
      { id: "experience", label: "Experience", section: "Navigate", icon: <FileText size={15} />, run: () => goTo("#experience") },
      { id: "about", label: "About", section: "Navigate", icon: <User size={15} />, run: () => goTo("#about") },
      { id: "contact", label: "Contact", section: "Navigate", icon: <Mail size={15} />, run: () => goTo("#contact") },
      ...projects.map((p) => ({
        id: p.slug,
        label: p.name,
        hint: p.tagline,
        section: "Case Studies",
        icon: <FolderGit2 size={15} />,
        run: () => {
          close();
          router.push(`/projects/${p.slug}`);
        },
      })),
      {
        id: "terminal",
        label: "Open terminal",
        hint: "or type >",
        section: "Actions",
        icon: <TerminalIcon size={15} />,
        run: () => setMode("terminal"),
      },
      {
        id: "email",
        label: "Copy email address",
        hint: site.email,
        section: "Actions",
        icon: <Copy size={15} />,
        run: () => {
          navigator.clipboard?.writeText(site.email);
          close();
        },
      },
      {
        id: "resume",
        label: "Download resume",
        section: "Actions",
        icon: <Download size={15} />,
        run: () => {
          close();
          window.open(site.resume, "_blank");
        },
      },
      {
        id: "github",
        label: "GitHub",
        hint: "@" + site.githubUser,
        section: "Links",
        icon: <Github size={15} />,
        run: () => {
          close();
          window.open(site.github, "_blank", "noopener");
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        section: "Links",
        icon: <Linkedin size={15} />,
        run: () => {
          close();
          window.open(site.linkedin, "_blank", "noopener");
        },
      },
    ],
    [close, goTo, router],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint?.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, [close]);

  useEffect(() => {
    if (open && mode === "search") inputRef.current?.focus();
  }, [open, mode]);

  const onQueryChange = (value: string) => {
    // ">" prompt-switches into terminal mode, mirroring editor palettes
    if (value.trim() === ">") {
      setMode("terminal");
      setQuery("");
      return;
    }
    setQuery(value);
    setActive(0);
  };

  const terminalActions = useMemo<TerminalActions>(
    () => ({
      goToHash: (hash) => goTo(hash),
      goRoute: (path) => {
        close();
        router.push(path);
      },
      openUrl: (url) => window.open(url, "_blank", "noopener"),
      copyEmail: () => navigator.clipboard?.writeText(site.email),
      exit: () => setMode("search"),
    }),
    [goTo, close, router],
  );

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    }
  };

  let lastSection = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 px-4 pt-[18vh] backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={mode === "terminal" ? "Terminal" : "Command palette"}
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8, transition: { duration: 0.12 } }}
            transition={springFeedback}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line-strong bg-base-raised/95 shadow-pop backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {mode === "terminal" ? (
              <Terminal actions={terminalActions} />
            ) : (
              <>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={onInputKey}
              placeholder="Search sections, projects, actions…"
              aria-label="Search commands"
              className="w-full border-b border-line bg-transparent px-5 py-4 text-sm text-ink placeholder:text-ink-faint focus:outline-none"
            />
            <ul className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
              {filtered.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-ink-faint">No results.</li>
              )}
              {filtered.map((cmd, i) => {
                const showSection = cmd.section !== lastSection;
                lastSection = cmd.section;
                return (
                  <li key={cmd.id}>
                    {showSection && (
                      <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                        {cmd.section}
                      </p>
                    )}
                    <button
                      role="option"
                      aria-selected={i === active}
                      onMouseEnter={() => setActive(i)}
                      onClick={cmd.run}
                      className={cn(
                        "relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                        i === active ? "text-ink" : "text-ink-muted",
                      )}
                    >
                      {i === active && (
                        <motion.span
                          layoutId="palette-active"
                          transition={springFeedback}
                          className="absolute inset-0 rounded-lg bg-white/[0.07]"
                          aria-hidden
                        />
                      )}
                      <span className="relative text-ink-faint">{cmd.icon}</span>
                      <span className="relative flex-1 truncate">{cmd.label}</span>
                      {cmd.hint && (
                        <span className="relative max-w-[40%] truncate text-xs text-ink-faint">
                          {cmd.hint}
                        </span>
                      )}
                      {i === active && (
                        <ArrowUpRight size={13} className="relative text-ink-faint" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-4 border-t border-line px-5 py-2.5 font-mono text-[10px] text-ink-faint">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
              <span className="ml-auto">&gt; terminal</span>
            </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
