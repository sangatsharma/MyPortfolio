/**
 * Motion system — one set of durations, curves and springs.
 * Components import from here; no magic easing values in JSX.
 */

export const duration = {
  micro: 0.15,
  standard: 0.25,
  entrance: 0.45,
  large: 0.65,
} as const;

/** Reveals and entrances — fast start, long settle. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/** UI feedback: snappy, barely-visible overshoot. */
export const springFeedback = { type: "spring", stiffness: 300, damping: 30 } as const;

/** Large entrances: softer, more mass. */
export const springEntrance = { type: "spring", stiffness: 120, damping: 20 } as const;

export const stagger = 0.06;
