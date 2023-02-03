import { useEffect } from "react"

type CloseModalFunc = (() => void)

export const useCloseModalOnEscape = (closeModal: CloseModalFunc) => {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeModal();
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);
}