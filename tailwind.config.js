/**
 * Design tokens — single source of truth.
 * Never pure black/white: near-black with a faint cool tint, off-white text.
 * One accent (restrained indigo), used sparingly.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#08080a",
          soft: "#101013",
          raised: "#16161a",
        },
        line: {
          DEFAULT: "rgba(255,255,255,0.07)",
          strong: "rgba(255,255,255,0.12)",
        },
        ink: {
          DEFAULT: "#ededef",
          muted: "#9a9aa1",
          // Spec dim (#5A5A62) fails AA on #08080a for small text; lifted to pass 4.5:1
          faint: "#82828b",
        },
        accent: {
          // Surfaces, glows, borders, dots — not small text (contrast ~4:1)
          DEFAULT: "#5b5bd6",
          soft: "rgba(91,91,214,0.14)",
          // Text-safe variant for links, eyebrows, small labels
          strong: "#a5a6f6",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      // Layered shadows + 1px inset top highlight so cards catch light on the top edge
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.28), 0 4px 12px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.05)",
        pop: "0 2px 4px rgba(0,0,0,0.3), 0 16px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)",
      },
      maxWidth: {
        content: "72rem",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "aurora-a": "aurora-a 22s ease-in-out infinite alternate",
        "aurora-b": "aurora-b 28s ease-in-out infinite alternate",
        "spin-3d": "spin-3d 26s linear infinite",
        "orbit-3d": "orbit-3d 18s linear infinite",
        "mesh-spin": "mesh-spin 70s linear infinite",
      },
      keyframes: {
        // Slow drifting blobs behind the hero — transform-only, GPU-cheap
        "aurora-a": {
          from: { transform: "translate3d(-8%, -4%, 0) scale(1)" },
          to: { transform: "translate3d(10%, 8%, 0) scale(1.15)" },
        },
        "aurora-b": {
          from: { transform: "translate3d(6%, 4%, 0) scale(1.1)" },
          to: { transform: "translate3d(-10%, -8%, 0) scale(0.95)" },
        },
        // Wireframe accents (Shape3D) — slow enough to read as ambient, not busy
        "spin-3d": {
          from: { transform: "rotateX(18deg) rotateY(0deg)" },
          to: { transform: "rotateX(18deg) rotateY(360deg)" },
        },
        "orbit-3d": {
          from: { transform: "rotateX(68deg) rotateZ(0deg)" },
          to: { transform: "rotateX(68deg) rotateZ(360deg)" },
        },
        // Slow conic sweep behind the whole page — a living gradient, not a static wash
        "mesh-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
