import { BigNumberish, utils, providers, Contract } from "ethers"
import { EtherDenomination, EthereumWindow, PETHREON_CONTRACT_ADDRESS } from "./utility"
import { abi } from "../artifacts/localhost/Pethreon.json"
import { getBalance } from "./getBalance"

export async function contributorWithdraw(amount: string, currency: EtherDenomination) {
  const { ethereum } = window as EthereumWindow

  let amountInWei: BigNumberish = amount
  if (currency === "Ether") amountInWei = utils.parseEther(amount)
  if (currency === "All") {
    const fullBalance = await getBalance()
    amountInWei = utils.parseEther(fullBalance)
  }

  const provider = new providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const contract = new Contract(PETHREON_CONTRACT_ADDRESS, abi, signer)

  const transaction = await contract.withdrawAsContributor(amountInWei)
  await transaction.wait()
}