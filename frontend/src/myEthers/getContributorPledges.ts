import { providers, Contract } from "ethers"
import { abi } from "../artifacts/localhost/Pethreon.json"
import { Pethreon } from "../types"
import { PETHREON_CONTRACT_ADDRESS, EthereumWindow } from "./index"

export async function getContributorPledges() {
  const { ethereum } = window as EthereumWindow

  const provider = new providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const contract = new Contract(PETHREON_CONTRACT_ADDRESS, abi, signer) as Pethreon
  const pledges = await contract.getContributorPledges()

  return pledges
}