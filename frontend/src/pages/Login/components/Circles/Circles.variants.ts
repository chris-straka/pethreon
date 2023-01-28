import { Variant, Variants } from "framer-motion"
import { PAGE_FADE_OUT_DURATION } from "../../../../constants"

const reset: Variant = {
  scale: 1,
  x: 0,
  y: 0,
  transitionDuration: `${PAGE_FADE_OUT_DURATION}s`
}

export const circleAVariants: Variants = {
  idle: {
    scale: 1.2,
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
    }
  },
  reset,
}

export const circleBVariants: Variants = {
  idle: {
    scale: 1.2,
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
  reset,
}

export const circleCVariants: Variants = {
  idle: {
    scale: 1.2,
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
  reset,
}