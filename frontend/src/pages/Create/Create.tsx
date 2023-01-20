import { useState, useEffect, ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { UserBalance, UserAddress, Loading, PledgeList, ModalTemplate } from "../../components"
import { CreatorActionBar } from "./components/CreatorActionBar"
import { PledgeType } from "../../utils"
import { useContract } from "../../hooks/useContract"
import { useWeb3 } from "../../context/Web3Context"
import { utils } from "ethers"
import styles from "./Create.module.scss"

interface CreateProps {
  fadeInDuration: number,
  fadeInDelay: number,
  fadeOutDuration: number,
  fadeOutDelay: number
}

export const Create = (
  { fadeInDuration, fadeInDelay, fadeOutDuration, fadeOutDelay }: CreateProps
) => {
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [balance, setBalance] = useState("0.0")
  const [pledges, setPledges] = useState<PledgeType[]>([])
  const [modal, setModal] = useState<ReactNode | null>(null)
  const { currentWeb3Provider } = useWeb3()
  const contract = useContract(currentWeb3Provider.getSigner())
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem("last_page_visited", "create")

    if (!currentWeb3Provider) navigate("/")

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
  }, [navigate, currentWeb3Provider, contract])

  return (
    <>
      {loading && <Loading />}
      <motion.div
        className={styles.createLayout}
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
          userAccountAddress={address}
        />
        <CreatorActionBar
          className={styles.creatorActionBar}
          pledges={pledges}
          setModal={setModal}
          setBalance={setBalance}
          setLoading={setLoading}
        />
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
      <AnimatePresence
        initial={false}
        mode="wait"
      >
        {modal !== null && <ModalTemplate closeModal={() => setModal(null)} children={modal} />}
      </AnimatePresence>
    </>
  )
}