import { init } from "@web3-onboard/react"
import injectedModule from '@web3-onboard/injected-wallets'

const isProduction = import.meta.env.PROD

const chains = isProduction ?
  [{
    id: 11155111,
    token: 'ETH',
    label: 'Sepolia Test Network',
  }] :
  [
    {
      id: 1337,
      token: 'ETH',
      label: 'Hardhat Test Network',
      rpcUrl: 'http://localhost:5173/',
    },
    // {
    //   id: 11155111,
    //   token: 'ETH',
    //   label: 'Sepolia Test Network',
    //   rpcUrl: `https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_ID}`,
    // }
  ]

// https://onboard.blocknative.com/docs/getting-started/customization
export const web3Onboard = init({
  wallets: [injectedModule()],
  chains,
  appMetadata: {
    name: 'Pethreon',
    icon: "data:image/svg+xml;base64, PHN2ZyB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHRleHQgeD0iMzIiIHk9IjUwIiBzdHJva2U9IiMwMDAwMDAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSIjMDAwMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5K4PC90ZXh0Pgo8L3N2Zz4=",
    description: 'Make daily payments to your favorite creators',
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
      minimal: true
    },
  },
  theme: 'system'
})
