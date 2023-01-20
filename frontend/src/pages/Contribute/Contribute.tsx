import { useState, useEffect, useCallback, ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { PledgeType } from "../../utils"
import { UserBalance, UserAddress, Loading, PledgeList, ModalTemplate, WithdrawModal, ActionBar, ActionButton } from "../../components"
import { DepositModal, PledgeModal } from "./components"
import { utils } from "ethers"
import { useWeb3 } from "../../context/Web3Context"
import { DepositSVG, WithdrawSVG, PledgeSVG } from "../../svgs"
import { Pethreon } from "../../../typechain-types"
import styles from "./Contribute.module.scss"

interface ContributeProps {
  fadeInDuration: number,
  fadeInDelay: number,
  fadeOutDuration: number,
  fadeOutDelay: number
}

export const Contribute = (
  { fadeInDuration, fadeInDelay, fadeOutDuration, fadeOutDelay }: ContributeProps
) => {
  const [address, setAddress] = useState("0x0000000000000000000000000000000000000000")
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState("0.0")
  const [pledges, setPledges] = useState<PledgeType[]>([])
  const [modal, setModal] = useState<ReactNode | null>(null)
  const { contract } = useWeb3()
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem("last_page_visited", "contribute")

    if (!contract) navigate("/")

    async function init() {
      try {
        const balance = await grabContributorBalance(contract)
        setBalance(balance)

        const pledges = await contract.getContributorPledges()
        setPledges(pledges)

        const address = await contract.signer.getAddress()
        setAddress(address)
      } catch (error) {
        window.alert(error)
        navigate("/")
      }
    }

    init()
  }, [navigate, contract])

  const closeModal = useCallback(() => setModal(null), [])

  const depositModal = <DepositModal closeModal={closeModal} setBalance={setBalance} setLoading={setLoading} />
  const withdrawModal = <WithdrawModal closeModal={closeModal} setBalance={setBalance} setLoading={setLoading} />
  const pledgeModal = <PledgeModal closeModal={closeModal} setBalance={setBalance} setLoading={setLoading} setPledges={setPledges} />

  return (
    <>
      {loading && <Loading />}
      <motion.div
        className={styles.contributeLayout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: fadeInDuration, delay: fadeInDelay } }}
        exit={{ opacity: 0, transition: { duration: fadeOutDuration, delay: fadeOutDelay } }}
      >
        <UserBalance className={styles.userBalance} balance={balance} />
        <UserAddress className={styles.userAddress} userAccountAddress={address} />
        <ActionBar className={styles.contributorActionBar}>
          <ActionButton onClick={() => setModal(depositModal)}>Deposit <DepositSVG /></ActionButton>
          <ActionButton onClick={() => setModal(withdrawModal)}>Withdraw <WithdrawSVG /></ActionButton>
          <ActionButton onClick={() => setModal(pledgeModal)}>Pledge <PledgeSVG /></ActionButton>
        </ActionBar >
        <PledgeList
          className={styles.pledgeList}
          pledges={pledges}
          textForWhenItsEmpty="You need to make a pledge first..."
          setBalance={setBalance}
          setLoading={setLoading}
          setPledges={setPledges}
        />
      </motion.div>
      <AnimatePresence
        initial={false}
        mode="wait"
      >
        {modal !== null && <ModalTemplate closeModal={() => setModal(null)} children={modal} />}
      </AnimatePresence>
    </>
  )
}

async function grabContributorBalance(contract: Pethreon) {
  const balance = await contract.getContributorBalanceInWei()
  const balanceEther = await utils.formatEther(balance)
  return await balanceEther.toString()
}