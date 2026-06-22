import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../lib/useReducedMotion";

// Code-split the whole Three.js bundle out of the initial load.
const HeroCanvas = lazy(() => import("./HeroCanvas"));

/** Static stand-in shown while WebGL loads or when motion is reduced / unavailable. */
function StaticOrb() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden>
      <div
        className="h-64 w-64 rounded-full blur-[2px] md:h-80 md:w-80"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #18c8ff 0%, #7c5cff 45%, #2a1a6e 75%, transparent 100%)",
          boxShadow: "0 0 120px 20px rgba(124,92,255,0.35)",
          animation: "floaty 6s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/**
 * Gates the expensive R3F canvas behind: (1) reduced-motion preference and
 * (2) actual visibility — it only mounts once the hero scrolls into view, and the
 * heavy chunk is lazy-imported so it never blocks first paint.
 */
export default function HeroVisual() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div ref={ref} className="absolute inset-0">
      {reduced || !visible ? (
        <StaticOrb />
      ) : (
        <Suspense fallback={<StaticOrb />}>
          <HeroCanvas />
        </Suspense>
      )}
    </div>
  );
}
