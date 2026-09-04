import type Lenis from "lenis";

/**
 * Single source of truth for programmatic scrolling.
 *
 * Native `scrollIntoView({ behavior: "smooth" })` fights Lenis: both write
 * the scroll position every frame, the page oscillates, and the main thread
 * stays pegged long enough that React cannot commit pending updates. Every
 * scroll the app triggers must go through Lenis while it is running.
 */

let instance: Lenis | null = null;

export function registerLenis(lenis: Lenis | null) {
  instance = lenis;
}

/** Scroll to a section by hash. Falls back to native scrolling with no Lenis. */
export function scrollToHash(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;

  if (instance) {
    instance.scrollTo(target as HTMLElement, { offset: -80 });
    return;
  }
  // No Lenis (reduced motion, or not mounted yet): native jump, no animation
  // to fight over.
  target.scrollIntoView();
}

/** Back to the top of the page, the hero. */
export function scrollToTop() {
  if (instance) {
    instance.scrollTo(0);
    return;
  }
  window.scrollTo(0, 0);
}
