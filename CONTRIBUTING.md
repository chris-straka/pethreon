# How to develop locally

You need to [install the latest version of yarn](https://yarnpkg.com/getting-started/install). Then you need to [download the metamask browser extension](https://metamask.io/). You might want to use a different [browser profile](https://youtu.be/Ik8-xn4DyCo?t=15) so you can keep your real metamask account separate from your development metamask account (so you don't accidentally add real money to the development account). 

After you install metamask, sign in by clicking "import a metamask wallet using Secret Recovery Phrase". The secret phrase you need to use is "test test test test test test test test test test test junk". This mnemonic will give you a bunch of accounts with 10,000 fake ether so you can use them in the local fake development network (which should be set to run on localhost:8545). Do not add real money to this account! Once you're done importing that mnemonic, go to the advanced settings and enable all the developer stuff (show test networks, advanced gas controls, hex data, conversion on test networks, and customize transaction nonce). 

Then go to packages/frontend/src/pethreon.ts and switch the contract address to the local development address. There's a more elegant way of Then run the following commands in your terminal at the root of the project.

```bash
yarn     # to install dependencies 
yarn dev # to boot up a development network on localhost (and to boot up the react frontend)

# IN A SEPARATE TERMINAL
yarn deploy:localhost # to deploy the smart contract to the localhost network 
```

Metamask comes with its own localhost:8545 network by default, but it doesn't work that well with hardhat in my experience so you should create a new network using the configuration down below. Make sure you still have a development network running in the terminal, otherwise metamask will yell at you when you try to enter the chainID.

```bash
Network Name: localhost   New RPC URL: http://127.0.0.1:8545
Chain Id: 31337           Currency Symbol: ETH
```

After that you should be good to go. If you want to test out the pledge feature, you can create another account in that same metamask wallet and donate to it. If you want to update the smart contract, you're going to have to restart the development network in your terminal before deploying the updated contract (otherwise it will show up on a different address). I recommend using backend tests whenever you're trying to figure out the behaviour of your smart contract (rather than mess with it in the frontend).

```bash
yarn test          # run all the tests
yarn test:backend  
yarn test:frontend
```

# How to develop on the Rinkeby test network 

My contract is currently deployed on the Rinkeby test network at [0xFe63E035A1bbA894A614409371A0eb5726eEc09e](https://rinkeby.etherscan.io/address/0xFe63E035A1bbA894A614409371A0eb5726eEc09e). You can't update contracts after they've been deployed. So if you want to update the contract and deploy a completely new version to Rinkeby, you can go to metamask and switch over to the rinkeby network. Then you can add "rinkeby ether" to that account using a [faucet](https://faucets.chain.link/rinkeby). After you fund that account, you then grab the private key for that metamask account. You can then can uncomment the rinkeby network in the hardhat.config.ts file and then run the following command.

```bash
RINKEBY_DEPLOYMENT_ACCOUNT=YOUR_METAMASK_PRIVATE_KEY yarn deploy:rinkeby
```

Then you have to make sure the frontend is using the right contract address (/packages/frontend/pethreon.ts). I use process.env.CONTRACT_ADDRESS, which is an environment variable that I put into [netlify](https://www.netlify.com/). If process.env.CONTRACT_ADDRESS is not defined (like it is on your local machine) it uses the address that the smart contract always uses when you deploy it locally. 

# Common Errors

If you click sign in and nothing happens after logging into your wallet, check the console. It might say something like "couldn't find the backend". I think this happens because yarn boots up the frontend before the backend is ready. Refresh the page and it should work just fine.

If you get an error that says "Could not fetch chain ID. Is your RPC URL correct?", there's a good chance you're not running a development network. Make sure you have an open terminal running with `yarn dev`. 

If you get an error that says "couldn't get the contributorBalanceInWei", make sure you deployed the smart contract in a separate terminal.

If you get an error that says "Nonce too high. Expected nonce to be X but got Y". Chances are you restarted the development network, but your Metamask account is still using the old transaction data. I'm not sure how to _automatically_ refresh transaction data in metamask everytime this happens, but you can do one of two things.

1. You can manually reset the transaction data in metamask by closing the terminal (killing the development process) and then going to the advanced settings in metamask and hitting "reset account". Then go a different network in metamask (something other than localhost:8545) to invalidate the cache. This should now reset the transaction nonce back at 0. Run yarn dev again and switch back to localhost:8545 in metamask.

2. You could insert the nonce it's expecting manually for each transaction.
