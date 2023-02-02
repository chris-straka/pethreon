import { useEffect, useReducer } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ethers } from "ethers"
import { ActionBar, ActionButton, ModalTemplate, Loading, Nav, PledgeList, UserBalance, UserAddress, WithdrawModal } from "../../components"
import { CIRCLE_ANIMATION_DURATION, PAGE_FADE_IN_DURATION, PAGE_FADE_OUT_DURATION } from "../../constants"
import { DepositModal, PledgeModal } from "./components"
import { DepositSVG, WithdrawSVG, PledgeSVG, ArrowSVG } from "../../svgs"
import { useWeb3 } from "../../hooks"
import { reducer, initialState } from "./reducers/contribute"

import styles from "./Contribute.module.scss"

export const Contribute = () => {
  const [{ address, loading, balance, pledges, modal }, dispatch] = useReducer(reducer, initialState)
  const { contract } = useWeb3()
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem("last_page_visited", "contribute")

    async function init() {
      try {
        const [balanceInWei, pledges, address] = await Promise.all([
          contract.getContributorBalanceInWei(),
          contract.getContributorPledges(),
          contract.signer.getAddress()
        ])

        const balance = await ethers.utils.formatEther(balanceInWei).toString();
        dispatch({ type: "setUI", payload: { balance, pledges, address, loading: false } })

      } catch (error) {
        throw new Error(error as any)
      }
    }

    init()
  }, [contract, navigate])

  const depositModal = <DepositModal
    closeModal={closeModal}
    setBalance={setBalance}
    setLoading={setLoading}
  />

  const withdrawModal = <WithdrawModal
    closeModal={closeModal}
    setBalance={setBalance}
    setLoading={setLoading}
  />

  const pledgeModal = <PledgeModal
    closeModal={closeModal}
    setBalance={setBalance}
    setLoading={setLoading}
    setPledges={setPledges}
  />

  return (
    <>
      <motion.main
        className={styles.contributeLayout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: PAGE_FADE_IN_DURATION, delay: CIRCLE_ANIMATION_DURATION } }}
        exit={{ opacity: 0, transition: { duration: PAGE_FADE_OUT_DURATION } }}
      >
        <Nav className={styles.nav} to="/create">Create <ArrowSVG /></Nav>
        {loading ? <Loading /> : <UserBalance className={styles.userBalance} balance={balance} />}
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
      </motion.main>
      <AnimatePresence initial={false} mode="wait">
        {modal !== null && <ModalTemplate closeModal={closeModal} children={modal} />}
      </AnimatePresence>
    </>
  )
}
