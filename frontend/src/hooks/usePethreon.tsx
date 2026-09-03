import { useContext } from "react"
import { PethreonContext } from "./pethreonContext"

/**
 * The contract instance built by <PethreonProvider>, or null while the wallet
 * is still connecting. Call sites are unchanged from the old implementation.
 */
export function usePethreon() {
  return useContext(PethreonContext)
}
