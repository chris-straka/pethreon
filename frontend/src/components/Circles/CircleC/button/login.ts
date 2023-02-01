import { Variants } from "framer-motion"
import { CIRCLE_ANIMATION_DURATION, PAGE_FADE_OUT_DURATION } from "../../../../constants"

export const login: Variants = {
  login: {
    x: "var(--x-login)",
    y: "var(--y-login)",
    width: "var(--width-login)",
    height: "var(--height-login)",
    scale: 1,

    borderRadius: "50%",
    backgroundColor: "var(--background-color-login)",

    transition: {
      duration: CIRCLE_ANIMATION_DURATION,
      delay: PAGE_FADE_OUT_DURATION,
    }
  },
  idle: {
    scale: 1.2,
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse"
    }
  },
}
