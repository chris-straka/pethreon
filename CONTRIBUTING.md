# How it works (High Level)

[Hardhat](https://hardhat.org/getting-started/) is a development blockchain for ethereum that runs locally on your computer, [Waffle](https://ethereum-waffle.readthedocs.io/en/latest/index.html) is a testing library for ethereum "smart contracts" (programs that run on the blockchain) and [ethers.js](https://docs.ethers.io/v5/getting-started/) is a frontend JS library for communicating with an ethereum network. Basically, I'm creating a [react app](https://reactjs.org/) that talks to a server (ethereum node) I have running at [infura](https://infura.io/) (the ~AWS of Ethereum).

To create a smart contract, you have to write a solidity file (Pethreon.sol) and then compile down to .JSON (Pethreon.json) using a compiler (like solc, which is baked into hardhat). This JSON file will then have the "bytecode" for an ethereum contract that you can deploy to Ethereum, as well as an "ABI" that describes what that smart contract does. My React application (or any other frontend application) can then use this ABI together with a library (like ethersJS/Web3) to make "JSON-RPC" calls to it after it's been deployed. The calls have to be carried out by an ethereum node (like the one I have running at Infura). Some of these calls require real money (like creating a pledge) because they require verification from every other node in the ethereum network ([~5,000 nodes](https://www.ethernodes.org/history)). Other calls are free (subject to my agreement @ infura -> [I get 100,000 free calls a day](https://infura.io/pricing)). They're free because they don't require any verification from the network (like reading data (pledges) from the blockchain).

In my app, every user is both a "contributor" AND a "creator". A user can donate ("pledge") money to someone else as a _contributor_, OR they can receive money from someone else as a _creator_. The contributor can choose how many days their donation should span out.

## How to develop

Go to the project root and enter...

```bash
npm i -g yarn     # if you don't have yarn
yarn              # install dependencies
yarn dev          # run a local development blockchain and react on localhost
```

[Download the metamask extension](https://metamask.io/) in your browser. You may want to use a different [browser profile](https://youtu.be/Ik8-xn4DyCo?t=15) so you can keep your real metamask account separate from your development metamask account (so you don't accidentally add real money to the development account). After you install metamask, sign in using "import a metamask wallet using a Secret Recovery Phrase". The secret phrase you need to use is "test test test test test test test test test test test junk". This is a unique key used by hardhat for development, in which every account (in that wallet) is given 10,000 fake ether for use in its fake development network (which should be running on localhost:8545).

After importing the developer account, go to advanced settings and enable all the developer stuff (advanced gas controls, hex data, conversion on test networks, show test networks, and customize transaction nonce). Then go to networks and click "add new network". You might notice that Metamask already has localhost:8545 preconfigured for you, but it doesn't work that great in my experience and I don't recommend it (if you want to try it out anyways, switch the chainID in the backend's hardhat.config.ts file to 1337). Instead, I recommend adding a new network with the following details...

```bash
Network Name: Localhost   New RPC URL: http://127.0.0.1:8545
Chain Id: 31337           Currency Symbol: ETH
```

After signing into the new network you should be good to go.

```bash
yarn test # run tests

# TODO - Deploy smart contracts
```

## Errors

If you get an error that says "Could not fetch chain ID. Is your RPC URL correct?", there's a good chance you're not running a development network. Make sure you have an open terminal running with `yarn dev`. If you get an error that says "Nonce too high. Expected nonce to be X but got Y". Chances are you restarted the development network, but your Metamask account is still using old transaction data. I'm don't know how to _automatically_ refresh transaction data in metamask everytime this happens, but there's two things you can do.

1. Exit out of `yarn dev` in your terminal and go to the advanced settings in metamask and hit "reset account". Then switch to a different network in metamask (something other than localhost:8545) to invalidate the cache. This should reset the transaction data in metamask and the nonce should now be set back at 0. Turn the hardhat node back on in your terminal and switch back to localhost:8545 in metamask and you should be good to go again.

2. You could also insert the nonce it's expecting manually for each transaction.