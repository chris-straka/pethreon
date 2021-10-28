import { motion } from "framer-motion"
import styles from "../../../../scss/index.module.scss"

interface CirclesProps {
  animationDelay: number
}

export const Circles = ({ animationDelay }: CirclesProps) => {
  const lastVisited = localStorage.getItem("lastVisited")
  // let exitAnimationX
  // let exitAnimationY

  // if (lastVisited === "create") {
  //   exitAnimationX = "var(--X-create)"
  //   exitAnimationY = "var(--Y-create)"
  // } else {
  //   exitAnimationX = "var(--X-contribute)"
  //   exitAnimationY = "var(--Y-contribute)"
  // }

  return (
    <>

      <motion.div
        className={styles.circleA}
        initial={{
          backgroundColor: "var(--primary)",
          x: "var(--X-login)",
          y: "var(--Y-login)"
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
          x: "var(--X-contribute)",
          y: "var(--Y-contribute)",
          transition: {
            duration: 5,
            delay: animationDelay
          }
        }}
      />

      {/* <motion.div
        className={styles.circleB}
        initial={{
          backgroundColor: "var(--primary)",
          x: "var(--X-login)",
          y: "var(--Y-login)"
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
          x: exitAnimationX,
          y: exitAnimationY,
          transition: {
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
          y: "var(--Y-login)"
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
          x: exitAnimationX,
          y: exitAnimationY,
          transition: {
            delay: animationDelay
          }
        }}
      /> */}

    </>
  )
}