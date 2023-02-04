import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { motion, MotionStyle, useAnimationControls } from "framer-motion"
import { useWindowSize, usePreferredTheme, usePreferredMotion } from "../../hooks"
import { variants } from "./Circle.variants"

import circleAStyles from "./scss/CircleA.module.scss"
import circleBStyles from "./scss/CircleB.module.scss"
import circleCStyles from "./scss/CircleC.module.scss"

export const defaultStyles: MotionStyle = {
  x: "var(--x-login)",
  y: "var(--y-login)",
  width: "var(--width-login)",
  height: "var(--height-login)",
  backgroundColor: "var(--background-color-login)",
  borderRadius: "50%",
  zIndex: 3
}

export const Circles = () => {
  const { pathname: path } = useLocation()
  const a = useAnimationControls()
  const b = useAnimationControls()
  const c = useAnimationControls()

  // I want to run the effect again whenever one of these changes
  const { height, width } = useWindowSize()
  const preferredTheme = usePreferredTheme()
  const preferredMotion = usePreferredMotion()

  useEffect(() => {
    if (path === "/") {
      async function animate() {
        await Promise.all([a.start("login"), b.start("login"), c.start("reappear")])
        a.start("idle")
        b.start("idle")
        c.start("idle")
      }
      animate()
    }

    if (path === "/contribute") {
      async function animate() {
        await Promise.all([a.start("contribute"), b.start("contribute"), c.start("disappear")])
        a.start("idle")
        b.start("idle")
      }
      animate()
    }

    if (path === "/create") {
      async function animate() {
        await Promise.all([a.start("create"), b.start("create"), c.start("disappear")])
        a.start("idle")
        b.start("idle")
      }
      animate()
    }
  }, [a, b, c, path, height, width, preferredTheme, preferredMotion])

  return (
    <>
      <motion.div
        aria-hidden="true"
        className={circleAStyles.circleA}
        variants={variants}
        animate={a}
        style={defaultStyles}
      />

      <motion.div
        aria-hidden="true"
        className={circleBStyles.circleB}
        variants={variants}
        animate={b}
        style={defaultStyles}
      />

      <motion.div
        aria-hidden="true"
        className={circleCStyles.circleC}
        variants={variants}
        animate={c}
        style={defaultStyles}
      />
    </>
  )
}