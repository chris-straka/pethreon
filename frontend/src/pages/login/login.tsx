import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Metamask } from "../../components/metamask-logo/metamask";
import { Github } from "../../components/github-logo/github"
import mp4 from "../../assets/money.mp4"
import webm from "../../assets/money.webm"
import "./login.css"


export const Login: React.FC = () => {
  const { ethereum } = window
  const history = useHistory()
  const [disableLogin, setDisableLogin] = useState(false)
  const [message, setMessage] = useState("")
  const [animatedMessage, setAnimatedMessage] = useState("")
  const [link, setLink] = useState(false)
  const [animatedLink, setAnimatedLink] = useState("")
  const [talking, setTalking] = useState(false)

  // OPENING ANIMATION
  useEffect(() => {
    if (ethereum) {
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

  // TEXT ANIMATION
  useEffect(() => {
    let phrase = ""
    let interrupt: boolean;

    message.split('').forEach((char, index) => {
      setTimeout(() => {
        setTalking(true)
        if (interrupt) return
        phrase += char
        setAnimatedMessage(phrase)
      }, 75 * index);
    })

    setTimeout(() => {
      setTalking(false)
    }, message.length * 76);

    interrupt = false;

    return () => {
      phrase = ""
      interrupt = true
    }
  }, [message])

  // LINK ANIMATION
  useEffect(() => {
    let linkBuilder = ""
    if (link) {
      setTalking(true)
      const linkContent = "try out metamask!"
      linkContent.split('').forEach((char, index) => {
        setTimeout(() => {
          if (ethereum) return
          linkBuilder += char
          setAnimatedLink(linkBuilder)
        }, 75 * index);
      })

      setTimeout(() => {
        setTalking(false)
      }, linkContent.length * 76);

    }
    return () => {
      linkBuilder = ""
      setAnimatedLink("")
    }
  }, [link, ethereum])

  const login = async () => {
    try {
      setDisableLogin(true)
      setMessage("Logging in... You might have to click the metamask extension in your browser or refresh")
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      if (accounts) {
        history.push("/contribute")
      }
    } catch (error) {
      setDisableLogin(false)
      setMessage("Oh frick, we got an error... " + (error as Error).message)
    }
  }

  const pleaseRefresh = () => {
    window.confirm("You might have to refresh this page if you just installed a cryptocurrency wallet")
  }

  return (
    <main className="container">
      <h1 className="pethreon">P<span className="Ξ">Ξ</span>threon</h1>
      <ul className="features">
        <li>Contribute monthly to your favourite creators in a trustless, privacy respecting manner</li>
        <li>Only pay transaction fees,&nbsp;
          <a href="https://github.com/Chris56974/Pethreon/blob/main/contracts/Pethreon.sol"
            target="_blank"
            rel="noreferrer">
            view the smart contract on Github<Github />
          </a>
        </li>
      </ul>
      <p className="metamessage">{animatedMessage} {link === true ? (<a href="https://metamask.io/download" target="_blank" rel="noreferrer">{animatedLink}</a>) : null} </p>
      <div className="metacontainer">
        <Metamask isTalking={talking} />
        <button className="login" onClick={ethereum ? login : pleaseRefresh} disabled={disableLogin}>Login with metamask</button>
      </div>
      <video className="vid" muted autoPlay loop>
        <source src={mp4} type="video/mp4" />
        <source src={webm} type="video/webm" />
        Your browser does not support webm or mp4 videos.
      </video>
    </main>
  )
}