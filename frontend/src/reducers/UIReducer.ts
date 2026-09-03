import type { ReactNode } from "react"
import type { PledgeType } from "../types"

/**
 * Shared by the Contribute and Create pages, which previously kept
 * byte-identical copies of this reducer.
 */
export const initialState = {
  isLoading: false,
  balance: "0.0",
  pledges: [] as PledgeType[],
  modal: null as ReactNode | null
}

export type UIState = typeof initialState

type BalanceAndPledges = Pick<UIState, 'balance' | 'pledges'>

export type ACTIONTYPE =
  | { type: 'setUI', payload: BalanceAndPledges }
  | { type: 'setNewPledgesAndBalance', payload: BalanceAndPledges }
  | { type: 'setBalance', payload: string }
  | { type: 'setModal', payload: ReactNode }
  | { type: 'setIsLoading', payload?: boolean }
  | { type: 'closeModal' }

export function UIReducer(state: UIState, action: ACTIONTYPE): UIState {
  switch (action.type) {
    case "setUI":
    case "setNewPledgesAndBalance": {
      const { balance, pledges } = action.payload
      return { ...state, balance, pledges, isLoading: false }
    }
    // `payload ?? true`, not `payload ? payload : true`: the old form made
    // setLoading(false) resolve to true, so the spinner never switched off.
    case "setIsLoading":
      return { ...state, isLoading: action.payload ?? true }
    case "setBalance":
      return { ...state, balance: action.payload, isLoading: false }
    case "setModal":
      return { ...state, modal: action.payload, isLoading: false }
    case "closeModal":
      return { ...state, modal: null, isLoading: false }
    default:
      return state
  }
}
