# How To Develop

> Disclaimer: Sepolia and Hardhat are test networks, avoid using real ether!

It's **strongly** recommended that use WSL2 or Unix for this project. 
It makes things easier for hardhat and the production/CI env.

`npm i` will fail unless you setup the environment variables (see .env.example).
Hardhat uses npm but the frontend uses [pnpm](https://pnpm.io/), so install it.
If you don't have metamask [metamask](https://metamask.io/download/), install it.

You'll then want to login to metamask via passphrase by clicking on "forget my password"
I used the passphrase "test test test test test test test test test test test junk"
DO NOT ADD REAL CRYPTOCURRENCY TO THIS ACCOUNT.

```sh
# In one terminal, boot up a local hh (hardhat) network on localhost:8545
npm run dev 
```

```sh
# in a separate terminal, deploy the smart contract to the same network
npm run deployll

# boot up the frontend
npm run fdev
```

You'll then want to [add the localhost 8545 network with chain id 1337 to metamask](https://docs.metamask.io/wallet/how-to/run-devnet/).
You'll now be able to use the dapp frontend to communicate with the pethreon smart contract running locally on port 8545.

If you don't want to use the dapp/metamask and just want to test the smart contract locally, you can do this instead.

```sh
# boots up the hh network for you automatically
npm run test
```

### [Sepolia](https://sepolia.ethpandaops.io/)

If you don't want to develop locally using the local hardhat network, you can also use [the contract I have deployed on the Sepolia testnet](https://blockexplorer.one/ethereum/sepolia/address/0xFe63E035A1bbA894A614409371A0eb5726eEc09e) or deploy your own (`npm run deploysp`).
You'll need fake ether from a [Sepolia faucet](https://sepolia-faucet.pk910.de/).
Just make sure the web3-onboard modal on the dapp frontend is connected to the right network (Sepolia).

### P.S

If you want to make changes to the smart contract, please keep in mind that smart contracts (by design) are immutable. 
This means you have to redeploy a new contract everytime you want to make changes (which requires ether).

### Troubleshooting 

#### ERROR: Metamask's default localhost:8545 doesn't work

Metamask comes with a pre-configured localhost:8545 network by default, but if it doesn't work for you, you can create a custom network config using the info down below. Your dev network needs to be running on localhost:8545 before you can add its configuration to metamask.

```bash
Network Name: localhost   New RPC URL: http://127.0.0.1:8545
Chain Id: 31337           Currency Symbol: ETH
```

#### ERROR: "The Nonce you're using is too high" Error

Chances are you restarted the development network, but your Metamask account is still using the old transaction data. 
I'm not sure how to _automatically_ refresh transaction data in metamask, but you can do one of two things.

1. You can manually reset the transaction data in metamask by closing the terminal (killing the development process) and then going to the advanced settings in metamask and hitting "reset account". Then go a different network in metamask (something other than localhost:8545) to invalidate the cache. This should now reset the transaction nonce back to 0. Run yarn dev again and then switch back to localhost:8545 in metamask and you should be good to go.

2. You could insert the nonce it's expecting manually for each transaction, a feature you can enable in the metamask advanced settings.

#### ERROR: "Couldn't get FooContractFunction()"

The contract may not have deployed correctly

#### ERROR: "Could not fetch chain ID. Is your RPC URL correct?"

The dev network is probably not running
