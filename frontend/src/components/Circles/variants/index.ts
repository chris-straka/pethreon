import { aVariants } from "./circleA"
import { bVariants } from "./circleB"
import { cVariants, createVariants, donateVariants } from "./circleC"

const defaultCircleStyles = {
  top: "var(--top-login)",
  left: "var(--left-login)",
  width: "var(--width-login)",
  height: "var(--height-login)",
  backgroundColor: "var(--background-color-login)",
}

const defaultTextStyles = {
  opacity: 0
}

export {
  defaultCircleStyles,
  defaultTextStyles,
  aVariants,
  bVariants,
  cVariants,
  createVariants,
  donateVariants
}