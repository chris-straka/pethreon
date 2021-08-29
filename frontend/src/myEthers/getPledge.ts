import { providers, Contract } from "ethers"
import { PETHREON_CONTRACT_ADDRESS, EthereumWindow } from "./index"
import { abi } from "../artifacts/localhost/Pethreon.json"
import { Pethreon } from "../types"

export async function getPledge(creatorAddress: string) {
  const { ethereum } = window as EthereumWindow

  const provider = new providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const contract = new Contract(PETHREON_CONTRACT_ADDRESS, abi, signer) as Pethreon

  return await contract.myPledgeTo(creatorAddress)
}