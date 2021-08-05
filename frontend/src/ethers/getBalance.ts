import { BigNumber, providers, Contract, utils } from "ethers"
import { abi } from "../artifacts/localhost/Pethreon.json"
import { PETHREON_CONTRACT_ADDRESS, EthereumWindow } from "./utility"

export async function getBalance(): Promise<string> {
  const { ethereum } = window as EthereumWindow
  if (ethereum === undefined) window.alert("I tried to fetch the balance but I can't find your ethereum wallet")

  const provider = new providers.Web3Provider(ethereum)
  const contract = new Contract(PETHREON_CONTRACT_ADDRESS, abi, provider)

  const balance: BigNumber = await contract.getContributorBalance()
  const balanceToString = await balance.toString()
  const balanceInEther = utils.formatEther(balanceToString)

  return balanceInEther
}