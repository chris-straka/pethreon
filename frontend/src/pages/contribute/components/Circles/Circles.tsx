import { motion } from "framer-motion"
import styles from "../../../../scss/index.module.scss"

interface CirclesProps {
  animationDelay: number,
  circleAnimationDuration: number
}

export const Circles = ({ animationDelay }: CirclesProps) => {
  return (
    <>

      <motion.div
        className={styles.circleA}
        initial={{
          backgroundColor: "var(--primary)",
          top: "var(--top-contribute)",
          left: "var(--left-contribute)",
          height: "var(--height-contribute)",
          width: "var(--width-contribute)",
          borderRadius: "50%"
        }}
        animate={{
          scale: 1.55,
          x: "2vw",
          y: "2vw"
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.1,
        }}
      />

      <motion.div
        className={styles.circleB}
        initial={{
          backgroundColor: "var(--primary)",
          top: "var(--top-contribute)",
          left: "var(--left-contribute)",
          height: "var(--height-contribute)",
          width: "var(--width-contribute)",
          borderRadius: "50%"
        }}
        animate={{
          scale: 1.55,
          x: "2vw",
          y: "2vw"
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.1,
        }}
      />

      <motion.button
        className={styles.circleC}
        initial={{
          backgroundColor: "var(--primary)",
          top: "var(--top-contribute)",
          left: "var(--left-contribute)",
          height: "var(--height-contribute)",
          width: "var(--width-contribute)",
          borderRadius: "0px",
          borderBottomLeftRadius: "32px"
        }}
        animate={{
          backgroundColor: "var(--secondary)",
          top: "var(--top-contribute)",
          left: "var(--left-contribute)",
        }}
      />

    </>
  )
}