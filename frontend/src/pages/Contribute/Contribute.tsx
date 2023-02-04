import { useEffect, useReducer } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ethers } from "ethers"
import { CIRCLE_ANIMATION_DURATION, PAGE_FADE_IN_DURATION, PAGE_FADE_OUT_DURATION } from "../../constants"
import { ActionBar, ActionButton, ModalBackdrop, Loading, Nav, PledgeList, UserBalance, UserAddress } from "../../components"
import { DepositModal, PledgeModal, WithdrawModal } from "./components"
import { DepositSVG, WithdrawSVG, PledgeSVG, ArrowSVG } from "../../svgs"
import { UIReducer, initialState } from "../../reducers/UIReducer"
import { PledgeType } from "../../types"
import { useWeb3 } from "../../hooks"

import styles from "./Contribute.module.scss"

export const Contribute = () => {
  const [{ address, loading, balance, pledges, modal }, dispatch] = useReducer(UIReducer, initialState)
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
        dispatch({ type: "setUI", payload: { balance, pledges, address } })

      } catch (error) {
        throw new Error(error as any)
      }
    }

    init()
  }, [contract, navigate])

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
        className={styles.contributeLayout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: PAGE_FADE_IN_DURATION, delay: CIRCLE_ANIMATION_DURATION } }}
        exit={{ opacity: 0, transition: { duration: PAGE_FADE_OUT_DURATION } }}
      >
        <Nav className={styles.nav} to="/create">Create<ArrowSVG /></Nav>
        {loading ? <Loading /> : <UserBalance className={styles.userBalance} balance={balance} />}
        <UserAddress className={styles.userAddress} userAccountAddress={address} />
        <ActionBar className={styles.contributorActionBar}>
          <ActionButton onClick={() => dispatch({ type: 'setModal', payload: depositModal })}>Deposit <DepositSVG /></ActionButton>
          <ActionButton onClick={() => dispatch({ type: 'setModal', payload: withdrawModal })}>Withdraw <WithdrawSVG /></ActionButton>
          <ActionButton onClick={() => dispatch({ type: 'setModal', payload: pledgeModal })}>Pledge <PledgeSVG /></ActionButton>
        </ActionBar>
        <PledgeList
          className={styles.pledgeList}
          textForWhenItsEmpty="You need to make a pledge first..."
          pledges={pledges}
          setLoading={setLoading}
          setNewBalanceAndPledges={setNewBalanceAndPledges}
        />
      </motion.main>
      <AnimatePresence initial={false} mode="wait">
        {modal !== null && <ModalBackdrop closeModal={() => dispatch({ type: "closeModal" })} children={modal} />}
      </AnimatePresence>
    </>
  )
}
