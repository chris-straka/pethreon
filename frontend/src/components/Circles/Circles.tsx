import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { motion, MotionStyle, useAnimationControls } from "motion/react"
import { useWindowSize, usePreferredTheme, usePreferredMotion } from "../../hooks"
import { variants } from "./Circle.variants"

import circleAStyles from "./css/CircleA.module.css"
import circleBStyles from "./css/CircleB.module.css"
import circleCStyles from "./css/CircleC.module.css"

const defaultStyles: MotionStyle = {
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
    if (preferredMotion === "reduced") return

    // The settle-to-idle calls below run after an await, by which point a quick
    // navigation may already have unmounted these elements. Starting an
    // animation on an unmounted control throws, so bail out if that happened.
    let cancelled = false

    const settle = (...controls: typeof a[]) => {
      if (cancelled) return
      for (const control of controls) control.start("idle")
    }

    const transitions: Record<string, () => Promise<void>> = {
      "/": async () => {
        await Promise.all([a.start("login"), b.start("login"), c.start("reappear")])
        settle(a, b, c)
      },
      "/contribute": async () => {
        await Promise.all([a.start("contribute"), b.start("contribute"), c.start("disappear")])
        settle(a, b)
      },
      "/create": async () => {
        await Promise.all([a.start("create"), b.start("create"), c.start("disappear")])
        settle(a, b)
      },
    }

    // An interrupted animation rejects; that's expected, not an error.
    transitions[path]?.().catch(() => { })

    return () => { cancelled = true }
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