import { memo } from "react"
import { motion } from "framer-motion"
import { circleAVariants, circleBVariants, circleCVariants } from "./Circles.variants"
import styles from "./Circles.module.scss"

const defaultStyles = {
  top: 'var(--top)',
  left: 'var(--left)',
  height: 'var(--height)',
  width: 'var(--width)',
  backgroundColor: 'var(--background-color)',
}

export const Circles = memo(() => {

  return (
    <>
      <motion.div
        aria-hidden
        className={`${styles.circle} ${styles.circleA}`}
        style={defaultStyles}
        variants={circleAVariants}
        animate="idle"
      />
      <motion.div
        aria-hidden
        className={`${styles.circle} ${styles.circleB}`}
        style={defaultStyles}
        variants={circleBVariants}
        animate="idle"
      />
      <motion.div
        aria-hidden
        className={`${styles.circle} ${styles.circleC}`}
        style={defaultStyles}
        variants={circleCVariants}
        animate="idle"
      />
    </>
  )
})

