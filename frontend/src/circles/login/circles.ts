import { CircleAnimationProps } from "../components"
export const LOGIN_FADEOUT_DURATION = 1

export const circleAnimationA: CircleAnimationProps = {
  initial: false,
  transition: {
    delay: LOGIN_FADEOUT_DURATION,
    duration: 6
  },
  animate: {
    backgroundColor: "var(--primary)",
    x: "var(--X)",
    y: "var(--Y)"
  },
  exit: {
    // backgroundColor: "red",
    x: "50vw",
    y: "50vh"
  }
}
