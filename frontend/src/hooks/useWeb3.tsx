import { useContext } from "react"
import { ethers } from "ethers"
import { Web3Context } from "../context/Web3Context"
import { useWeb3Dispatch } from "./"
import { Web3Provider, Pethreon } from "../types"
import { useConnectWallet } from "@web3-onboard/react"

interface useWeb3Props {
  provider: Web3Provider,
  contract: Pethreon
}

// TODO: If this doesn't work, try useWallets() instead of useConnectWallet()
export function useWeb3(): useWeb3Props {
  const { provider, contract } = useContext(Web3Context)
  const [{ wallet }] = useConnectWallet()
  const dispatch = useWeb3Dispatch()

  if (!provider || !contract) {
    if (!wallet?.provider) throw new Error("useConnectWallet() didn't produce a wallet with a provider")
    const newProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
    dispatch({ type: "setWeb3", payload: newProvider })

    if (!provider || !contract) throw new Error("Couldn't find the provider")
    return { provider, contract }
  }

  return { provider, contract }
}
