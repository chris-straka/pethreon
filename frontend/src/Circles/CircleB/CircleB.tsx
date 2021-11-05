import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import styles from "./CircleB.module.scss"

interface CircleBProps {
  delay: number,
  duration: number
}

export const CircleB = ({ delay, duration }: CircleBProps) => {
  const location = useLocation()
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (location.pathname === "/") {
      ref.current?.style.setProperty("top", "var(--top-login)")
      ref.current?.style.setProperty("left", "var(--left-login)")
      ref.current?.style.setProperty("width", "var(--width-login)")
      ref.current?.style.setProperty("height", "var(--height-login)")
      ref.current?.style.setProperty("background-color", "var(--primary)")
    }

    if (location.pathname === "/contribute") {
      ref.current?.style.setProperty("top", "var(--top-contribute)")
      ref.current?.style.setProperty("left", "var(--left-contribute)")
      ref.current?.style.setProperty("width", "var(--width-contribute)")
      ref.current?.style.setProperty("height", "var(--height-contribute)")
      ref.current?.style.setProperty("background-color", "var(--primary-dark)")
    }

    if (location.pathname === "/create") {
      ref.current?.style.setProperty("top", "var(--top-create)")
      ref.current?.style.setProperty("left", "var(--left-create)")
      ref.current?.style.setProperty("width", "var(--width-create)")
      ref.current?.style.setProperty("height", "var(--height-create)")
      ref.current?.style.setProperty("background-color", "var(--secondary-dark)")
    }
  }, [location])

  return (
    <motion.div
      className={styles.circleB}
      ref={ref}
    />
  )
}

