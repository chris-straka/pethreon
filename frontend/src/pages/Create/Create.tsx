import { useEffect, useReducer } from "react"
import { motion } from "framer-motion"
import { ethers } from "ethers"
import { ActionBar, ActionButton, Loading, Nav, PledgeList, UserBalance, UserAddress } from "../../components"
import { ArrowSVG, WithdrawSVG, CsvSVG } from "../../svgs"
import { useWeb3 } from "../../hooks"
import { extractPledgesToCsv } from "./utils"
import { PledgeType } from "../../types"
import { UIReducer, initialState } from "../../reducers/UIReducer"

import {
  CIRCLE_ANIMATION_DURATION,
  PAGE_FADE_IN_DURATION,
  PAGE_FADE_OUT_DURATION
} from "../../constants"

import styles from "./Create.module.scss"

export const Create = () => {
  const [{ address, balance, loading, pledges }, dispatch] = useReducer(UIReducer, initialState)
  const { contract } = useWeb3()

  useEffect(() => {
    localStorage.setItem("last_page_visited", "create")

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
        window.alert(error)
      }
    }

    init()
  }, [contract])

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'setLoading', payload: loading })
  }

  const setNewBalanceAndPledges = (balance: string, pledges: PledgeType[]) => {
    dispatch({ type: 'setNewPledgesAndBalance', payload: { balance, pledges } })
  }

  return (
    <motion.main
      className={styles.createLayout}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: CIRCLE_ANIMATION_DURATION, duration: PAGE_FADE_IN_DURATION } }}
      exit={{ opacity: 0, transition: { duration: PAGE_FADE_OUT_DURATION } }}
    >
      <Nav className={styles.nav} to='/contribute'>Donate<ArrowSVG /></Nav>
      {loading ? <Loading /> : <UserBalance className={styles.userBalance} balance={balance} />}
      <UserAddress className={styles.userAddress} userAccountAddress={address} />
      <ActionBar className={`${styles.actionBar} ${styles.creatorActionBar}`}>
        <ActionButton className={styles.actionButton} onClick={() => console.log("hey")}>Withdraw <WithdrawSVG /></ActionButton>
        <ActionButton className={styles.actionButton} onClick={async () => await extractPledgesToCsv(contract, pledges)}>Extract to CSV <CsvSVG /></ActionButton>
      </ActionBar>
      <PledgeList
        creator
        className={styles.pledgeList}
        textForWhenItsEmpty="Nobody has pledged to you yet..."
        pledges={pledges}
        setLoading={setLoading}
        setNewBalanceAndPledges={setNewBalanceAndPledges}
      />
    </motion.main>
  )
}
