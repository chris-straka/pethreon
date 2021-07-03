import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { GithubSVG } from "../../components/githubSVG/Github";
import { MetamaskAnimation } from '../../components/metamask/MetamaskAnimation';
import { PethreonContext } from '../../PethreonContext';
import { providers, Contract } from 'ethers';
import { abi } from "../../artifacts/localhost/Pethreon.json"

import mp4 from "../../assets/money.mp4"
import webm from "../../assets/money.webm"
import "./login.css"

interface MetamaskError extends Error {
  code: number
}

interface EthereumWindow extends Window {
  ethereum?: any
}

export const Login: React.FC = () => {
  const { ethereum } = window as EthereumWindow
  const { contractAddress, setUserAddress, setContract, setProvider } = useContext(PethreonContext)
  const history = useHistory()
  const [disableLogin, setDisableLogin] = useState(false)
  const [message, setMessage] = useState("")
  const [link, setLink] = useState(false)

  // OPENING ANIMATION
  useEffect(() => {
    if (typeof ethereum !== undefined) {
      setTimeout(() => {
        setMessage("This app uses your ethereum wallet to make subscriptions to creators")
      }, 1000)
    } else {
      setTimeout(() => {
        setMessage("This app requires a cryptocurrency wallet to work, ")
      }, 1500);
      setTimeout(() => {
        setLink(true)
      }, 5500);
    }
  }, [ethereum])

  const login = async () => {
    const provider = new providers.Web3Provider(ethereum)
    const contract = new Contract(contractAddress, abi, provider)
    setProvider(provider)
    setContract(contract)
    try {
      setMessage("Logging in... You might have to click the metamask extension in your browser")
      const accounts: [string] = await ethereum.request({ method: 'eth_requestAccounts' })
      setUserAddress(accounts[0])
      history.push("/contribute")
    } catch (error) {
      setDisableLogin(false)
      if ((error as MetamaskError).code === -32002) {
        setMessage("Request already sent, click the metamask extension in your browser")
      } else {
        setMessage("Error... " + (error as MetamaskError).message)
      }
    }
  }

  const pleaseRefresh = () => {
    window.confirm("You might have to refresh the page if you just installed a cryptocurrency wallet")
  }

  return <main>
    <h1 className="pethreon">P<span className="Ξ">Ξ</span>threon</h1>
    <ul className="features">
      <li>Contribute monthly to your favourite creators in a trustless, privacy respecting manner</li>
      <li>Only pay transaction fees,&nbsp;
        <a href="https://github.com/Chris56974/Pethreon/blob/main/contracts/Pethreon.sol"
          target="_blank"
          rel="noreferrer">
          view the smart contract on Github<GithubSVG />
        </a>
      </li>
    </ul>
    <MetamaskAnimation
      message={message}
      link={link}
      disableLogin={disableLogin}
      login={ethereum ? login : pleaseRefresh}
      ethereum={ethereum}
    />
    <video className="vid" muted autoPlay loop>
      <source src={mp4} type="video/mp4" />
      <source src={webm} type="video/webm" />
      Your browser does not support webm or mp4 videos.
    </video>
  </main>
}