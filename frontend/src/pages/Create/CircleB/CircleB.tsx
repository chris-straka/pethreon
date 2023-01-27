import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import styles from "./CircleB.module.scss"

interface CircleBProps {
  circleAnimationDuration: number,
  circleAnimationDelay: number
}

export const CircleB = ({ circleAnimationDelay, circleAnimationDuration }: CircleBProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion)").matches

  useEffect(() => {
    const refStyle = ref.current?.style
    const prefersLightTheme = window.matchMedia("(prefers-color-scheme: light)").matches;
    if (!refStyle) return

    /** 
     * I didn't inline the CSS vars because they change depending on the screen size (@media)
     */
    refStyle.top = "var(--top-login)"
    refStyle.left = "var(--left-login)"
    refStyle.width = "var(--width-login)"
    refStyle.height = "var(--height-login)"

    refStyle.transitionDuration = `${circleAnimationDuration}s`
    refStyle.transitionDelay = `${circleAnimationDelay}s`

    prefersLightTheme ?
      refStyle.backgroundColor = "var(--primary-light-color)" :
      refStyle.backgroundColor = "var(--primary-color)"

  }, [circleAnimationDuration, circleAnimationDelay])

  return (
    <motion.div
      aria-hidden 
      className={styles.circleB}
      ref={ref}
      animate={{ scale: 1.2, x: 2, y: 2 }}
      transition={
        prefersReducedMotion ? {} : {
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
    />
  )
}

