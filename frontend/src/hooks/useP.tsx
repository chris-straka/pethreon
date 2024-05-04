import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { useConnectWallet } from "@web3-onboard/react";
import { Pethreon__factory, Pethreon } from "../../typechain-types";

export function useP() {
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
        const provider = new ethers.BrowserProvider(wallet.provider, 'sepolia')
        const signer = await provider.getSigner()
        const contractAddress = import.meta.env.VITE_PETHREON_CONTRACT_ADDRESS
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