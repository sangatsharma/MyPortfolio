"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { notes } from "@/data/notes";
import { site } from "@/data/site";

export interface TerminalActions {
  goToHash: (hash: string) => void;
  goRoute: (path: string) => void;
  openUrl: (url: string) => void;
  copyEmail: () => void;
  /** Leave terminal mode, back to palette search. */
  exit: () => void;
}

interface Line {
  kind: "cmd" | "out" | "err";
  text: string;
}

const SECTIONS = ["home", "work", "experience", "about", "stack", "github", "notes", "contact"];

const HELP: string[] = [
  "available commands:",
  "  help                  show this help",
  "  ls [projects]         list sections, or case studies",
  "  cd <section>          go to a section        e.g. cd work",
  "  open <project>        open a case study      e.g. open restrox",
  "  search <term>         search projects and notes",
  "  whoami                about the operator",
  "  status                live telemetry",
  "  resume                open resume (pdf)",
  "  email                 copy email address",
  "  github · linkedin     open profiles",
  "  pwd · clear · exit    the usual",
];

const GREETING: Line[] = [
  { kind: "out", text: `${site.name.toLowerCase().replace(" ", ".")} terminal — type 'help' to get started.` },
];

/**
 * Interactive terminal inside the ⌘K palette: search and navigate the
 * whole site by command. Output is a polite live region; ↑/↓ recall
 * history, Tab completes commands and targets.
 */
