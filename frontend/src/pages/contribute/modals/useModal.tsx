import { useEffect } from "react"
import { DepositModal, PledgeModal, WithdrawModal } from "./index"

interface useModalProps {
  currentModal: any,
  setModalBody: any,
  setCurrentModal: any,
  setLoading: any,
  setBalance: any, 
  setPledges: any
}

export const useModal = ({ currentModal, setModalBody, setCurrentModal, setLoading, setBalance, setPledges }: useModalProps) => {
  useEffect(() => {
    const depositModal = <DepositModal closeModal={() => setCurrentModal("")} setLoading={setLoading} setBalance={setBalance} />;
    const withdrawModal = <WithdrawModal closeModal={() => setCurrentModal("")} setLoading={setLoading} setBalance={setBalance} />;
    const pledgeModal = <PledgeModal closeModal={() => setCurrentModal("")} setLoading={setLoading} setBalance={setBalance} setPledges={setPledges} />;

    if (currentModal === "") {
      return
    } else if (currentModal === "deposit") {
      setModalBody(depositModal)
    } else if (currentModal === "withdraw") {
      setModalBody(withdrawModal)
    } else if (currentModal === "pledge") {
      setModalBody(pledgeModal)
    }
    return () => { setModalBody(null) }
  }, [currentModal, setLoading, setBalance, setPledges])
}