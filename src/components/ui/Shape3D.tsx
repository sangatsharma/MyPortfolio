import { cn } from "@/lib/utils";

interface Shape3DProps {
  variant: "cube" | "ring";
  /** Edge length (cube) or diameter (ring) in px. */
  size?: number;
  className?: string;
}

/**
 * Decorative CSS-3D wireframes that echo the indigo accent — a spinning
 * cube and a tilted orbit ring. Pure markup (server-safe), aria-hidden,
 * pointer-events-none; animation pauses under prefers-reduced-motion.
 */
export default function Shape3D({ variant, size = 96, className }: Shape3DProps) {
  if (variant === "ring") {
    return (
      <div
        aria-hidden
        className={cn("pointer-events-none select-none [perspective:800px]", className)}
        style={{ width: size, height: size }}
      >
        <div
          className="h-full w-full rounded-full border border-accent/30 animate-orbit-3d motion-reduce:animate-none"
          style={{
            boxShadow: "0 0 24px rgba(91,91,214,0.12), inset 0 0 24px rgba(91,91,214,0.08)",
          }}
        />
      </div>
    );
  }

  const faces = [
    "rotateY(0deg)",
    "rotateY(90deg)",
    "rotateY(180deg)",
    "rotateY(270deg)",
    "rotateX(90deg)",
    "rotateX(-90deg)",
  ];

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none select-none [perspective:800px]", className)}
      style={{ width: size, height: size }}
    >
      <div className="relative h-full w-full [transform-style:preserve-3d] animate-spin-3d motion-reduce:animate-none">
        {faces.map((rotate) => (
          <div
            key={rotate}
            className="absolute inset-0 border border-accent/25 bg-accent/[0.03]"
            style={{ transform: `${rotate} translateZ(${size / 2}px)` }}
          />
        ))}
      </div>
    </div>
  );
}
