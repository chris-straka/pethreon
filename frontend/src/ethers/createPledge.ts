import { BigNumberish, utils, providers, Contract } from "ethers"
import { EtherDenomination, EthereumWindow, PETHREON_CONTRACT_ADDRESS } from "./utility"
import { abi } from "../artifacts/localhost/Pethreon.json"
import { getBalance } from "./getBalance"

interface createPledgeProps {
  address: string,
  amountPerPeriod: string,
  period: string,
  currency: EtherDenomination
}

export async function createPledge({ address, amountPerPeriod, period, currency }: createPledgeProps) {
  const { ethereum } = window as EthereumWindow

  let amountPerPeriodInWei: BigNumberish = amountPerPeriod
  if (currency === EtherDenomination.ETHER) amountPerPeriodInWei = utils.parseEther(amountPerPeriod)
  if (currency === EtherDenomination.WEI) amountPerPeriodInWei = utils.parseUnits(amountPerPeriod, "gwei")
  if (currency === EtherDenomination.ALL) {
    const fullBalance = await getBalance()
    amountPerPeriodInWei = utils.parseEther(fullBalance)
  }
  let dateCreated = Date.now();

  const provider = new providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const contract = new Contract(PETHREON_CONTRACT_ADDRESS, abi, signer)
  const transaction = await contract.createPledge(address, amountPerPeriodInWei, period, dateCreated)
  await transaction.wait()
}