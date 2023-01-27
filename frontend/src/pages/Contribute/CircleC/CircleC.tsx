import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import styles from "./CircleC.module.scss"

interface CircleCProps {
  circleAnimationDuration: number,
  circleAnimationDelay: number,
  pageFadeOutDuration: number,
  pageFadeInDuration: number
}

/** 
 * This is the ugliest component I ever made 
 */
export const CircleC = ({
  circleAnimationDuration,
  circleAnimationDelay,
  pageFadeOutDuration,
  pageFadeInDuration
}: CircleCProps
) => {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion)").matches

  useEffect(() => {
    const styles = ref.current?.style

    // Move it to the correct position
    styles?.setProperty("top", "var(--top-login)")
    styles?.setProperty("left", "var(--left-login)")
    styles?.setProperty("width", "var(--width-login)")
    styles?.setProperty("height", "var(--height-login)")

    // Shape it back into a circle and set the color
    styles?.setProperty("border-radius", "50%")
    styles?.setProperty("background-color", "var(--circle-c-login-background-color)")

    // Make sure the circle moves this quickly
    styles?.setProperty("--circle-animation-duration", `${circleAnimationDuration}s`)
    styles?.setProperty("--circle-animation-delay", `${circleAnimationDelay}s`)

  }, [circleAnimationDuration, circleAnimationDelay])

  return (
    <motion.button
      aria-hidden
      className={styles.circleC}
      ref={ref}
      animate={
        prefersReducedMotion ? {} : {
          scale: 1.25,
          transition: {
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }
      }
    />
  )
}