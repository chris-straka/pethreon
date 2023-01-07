import { useState, useEffect } from 'react'

export interface EthereumWindow extends Window {
  ethereum?: Ethereum
}

type Ethereum = any

export function useEthereum() {
  const [ethereum, setEthereum] = useState<Ethereum | null>(null)

  useEffect(() => {
    if ((window as EthereumWindow).ethereum) setEthereum((window as EthereumWindow).ethereum)
  }, [])

  return ethereum
}