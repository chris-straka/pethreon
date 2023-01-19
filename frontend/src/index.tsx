import React from 'react'
import ReactDOM from 'react-dom/client'
import { Login, Create, Contribute } from "./pages"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Web3OnboardProvider, init } from "@web3-onboard/react"
import injectedModule from '@web3-onboard/injected-wallets'
import { CurrentWeb3ProviderContext } from './context/CurrentProviderContext'
import "./index.scss"

const injected = injectedModule()
const wallets = [injected]

const chains = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_ID}`
  },
  {
    id: '0x11155111',
    token: 'ETH',
    label: 'Sepolia',
    rpcUrl: `https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_ID}`
  },
]

const appMetadata = {
  name: 'Pethreon',
  icon: '<svg>My App Icon</svg>',
  description: 'Allow contributers to make payments to creators in monthly payments',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
  ]
}

const web3Onboard = init({
  wallets,
  chains,
  appMetadata
})

// https://reactrouter.com/en/main/routers/create-browser-router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: 'contribute',
    element: <Contribute />
  },
  {
    path: 'create',
    element: <Create />,
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <CurrentWeb3ProviderContext.Provider value={null}>
        <RouterProvider router={router} />
      </CurrentWeb3ProviderContext.Provider>
    </Web3OnboardProvider>
  </React.StrictMode>,
)
