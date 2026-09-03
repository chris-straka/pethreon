import { useMediaQuery } from "./useMediaQuery"

/** Decorative animation is skipped entirely when this returns "reduced". */
export const usePreferredMotion = (): 'reduced' | 'default' =>
  useMediaQuery('(prefers-reduced-motion: reduce)') ? 'reduced' : 'default'
