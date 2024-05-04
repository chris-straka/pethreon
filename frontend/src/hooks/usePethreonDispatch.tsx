import { useContext } from "react"
import { PethreonDispatchContext } from "../context/PethreonContext"

export const usePethreonDispatch = () => {
  const dispatch = useContext(PethreonDispatchContext)
  if (!dispatch) throw new Error("Couldn't find the Pethreon dispatch")
  return dispatch
}
