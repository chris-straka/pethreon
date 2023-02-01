import { Variants } from "framer-motion";
import { CIRCLE_ANIMATION_DURATION, PAGE_FADE_IN_DURATION, PAGE_FADE_OUT_DURATION } from "../../constants"

// On the login page, circleA will move to these coordinates
export const variants: Variants = {
  idle: {
    scale: 1.2,
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse"
    }
  },
  login: {
    x: "var(--x-login)",
    y: "var(--y-login)",
    width: "var(--width-login)",
    height: "var(--height-login)",
    scale: 1,

    backgroundColor: "var(--background-color-login)",

    transition: {
      duration: CIRCLE_ANIMATION_DURATION,
      delay: PAGE_FADE_OUT_DURATION,
    }
  },
  contribute: {
    x: "var(--x-contribute)",
    y: "var(--y-contribute)",
    width: "var(--width-contribute)",
    height: "var(--height-contribute)",
    scale: 1,

    backgroundColor: "var(--background-color-contribute)",

    transition: {
      duration: CIRCLE_ANIMATION_DURATION,
      delay: PAGE_FADE_OUT_DURATION,
    }
  },
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

  // circle C
  disappear: {
    display: 'none',
    opacity: 0,
    scale: 1,
    transition: {
      duration: PAGE_FADE_OUT_DURATION,
    }
  },
  reappear: {
    display: 'block',
    opacity: 1,
    transition: {
      duration: PAGE_FADE_IN_DURATION,
      delay: PAGE_FADE_OUT_DURATION + CIRCLE_ANIMATION_DURATION,
    }
  }
}

