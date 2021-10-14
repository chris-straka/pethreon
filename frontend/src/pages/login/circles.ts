import { CircleAnimationProps } from "../../components/Circles"
import { LOGIN_FADEOUT_DURATION } from "./login"

export const circleAnimationA: CircleAnimationProps = {
  initial: false,
  transition: { 
    delay: LOGIN_FADEOUT_DURATION,
    duration: 3 
  },
  animate: {
    backgroundColor: "var(--primary)",
    x: "var(--circleA-X)",
    y: "var(--circleA-Y)"
  },
  exit: {
    backgroundColor: "var(--primary-light)",
    x: "17vw",
    y: "80vh"
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