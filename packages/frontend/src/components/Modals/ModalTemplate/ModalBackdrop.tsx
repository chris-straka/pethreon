import { ReactNode } from "react"
import { motion } from "framer-motion"
import styles from "./ModalBackdrop.module.scss"

interface ModalProps {
  children: ReactNode,
  onClick: (() => void)
}

export const ModalBackdrop = ({ children, onClick }: ModalProps) => {
  return (
    <motion.div
      className={styles.modalBackdrop}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}