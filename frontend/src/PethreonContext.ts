import { createContext } from 'react';
import { Pethreon } from "./types/Pethreon"

type TODO = any | null // I'm not sure what to put for some stuff yet

export const PethreonContext = createContext<{
  contractAddress: string, 
  contract: Pethreon | null,
  setContract: TODO,
  userAddress: string | null,
  setUserAddress: TODO,
  provider: TODO,
  setProvider: TODO,
}>({
  contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  userAddress: null,
  setUserAddress: null,
  provider: null,
  setProvider: null,
  contract: null,
  setContract: null
})