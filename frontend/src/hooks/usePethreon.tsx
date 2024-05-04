import { useEffect, useContext } from "react"
import { ethers } from "ethers"
import { useNavigate } from "react-router-dom"
import { useConnectWallet } from "@web3-onboard/react"
import { usePethreonDispatch } from "./usePethreonDispatch"
import { PethreonContext } from "../context/PethreonContext"
import { Pethreon__factory } from "../../typechain-types"

export function usePethreon() {
  const { provider, contract } = useContext(PethreonContext)
  const [{ wallet }, connect] = useConnectWallet()
  const dispatch = usePethreonDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    async function setup() {
      if (!wallet || !wallet.provider) {
        navigate("/")
        dispatch({ type: "clearPethreon" })
        return
      } else {
        const provider = new ethers.BrowserProvider(wallet.provider, 'sepolia')
        const signer = await provider.getSigner()
        const contractAddress = import.meta.env.VITE_PETHREON_CONTRACT_ADDRESS

        // The factory has the ABI embedded within it
        const contract = Pethreon__factory.connect(contractAddress, signer)
        dispatch({
          type: "setPethreon", payload: {
            provider,
            signer,
            contract
          }
        })
      }
    }
    setup()
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
  return contract
}