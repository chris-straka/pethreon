import { motion } from "framer-motion"
import { ArrowSVG } from "../../../../svgs"
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
          backgroundColor: "var(--primary-dark)",
          top: "var(--top-contribute)",
          left: "var(--left-contribute)",
          height: "var(--height-contribute)",
          width: "var(--width-contribute)",
          borderRadius: "50%"
        }}
        animate={{
          scale: 1.25,
          x: "2vw",
          y: "2vw"
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.1,
        }}
        exit={{
          top: "var(--top-login)",
          left: "var(--left-login)",
          height: "var(--height-login",
          width: "var(--width-login)"
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
          scale: 1.25,
          x: "2vw",
          y: "2vw"
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.1,
        }}
        exit={{
          top: "var(--top-login)",
          left: "var(--left-login)",
          height: "var(--height-login",
          width: "var(--width-login)"
        }}
      />

      <motion.button
        className={styles.circleC}
        initial={{
          backgroundColor: "var(--secondary)",
          top: "var(--top-contribute)",
          left: "var(--left-contribute)",
          height: "var(--height-contribute)",
          width: "var(--width-contribute)",
          borderBottomLeftRadius: "40px"
        }}
        animate={{}}
        exit={{
          top: "var(--top-login)",
          left: "var(--left-login)",
          height: "var(--height-login",
          width: "var(--width-login)"
        }}
      > Create <ArrowSVG /></motion.button >
    </>
  )
}