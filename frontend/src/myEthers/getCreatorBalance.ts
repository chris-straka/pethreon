import { BigNumber, providers, Contract, utils } from "ethers"
import { abi } from "../artifacts/localhost/Pethreon.json"
import { Pethreon } from "../types"
import { PETHREON_CONTRACT_ADDRESS, EthereumWindow } from "./utility"

export async function getCreatorBalance() {
  const { ethereum } = window as EthereumWindow

  const provider = new providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const contract = new Contract(PETHREON_CONTRACT_ADDRESS, abi, signer) as Pethreon

  const balance: BigNumber = await contract.getCreatorBalance()
  const balanceToString = await balance.toString()
  const balanceInEther = utils.formatEther(balanceToString)

  return balanceInEther
}