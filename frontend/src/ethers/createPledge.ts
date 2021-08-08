import { BigNumberish, utils, providers, Contract } from "ethers"
import { EthereumWindow, PETHREON_CONTRACT_ADDRESS } from "./utility"
import { abi } from "../artifacts/localhost/Pethreon.json"

export async function createPledge(amount: string, currency: string, address: string) {
  const { ethereum } = window as EthereumWindow

  let amountInWei: BigNumberish = amount
  if (currency === "Ether") amountInWei = utils.parseEther(amount)
  if (currency === "Gwei") amountInWei = utils.parseUnits(amount, "gwei")

  console.log(amountInWei)

  const provider = new providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const contract = new Contract(PETHREON_CONTRACT_ADDRESS, abi, signer)

  // createPledge(address, weiPerPeriod, periods)
  const transaction = await contract.createPledge(address, )
  await transaction.wait()
}