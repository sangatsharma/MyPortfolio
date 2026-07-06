import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-ink-faint md:flex-row lg:px-8">
        <p>
          © {new Date().getFullYear()} {site.name} · <span lang="ne">संगत शर्मा</span> · designed
          and built from scratch
        </p>
        <div className="flex items-center gap-6">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-ink">
            Email
          </a>
          <span className="hidden font-mono text-[11px] md:inline">⌘K anywhere</span>
        </div>
      </div>
    </footer>
  );
}
