import { createContext } from "react"
import type { Pethreon } from "../types"

/**
 * Lives in its own file so the provider module only exports a component
 * (keeps react-refresh happy).
 */
export const PethreonContext = createContext<Pethreon | null>(null)
