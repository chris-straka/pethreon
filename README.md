# Design Doc

I'm still deciding what to do for [this app](https://github.com/Chris56974/WeiBuddies).

## Hardhat

Hardhat is a development environment for ethereum (mock blockchain). Waffle is a testing library for smart contracts and ethers.js is a library for interacting with the blockchain. You can find the [documentation for hardhat here](https://hardhat.org/getting-started/), the [documentation for waffle here](https://ethereum-waffle.readthedocs.io/en/latest/index.html) and the documentation for [ethers.js here](https://docs.ethers.io/v5/getting-started/).

```bash
npx hardhat # help menu
hh          # (alias for npx hardhat)[https://hardhat.org/guides/shorthand.html]

hh test     # runs everything in test
hh node     # allow external clients to connect to hh
hh console  # interact with the environment
hh run scripts/sample_test.ts # deploy 
hh run --network <network> scripts/sample_test.ts # deploy to a network specified in hardhat.config.ts
```
