import { useEffect, useReducer } from "react"
import { motion } from "framer-motion"
import { ethers } from "ethers"
import { ActionButton, Loading, Nav, PledgeList, UserBalance } from "../../components"
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
  const [{ balance, loading, pledges }, dispatch] = useReducer(UIReducer, initialState)
  const { contract } = useWeb3()

  useEffect(() => {
    localStorage.setItem("last_page_visited", "create")

    async function init() {
      try {
        const [balanceInWei, pledges] = await Promise.all([
          contract.getContributorBalanceInWei(),
          contract.getContributorPledges(),
        ])

        const balance = await ethers.utils.formatEther(balanceInWei).toString();
        dispatch({ type: "setUI", payload: { balance, pledges } })

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
      className={styles.layout}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: CIRCLE_ANIMATION_DURATION, duration: PAGE_FADE_IN_DURATION } }}
      exit={{ opacity: 0, transition: { duration: PAGE_FADE_OUT_DURATION } }}
    >
      <Nav className={styles.nav} to='/contribute'>Donate<ArrowSVG /></Nav>
      {loading ? <Loading /> : <UserBalance className={styles.balance} balance={balance} />}
      <div className={styles.actions}>
        <ActionButton
          className={styles.actionButton}
          onClick={() => console.log("hey")}
          svg={<WithdrawSVG />}
          children="Withdraw"
        />
        <ActionButton
          className={styles.actionButton}
          onClick={async () => await extractPledgesToCsv(contract, pledges)}
          svg={<CsvSVG />}
          children="Extract to CSV"
        />
      </div>
      <PledgeList
        creator
        className={styles.pledges}
        noPledgesText="Nobody has pledged to you yet..."
        pledges={pledges}
        setLoading={setLoading}
        setNewBalanceAndPledges={setNewBalanceAndPledges}
      />
    </motion.main>
  )
}
