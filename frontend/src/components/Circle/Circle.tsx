import { memo } from "react"
import { motion, AnimationControls, TargetAndTransition, VariantLabels, Transition } from "framer-motion"
import styles from "./Circle.module.scss"

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion)").matches

interface CircleProps {
  /** 
   * The styles the circle starts off with
   * The can show up in different places depending on what page the user just came from.
   * The default coordinates are specified in the Circle.module.scss file.
   */
  initial: any;

  /** 
   * This is how quickly the circle will move from its starting position to its final location
   */
  circleAnimationDuration: number

  /** 
   * This is how long the circle will wait at its starting position before moving to its final position
   */
  circleAnimationDelay: number

  /** 
   * Each className is a different circle with its own values for --top, --left...
   */
  className: string

  // These properties are for framer motion
  animate: boolean | AnimationControls | TargetAndTransition | VariantLabels | undefined
  transition: Transition | undefined
}

export const Circle = memo(({
  initial,
  className,
  animate,
  transition
}: CircleProps
) => {
  return (
    <motion.div
      aria-hidden
      className={`${styles.circle} ${className}`}
      animate={animate}
      transition={prefersReducedMotion ? {} : transition}
    />
  )
})