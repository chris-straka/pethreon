import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { ethers } from "ethers"

export type Web3Provider = ethers.providers.Web3Provider | null

type ProviderContextType = {
  currentWeb3Provider: Web3Provider,
  setCurrentWeb3Provider: Dispatch<SetStateAction<Web3Provider>> | null
}

// https://beta.reactjs.org/reference/react/useContext#updating-data-passed-via-context
export const CurrentWeb3ProviderContext = createContext<ProviderContextType>({
  currentWeb3Provider: null,
  setCurrentWeb3Provider: null
});

export const useCurrentWeb3Provider = () => {
  const { currentWeb3Provider, setCurrentWeb3Provider } = useContext(CurrentWeb3ProviderContext)

  if (!currentWeb3Provider) throw new Error("currentWeb3Provider was used outside the <CurrentWeb3ProviderContext.Provider>")
  if (!setCurrentWeb3Provider) throw new Error("setCurrentWeb3Provider was used outside the <CurrentWeb3ProviderContext.Provider>")

  return { currentWeb3Provider, setCurrentWeb3Provider }
}