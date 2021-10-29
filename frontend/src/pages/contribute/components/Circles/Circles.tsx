import { motion } from "framer-motion"
import styles from "../../../../scss/index.module.scss"

interface CirclesProps {
  animationDelay: number
}

export const Circles = ({ animationDelay }: CirclesProps) => {
  return (
    <>

      <motion.div
        className={styles.circleA}
        initial={{
          backgroundColor: "var(--primary)",
          x: "var(--X-contribute)",
          y: "var(--Y-contribute)"
        }}
        animate={{}}
        transition={{}}
      />

      <motion.div
        className={styles.circleB}
        initial={{
          backgroundColor: "var(--primary)",
          x: "var(--X-contribute)",
          y: "var(--Y-contribute)"
        }}
        transition={{}}
        animate={{}}
        exit={{}}
      />

      <motion.button
        className={styles.circleC}
        initial={{
          backgroundColor: "var(--primary)",
          x: "var(--X-contribute)",
          y: "var(--Y-contribute)"
        }}
        transition={{}}
        animate={{}}
        exit={{}}
      />

    </>
  )
}