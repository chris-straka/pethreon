import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import styles from "./CircleB.module.scss"

interface CircleBProps {
  circleAnimationDuration: number,
  circleAnimationDelay: number
}

export const CircleB = ({ circleAnimationDelay, circleAnimationDuration }: CircleBProps) => {
  const { pathname } = useLocation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const refStyle = ref.current?.style
    const prefersLightTheme = window.matchMedia("(prefers-color-scheme: light)").matches;
    if (!refStyle) return

    /** 
     * I didn't inline the CSS vars because they change depending on the screen size (@media)
     */
    if (pathname === "/") {
      refStyle.top = "var(--top-login)"
      refStyle.left = "var(--left-login)"
      refStyle.width = "var(--width-login)"
      refStyle.height = "var(--height-login)"

      refStyle.transitionDuration = `${circleAnimationDuration}s`
      refStyle.transitionDelay = `${circleAnimationDelay}s`

      prefersLightTheme ?
        refStyle.backgroundColor = "var(--primary-color)" :
        refStyle.backgroundColor = "var(--primary-color)"
    }

    if (pathname === "/contribute") {
      refStyle.top = "var(--top-contribute)"
      refStyle.left = "var(--left-contribute)"
      refStyle.width = "var(--width-contribute)"
      refStyle.height = "var(--height-contribute)"

      refStyle.transitionDuration = `${circleAnimationDuration}s`
      refStyle.transitionDelay = `${circleAnimationDelay}s`

      prefersLightTheme ?
        refStyle.backgroundColor = "var(--secondary-color)" :
        refStyle.backgroundColor = "var(--secondary-color)"
    }

    if (pathname === "/create") {
      refStyle.top = "var(--top-create)"
      refStyle.left = "var(--left-create)"
      refStyle.width = "var(--width-create)"
      refStyle.height = "var(--height-create)"

      refStyle.transitionDuration = `${circleAnimationDuration}s`
      refStyle.transitionDelay = `${circleAnimationDelay}s`

      prefersLightTheme ?
        refStyle.backgroundColor = "var(--primary-dark-color)" :
        refStyle.backgroundColor = "var(--primary-dark-color)"
    }
  }, [pathname, circleAnimationDuration, circleAnimationDelay])

  return (
    <motion.div
      aria-hidden // idk if divs are included in the a11y tree but I don't want screen readers to read this
      className={styles.circleB}
      ref={ref}
      animate={{
        scale: 1.2,
        x: 2,
        y: 2
      }}
      transition={
        window.matchMedia("(prefers-reduced-motion)").matches ? {} : { // a11y
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
    />
  )
}

