import { CircleAnimationProps } from "../components"

export const LOGIN_FADEOUT_DURATION = 1

// @keyframes circleB_animation {
//   to { transform: scale(95%) translate(2px, 30px); }
// }

// @keyframes circleC_animation {
//   to { transform: scale(150%) translate(-40px, -40px); }
// }

const init = {
  backgroundColor: "var(--primary)",
  x: "var(--X-login)", // x and y are different for each circle
  y: "var(--Y-login)"  // view the circles.module.scss file
}

export const circleAnimationA: CircleAnimationProps = {
  initial: init,
  transition: {
    duration: 8,
    repeat: Infinity,
    repeatType: "reverse",
    repeatDelay: 0.1,
    type: "tween"
  },
  animate: {
    scale: 1.55,
    x: "2vw",
  }
  // exit: {
  //   backgroundColor: "red",
  //   x: "50vw",
  //   y: "50vh"
  // }
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