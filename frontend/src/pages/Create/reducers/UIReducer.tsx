import type { ReactNode } from "react"
import type { PledgeType } from "../../../types"

export const initialState = {
  isLoading: false,
  balance: "0.0",
  pledges: [] as PledgeType[],
  modal: null as ReactNode | null
}

type AddressBalanceAndPledges = Omit<typeof initialState, 'modal' | 'isLoading'>;
type BalanceAndPledges = Pick<typeof initialState, 'balance' | 'pledges'>

export type ACTIONTYPE =
  | { type: 'setUI', payload: AddressBalanceAndPledges }
  | { type: 'setNewPledgesAndBalance', payload: BalanceAndPledges }
  | { type: 'setBalance', payload: string }
  | { type: 'setModal', payload: ReactNode }
  | { type: 'setIsLoading', payload?: boolean }
  | { type: 'closeModal' }

export function UIReducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "setUI": {
      const { balance, pledges } = action.payload
      return { ...state, balance, pledges, isLoading: false }
    }
    case "setNewPledgesAndBalance": {
      const { balance, pledges } = action.payload
      return { ...state, balance, pledges, isLoading: false }
    }
    case "setIsLoading":
      return { ...state, isLoading: action.payload ? action.payload : true }
    case "setBalance":
      return { ...state, balance: action.payload, isLoading: false }
    case "setModal":
      return { ...state, modal: action.payload, isLoading: false }
    case "closeModal":
      return { ...state, modal: null, isLoading: false }
    default: {
      throw new Error("Action does not exist in the contribute reducer")
    }
  }
}
