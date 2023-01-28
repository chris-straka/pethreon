import { motion } from "framer-motion"
import { CSSProperties, memo } from "react"
import { useCircleStyles } from "../../../../hooks"
import styles from "./Circles.module.scss"

// In the event where the user is browsing this page for the first time
const defaultStyles: CSSProperties = {
  top: 'var(--top)',
  left: 'var(--left)',
  height: 'var(--height)',
  width: 'var(--width)',
  color: 'var(--color)',
  fill: 'var(--color)',
  backgroundColor: 'var(--background-color)',
}

export const Circles = memo(() => {
  const { circleAStyles, circleBStyles, circleCStyles } = useCircleStyles()

  return (
    <>
      <motion.div
        className={`${styles.circleA} ${styles.circle}`}
        initial={circleAStyles || defaultStyles}
        animate={{ scale: 2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className={`${styles.circleB} ${styles.circle}`}
        initial={circleBStyles || defaultStyles}
        animate={{ scale: 2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className={`${styles.circleC} ${styles.circle}`}
        initial={circleCStyles || defaultStyles}
        animate={{ scale: 2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
    </>
  )
})

