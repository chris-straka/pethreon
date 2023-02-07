import { ReactNode } from "react"
import { motion } from "framer-motion"
import { useCloseModalOnEscape } from "../../hooks"

import styles from "./ModalBackdrop.module.scss"

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
export const ModalBackdrop = ({ closeModal, children }: ModalProps) => {
  useCloseModalOnEscape(closeModal)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeModal}
      className={styles.modalBackdrop}
    >
      <div
        className={styles.modalBackground}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </motion.div >
  )
}
