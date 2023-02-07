import { useEffect, useContext } from "react"
import { ethers } from "ethers"
import { useNavigate } from "react-router-dom"
import { useConnectWallet } from "@web3-onboard/react"
import { useWeb3Dispatch } from "./useWeb3Dispatch"
import { Web3Context } from "../context/Web3Context"
import { Pethreon__factory } from "../../typechain-types"

export function usePethreon() {
  const { provider } = useContext(Web3Context)
  const [{ wallet }, connect] = useConnectWallet()
  const dispatch = useWeb3Dispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!wallet) navigate("/")
    if (!wallet?.provider) {
      dispatch({ type: "resetWeb3" })
    } else {
      const provider = new ethers.providers.Web3Provider(wallet.provider, 'goerli')
      dispatch({ type: "setWeb3", payload: provider })
    }
  }, [wallet, dispatch, navigate])

  useEffect(() => {
    const localWallet = localStorage.getItem('wallet')
    if (!localWallet) return
    if (wallet) return

    const previousWallet = JSON.parse(localWallet)

    if (previousWallet?.length) {
      async function setWalletFromLocalStorage() {
        await connect({ autoSelect: previousWallet })
      }
      setWalletFromLocalStorage()
    }
  }, [connect, wallet])

  if (!provider) return

  const signer = provider.getSigner()
  return Pethreon__factory.connect(import.meta.env.VITE_PETHREON_CONTRACT_ADDRESS, signer)
}