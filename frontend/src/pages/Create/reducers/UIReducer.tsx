import type { ReactNode } from "react"
import type { PledgeType } from "../../../types"

export const initialState = {
  loading: false,
  balance: "0.0",
  pledges: [] as PledgeType[],
  modal: null as ReactNode | null
}

type AddressBalanceAndPledges = Omit<typeof initialState, 'modal' | 'loading'>;
type BalanceAndPledges = Pick<typeof initialState, 'balance' | 'pledges'>

export type ACTIONTYPE =
  | { type: 'setUI', payload: AddressBalanceAndPledges }
  | { type: 'setNewPledgesAndBalance', payload: BalanceAndPledges }
  | { type: 'setBalance', payload: string }
  | { type: 'setModal', payload: ReactNode }
  | { type: 'setLoading', payload?: boolean }
  | { type: 'closeModal' }

export function UIReducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "setUI": {
      const { balance, pledges } = action.payload
      return { ...state, balance, pledges, loading: false }
    }
    case "setNewPledgesAndBalance": {
      const { balance, pledges } = action.payload
      return { ...state, balance, pledges, loading: false }
    }
    case "setLoading":
      return { ...state, loading: action.payload ? action.payload : true }
    case "setBalance":
      return { ...state, balance: action.payload, loading: false }
    case "setModal":
      return { ...state, modal: action.payload, loading: false }
    case "closeModal":
      return { ...state, modal: null, loading: false }
    default: {
      throw new Error("Action does not exist in the contribute reducer")
    }
  }
}
