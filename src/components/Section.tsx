import type { ReactNode } from "react";

/** Consistent section shell: anchor id, vertical rhythm, max width, optional eyebrow. */
export default function Section({
  id,
  index,
  eyebrow,
  children,
  className = "",
}: {
  id: string;
  index?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-wide px-5 py-24 md:px-10 md:py-32 ${className}`}
    >
      {eyebrow && (
        <div className="mb-10 flex items-center gap-4 md:mb-16">
          {index && <span className="eyebrow text-gradient">{index}</span>}
          <span className="eyebrow">{eyebrow}</span>
          <span className="hairline flex-1" />
        </div>
      )}
      {children}
    </section>
  );
}
