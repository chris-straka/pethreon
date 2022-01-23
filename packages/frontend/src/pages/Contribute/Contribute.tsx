import { useState, useEffect, ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { UserBalance, UserAddress, Loading, ModalTemplate, PledgeList } from "../../components"
import { getContributorBalanceInWei, getContributorPledges } from "../../pethreon"
import { EthereumWindow, PledgeType, MetamaskError } from "../../utils"
import { utils } from "ethers"
import { ContributorActionBar } from "./components"
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
  const { ethereum } = window as EthereumWindow

  useEffect(() => {
    if (typeof ethereum === undefined || !ethereum.isConnected()) navigate("/")
    ethereum.on("accountsChanged", () => navigate("/"))
    async function init() {
      if (window.location.pathname === "/") return
      try {
        const balance = await getContributorBalanceInWei()
        const balanceEther = await utils.formatEther(balance)
        const balanceEtherString = await balanceEther.toString()
        setBalance(balanceEtherString)
        const pledges = await getContributorPledges()
        setPledges(pledges)
      } catch (error) {
        window.alert((error as MetamaskError).message)
        navigate("/")
      }
    }
    init()
  }, [ethereum, navigate])

  return (
    <>
      {loading && <Loading />}
      <motion.div
        className={styles.contributeLayout}
        role="region"
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
          userAccountAddress={ethereum.selectedAddress}
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
          textForWhenItsEmpty="You need to make a pledge first..."
          pledges={pledges}
        />
      </motion.div>

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
      >
        {modal !== null && <ModalTemplate closeModal={() => setModal(null)} children={modal} />}
      </AnimatePresence>
    </>
  )
}