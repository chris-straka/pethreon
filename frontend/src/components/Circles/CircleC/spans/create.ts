import { Variant } from "framer-motion"
import { CIRCLE_ANIMATION_DURATION, PAGE_FADE_OUT_DURATION, PAGE_FADE_IN_DURATION } from "../../../../constants"

export const createSpan: Variant = {
  display: 'none',
  opacity: 0,
  transition: {
    duration: PAGE_FADE_IN_DURATION,
    delay: CIRCLE_ANIMATION_DURATION + PAGE_FADE_OUT_DURATION
  }
}

export const donateSpan: Variant = {
  display: 'inline',
  opacity: 1,
  transition: {
    duration: PAGE_FADE_IN_DURATION,
    delay: CIRCLE_ANIMATION_DURATION + PAGE_FADE_OUT_DURATION
  }
}