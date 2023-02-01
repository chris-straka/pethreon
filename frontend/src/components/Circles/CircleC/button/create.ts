import { Variants } from "framer-motion";
import { CIRCLE_ANIMATION_DURATION, PAGE_FADE_OUT_DURATION } from "../../../../constants"

export const create: Variants = {
  create: {
    x: "var(--x-button)",
    y: "var(--y-button)",
    width: "var(--width-button)",
    height: "var(--height-button)",
    scale: 1,

    borderRadius: '0 0 0 50px',
    backgroundColor: "var(--background-color-button)",

    transition: {
      duration: CIRCLE_ANIMATION_DURATION,
      delay: PAGE_FADE_OUT_DURATION,
    }
  },
}
