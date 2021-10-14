import { motion } from 'framer-motion';
import { CircleAnimationProps } from '..';

interface CircleProps {
  className?: any,
  circleAnimation: CircleAnimationProps
}

export const Circle = ({ className, circleAnimation }: CircleProps) => {
  return (
    <motion.div
      className={className}
      style={circleAnimation.style}
      animate={circleAnimation.animate}
      initial={circleAnimation.initial}
      transition={circleAnimation.transition}
      exit={circleAnimation.exit}
    ></motion.div>
  )
}
