import { Dispatch, SetStateAction } from "react"
import { BigNumberish, utils, providers, Contract } from "ethers"
import { PETHREON_CONTRACT_ADDRESS } from "./login"
import { abi } from "../artifacts/localhost/Pethreon.json"
import { EthereumWindow, login } from "./login"
import { getBalance } from "./getBalance"

export async function deposit(amount: string, currency: string, setLoading: Dispatch<SetStateAction<boolean>>) {
  setLoading(true)
  await login()

  let amountInWei: BigNumberish = amount
  if (currency === "Ether") amountInWei = utils.parseEther(amount)
  if (currency === "Gwei") amountInWei = utils.parseUnits(amount, "gwei")

  const { ethereum } = window as EthereumWindow

  const provider = new providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const contract = new Contract(PETHREON_CONTRACT_ADDRESS, abi, signer)
  const transaction = await contract.deposit({ value: amountInWei })
  await transaction.wait()

  console.log(transaction)
  await getBalance();
  setLoading(false)
}