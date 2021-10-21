import { CircleAnimationProps } from "../../Circles"

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
    backgroundColor: "var(--primary-light)",
    x: "var(--X-contribute)",
    y: "var(--Y-contribute)"
  }
}

export const circleAnimationB: CircleAnimationProps = {
  initial: false,
  transition: {
    delay: LOGIN_FADEOUT_DURATION,
    duration: 3
  },
  animate: {
    backgroundColor: "var(--primary)",
    x: "var(--circleB-X)",
    y: "var(--circleB-Y)"
  },
  exit: {
    backgroundColor: "var(--primary-dark)",
    x: "",
    y: ""
  }
}

export const circleAnimationC: CircleAnimationProps = {
  initial: false,
  transition: {
    delay: LOGIN_FADEOUT_DURATION,
    duration: 3
  },
  animate: {
    backgroundColor: "var(--primary)",
    x: "var(--circleC-X)",
    y: "var(--circleC-Y)"
  },
  exit: {
    backgroundColor: "var(--secondary)",
    x: "",
    y: ""
  }
}