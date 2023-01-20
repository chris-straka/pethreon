import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { ethers } from "ethers"
import { Pethreon } from "../../typechain-types";

/** 
 * Null spam kinda ugly but useWeb3 really helps
 */
export type Web3Provider = ethers.providers.Web3Provider | null
export type PethreonContract = Pethreon | null

type ProviderContextType = {
  currentWeb3Provider: Web3Provider | null,
  setCurrentWeb3Provider: Dispatch<SetStateAction<Web3Provider>> | null,
  contract: PethreonContract | null,
  setContract: Dispatch<SetStateAction<PethreonContract>> | null
}

export const Web3Context = createContext<ProviderContextType>({
  currentWeb3Provider: null,
  setCurrentWeb3Provider: null,
  contract: null,
  setContract: null
});

export const useWeb3 = () => {
  const { currentWeb3Provider, contract } = useContext(Web3Context)

  if (!currentWeb3Provider) throw new Error("currentWeb3Provider was used outside the <CurrentWeb3ProviderContext.Provider>")
  if (!contract) throw new Error("contract was used outside the <CurrentWeb3ProviderContext.Provider>")

  return { currentWeb3Provider, contract }
}

export const useWeb3Setup = () => {
  const { setCurrentWeb3Provider, setContract } = useContext(Web3Context)

  if (!setCurrentWeb3Provider) throw new Error("setCurrentWeb3Provider was used outside the <CurrentWeb3ProviderContext.Provider>")
  if (!setContract) throw new Error("setContract was used outside the <CurrentWeb3ProviderContext.Provider>")

  return { setCurrentWeb3Provider, setContract }
}