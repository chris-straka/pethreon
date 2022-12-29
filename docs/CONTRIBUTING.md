# How to develop locally

You need to download the [metamask browser extension](https://metamask.io/). You also might want to use a different [browser profile](https://youtu.be/Ik8-xn4DyCo?t=15) for development (in Chrome, Firefox) to keep your real metamask account separate from your developer metamask account. You don't want to make the mistake of adding real crypto to your fake account.

After you install metamask, you need to sign in via "Secret Recovery Phrase" with "test test test test test test test test test test test junk". This will give you a bunch of accounts with 10,000 fake ether for use in the localhost:8545 dev network. Once you're signed in, make sure you go to advanced settings and enable all the developer stuff (test networks, advanced gas controls, hex data, conversion on test networks, customize transaction nonce). 

To test the pledge feature, all you need to do is donate to one of the accounts in your metamask wallet. If you want to make changes to the smart contract, keep in mind that smart contracts (by design) are immutable. This means you have to redeploy the contract and have the app switch to its new address, or you can restart the development network and it will have the same address as before. It might be easier to just test your contract with hardhat by running tests.

It's **strongly** recommended that use WSL or Linux for this project. It will make things easier for hardhat and for migrating stuff over to the production/CI environments. You also need to have pnpm installed for the frontend package manager.

## Rinkeby 

My contract is currently deployed on the Rinkeby test network at [0xa6Af639091752d535e9B3B826e9B91A575205390](https://rinkeby.etherscan.io/address/0xa6Af639091752d535e9B3B826e9B91A575205390). [My frontend](https://lucid-roentgen-95db25.netlify.app/) is currently pointing to it. If you want to try it out as a user, you're going to have to switch your metamask account over to the rinkeby test network and fund it via a [rinkeby faucet](https://faucets.chain.link/rinkeby). You can them make calls to it from my frontend, or from your own app.

If you want to change the smart contract itself, you're going to have to deploy a whole new contract to rinkeby and point to that new address in your frontend. To do this, you're going to need an account that has fake ether on the rinkeby test network. You then have to grab the private key for that account (in the metamask settings). Then you need someway of deploying that smart contract, I recommend you sign up at [infura](https://www.infura.io/) and grab a URL from them so that they can deploy it for you. The alternative is setting up your own ETH node that runs Geth or something. Once you have your private key and your Infura link, you can deploy to Rinkeby or wherever else using a deployment script. 

## Troubleshooting 

### Metamask's default localhost:8545 doesn't work.

Metamask comes with a pre-configured localhost:8545 network by default, but if it doesn't work for you, you can create a custom network config using the info down below. Your dev network needs to be running on localhost:8545 before you can add its configuration to metamask.

```bash
Network Name: localhost   New RPC URL: http://127.0.0.1:8545
Chain Id: 31337           Currency Symbol: ETH
```

### "The Nonce you're using is too high"

Chances are you restarted the development network, but your Metamask account is still using the old transaction data. 
I'm not sure how to _automatically_ refresh transaction data in metamask, but you can do one of two things.

1. You can manually reset the transaction data in metamask by closing the terminal (killing the development process) and then going to the advanced settings in metamask and hitting "reset account". Then go a different network in metamask (something other than localhost:8545) to invalidate the cache. This should now reset the transaction nonce back to 0. Run yarn dev again and then switch back to localhost:8545 in metamask and you should be good to go.

2. You could insert the nonce it's expecting manually for each transaction, a feature you can enable in the metamask advanced settings.

### "Couldn't get FooBarContractFunction()"

The contract may not have deployed correctly

### "Could not fetch chain ID. Is your RPC URL correct?"

The dev network is probably not running
