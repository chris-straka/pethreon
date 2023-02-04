import { ReactNode } from "react"
import { motion } from "framer-motion"
import { useCloseModalOnEscape } from "../../hooks"

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
      style={{
        position: "fixed",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0,
        minHeight: '100%',
        width: '100%',
        backgroundColor: 'var(--modal-backdrop-color)',
        zIndex: '5'
      }}
    >
      {children}
    </motion.div >
  )
}
