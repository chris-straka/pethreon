# How to develop

You need to [install the latest version of yarn](https://yarnpkg.com/getting-started/install). If you're running into install issues, you might be using the old version of yarn on 

Then you gotta upgrade yarn to use 

[Download the metamask extension](https://metamask.io/) for your specific browser. If you already have metamask, you may want to use a different [browser profile](https://youtu.be/Ik8-xn4DyCo?t=15) so you can keep your real metamask account separate from your development metamask account (so you don't accidentally add real money to the development account). After you install metamask, sign in by clicking "import a metamask wallet using a Secret Recovery Phrase". The secret phrase you need to use is "test test test test test test test test test test test junk". This is a unique key used by hardhat for development, in which every account (in that wallet) is given 10,000 fake ether for use in its fake development network (which should be running on localhost:8545). You can then create a password for that account like testjunk.

After importing the account, go to the advanced settings and enable all the developer stuff (advanced gas controls, hex data, conversion on test networks, show test networks, and customize transaction nonce). You might notice that Metamask already has the network `localhost:8545` preconfigured for you automatically, which is the same network that hardhat uses but it doesn't work that great in my experience and I don't recommend it (if you want to try it out anyways, switch the chainID to 1337 in hardhat.config.ts). Instead, I recommend you "add a new network" to metamask with the following.

```bash
Network Name: Localhost   New RPC URL: http://127.0.0.1:8545
Chain Id: 31337           Currency Symbol: ETH
```

After signing into the new network you should be good to go.

```bash
yarn test # run tests
yarn dev  # run a local development blockchain and react on localhost
```

## Errors

If you click sign in and nothing happens after logging into your wallet, check the console. It might say something like "couldn't find the backend". I think this happens because yarn boots up the frontend before the backend is ready. Refresh the page and it should work just fine.

If you get an error that says "Could not fetch chain ID. Is your RPC URL correct?", there's a good chance you're not running a development network. Make sure you have an open terminal running with `yarn dev`. 

If you get an error that says "Nonce too high. Expected nonce to be X but got Y". Chances are you restarted the development network, but your Metamask account is still using the old transaction data. I'm not sure how to _automatically_ refresh transaction data in metamask everytime this happens, but you can do one of two things.

1. You can manually reset the transaction data in metamask by closing the terminal (killing the development process) and then going to the advanced settings in metamask and hitting "reset account". Then go a different network in metamask (something other than localhost:8545) to invalidate the cache. This should now reset the transaction nonce back at 0. Run yarn dev again and switch back to localhost:8545 in metamask.

2. You could insert the nonce it's expecting manually for each transaction.
