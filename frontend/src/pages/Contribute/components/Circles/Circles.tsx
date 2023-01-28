import { motion } from "framer-motion"
import styles from "Circles.module.scss"

export const Circles = () => {
  return (
    <>
      <motion.div
        className={styles.circleA}
        animate={{ scale: 1.2 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className={styles.circleB}
        animate={{ scale: 1.2, x: 2, y: 2 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.button className={styles.circleC} />
    </>
  )
}