export default function Terminal({ actions }: { actions: TerminalActions }) {
  const [lines, setLines] = useState<Line[]>(GREETING);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keep the latest output visible
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const print = (kind: Line["kind"], ...texts: string[]) =>
    setLines((prev) => [...prev, ...texts.map((text) => ({ kind, text }))]);

  const findProject = (term: string) =>
    projects.find(
      (p) => p.slug === term || p.slug.includes(term) || p.name.toLowerCase().includes(term),
    );

  const run = (raw: string) => {
    const [cmd, ...rest] = raw.trim().split(/\s+/);
    const arg = rest.join(" ").toLowerCase().replace(/^[#/]/, "");

    switch (cmd.toLowerCase()) {
      case "":
        return;
      case "help":
        print("out", ...HELP);
        return;
      case "ls":
        if (arg.startsWith("project")) {
          print(
            "out",
            ...projects.map((p) => `  ${p.slug.padEnd(18)} ${p.name} — ${p.year}`),
          );
        } else {
          print("out", SECTIONS.join("  "));
        }
        return;
      case "cd":
      case "goto": {
        if (!arg) {
          print("err", "usage: cd <section> — try 'ls'");
          return;
        }
        if (arg === "home" || arg === "~" || arg === "/") {
          actions.goRoute("/");
          return;
        }
        const section = SECTIONS.find((s) => s.startsWith(arg));
        if (section) {
          actions.goToHash(`#${section}`);
          return;
        }
        print("err", `cd: no such section: ${arg} — try 'ls'`);
        return;
      }
      case "open": {
        if (!arg) {
          print("err", "usage: open <project> — try 'ls projects'");
          return;
        }
        if (arg === "github") return actions.openUrl(site.github);
        if (arg === "linkedin") return actions.openUrl(site.linkedin);
        if (arg === "resume") return actions.openUrl(site.resume);
        const project = findProject(arg);
        if (project) {
          actions.goRoute(`/projects/${project.slug}`);
          return;
        }
        print("err", `open: not found: ${arg} — try 'ls projects'`);
        return;
      }
      case "search":
      case "find": {
        if (!arg) {
          print("err", "usage: search <term>");
          return;
        }
        const hits = projects.filter((p) =>
          [p.name, p.tagline, ...p.tech, ...p.domains].join(" ").toLowerCase().includes(arg),
        );
        const noteHits = notes.filter((n) =>
          `${n.title} ${n.tag}`.toLowerCase().includes(arg),
        );
        if (hits.length === 0 && noteHits.length === 0) {
          print("out", `no results for '${arg}'`);
          return;
        }
        if (hits.length > 0) {
          print(
            "out",
            ...hits.map((p) => `  ${p.slug.padEnd(18)} ${p.tagline}`),
            `  → open <name> to read a case study`,
          );
        }
        if (noteHits.length > 0) {
          print("out", ...noteHits.map((n) => `  note: ${n.title} [${n.tag}]`));
        }
        return;
      }
      case "whoami":
        print(
          "out",
          "sangat — software engineer, pokhara (utc+5:45).",
          "2+ years shipping multi-tenant saas, crms and real-time platforms.",
        );
        return;
      case "pwd":
        print("out", "/home/sangat/portfolio");
        return;
      case "status":
      case "uptime": {
        const days = Math.floor(
          (Date.now() - new Date(site.careerStart).getTime()) / 86_400_000,
        );
        const time = new Intl.DateTimeFormat("en-GB", {
          timeZone: site.timeZone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
        print(
          "out",
          `status:  ${site.statusShort}`,
          `local:   ${time} (utc+5:45), ${site.coordinates.toLowerCase()}`,
          `uptime:  in production ${days} days`,
        );
        return;
      }
      case "resume":
        actions.openUrl(site.resume);
        return;
      case "email":
        actions.copyEmail();
        print("out", `copied ${site.email} to clipboard.`);
        return;
      case "github":
        actions.openUrl(site.github);
        return;
      case "linkedin":
        actions.openUrl(site.linkedin);
        return;
      case "sudo":
        if (arg.includes("hire")) {
          print("out", "permission granted. routing to contact…");
          setTimeout(() => actions.goToHash("#contact"), 600);
          return;
        }
        print("err", `sangat is not in the sudoers file. this incident will be reported.`);
        return;
      case "theme":
        print("out", "dark. always.");
        return;
      case "clear":
        setLines([]);
        return;
      case "exit":
        actions.exit();
        return;
      default:
        print("err", `command not found: ${cmd} — try 'help'`);
    }
  };

  const complete = () => {
    const parts = input.split(/\s+/);
    const isFirst = parts.length === 1;
    const partial = parts[parts.length - 1].toLowerCase();
    if (!partial) return;
    const pool = isFirst
      ? ["help", "ls", "cd", "open", "search", "whoami", "status", "resume", "email", "github", "linkedin", "pwd", "clear", "exit"]
      : parts[0] === "cd"
        ? SECTIONS
        : parts[0] === "open"
          ? projects.map((p) => p.slug)
          : [];
    const matches = pool.filter((c) => c.startsWith(partial));
    if (matches.length === 1) {
      setInput([...parts.slice(0, -1), matches[0]].join(" ") + (isFirst ? " " : ""));
    } else if (matches.length > 1) {
      print("out", matches.join("  "));
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const raw = input;
      print("cmd", raw);
      if (raw.trim()) {
        setHistory((h) => [...h, raw]);
      }
      setHistIndex(-1);
      setInput("");
      run(raw);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = histIndex === -1 ? history.length - 1 : Math.max(histIndex - 1, 0);
      setHistIndex(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex === -1) return;
      const next = histIndex + 1;
      if (next >= history.length) {
        setHistIndex(-1);
        setInput("");
      } else {
        setHistIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      complete();
    }
  };

  return (
    <div className="flex h-[26rem] max-h-[55vh] flex-col font-mono text-[13px] leading-relaxed">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#f4645f]" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#f7b125]" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#33c748]" />
        <span className="ml-2 text-xs text-ink-faint">sangat@portfolio: ~</span>
      </div>

      {/* Output — polite live region so screen readers hear results */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        className="flex-1 overflow-y-auto px-4 py-3"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <p
            key={i}
            className={
              line.kind === "cmd"
                ? "text-ink"
                : line.kind === "err"
                  ? "text-[#f0857f]"
                  : "text-ink-muted"
            }
          >
            {line.kind === "cmd" && <span className="mr-2 text-accent-strong">❯</span>}
            <span className="whitespace-pre-wrap">{line.text || " "}</span>
          </p>
        ))}
      </div>

      {/* Prompt */}
      <div className="flex items-center gap-2 border-t border-line px-4 py-3">
        <span aria-hidden className="text-accent-strong">
          ❯
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Terminal command input"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck={false}
          className="flex-1 bg-transparent text-ink caret-accent-strong placeholder:text-ink-faint focus:outline-none"
          placeholder="type 'help'…"
        />
      </div>

      <div className="flex items-center gap-4 border-t border-line px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-ink-faint">
        <span>↑↓ history</span>
        <span>tab complete</span>
        <span>exit — back to search</span>
      </div>
    </div>
  );
}
