# How to develop locally

You need to [install the latest version of yarn](https://yarnpkg.com/getting-started/install). Then you need to [download the metamask browser extension](https://metamask.io/). You might want to use a different [browser profile](https://youtu.be/Ik8-xn4DyCo?t=15) so you can keep your real metamask account separate from your development metamask account (so you don't accidentally add real money to the development account). 

After you install metamask, sign in by clicking "import a metamask wallet using Secret Recovery Phrase". The secret phrase you need to use is "test test test test test test test test test test test junk". This is a unique key used by hardhat for development, in which every account (in that wallet) is given 10,000 fake ether for use in the fake development network (which should be running on localhost:8545). You can then create a password for that account.

After signing in, go to the advanced settings and enable all the developer stuff (advanced gas controls, hex data, conversion on test networks, show test networks, and customize transaction nonce). Run the following in your terminal.

```bash
yarn     # install dependencies 
yarn dev # boot up a development network
```

You might notice that Metamask already has the network `localhost:8545` preconfigured for you automatically, which is the same network that hardhat uses but it doesn't work that great in my experience and I don't recommend it (if you want to try it out anyways, switch the chainID to 1337 in hardhat.config.ts and give it a whirl). Instead, I recommend you "add a new network" to metamask with the following configuration.

```bash
Network Name: localhost   New RPC URL: http://127.0.0.1:8545
Chain Id: 31337           Currency Symbol: ETH
```

You need to have a development network/blockchain running otherwise it won't find the chainid. After that you should be good to go. If you want to test out donating to another person, create another account in that metamask wallet.

```bash
yarn test # run tests
```

# How to develop on the Rinkeby test network 

My contract is currently deployed on the Rinkeby test network at [0xFe63E035A1bbA894A614409371A0eb5726eEc09e](https://rinkeby.etherscan.io/address/0xFe63E035A1bbA894A614409371A0eb5726eEc09e). If you want to update the contract and deploy a new one to Rinkeby, you can grab a metamask account (from the rinkeby network) and add ether to it using a [faucet](https://faucets.chain.link/rinkeby) like this one. You then need to grab the private key from that metamask account (the private key is used to sign transactions and you need it because creating a smart contract requires a transaction). You then can then uncomment the rinkeby network in the hardhat.config.ts file and then run the following command.

```bash
RINKEBY_DEPLOYMENT_ACCOUNT=YOUR_METAMASK_PRIVATE_KEY yarn deploy:rinkeby
```

Then you have to make sure the frontend is using the right contract address.

## Errors

If you click sign in and nothing happens after logging into your wallet, check the console. It might say something like "couldn't find the backend". I think this happens because yarn boots up the frontend before the backend is ready. Refresh the page and it should work just fine.

If you get an error that says "Could not fetch chain ID. Is your RPC URL correct?", there's a good chance you're not running a development network. Make sure you have an open terminal running with `yarn dev`. 

If you get an error that says "Nonce too high. Expected nonce to be X but got Y". Chances are you restarted the development network, but your Metamask account is still using the old transaction data. I'm not sure how to _automatically_ refresh transaction data in metamask everytime this happens, but you can do one of two things.

1. You can manually reset the transaction data in metamask by closing the terminal (killing the development process) and then going to the advanced settings in metamask and hitting "reset account". Then go a different network in metamask (something other than localhost:8545) to invalidate the cache. This should now reset the transaction nonce back at 0. Run yarn dev again and switch back to localhost:8545 in metamask.

2. You could insert the nonce it's expecting manually for each transaction.
