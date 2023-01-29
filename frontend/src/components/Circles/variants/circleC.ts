import { Variants } from "framer-motion"

import {
  CIRCLE_ANIMATION_DURATION,
  PAGE_FADE_OUT_DURATION as CIRCLE_ANIMATION_DELAY,
  PAGE_FADE_IN_DURATION
} from "../../../constants"

export const cVariants: Variants = {
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
    borderRadius: "50%",
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
    color: "red",
    fill: "red",
    borderRadius: '0%',
    borderBottomLeftRadius: "50px",
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
    color: "red",
    fill: "red",
    borderRadius: '0%',
    borderBottomLeftRadius: "50px",
    scale: 1,

    transition: {
      duration: CIRCLE_ANIMATION_DURATION,
      delay: CIRCLE_ANIMATION_DELAY,
    }
  },
}

export const createVariants = {
  login: {
    color: "transparent",
    fill: "transparent", // this is for the arrow svg inside my circle button
    transition: {
      duration: PAGE_FADE_IN_DURATION
    }
  },
  contribute: {
    color: "var(--text-color)",
    fill: "var(--text-color)",
    transition: {
      duration: PAGE_FADE_IN_DURATION
    }
  },
  create: {
    color: "transparent",
    fill: "transparent", // this is for the arrow svg inside my circle button
    transition: {
      duration: PAGE_FADE_IN_DURATION
    }
  }
}

export const donateVariants = {
  login: {
    color: "transparent",
    fill: "transparent",
    transition: {
      duration: PAGE_FADE_IN_DURATION
    }
  },
  contribute: {
    color: "transparent",
    fill: "transparent",
    transition: {
      duration: PAGE_FADE_IN_DURATION
    }
  },
  create: {
    color: "var(--text-color)",
    fill: "var(--text-color)",
    transition: {
      duration: PAGE_FADE_IN_DURATION
    }
  }
}