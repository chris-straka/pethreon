import { useContext } from "react"
import { Web3Context } from "../context/Web3Context"
import { useLocalWallet, useWeb3Dispatch } from "./"
import { Web3Provider, Pethreon } from "../types"

interface useWeb3Props {
  provider: Web3Provider,
  contract: Pethreon
}

export function useWeb3(): useWeb3Props {
  const { provider, contract } = useContext(Web3Context)
  const dispatch = useWeb3Dispatch()
  const wallet = useLocalWallet()

  if (!provider || !contract) {
    if (!wallet?.provider) throw new Error("Couldn't find the provider. No wallet found in localStorage")
    dispatch({ type: "setWeb3", payload: wallet.provider })
    if (!provider || !contract) throw new Error("Couldn't find the provider")
    return { provider, contract }
  }

  return { provider, contract }
}
