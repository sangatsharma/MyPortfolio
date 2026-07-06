import Reveal from "@/components/ui/Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

/**
 * Consistent section header: mono eyebrow for scanability,
 * large title for hierarchy, optional one-line framing below.
 */
export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-accent-strong">
        {eyebrow}
      </p>
      <h2 className="text-balance text-4xl font-semibold tracking-tight text-ink md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{description}</p>
      )}
    </Reveal>
  );
}
