import { motion } from 'framer-motion';

interface CircleProps {
  className?: any,
  animate?: any,
  style?: any,
  initial?: any,
  exit?: any,
  transition?: any
}

export const Circle = ({ className, animate, style, initial, exit }: CircleProps) => {
  return (
    <motion.div
      className={className}
      animate={animate}
      style={style}
      initial={initial}
      exit={exit}
    ></motion.div>
  )
}
