# How to develop locally

You need to [install the latest version of yarn](https://yarnpkg.com/getting-started/install). Then you need to [download the metamask browser extension](https://metamask.io/). You might want to use a different [browser profile](https://youtu.be/Ik8-xn4DyCo?t=15) so you can keep your real metamask account separate from your development metamask account (so you don't accidentally add real money to the development account). 

After you install metamask, sign in by "importing a wallet via Secret Recovery Phrase". The secret phrase you need to use is "test test test test test test test test test test test junk". This mnemonic will give you a bunch of accounts with 10,000 fake ether for use in the fake localhost:8545 development network. Do not add real money to this account! Once you're done importing that mnemonic, go to the advanced settings and enable all the developer stuff (show test networks, advanced gas controls, hex data, conversion on test networks, and customize transaction nonce). 

```bash
yarn     # to install dependencies 
yarn dev # boot up a development blockchain on localhost:8545 (and boot up the react frontend on localhost:3000)
```

Metamask comes with its own localhost:8545 network by default, but it doesn't work that well with hardhat in my experience so you should create a new network using the configuration below. Make sure your development network is still running at localhost:8545, otherwise metamask will yell at you when you try to enter the chainID.

```bash
Network Name: localhost   New RPC URL: http://127.0.0.1:8545
Chain Id: 31337           Currency Symbol: ETH
```

After that you should be good to go. To test the pledge feature, all you need to do is donate to another one of your accounts in the metamask wallet. If you want to make changes to the smart contract, you're going to have to restart the development network in your terminal so you can redeploy it to localhost (the contract address will be the same). I recommend using tests to figure out your smart contract. 

```bash
yarn test          # run all the tests
yarn test:backend  
yarn test:frontend
```

# How to develop on the Rinkeby test network 

My contract is currently deployed on the Rinkeby test network at [0xa6Af639091752d535e9B3B826e9B91A575205390](https://rinkeby.etherscan.io/address/0xFe63E035A1bbA894A614409371A0eb5726eEc09e). You can't update smart contracts after they've already been deployed. So you're going to have to deploy a completely new contract and point the frontend to that new contract address. You're going to need "rinkeby ether" to deploy to Rinkeby too, which you can get from a [faucet](https://faucets.chain.link/rinkeby). After you fund your rinkeby account, you need to grab your private key from the metamask settings and put it in a .env file in the backend package. You can find more information in the .env.example files in both the backend and the frontend.

# Common Errors

If you click "sign-in" and nothing happens after you've logged into your wallet, check the console. It might say something like "couldn't find the backend". I think this happens because yarn boots up the frontend before the backend is ready. Refresh the page and it should work just fine.

If you get an error that says "Could not fetch chain ID. Is your RPC URL correct?", there's a good chance you're not running a development network. Make sure you have an open terminal running with `yarn dev`. 

If you get an error that says "couldn't get the contributorBalanceInWei()", make sure the smart contract deployed correctly.

If you get an error that says "Nonce too high. Expected nonce to be X but got Y". Chances are you restarted the development network, but your Metamask account is still using the old transaction data. I'm not sure how to _automatically_ refresh transaction data in metamask everytime this happens, but you can do one of two things.

1. You can manually reset the transaction data in metamask by closing the terminal (killing the development process) and then going to the advanced settings in metamask and hitting "reset account". Then go a different network in metamask (something other than localhost:8545) to invalidate the cache. This should now reset the transaction nonce back to 0. Run yarn dev again and switch back to localhost:8545 in metamask and you should be good to go.

2. You could insert the nonce it's expecting manually for each transaction, a feature you can enable in metamask advanced settings.
