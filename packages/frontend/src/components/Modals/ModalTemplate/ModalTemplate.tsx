import { ReactNode } from "react"
import { motion } from "framer-motion"
import { ModalBackdrop } from "./ModalBackdrop"
import styles from "./ModalTemplate.module.scss"

interface ModalProps {
  closeModal: (() => void),
  children: ReactNode
}

/**
 * This component is a wrapper template for all the modals in my 
 * contribute & create folders.
 * 
 * @param children - I pass in the modal I want here
 */
export const ModalTemplate = ({ closeModal, children }: ModalProps) => {
  return (
    <ModalBackdrop onClick={closeModal}>
      <motion.div
        onClick={e => e.stopPropagation()}
        className={styles.modal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </ModalBackdrop >
  )
}