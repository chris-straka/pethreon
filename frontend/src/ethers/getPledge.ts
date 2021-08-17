import { providers, Contract } from "ethers"
import { abi } from "../artifacts/localhost/Pethreon.json"
import { PETHREON_CONTRACT_ADDRESS, EthereumWindow } from "./utility"

export async function getPledge(creatorAddress: string) {
  const { ethereum } = window as EthereumWindow
  if (typeof ethereum === undefined) window.alert("Can't find ethereum wallet")

  const provider = new providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const contract = new Contract(PETHREON_CONTRACT_ADDRESS, abi, signer)

  const pledge = await contract.myPledgeTo(creatorAddress)

  return pledge
}