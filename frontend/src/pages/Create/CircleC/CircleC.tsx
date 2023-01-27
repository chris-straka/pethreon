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
  const divRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion)").matches

  useEffect(() => {
    const buttonRefStyles = divRef.current?.style

    // Move it to the correct position
    buttonRefStyles?.setProperty("top", "var(--top-login)")
    buttonRefStyles?.setProperty("left", "var(--left-login)")
    buttonRefStyles?.setProperty("width", "var(--width-login)")
    buttonRefStyles?.setProperty("height", "var(--height-login)")

    // Shape it back into a circle and set the color
    buttonRefStyles?.setProperty("border-radius", "50%")
    buttonRefStyles?.setProperty("background-color", "var(--circle-c-login-background-color)")

    // Make sure the circle moves this quickly
    buttonRefStyles?.setProperty("--circle-animation-duration", `${circleAnimationDuration}s`)
    buttonRefStyles?.setProperty("--circle-animation-delay", `${circleAnimationDelay}s`)

  }, [circleAnimationDuration, circleAnimationDelay])

  return (
    <motion.div
      aria-hidden
      className={styles.circleC}
      ref={divRef}
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