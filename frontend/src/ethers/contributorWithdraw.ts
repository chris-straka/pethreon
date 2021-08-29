import { BigNumberish, providers, Contract } from "ethers"
import { EthereumWindow, PETHREON_CONTRACT_ADDRESS } from "./utility"
import { abi } from "../artifacts/localhost/Pethreon.json"
import { Pethreon } from "../types"

export async function contributorWithdraw(amount: BigNumberish) {
  const { ethereum } = window as EthereumWindow

  const provider = new providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const contract = new Contract(PETHREON_CONTRACT_ADDRESS, abi, signer) as Pethreon

  const transaction = await contract.contributorWithdraw(amount)
  await transaction.wait()
}