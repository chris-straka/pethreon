import { useState, useEffect, type ReactNode } from "react"
import { ethers } from "ethers"
import { useNavigate } from "react-router-dom"
import { useConnectWallet } from "@web3-onboard/react"
import { Pethreon__factory } from "../../typechain-types"
import type { Pethreon } from "../types"
import { PethreonContext } from "./pethreonContext"

const isProduction = import.meta.env.PROD

// TODO: Deploy to mainnet and use that instead of sepolia for prod
const contractAddress = isProduction ?
  import.meta.env.VITE_PETHREON_SEPOLIA_CONTRACT_ADDRESS :
  import.meta.env.VITE_PETHREON_LOCAL_DEVELOPMENT_CONTRACT_ADDRESS

/**
 * Builds the contract connection once for the whole app.
 *
 * This used to live in usePethreon(), which meant every component calling the
 * hook built its own BrowserProvider and signer -- including each row of a
 * pledge list, where N pledges also meant up to N redirects to "/".
 */
export const PethreonProvider = ({ children }: { children: ReactNode }) => {
  const [{ wallet }] = useConnectWallet()
  const [contract, setContract] = useState<Pethreon | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    let cancelled = false

    // No reset needed: this provider only wraps the authenticated routes, so
    // navigating home unmounts it and discards the contract along with it.
    if (!wallet) {
      navigate("/")
      return
    }

    (async () => {
      try {
        // Connect to ethereum using the user's wallet and my smart contract.
        // (The ABI is embedded in the Pethreon__factory.)
        const provider = new ethers.BrowserProvider(wallet.provider, 'any')
        const signer = await provider.getSigner()
        if (cancelled) return
        setContract(Pethreon__factory.connect(contractAddress, signer))
      } catch (error) {
        if (cancelled) return
        console.error("Error setting up the contract", error)
        setContract(null)
        navigate("/")
      }
    })()

    return () => { cancelled = true }
  }, [wallet, navigate])

  return (
    <PethreonContext.Provider value={contract}>
      {children}
    </PethreonContext.Provider>
  )
}
