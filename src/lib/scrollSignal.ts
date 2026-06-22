/**
 * Mutable, render-free scroll signal shared between the DOM (Lenis) and the
 * WebGL canvas (R3F useFrame). Reading these in an animation loop avoids React
 * re-renders entirely — the 3D centerpiece samples them every frame.
 */
export const scrollSignal = {
  /** Normalised scroll progress 0..1 across the whole page. */
  progress: 0,
  /** Instantaneous scroll velocity from Lenis (px/frame-ish), smoothed downstream. */
  velocity: 0,
  /** Pointer position in normalised device coords, -1..1. */
  pointerX: 0,
  pointerY: 0,
};

if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      scrollSignal.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollSignal.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true }
  );
}
