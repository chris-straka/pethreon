import { motion } from "framer-motion"
import styles from "../../../../scss/index.module.scss"

interface CirclesProps {
  animationDelay: number,
  circleAnimationDuration: number
}

export const Circles = ({ animationDelay, circleAnimationDuration }: CirclesProps) => {
  const lastVisited = localStorage.getItem("lastVisited")
  let exitAnimationX
  let exitAnimationY
  let exitWidth
  let exitHeight

  if (lastVisited === "create") {
    exitAnimationX = "var(--X-create)"
    exitAnimationY = "var(--Y-create)"
    exitHeight = "var(--size-create)"
    exitWidth = "var(--size-create)"
  } else {
    exitAnimationX = "var(--X-contribute)"
    exitAnimationY = "var(--Y-contribute)"
    exitHeight = "var(--size-create)"
    exitWidth = "var(--size-create)"
  }

  return (
    <>

      <motion.div
        className={styles.circleA}
        initial={{
          backgroundColor: "var(--primary)",
          left: "var(--X-login)",
          top: "var(--Y-login)",
          width: "var(--size-login)",
          height: "var(--size-login)"
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
        exit={{
          left: exitAnimationX,
          top: exitAnimationY,
          width: exitWidth,
          height: exitHeight,
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
          x: "var(--X-login)",
          y: "var(--Y-login)",
          width: "var(--size-login)",
          height: "var(--size-login)"
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
          left: exitAnimationX,
          top: exitAnimationY,
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
          x: "var(--X-login)",
          y: "var(--Y-login)",
          width: "var(--size-login)",
          height: "var(--size-login)"
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
          left: exitAnimationX,
          top: exitAnimationY,
          transition: {
            duration: circleAnimationDuration,
            delay: animationDelay
          }
        }}
      />

    </>
  )
}