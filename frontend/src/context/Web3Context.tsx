import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { ethers } from "ethers"

type Web3Provider = ethers.providers.Web3Provider

type Web3ContextType = {
  provider: Web3Provider | null
}

const initialState = {
  provider: null,
}

export const Web3Context = createContext<Web3ContextType>(initialState);

type ACTIONTYPE =
  | { type: "setWeb3", payload: Web3Provider }
  | { type: "resetWeb3" };

export const Web3DispatchContext = createContext<Dispatch<ACTIONTYPE> | null>(null);

function web3Reducer(_: Web3ContextType, action: ACTIONTYPE): Web3ContextType {
  switch (action.type) {
    case "setWeb3": {
      const provider = action.payload
      return { provider }
    }
    case "resetWeb3": {
      return { provider: null }
    }
    default: {
      throw new Error("Action not found")
    }
  }
}

export const Web3ContextProvider = ({ children }: { children: ReactNode }) => {
  const [web3, dispatch] = useReducer(web3Reducer, initialState)

  return (
    <Web3Context.Provider value={web3}>
      <Web3DispatchContext.Provider value={dispatch}>
        {children}
      </Web3DispatchContext.Provider>
    </Web3Context.Provider>
  )
}