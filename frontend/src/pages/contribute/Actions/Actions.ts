import { useContext } from "react"
import { PethreonContext } from "../../../PethreonContext"

const { contract } = useContext(PethreonContext)

export const deposit = () => {
  const amount = window.prompt("How much would you like to deposit? (ether)");
}

export const withdraw = () => {
  const amount = window.prompt("How much would you like to withdraw")
}

export const pledge = () => {
  const amount = window.prompt("How much would you like to withdraw")
}
