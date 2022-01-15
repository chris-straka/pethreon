import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import styles from "./CircleB.module.scss"

interface CircleBProps {
  duration: number,
  delay: number
}

export const CircleB = ({ delay, duration }: CircleBProps) => {
  const location = useLocation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (location.pathname === "/") {
      ref.current?.style.setProperty("top", "var(--top-login)")
      ref.current?.style.setProperty("left", "var(--left-login)")
      ref.current?.style.setProperty("width", "var(--width-login)")
      ref.current?.style.setProperty("height", "var(--height-login)")
      ref.current?.style.setProperty("background-color", "var(--primary)")
      ref.current?.style.setProperty("transition-duration", `${duration}s`)
      ref.current?.style.setProperty("transition-delay", `${delay}s`)
    }

    if (location.pathname === "/contribute") {
      ref.current?.style.setProperty("top", "var(--top-contribute)")
      ref.current?.style.setProperty("left", "var(--left-contribute)")
      ref.current?.style.setProperty("width", "var(--width-contribute)")
      ref.current?.style.setProperty("height", "var(--height-contribute)")
      ref.current?.style.setProperty("background-color", "var(--secondary)")
      ref.current?.style.setProperty("transition-duration", `${duration}s`)
      ref.current?.style.setProperty("transition-delay", `${delay}s`)
    }

    if (location.pathname === "/create") {
      ref.current?.style.setProperty("top", "var(--top-create)")
      ref.current?.style.setProperty("left", "var(--left-create)")
      ref.current?.style.setProperty("width", "var(--width-create)")
      ref.current?.style.setProperty("height", "var(--height-create)")
      ref.current?.style.setProperty("background-color", "var(--primary)")
      ref.current?.style.setProperty("transition-duration", `${duration}s`)
      ref.current?.style.setProperty("transition-delay", `${delay}s`)
    }
  }, [location, duration, delay])

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

