import { motion, TargetAndTransition, AnimationControls, VariantLabels } from "framer-motion"
import { variants } from "./variants"

import styles from "./CircleA.module.scss"

interface CircleAProps {
  animate: boolean | TargetAndTransition | AnimationControls | VariantLabels | undefined
}

export const CircleA = ({ animate }: CircleAProps) => {
  return (
    <motion.div
      aria-hidden="true"
      className={styles.circleA}
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