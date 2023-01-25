import { init } from "@web3-onboard/react"
import injectedModule from '@web3-onboard/injected-wallets'

export const web3Onboard = init({
  wallets: [injectedModule()],
  chains: [
    {
      id: '0x5',
      token: 'ETH',
      label: 'Goerli',
      rpcUrl: `https://goerli.infura.io/v3/${import.meta.env.VITE_INFURA_ID}`
    }
  ],
  appMetadata: {
    name: 'Pethreon',
    icon: '<svg xmlns="http://www.w3.org/2000/svg"><text>Ξ</text></svg>',
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
      minimal: true
    }
  }
})
