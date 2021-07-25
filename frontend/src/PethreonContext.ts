import { createContext } from 'react';
import { Pethreon } from "./types/Pethreon"

type TODO = any | null 

interface PethreonType {
  contract: Pethreon | null,
  setContract: TODO,
  contractAddress: string,
  userAccounts: TODO,
  setUserAccounts: TODO,
  provider: TODO,
  setProvider: TODO,
}

export const PethreonContext = createContext<PethreonType>({
  contract: null,
  setContract: null,
  contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  userAccounts: null,
  setUserAccounts: null,
  provider: null,
  setProvider: null
})