import { useState, useEffect, useCallback, ReactNode } from "react"
import { utils } from "ethers"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ActionBar, ActionButton, Loading, PledgeList, ModalTemplate, UserBalance, UserAddress, WithdrawModal } from "../../components"
import { PledgeType } from "../../types"
import { WithdrawSVG, CsvSVG } from "../../svgs"
import { useWeb3 } from "../../hooks"
import { extractPledgesToCsv } from "./utils"
import { Circles } from "./components"
import {
  CIRCLE_ANIMATION_DURATION as PAGE_FADE_IN_DELAY,
  PAGE_FADE_IN_DURATION,
  PAGE_FADE_OUT_DURATION
} from "../../constants"

import styles from "./Create.module.scss"


export const Create = () => {
  const [address, setAddress] = useState("0x0000000000000000000000000000000000000000")
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState("0.0")
  const [pledges, setPledges] = useState<PledgeType[]>([])
  const [modal, setModal] = useState<ReactNode | null>(null)
  const { contract } = useWeb3()

  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem("last_page_visited", "create")

    async function init() {
      try {
        const balance = await contract.getCreatorBalanceInWei()
        const balanceEther = await utils.formatEther(balance)
        const balanceEtherString = await balanceEther.toString()
        setBalance(balanceEtherString)

        const pledges = await contract.getCreatorPledges()
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

  const withdrawModal = <WithdrawModal
    closeModal={closeModal}
    setLoading={setLoading}
    setBalance={setBalance} />

  return (
    <>
      <Circles />
      <motion.div
        className={styles.createLayout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: PAGE_FADE_IN_DELAY, duration: PAGE_FADE_IN_DURATION } }}
        exit={{ opacity: 0, transition: { duration: PAGE_FADE_OUT_DURATION } }}
      >
        {loading ? <Loading /> : <UserBalance className={styles.userBalance} balance={balance} />}
        <UserAddress
          className={styles.userAddress}
          userAccountAddress={address}
        />
        <ActionBar className={`${styles.actionBar} ${styles.creatorActionBar}`}>
          <ActionButton
            className={styles.actionButton}
            onClick={() => setModal(withdrawModal)}>
            Withdraw <WithdrawSVG />
          </ActionButton>
          <ActionButton
            className={styles.actionButton}
            onClick={async () => await extractPledgesToCsv(contract, pledges)}
          >
            Extract to CSV <CsvSVG />
          </ActionButton>
        </ActionBar>
        <PledgeList
          creator
          className={styles.pledgeList}
          textForWhenItsEmpty="Nobody has pledged to you yet..."
          pledges={pledges}
          setBalance={setBalance}
          setLoading={setLoading}
          setPledges={setPledges}
        />
      </motion.div>
      <AnimatePresence initial={false} mode="wait">
        {modal !== null && <ModalTemplate closeModal={closeModal} children={modal} />}
      </AnimatePresence>
    </>
  )
}
