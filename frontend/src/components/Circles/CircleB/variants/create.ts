import { Variants } from "framer-motion"
import { CIRCLE_ANIMATION_DURATION, PAGE_FADE_IN_DURATION } from "../../../../constants"

export const create: Variants = {
  create: {
    x: "var(--x-create)",
    y: "var(--y-create)",
    width: "var(--width-create)",
    height: "var(--height-create)",
    scale: 1,

    backgroundColor: "var(--background-color-create)",


    transition: {
      duration: CIRCLE_ANIMATION_DURATION,
      delay: PAGE_FADE_IN_DURATION,
    }
  },
}