import { motion } from "framer-motion"
import { ArrowSVG } from "./ArrowSVG/ArrowSVG"
import { CircleAnimationProps } from "..";

interface CircleButtonProps {
  className?: string,
  clickHandler?: (() => void),
  disabled: boolean,
  children?: string,
  circleAnimation: CircleAnimationProps
}

export const CircleButton = ({ className, clickHandler, disabled, children, circleAnimation }: CircleButtonProps) => {
  return (
    <motion.button
      className={className}
      onMouseDown={clickHandler}
      disabled={disabled}
      style={circleAnimation.style}
      animate={circleAnimation.animate}
      initial={circleAnimation.initial}
      transition={circleAnimation.transition}
      exit={circleAnimation.exit}
    >
      {disabled ? null : { children }}
      {disabled ? null : <ArrowSVG />}
    </motion.button >
  )
}