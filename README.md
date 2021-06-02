# Design Doc

[This app](https://github.com/Chris56974/WeiBuddies) is an adaptation of [Pethreon](https://github.com/s-tikhomirov/pethreon/blob/master/pethreon.sol). I intend to make some changes and give it a React frontend.

## Hardhat

[Hardhat](https://hardhat.org/getting-started/) is a development environment (i.e. dev blockchain) for ethereum, [Waffle](https://ethereum-waffle.readthedocs.io/en/latest/index.html) is a testing library for smart contracts and [ethers.js](https://docs.ethers.io/v5/getting-started/) is a library for interacting with the Ethereum blockchain.

```bash
npx hardhat # help menu
hh          # (ibid)[https://hardhat.org/guides/shorthand.html]

hh test     # runs tests
hh node     # lets external clients connect to hh's dev blockchain (on some port i.e. 8080)
hh console  # for interacting with the hh dev environment

hh run scripts/sample_script.ts                   # deploy 
hh run --network <network> scripts/sample_test.ts # deploy to a network specified in hardhat.config.ts
```

## Issues

### Recurring payments

Implementing [recurring payments](https://ethereum.stackexchange.com/questions/49596) on Ethereum is not as easy as I thought it'd be. Running contracts at a later point in time is also [non-trivial](https://ethereum.stackexchange.com/questions/42). This is because in Ethereum, only EOA's "Externally Owned Accounts" (humans) can create transactions.

### Security, profanity and offensive content

I originally wanted creators to create their own landing page by storing all their details on the ethereum blockchain. Users could then grab all the landing page details from the blockchain and cache them locally (localstorage). The issue is, it's tricky to validate those landing page details. It feels like I just gave creators direct access to my database. Solidity is great at validating boolean logic and numbers (with require()), but text content seems much more difficult (creator bio, youtube links, etc).

Some pitfalls I discovered are.

- People impersonating creators and wrongfully claiming donations on their behalf
- Creators posting offensive content or malicioius links/scripts on their landing page

I could take a hybrid approach and introduce a server to validate input, but I've decided to compromise and stick to data that is easy to validate.

### Multiple testing frameworks?

CRA "Create React App" uses Jest, but Truffle uses Mocha and Chai. I was planning on using all three in the same project, but I ran into issues where typechain would create conflicting type definitions between Chai and Jest. Maybe there's an easy way around this, but at the time I didn't want to [eject my CRA](https://create-react-app.dev/docs/available-scripts#npm-run-eject) and remove Jest. I thought maybe I could separate dependencies via [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces) but I ended up settling on an even better typescipt-react setup using hardhat instead of Truffle. It comes with stacktraces and console logging for smart contracts which will make it much easier for me to understand everything.

```ts
// node_modules
declare const: expect = Chai.ExpectStatic; // this kept conflicting with...
declare const expect: jest.Expect;         // this 
```

## Charity application?

Pethreon relies on contributors locking up their crypto upfront. From a user perspective, I'm not a fan of this.

1. The contributor has better places to lock their funds (DeFi).

2. If the contributor is already committed to locking that much upfront, they would probably prefer to donate the full amount and pay one fee instead of several.

So I thought about another idea for my next project. I was thinking users could donate their money into different charity pools. The money would then be locked into a DeFi protocol like [Aave](https://aave.com/), the accrued interest could then be redirected to a charity address like [0x54a465610d119ad28deafd4bce555834c38beeb9](https://thewaterproject.org/donate-ethereum). Users could withdraw their donations from a pool if they want to contribute to something else, but 25% will remain in the pool so that it can continue to grow infinitely.

## Features

### Unipledge?

It'd be cool to make a pledge that would donate to all creators on the platform. It might create an influx of fake creators (and repeat creators) but maybe I'll play around with it anyways.

### CSR? SSG? SSR?

If I bring in SSR (Next.js) then my users won't have to download metamask to look at creators. I can fetch them from the server and show them straight away to the client. This is a much better UX, but for now I decided against SSR to make it more decentralized (to differentiate it more from Patreon). This is a more censor resistant approach.

### Caching (localstorage vs indexedDB)

Localstorage can only store strings, but I think that's all I need.

### How much data can I read from the blockchain?

Calls are free, but is there a limit to the amount of data I can read? Could people DDOS the fullnodes with free calls?

### Background Synchronization?

As a bonus, I could allow contributors to make donations offline using service workers and background synchronization.

## Notes

### SafeMath

SafeMath is no longer needed for solidity 0.8.0+ (integer variable types can't overflow anymore). Hardhat doesn't like solidity 0.8.0 though, so I'm using 0.7.6 which means I also need an older @openzepplin/contracts dependency.

### Passing ether around

A smart contract can only have an ether balance if it has a payable function. The payable function can be `receive() external payable {}` (v0.6.0) which runs like a lifecycle hook whenever the contract receives a transaction with no input data (you can emit an event here). Or it can be a payable function that users call explicitely in the input data. Whenever you're calling a payable function from outside the contract via a library like ethersJS or web3, you'll automatically have an overrides object passed in for you where you can provide the details e.g contract.method(arg1, arg2, {overrides}). If you want the contract to send ether to someone else, then you have to make their address payable in the contract e.g payable(address). The contract's balance starts off at 0, and you can see it with address(this).balance.

### Sources

- [Cottonbro's Money Video - Aspect Ratio 256:135](https://www.pexels.com/video/hands-rich-green-money-3943962/)

- [Metamask Logo](https://github.com/MetaMask/brand-resources)
