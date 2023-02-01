import { Variants } from "framer-motion"
import { CIRCLE_ANIMATION_DURATION, PAGE_FADE_IN_DURATION } from "../../../../constants"

export const contribute: Variants = {
  contribute: {
    x: "var(--x-contribute)",
    y: "var(--y-contribute)",
    width: "var(--width-contribute)",
    height: "var(--height-contribute)",
    scale: 1,

    backgroundColor: "var(--background-color-contribute)",

    transition: {
      duration: CIRCLE_ANIMATION_DURATION,
      delay: PAGE_FADE_IN_DURATION,
    }
  },
}