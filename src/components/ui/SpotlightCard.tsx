"use client";

import { cn } from "@/lib/utils";
import type { ReactNode, MouseEvent } from "react";
import { useRef } from "react";

/**
 * Card with two cursor-following layers: a soft interior glow and a
 * border highlight (gradient masked to the 1px edge). Combined with the
 * layered shadow + inset top highlight, the card reads as a lit surface
 * rather than a flat rectangle.
 */
export default function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-line bg-base-soft shadow-card",
        "transition-colors duration-300 ease-out-expo hover:border-line-strong",
        className,
      )}
    >
      {/* Interior glow following the cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), rgba(91,91,214,0.08), transparent 65%)",
        }}
      />
      {/* Border highlight: gradient painted only on the 1px edge via mask compositing */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          padding: 1,
          background:
            "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(165,166,246,0.45), transparent 70%)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
