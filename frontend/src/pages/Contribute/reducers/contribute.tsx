import { ReactNode } from "react"
import { PledgeType } from "../../../types"

export const initialState = {
  address: "0x0000000000000000000000000000000000000000",
  loading: false,
  balance: "0.0",
  pledges: [] as PledgeType[],
  modal: null as ReactNode | null
}

type InitialStateWithoutModal = Omit<typeof initialState, 'modal'>;

export type ACTIONTYPE =
  | { type: 'setUI', payload: InitialStateWithoutModal }

export const reducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "setUI": {
      const { address, loading, balance, pledges } = action.payload
      return { ...state, address, loading, balance, pledges }
    }
    default: {
      throw new Error("Action does not exist in the contribute reducer")
    }
  }
}
