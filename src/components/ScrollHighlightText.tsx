import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { usePrefersReducedMotion } from "../lib/useReducedMotion";

/**
 * Splits text into words and scrubs each from dim to bright as the block scrolls
 * through the viewport — a reading-pace "spotlight" tied to scroll position.
 * Reduced-motion renders the text fully lit, no ScrollTrigger.
 */
export default function ScrollHighlightText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>("[data-word]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 55%",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reduced, text]);

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} data-word={reduced ? undefined : ""} className="inline-block">
          {w}&nbsp;
        </span>
      ))}
    </p>
  );
}
