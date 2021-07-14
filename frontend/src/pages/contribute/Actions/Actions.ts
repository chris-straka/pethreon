import { Pethreon } from "../../../types"

export const deposit = (contract: Pethreon) => { 
  const amount = window.prompt("How much would you like to deposit? (ether)");
  console.log(amount)
}

export const withdraw = (contract: Pethreon) => { 
  const amount = window.prompt("How much would you like to withdraw")
  console.log(amount)
}

export const pledge = (contract: Pethreon) => { 

}
