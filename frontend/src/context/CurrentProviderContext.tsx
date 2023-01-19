import { createContext } from "react";
import { ethers } from "ethers"

type Provider = ethers.providers.Web3Provider | null

// https://beta.reactjs.org/reference/react/useContext#updating-data-passed-via-context
export const CurrentWeb3ProviderContext = createContext<Provider>(null)