import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { useConnectWallet } from "@web3-onboard/react";
import { Pethreon__factory, Pethreon } from "../../typechain-types";

const isProduction = import.meta.env.PROD

// TODO: Deploy to mainnent and use that instead of sepolia for prod
const contractAddress = isProduction ?
  import.meta.env.VITE_PETHREON_SEPOLIA_CONTRACT_ADDRESS :
  import.meta.env.VITE_PETHREON_LOCAL_DEVELOPMENT_CONTRACT_ADDRESS

export function usePethreon() {
  const [{ wallet }] = useConnectWallet();
  const [contract, setContract] = useState<Pethreon | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      if (!wallet) return navigate("/")

      try {
        // Create a new connection to the ethereum blockchain 
        // Using the user's wallet and my smart contract
        // (The ABI is embedded in the Pethreon__factory)
        const provider = new ethers.BrowserProvider(wallet.provider, 'any')
        const signer = await provider.getSigner()
        const contract = Pethreon__factory.connect(contractAddress, signer)
        setContract(contract)
      } catch (error) {
        console.error(`Error setting up the contract ${error}`)
        setContract(null)
        navigate("/")
      }
    })()
  }, [wallet, navigate])

  return contract
}