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

// export function web3OnboardStyling(location: Location) {
//   const rootStyles = document.documentElement.style

//   // minus 16px because that's how much margin they included on the web3 account center
//   rootStyles.setProperty("--account-center-position-left", "clamp(30px - 16px, 4vw - 16px, 64px - 16px)")

//   // make it further down from the top
//   rootStyles.setProperty("--account-center-position-top", "16px")
  

//   if (location.pathname === "/") rootStyles.setProperty("--account-center-z-index", "-100")

//   if (location.pathname === "/contribute") rootStyles.setProperty("--account-center-z-index", "0")

//   if (location.pathname === "/create") rootStyles.setProperty("--account-center-z-index", "0")
// }