import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { App } from "./App"
import { Web3OnboardProvider, init } from "@web3-onboard/react"
import injectedModule from '@web3-onboard/injected-wallets'
import "./index.scss"

const web3Onboard = init({
  wallets: [injectedModule()],
  chains: [
    {
      id: '0x5',
      token: 'ETH',
      label: 'Goerli',
      rpcUrl: `https://goerli.infura.io/v3/${import.meta.env.VITE_INFURA_ID}`
    },
    {
      id: '0x11155111',
      token: 'ETH',
      label: 'Sepolia',
      rpcUrl: `https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_ID}`
    }
  ],
  appMetadata: {
    name: 'Pethreon',
    icon: '<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>Ξ</text></svg>',
    description: 'Allow contributers to make payments to creators in monthly payments',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' },
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
    ]
  },
  accountCenter: {
    desktop: {
      position: 'topLeft',
      enabled: true,
    },
    mobile: {
      position: 'topLeft',
      enabled: true,
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <App />
      </Web3OnboardProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
