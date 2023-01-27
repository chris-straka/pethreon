import { useState, useEffect } from "react"

interface EthereumWindow extends Window {
  ethereum?: any
}

/** 
 * This is just meant for aesthetics
 */
export function useMetamask() {
  const [ethereum, setEthereum] = useState<any | null>(null)

  useEffect(() => {
    if ((window as EthereumWindow).ethereum) setEthereum((window as EthereumWindow).ethereum)
  }, [])

  return ethereum
}