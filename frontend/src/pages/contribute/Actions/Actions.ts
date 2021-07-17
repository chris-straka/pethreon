import { Dispatch, SetStateAction } from "react"
import { Pethreon } from "../../../types"

type toggleType = Dispatch<SetStateAction<boolean>>,

export const deposit = (contract: Pethreon, toggleModal: toggleType) => {
  toggleModal(true)
  const amount = window.prompt("How much would you like to deposit? (ether)");
}

export const withdraw = (contract: Pethreon, toggleModal: toggleType) => {
  toggleModal(true)
  const amount = window.prompt("How much would you like to withdraw")
}

export const pledge = (contract: Pethreon, toggleModal: toggleType) => {
  toggleModal(true);
}
