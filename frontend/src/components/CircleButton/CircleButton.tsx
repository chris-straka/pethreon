import { motion } from "framer-motion"
import { ArrowSVG } from "./ArrowSVG/ArrowSVG"

interface CircleButtonProps {
  className?: string,
  clickHandler?: () => void,
  disabled: boolean,
  children?: string,
  animate?: any,
  style?: any,
  initial?: any,
  exit?: any,
  transition?: any
}

export const CircleButton = ({ className, clickHandler, disabled, children, animate, style, initial, transition }: CircleButtonProps) => {
  return (
    <motion.button
      className={className}
      onMouseDown={clickHandler}
      disabled={disabled}
      animate={animate}
      style={style}
      initial={initial}
      transition={transition}
    >
      {children}
      <ArrowSVG />
    </motion.button >
  )
}