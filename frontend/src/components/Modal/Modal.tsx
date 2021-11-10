import { ReactNode } from "react"
import { motion } from "framer-motion"
import { ModalBackdrop } from "../ModalBackdrop/ModalBackdrop"
import styles from "./Modal.module.scss"

interface ModalProps {
  closeModal: (() => void),
  children: ReactNode
}

export const Modal = ({ closeModal, children }: ModalProps) => {

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