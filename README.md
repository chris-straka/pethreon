# Features

- No fees (besides ETH tx costs)

- No trusted third party

- Pseudoanonymous (addresses only)

## Design Doc

This app involves contributors pooling their funds together into a DeFi protocol so that the accrued interest can go towards charity. Contributors can withdraw their crypto at anytime, however 25% of their original contribution will always remain in the protocol so that there is always a growing set of funds in the pool.

## Hardhat

I use hardhat as a development environment for ethereum (mock blockchain). I use waffle as a testing library to test contracts and I use ethers.js to interact with the blockchain. You can find the [documentation for hardhat here](https://hardhat.org/getting-started/), the [documentation for waffle here](https://ethereum-waffle.readthedocs.io/en/latest/index.html) and the documentation for [ethers.js here](https://docs.ethers.io/v5/getting-started/).

If you're getting a "can't find ethers" error in the test folder, try opening hardhat.config.ts.

```bash
npx hardhat # help menu
hh          # (alias for npx hardhat)[https://hardhat.org/guides/shorthand.html]

hh test     # test contracts
hh node     # allow external clients to connect to hh
hh run scripts/sample_test.ts # deploy 
hh run --network <network> scripts/sample_test.ts # deploy to a network specified in hardhat.config.ts
```

### Attributions

I used [Sergei Tikhomirov's Smart Contract](https://github.com/s-tikhomirov/pethreon) to help me with solidity.

[Patreon](https://www.patreon.com/) is the application my dapp is modeled off.
