import { motion } from "framer-motion"
import styles from "../../../../scss/index.module.scss"

interface CirclesProps {
  animationDelay: number,
  circleAnimationDuration: number
}

export const Circles = ({ animationDelay, circleAnimationDuration }: CirclesProps) => {

  return (
    <>

      <motion.div
        className={styles.circleA}
        initial={{
          backgroundColor: "var(--primary)",
          top: "var(--top-login)",
          left: "var(--left-login)",
          width: "var(--width-login)",
          height: "var(--height-login)",
          position: "fixed",
          borderRadius: "50%"
        }}
        animate={{
          scale: 1.55,
          x: "2vw",
          y: "2vh"
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.1,
        }}
        exit={{
          scale: 1,
          backgroundColor: "var(--primary-dark)",
          left: "var(--left-contribute)",
          top: "var(--top-contribute)",
          width: "var(--width-contribute)",
          height: "var(--height-contribute)",
          transition: {
            duration: circleAnimationDuration,
            delay: animationDelay
          }
        }}
      />

      <motion.div
        className={styles.circleB}
        initial={{
          backgroundColor: "var(--primary)",
          top: "var(--top-login)",
          left: "var(--left-login)",
          width: "var(--width-login)",
          height: "var(--height-login)",
          position: "fixed",
          borderRadius: "50%"
        }}
        animate={{
          x: "2vw",
          y: "2vw"
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.1
        }}
        exit={{
          scale: 1,
          left: "var(--left-contribute)",
          top: "var(--top-contribute)",
          width: "var(--width-contribute)",
          height: "var(--height-contribute)",
          transition: {
            duration: circleAnimationDuration,
            delay: animationDelay
          }
        }}
      />

      <motion.button
        className={styles.circleC}
        disabled={true}
        initial={{
          backgroundColor: "var(--primary)",
          top: "var(--top-login)",
          left: "var(--left-login)",
          height: "var(--height-login)",
          width: "var(--width-login)",
          position: "fixed",
          borderRadius: "999px",
        }}
        animate={{
          scale: 1.55,
          x: "2vw",
          y: "2vw"
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.1
        }}
        exit={{
          scale: 1,
          backgroundColor: "var(--secondary)",
          left: "var(--left-contribute)",
          top: "var(--top-contribute)",
          width: "var(--width-contribute)",
          height: "var(--height-contribute)",
          borderRadius: "0px",
          borderBottomLeftRadius: "40px",
          transition: {
            ease: "easeInOut",
            duration: circleAnimationDuration,
            delay: animationDelay,
          }
        }}
      />

    </>
  )
}