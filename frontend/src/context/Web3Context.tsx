import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Web3Provider } from "../types";
import { useWallet } from "../hooks/useWallet";
import { Pethreon } from "../../typechain-types";

type ProviderContextType = {
  web3Provider: Web3Provider | null,
  setWeb3Provider: Dispatch<SetStateAction<Web3Provider | null>> | null,
  contract: Pethreon | null,
  setContract: Dispatch<SetStateAction<Pethreon | null>> | null
}

export const Web3Context = createContext<ProviderContextType>({
  web3Provider: null,
  setWeb3Provider: null,
  contract: null,
  setContract: null
});


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

export const useWeb3Setup = () => {
  const { setWeb3Provider, setContract } = useContext(Web3Context)

  if (!setWeb3Provider || !setContract) {
    throw new Error("Couldn't find setCurrentWeb3Provider or setContract. Did you use it outside of <Web3Context.Provider>?")
  }

  return { setWeb3Provider, setContract }
}

