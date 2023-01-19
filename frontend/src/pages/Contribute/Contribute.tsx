import { useState, useEffect, ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { UserBalance, UserAddress, Loading, PledgeList } from "../../components"
import { getContributorBalanceInWei, getContributorPledges } from "../../pethreon"
import { PledgeType, MetamaskError } from "../../utils"
import { ContributorActionBar } from "./components"
import { ModalTemplate } from "../../components"
import { utils } from "ethers"
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
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState("0.0")
  const [pledges, setPledges] = useState<PledgeType[]>([])
  const [modal, setModal] = useState<ReactNode | null>(null)
  const navigate = useNavigate()

  console.log(modal)

  useEffect(() => {
    localStorage.setItem("last_page_visited", "contribute")
    // ethereum.on("accountsChanged", () => navigate("/"))
    async function init() {
      if (window.location.pathname === "/") return
      try {
        const balance = await getContributorBalanceInWei()
        const balanceEther = await utils.formatEther(balance)
        const balanceEtherString = await balanceEther.toString()
        const pledges = await getContributorPledges()
        setBalance(balanceEtherString)
        setPledges(pledges)
      } catch (error) {
        window.alert((error as MetamaskError).message)
        navigate("/")
      }
    }
    init()
  }, [navigate])

  return (
    <>
      {loading && <Loading />}
      <motion.div
        className={styles.contributeLayout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: fadeInDuration, delay: fadeInDelay } }}
        exit={{ opacity: 0, transition: { duration: fadeOutDuration, delay: fadeOutDelay } }}
      >
        <UserBalance
          className={styles.userBalance}
          balance={balance}
        />
        <UserAddress
          className={styles.userAddress}
          userAccountAddress="USER ETHEREUM ADDRESS"
        />
        <ContributorActionBar
          className={styles.contributorActionBar}
          setModal={setModal}
          setBalance={setBalance}
          setLoading={setLoading}
          setPledges={setPledges}
        />
        <PledgeList
          className={styles.pledgeList}
          setBalance={setBalance}
          setLoading={setLoading}
          setPledges={setPledges}
          textForWhenItsEmpty="You need to make a pledge first..."
          pledges={pledges}
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