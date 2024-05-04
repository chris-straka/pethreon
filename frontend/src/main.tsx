import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { Web3OnboardProvider } from "@web3-onboard/react"
import { web3Onboard } from './onboard'
import { App } from "./App"
import { PethreonContextProvider } from './context/PethreonContext'

import "./main.scss"
import "./onboard.scss"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <PethreonContextProvider>
          <App />
        </PethreonContextProvider>
      </Web3OnboardProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
