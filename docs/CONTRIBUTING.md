# How to develop locally

It's **strongly** recommended that use WSL or Linux/Unix for this project. It will make things easier for hardhat and also for migrating code over to production/CI environments. 

`npm install` is not going to work until you setup some environment variables (you'll also need to install [pnpm](https://pnpm.io/)). Please refer to the .env.example file in the root directory for information on what you need to do.

To develop things locally on the frontend you'll need to create your own 

## P.S 

If you want to make changes to the smart contract, please keep in mind that smart contracts (by design) are immutable. This means you have to redeploy the contract everytime you want to make changes. When working with smart contracts, I strongly recommend using tests with hardhat.

## Test Networks

I have deployed my smart contract to [Goerli](https://goerli.net/) and [Sepolia](https://sepolia.dev/). The contract address is the same on both networks. To test things out, you need to get ether from a [Goerli Faucet](https://goerlifaucet.com/) or a [sepolia faucet](https://sepolia-faucet.pk910.de/). I recommend using Goerli because metamask bugs out a bit on sepolia, in my experience. 

## 

Sepolia is one of the two test networks supported by ethereum. You can get fake sepolia ether from a . [I already deployed a smart contract to sepolia](https://sepolia.etherscan.io/address/0xfe63e035a1bba894a614409371a0eb5726eec09e), and I have included the address for it in the env files. You can deploy your own version and replace the address.

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
