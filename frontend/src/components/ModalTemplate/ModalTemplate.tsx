import { useEffect, ReactNode } from "react"
import { motion } from "framer-motion"
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

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal()
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return (
    <ModalBackdrop closeModal={closeModal}>
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

interface ModalProps {
  children: ReactNode,
  closeModal: (() => void)
}

function ModalBackdrop({ children, closeModal }: ModalProps) {
  return (
    <motion.div
      className={styles.modalBackdrop}
      onClick={closeModal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}