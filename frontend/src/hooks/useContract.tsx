import { ethers } from "ethers"
import { Pethreon__factory } from "../../typechain-types"

const PETHREON_CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS

/** 
 * I was using this a lot and then I moved it to Web3Context instead
 */
export const useContract = (signer: ethers.providers.JsonRpcSigner) => {
  return Pethreon__factory.connect(PETHREON_CONTRACT_ADDRESS, signer)
}