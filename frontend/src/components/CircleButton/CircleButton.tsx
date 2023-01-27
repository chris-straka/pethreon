import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowSVG } from "../../svgs";

interface CircleButtonProps {

}

export const CircleButton = ({
  
}: CircleButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const createSpanRef = useRef<HTMLSpanElement>(null);
  const donateSpanRef = useRef<HTMLSpanElement>(null);

  return (
    <motion.button
      ref={buttonRef}
    >
      <span ref={donateSpanRef}>Donate <ArrowSVG /></span>
      <span ref={createSpanRef}>Create <ArrowSVG /></span>
    </motion.button>
  )
}