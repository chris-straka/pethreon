import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import styles from "./CircleA.module.scss"

interface CircleAProps {
  duration: number,
  delay: number
}

export const CircleA = ({ duration, delay }: CircleAProps) => {
  const location = useLocation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (location.pathname === "/") {
      ref.current?.style.setProperty("top", "var(--top-login)")
      ref.current?.style.setProperty("left", "var(--left-login)")
      ref.current?.style.setProperty("width", "var(--width-login)")
      ref.current?.style.setProperty("height", "var(--height-login)")
      ref.current?.style.setProperty("background-color", "var(--primary-color)")
      ref.current?.style.setProperty("transition-duration", `${duration}s`)
      ref.current?.style.setProperty("transition-delay", `${delay}s`)
    }

    if (location.pathname === "/contribute") {
      ref.current?.style.setProperty("top", "var(--top-contribute)")
      ref.current?.style.setProperty("left", "var(--left-contribute)")
      ref.current?.style.setProperty("width", "var(--width-contribute)")
      ref.current?.style.setProperty("height", "var(--height-contribute)")
      ref.current?.style.setProperty("background-color", "var(--secondary-dark-color)")
      ref.current?.style.setProperty("transition-duration", `${duration}s`)
      ref.current?.style.setProperty("transition-delay", `${delay}s`)
    }

    if (location.pathname === "/create") {
      ref.current?.style.setProperty("top", "var(--top-create)")
      ref.current?.style.setProperty("left", "var(--left-create)")
      ref.current?.style.setProperty("width", "var(--width-create)")
      ref.current?.style.setProperty("height", "var(--height-create)")
      ref.current?.style.setProperty("background-color", "var(--primary-color)")
      ref.current?.style.setProperty("transition-duration", `${duration}s`)
      ref.current?.style.setProperty("transition-delay", `${delay}s`)
    }
  }, [location, duration, delay])

  return (
    <motion.div
      aria-hidden // idk if divs are included in the a11y tree but I don't want screen readers to read this
      className={styles.circleA}
      ref={ref}
      animate={{
        scale: 1.2
      }}
      transition={
        window.matchMedia("(prefers-reduced-motion)").matches ? {} : { // a11y
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }
      }
    />
  )
}