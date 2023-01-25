import { createContext, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { ethers } from "ethers"
import { useNavigate } from "react-router-dom";
import { Pethreon } from "../../typechain-types";

export type Web3Provider = ethers.providers.Web3Provider

type ProviderContextType = {
  currentWeb3Provider: Web3Provider | null,
  setCurrentWeb3Provider: Dispatch<SetStateAction<Web3Provider | null>> | null,
  contract: Pethreon | null,
  setContract: Dispatch<SetStateAction<Pethreon | null>> | null
}

export const Web3Context = createContext<ProviderContextType>({
  currentWeb3Provider: null,
  setCurrentWeb3Provider: null,
  contract: null,
  setContract: null
});


export const useWeb3 = () => {
  const { currentWeb3Provider, contract } = useContext(Web3Context)
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentWeb3Provider || !contract) navigate("/")
  }, [contract, currentWeb3Provider, navigate])

  return { currentWeb3Provider, contract }
}

export const useWeb3Setup = () => {
  const { setCurrentWeb3Provider, setContract } = useContext(Web3Context)

  if (!setCurrentWeb3Provider || !setContract) {
    throw new Error("setCurrentWeb3Provider and setContract was used outside the <CurrentWeb3ProviderContext.Provider>")
  }

  return { setCurrentWeb3Provider, setContract }
}