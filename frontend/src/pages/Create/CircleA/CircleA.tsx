import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import styles from "./CircleA.module.scss"

interface CircleAProps {
  circleAnimationDuration: number,
  circleAnimationDelay: number
}

export const CircleA = ({ circleAnimationDuration, circleAnimationDelay }: CircleAProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion)").matches

  useEffect(() => {
    const refStyle = ref.current?.style

    if (!refStyle) return

    refStyle.top = "var(--top-login)"
    refStyle.left = "var(--left-login)"
    refStyle.width = "var(--width-login)"
    refStyle.height = "var(--height-login)"

    refStyle.transitionDuration = `${circleAnimationDuration}s`
    refStyle.transitionDelay = `${circleAnimationDelay}s`

  }, [circleAnimationDuration, circleAnimationDelay])

  return (
    <motion.div
      aria-hidden
      className={styles.circleA}
      ref={ref}
      animate={{ scale: 1.2 }}
      transition={
        prefersReducedMotion ? {} : {
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }
      }
    />
  )
}