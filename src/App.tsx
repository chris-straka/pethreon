import React, { useEffect, useState } from 'react';
import getWeb3 from "./getWeb3";
import './App.css';
import Test from './artifacts/Test.json'


const App = () => {
  const [web3, setWeb3] = useState(undefined)
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState([])

  useEffect(() => {
    const init = async () => {
      try {
        const web3Instance = await getWeb3();
        const userAccounts = await web3Instance.eth.getAccounts();

        const networkId = await web3Instance.eth.net.getId();
        // const deployedNetwork = Test.networks[networkId];
        // const instance = new web3Instance.eth.Contract(Test.abi, deployedNetwork && deployedNetwork.address,);

        // Set web3Instance, accounts, and contract to the state, and then proceed with an example of interacting with the contract's methods.
        // setWeb3(web3Instance)
        // setAccounts(userAccounts)
        // setContract()
      } catch (error) {
        alert(`Failed to load web3Instance, accounts, or contract. Check console for details.`);
        console.error(error);
      }
    }
    init()
  }, [])
  
  if (!web3) { return <div>Loading Web3, accounts, and contract...</div>; }
  return <main>Hello</main>;
}

export default App;
