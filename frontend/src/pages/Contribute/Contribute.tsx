import { useEffect, useReducer } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ethers } from "ethers"
import type { PledgeType } from "../../types"
import { CIRCLE_ANIMATION_DURATION, PAGE_FADE_IN_DURATION, PAGE_FADE_OUT_DURATION } from "../../constants"
import { ActionButton, ModalBackdrop, Loading, Nav, PledgeList, UserBalance } from "../../components"
import { DepositModal, PledgeModal, WithdrawModal } from "./components"
import { DepositSVG, WithdrawSVG, PledgeSVG } from "../../svgs"
import { UIReducer, initialState } from "./reducers/UIReducer"

import styles from "./Contribute.module.scss"
import { useP } from "../../hooks/useP"

export const Contribute = () => {
  const [{ balance, loading, pledges, modal }, dispatch] = useReducer(UIReducer, initialState)
  const contract = useP()

  useEffect(() => {
    localStorage.setItem("last_page_visited", "contribute");
    (async () => {
      if (!contract) return

      try {
        const [balanceInWei, pledges] = await Promise.all([
          contract.getContributorBalanceInWei(),
          contract.getContributorPledges(),
        ])

        const balance = await ethers.formatEther(balanceInWei).toString();
        dispatch({ type: "setUI", payload: { balance, pledges } })
      } catch (error) {
        console.error(`Contribute page init error: ${error}`)
      }
    })()
  }, [contract])

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'setLoading', payload: loading })
  }

  const setNewBalance = (newBalance: string) => {
    dispatch({ type: 'setBalance', payload: newBalance });
  }

  const setNewBalanceAndPledges = (balance: string, pledges: PledgeType[]) => {
    dispatch({ type: 'setNewPledgesAndBalance', payload: { balance, pledges } })
  }

  const depositModal = <DepositModal
    closeModal={() => dispatch({ type: "closeModal" })}
    setNewBalance={setNewBalance}
    setLoading={setLoading}
  />

  const withdrawModal = <WithdrawModal
    closeModal={() => dispatch({ type: 'closeModal' })}
    setNewBalance={setNewBalance}
    setLoading={setLoading}
  />

  const pledgeModal = <PledgeModal
    closeModal={() => dispatch({ type: 'closeModal' })}
    setNewBalanceAndPledges={setNewBalanceAndPledges}
    setLoading={setLoading}
  />

  return (
    <>
      <motion.main
        className={styles.layout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: PAGE_FADE_IN_DURATION, delay: CIRCLE_ANIMATION_DURATION } }}
        exit={{ opacity: 0, transition: { duration: PAGE_FADE_OUT_DURATION } }}
      >
        <Nav className={styles.nav} to="/create">Create</Nav>
        {loading ? <Loading /> : <UserBalance className={styles.balance} balance={balance} />}
        <div className={styles.actions}>
          <ActionButton
            className={styles.actionButton}
            onClick={() => dispatch({ type: 'setModal', payload: depositModal })}
            svg={<DepositSVG />}
            children="Deposit"
          />
          <ActionButton
            className={styles.actionButton}
            onClick={() => dispatch({ type: 'setModal', payload: withdrawModal })}
            svg={<WithdrawSVG />}
            children="Withdraw"
          />
          <ActionButton
            className={styles.actionButton}
            onClick={() => dispatch({ type: 'setModal', payload: pledgeModal })}
            svg={<PledgeSVG />}
            children="Pledge"
          />
        </div>
        <PledgeList
          className={styles.pledges}
          pledges={pledges}
          setLoading={setLoading}
          setNewBalanceAndPledges={setNewBalanceAndPledges}
          noPledgesText={<span className={styles.noPledgesText}>You need to make a pledge first...</span>}
        />
      </motion.main>
      <AnimatePresence initial={false} mode="wait">
        {modal !== null && <ModalBackdrop closeModal={() => dispatch({ type: "closeModal" })} children={modal} />}
      </AnimatePresence>
    </>
  )
}
