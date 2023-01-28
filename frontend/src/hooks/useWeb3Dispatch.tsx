import { useContext } from "react"
import { Web3DispatchContext } from "../context/Web3Context"

export const useWeb3Dispatch = () => {
  const dispatch = useContext(Web3DispatchContext)
  if (!dispatch) throw new Error("Couldn't find the web3 dispatch")
  return dispatch
}
