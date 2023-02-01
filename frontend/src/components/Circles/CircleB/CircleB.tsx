import { motion, TargetAndTransition, AnimationControls, VariantLabels } from "framer-motion"
import { variants } from "./variants"
import styles from "./CircleB.module.scss"

interface CircleBProps {
  animate: boolean | TargetAndTransition | AnimationControls | VariantLabels | undefined
}

export const CircleB = ({ animate }: CircleBProps) => {
  return (
    <motion.div
      aria-hidden="true"
      className={styles.circleB}
      variants={variants}
      animate={animate}
      style={{
        x: "var(--x-login)",
        y: "var(--y-login)",
        width: "var(--width-login)",
        height: "var(--height-login)",
        backgroundColor: "var(--background-color-login)",
      }}
    />
  )
}