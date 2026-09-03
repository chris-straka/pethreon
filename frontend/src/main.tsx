import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { Web3OnboardProvider } from "@web3-onboard/react"
import { web3Onboard } from './onboard'
import { App } from "./App"

import "./main.css"
import "./onboard.css"

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error("Missing #root element in index.html")

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <App />
      </Web3OnboardProvider>
    </BrowserRouter>
  </StrictMode>,
)
