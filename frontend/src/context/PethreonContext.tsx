import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { ethers } from "ethers"
import type { Pethreon } from "../../typechain-types"

type PethreonContextType = {
  provider: ethers.BrowserProvider | null,
  signer: ethers.Signer | null,
  contract: Pethreon | null
}

const initialState = {
  provider: null,
  signer: null,
  contract: null,
}

export const PethreonContext = createContext<PethreonContextType>(initialState);

type ACTIONTYPE =
  | { type: "setPethreon", payload: { provider: ethers.BrowserProvider, signer: ethers.Signer, contract: Pethreon } }
  | { type: "clearPethreon" };

export const PethreonDispatchContext = createContext<Dispatch<ACTIONTYPE> | null>(null);

function web3Reducer(state: PethreonContextType, action: ACTIONTYPE): PethreonContextType {
  switch (action.type) {
    case "setPethreon": {
      return {
        ...state,
        provider: action.payload.provider,
        signer: action.payload.signer,
        contract: action.payload.contract
      }
    }
    case "clearPethreon": {
      return {
        ...state,
        provider: null,
        signer: null,
        contract: null
      }
    }
    default: {
      throw new Error("Action not found")
    }
  }
}

export const PethreonContextProvider = ({ children }: { children: ReactNode }) => {
  const [web3, dispatch] = useReducer(web3Reducer, initialState)

  return (
    <PethreonContext.Provider value={web3}>
      <PethreonDispatchContext.Provider value={dispatch}>
        {children}
      </PethreonDispatchContext.Provider>
    </PethreonContext.Provider>
  )
}