import { BigNumberish, providers, Contract } from "ethers"
import { EthereumWindow, PETHREON_CONTRACT_ADDRESS } from "./index"
import { abi } from "../artifacts/localhost/Pethreon.json"
import { Pethreon } from "../types"

export async function createPledge(address: string, period: string, amountPerPeriod: BigNumberish) {
  const { ethereum } = window as EthereumWindow

  const provider = new providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const contract = new Contract(PETHREON_CONTRACT_ADDRESS, abi, signer) as Pethreon

  const transaction = await contract.createPledge(address, amountPerPeriod, period)
  await transaction.wait()
}