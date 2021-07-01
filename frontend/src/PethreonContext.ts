import { createContext } from 'react';

type TODO = any | null // I'm not sure what to put for some stuff

export const PethreonContext = createContext<{
  contractAddress: string, 
  userAddress: TODO,
  setUserAddress: TODO
  provider: TODO,
  setProvider: TODO,
  contract: TODO,
  setContract: TODO,
}>({
  contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  userAddress: null,
  setUserAddress: null,
  provider: null,
  setProvider: null,
  contract: null,
  setContract: null
})