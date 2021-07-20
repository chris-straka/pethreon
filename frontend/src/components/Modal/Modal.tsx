import { ReactNode } from "react"
import { createPortal } from "react-dom"
import "./Modal.css"

interface ModalProps {
  open: boolean,
  onClose: () => void,
  children: ReactNode
}

export const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null

  return createPortal(
    <>
      <div className="modalOverlay" onClick={onClose} />
      <div className="modal">
        <button className="X" onClick={onClose}>X</button>
        {children}
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  )
}