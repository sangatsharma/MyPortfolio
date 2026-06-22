import type Lenis from "lenis";

/** Holds the live Lenis instance so nav links can drive smooth scrollTo. */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

/** Smoothly scroll to an element id; falls back to native if Lenis is off. */
export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) {
    instance.scrollTo(el, { offset: 0, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
