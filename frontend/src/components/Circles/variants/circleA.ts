import { Variants } from "framer-motion"

import {
  CIRCLE_ANIMATION_DURATION,
  PAGE_FADE_OUT_DURATION as CIRCLE_ANIMATION_DELAY
} from "../../../constants"

export const aVariants: Variants = {
  idle: {
    scale: 1.2,
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse"
    }
  },
  login: {
    top: "var(--top-login)",
    left: "var(--left-login)",
    width: "var(--width-login)",
    height: "var(--height-login)",
    backgroundColor: "var(--background-color-login)",
    scale: 1,

    transition: {
      duration: CIRCLE_ANIMATION_DURATION,
      delay: CIRCLE_ANIMATION_DELAY,
    }
  },
  contribute: {
    top: "var(--top-contribute)",
    left: "var(--left-contribute)",
    width: "var(--width-contribute)",
    height: "var(--height-contribute)",
    backgroundColor: "var(--background-color-contribute)",
    scale: 1,

    transition: {
      duration: CIRCLE_ANIMATION_DURATION,
      delay: CIRCLE_ANIMATION_DELAY,
    }
  },
  create: {
    top: "var(--top-create)",
    left: "var(--left-create)",
    width: "var(--width-create)",
    height: "var(--height-create)",
    backgroundColor: "var(--background-color-create)",
    scale: 1,

    transition: {
      duration: CIRCLE_ANIMATION_DURATION,
      delay: CIRCLE_ANIMATION_DELAY,
    }
  },
}
