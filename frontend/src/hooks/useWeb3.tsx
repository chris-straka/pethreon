import { useContext } from "react"
import { Web3Context } from "../context/Web3Context"
import { useWallet } from "./useWallet"

export const useWeb3 = () => {
    const { web3Provider, contract } = useContext(Web3Context)
    const wallet = useWallet()

    if (!web3Provider || !contract) {
      // TODO
      if (wallet) console.log("useWeb3Setup(wallet)")

      throw new Error("Couldn't find the currentWeb3Provider or the contract. The user likely refreshed the page")
    }

    return { web3Provider, contract }
}
