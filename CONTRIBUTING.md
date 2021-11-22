# How it works (High Level)

[Hardhat](https://hardhat.org/getting-started/) is a development blockchain for ethereum that runs locally on your computer, [Waffle](https://ethereum-waffle.readthedocs.io/en/latest/index.html) is a testing library for ethereum "smart contracts" (programs that run on the blockchain) and [ethers.js](https://docs.ethers.io/v5/getting-started/) is a frontend JS library for communicating with the ethereum network. Basically, I'm creating a [react app](https://reactjs.org/) that talks to an ethereum node I have running at [infura](https://infura.io/) (the ~AWS for Ethereum).

To create a smart contract, you have to write a solidity file (Pethreon.sol) and then compile it to a JSON file (Pethreon.json) via a compiler (solc which is baked into hardhat). This JSON file will then have "bytecode" that you can deploy to Ethereum, as well as an "ABI" that describes what the smart contract does (the ABI is written in bytecode). My React application (or any other frontend application) can then use this ABI together with a library (like ethersJS/Web3) to make calls to it after it's been deployed. The calls have to be carried out by an ethereum node (like the one I have running at Infura). Some of these calls require real money (like creating a pledge) because they require verification from every other node in the ethereum network ([~5,000 nodes](https://www.ethernodes.org/history)). Other calls are free (subject to my agreement @ infura -> [I get 100,000 free calls a day](https://infura.io/pricing)) because they don't require any verification from the network (like reading data from the blockchain).

In my app, every user is both a "contributor" AND a "creator". A user can donate ("pledge") money to someone else as a _contributor_, OR they can receive money from someone else as a _creator_. The contributor can choose how many days they want their pledge to last.

## How to develop

Before you install metamask, you should first install the backend dependencies for Pethreon and run a development blockchain on your localhost (using the commands below). Otherwise, metamask won't be able to detect it and it won't be able to add it to its list of networks.

```bash
yarn                     # while in the project root directory (not the frontend root directory)
npx hardhat node --watch # run an HTTP/WebSocket JSON-RPC server on localhost:8545 (dev blockchain)
```

Then [download the metamask extension](https://metamask.io/) in your browser. You might want to use a different [browser profile](https://youtu.be/Ik8-xn4DyCo?t=15) so you can keep your development metamask account separate from your personal metamask account (to avoid adding real money to the development account). After you install metamask, you should "import a metamask wallet using a Secret Recovery Phrase". The secret phrase you need to use is "test test test test test test test test test test test junk". This is a unique key used by hardhat for development, in which every account (in that wallet) is given 10,000 fake ether for use in its development network (@ localhost:8545). After importing that account, go to advanced settings and enable all the developer settings (advanced gas controls, hex data, conversion on test networks, show test networks, customize transaction nonce). Then go to networks and "add a new network". You might notice that Metamask already has localhost:8545 preconfigured, but it doesn't work that great in my experience and I don't recommend it (if you want to try it out anyways, switch the chainID in hardhat.config.ts to 1337). Instead, I recommend adding a new network with the following...

```bash
Network Name: Localhost   New RPC URL: http://127.0.0.1:8545
Chain Id: 31337           Currency Symbol: ETH
```

If it says "Could not fetch chain ID. Is your RPC URL correct?", there's a good chance you're not running a development network. Make sure you have an open terminal running with `npx hardhat node --watch`. Once you connect you should be ready to go. If you need another account to pledge to, open up your metamask wallet and donate to another local account.

```bash
npx hardhat node --watch  # run a development node (if you're not running one already)
hh test                   # (hh)[https://hardhat.org/guides/shorthand.html] is a shorthand for npx hardhat 

# Open another terminal
cd frontend
yarn                      # install frontend dependencies (react)
yarn start                # bootup react on port 3000

# To deploy the smart contract (TODO)
hh run scripts/Pethreon.ts                # deploy the contract to the ethereum provider
hh run --network <network> scripts/Pethreon.ts # deploy to a network specified in hardhat.config.ts
```

If you get an error that says "Nonce too high. Expected nonce to be X but got Y". Chances are you restarted the hardhat node, but your Metamask account is still using the old transaction data. I'm not sure how to _automatically_ refresh the transaction data in metamask everytime a new node kicks up in your terminal, but you can do one of these two things manually.

1. Go to your metamask accounts page and click on settings -> advanced -> customized transaction nonce and switch it ON. Then on your next transaction, insert the nonce that it's expecting.

2. Turn off the hardhat node in your terminal and go to the advanced settings in step 1 and "reset account". Then switch the metamask network to something else (something other than localhost:8545) and then back to localhost:8545 to invalidate the cache. This should reset the transaction data in metamask and the nonce should now be set back at 0. Turn the hardhat node back on in your terminal and you should be good to go again.
