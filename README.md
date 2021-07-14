# Design Doc

[This app](https://github.com/Chris56974/WeiBuddies) is a dapp frontend for [Sergei Tikhomirov's Smart Contract](https://github.com/s-tikhomirov/pethreon/blob/master/pethreon.sol). It's a crowd funding platform, where users (contributors & creators) can sign in through their cryptowallet to contribute funds to each other in regular intervals. It's made under a mobile first approach via these mockups (Figma).

![Pethreon Mobile Mockup](https://github.com/Chris56974/Pethreon/blob/main/frontend/public/pethreon_mobile.png)
![Pethreon Desktoe 1](https://github.com/Chris56974/Pethreon/blob/main/frontend/public/pethreon_desktop_1.png)
![Pethreon Desktop 2](https://github.com/Chris56974/Pethreon/blob/main/frontend/public/pethreon_desktop_2.png)
![Pethreon Desktop 3](https://github.com/Chris56974/Pethreon/blob/main/frontend/public/pethreon_desktop_3.png)

## How it works

[Hardhat](https://hardhat.org/getting-started/) is a development environment/blockchain for ethereum, [Waffle](https://ethereum-waffle.readthedocs.io/en/latest/index.html) is a testing library for smart contracts (programs that run on the blockchain) and [ethers.js](https://docs.ethers.io/v5/getting-started/) is a library for communicating with the blockchain (calling smart contracts, reading data, etc). My frontend talks to an ethereum node which I have running at [infura](https://infura.io/).

When I compile my smart contract - Pethreon.sol, I get back a Pethreon.json file. This file has the bytecode for the contract which I can deploy to Ethereum + the ABI for the contract which tells my frontend which functions exist on my smart contract. I have to make sure I attach the ABI to my frontend otherwise ethers.js won't know what functions exist on the smart contract and it won't know what to tell my infura node.

## How to develop

For this to work you need to [download metamask](https://metamask.io/). You might also want to use a different [browser profile](https://youtu.be/Ik8-xn4DyCo?t=15) for development so that you can keep your real metamask account separate from your fake one. Once metamask is installed, you need to import a new metamask account via "private key". The private key you need to use is "test test test test test test test test test test test junk", this is a private key used by hardhat for development. Hardhat gives every account with this key 1000 ether. After importing that account, you might need to add a new network as well. Click on networks (mainnet), then on custom RPC and then add the following network if it's not there already...

```text
Network Name: Localhost 8545
New RPC URL:  http://localhost:8545
Chain ID:     31337
Currency:     ETH
```

You should then be able to run these commands and get started.

```bash
yarn                      # install backend dependencies (or npm install)
npx hardhat node --watch  # bootup a development blockchain on port 8585
hh node --watch           # (shorthand for the above)[https://hardhat.org/guides/shorthand.html]

# Open another terminal
cd frontend
yarn                      # install frontend dependencies (react)
yarn start                # bootup react on port 3000

# To deploy the smart contract (TODO)
hh run scripts/sample_script.ts                   # deploy the contract to the ethereum provider
hh run --network <network> scripts/sample_test.ts # deploy to a network specified in hardhat.config.ts
```

## Issues

### Getting Expected Payments in Batch

```solidity
// TODO: get expected payments in batch (can't return uint[]?)
function getExpectedPayment(uint period) constant returns (uint expectedPayment) {
  return (period < afterLastWithdrawalPeriod[msg.sender]) ? 0 :
  expectedPayments[msg.sender][period];
}
```

### Recurring payments

Implementing [recurring payments](https://ethereum.stackexchange.com/questions/49596) on Ethereum is not as easy as I thought it'd be. Running contracts at a later point in time is also [non-trivial](https://ethereum.stackexchange.com/questions/42). This is because in Ethereum, only EOA's "Externally Owned Accounts" (humans) can create transactions. A smart contract can't create a transaction at a later date, even if both parties want that to happen. Someone has to send a transaction into the smart contract at that later date. One cool way to do this is with [Ethereum Alarm Clock](https://www.ethereum-alarm-clock.com/) which is a decentralized service I might look at later. It's also worth noting that I can't run a transaction in the EVM forever either, I'd run out of gas. Which means I can't "wait for callback" in the EVM at a later date, if my understanding is correct.

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

## Charity application idea?

Pethreon relies on contributions being locked up in the smart contract. I'm not a fan of this because I think that money can be put to work (DeFi). So I thought about another idea for my next project. I was thinking users could donate money into different charity pools. The money in the pool could then be locked up into a DeFi protocol like [Aave](https://aave.com/), the accrued interest could then be redirected to a charity address like [0x54a465610d119ad28deafd4bce555834c38beeb9](https://thewaterproject.org/donate-ethereum). Users could withdraw their donations from the pool, but ~25% will remain in the pool so that it can continue to grow.

## Features & Ideas

### Unipledge?

It'd be cool to make a pledge that would donate to all creators on the platform. It might create an influx of fake creators (and repeat creators) but maybe I'll play around with it anyways.

### Privacy?

Sergei's original implementation respects the privacy of contributors and creators. There might be advantages to sacrificing more of the creator's privacy to improve the website for contributors.

### CSR? SSG? SSR?

If I bring in SSR (Next.js) then my users won't have to download metamask to look at creators. I can fetch them from the server and show them straight away to the client. This is a much better UX, but for now I decided against SSR to make it more decentralized (to differentiate it more from Patreon). This is a more censor resistant approach.

### Caching (localstorage vs indexedDB)

Localstorage can only store strings, but I think that's all I need.

### HTML5 main tag and SPA's?

Some people recommend using the main tag on [every page](https://stackoverflow.com/questions/44308760). Does this apply to SPAs too? If I'm only serving one HTML page, won't it see the main tag multiple times on the "same page". Will that effect SEO? I've never thought of this until now. I've decided to only use it once.

### How much data can I read from the blockchain?

Calls are free, but is there a limit to how much data I can read from the blockchain? Could people DDOS fullnodes with free calls? UPDATE: I think you're not allowed to ask any node you want. You have to talk to your own node (Geth or Infura), so you could only DDOS yourself.

### Background Synchronization?

As a bonus, I could allow contributors to make donations offline using service workers and then synchronizing them in the background once they come back online.

## Notes

### SafeMath

SafeMath is no longer needed for solidity 0.8.0+ (integer variable types can't overflow anymore). If you're using an older version of solidity, make sure you also use an older version of SafeMath too [@openzepplin/contracts](https://github.com/OpenZeppelin/openzeppelin-contracts).

### hardhat-react-plugin

[This plugin](https://hardhat.org/plugins/hardhat-react.html) is the main reason I chose to do this project in React, but it was outdated and giving me other troubles so I decided to make my own type-safe context file.

### Passing ether around

There are a couple [exceptions](https://ethereum.stackexchange.com/questions/63987), but a smart contract MUST have a payable function in order for it to have an ether balance. If the smart contract does have a payable function, the user can call it by specifying it in the input data of their transaction (via ethers.js). If you send ether to a smart contract via a transaction with NO input data (i.e. a transaction that doesn't call anything) OR you call a function that doesn't exist, it's going to call that contract's "fallback function" which could take many forms.

```solidity
// Pre solidity v0.6.0
contract foo {
  // You can only have ONE of the following, they can each run 2300 gas worth of computation, and are usually used to emit an event to the frontend
  function() external {}         // runs, throws an exception, and reverts the entire transaction
  function() external payable {} // runs, and then deposits all the ether into the smart contract
}

// Solidity v0.6.0+
contract foo {
  // You can have one OR both
  fallback() external {}         // same as before, BUT the receive() function prevails if there's no input data in the transaction
  fallback() external payable {} // ibid
  receive() external payable {}  // called whenever there's no input data, puts all ether into the smart contract
}
```

In order to send a transaction with input data, you need to use a library like web3 or ethersJS. Normal human accounts (EOAs) don't have/need this libary, it's just used by decentralized applications as far as I'm aware. When you call a function using one of these libraries, you'll have the ability to pass in an "overrides object" automatically into every payable function as an extra argument. The contract looks this `method(arg1, arg2)` and you call it in JS like this `contract.method(arg1, arg2, {overrides})`. You can specify how much ether to send in the overrides as well as other stuff like gas.

If you want YOUR smart contract to send ether to someone else, then you need to use the send(), transfer() or call() functions. These days however, only [call()](https://ethereum.stackexchange.com/questions/78124/) is recommended. The address that you're sending money to must also be marked payable in the smart contract code i.e. payable(address). Every contract starts off at 0 balance, and your contract can see its own balance via address(this).balance. Sites like [Remix](https://remix.ethereum.org/) will also show you I think.

A provider is a connection to the Ethereum blockchain.

### Measuring time in smart contracts (the period stuff in Pethreon.sol)

You can measure time with an oracle, but for simplicity I think Sergei uses blocktime instead. There are roughly [~6,400 blocks mined per day](https://ycharts.com/indicators/ethereum_blocks_per_day), or 192,000 blocks per month. The cool part about Sergei's contract is you get to choose which increments you would like to pay people in (hourly, daily, monthly, yearly). I'm going to make it daily for now.

### How does Solidity's multiple return values transfer over to JS?

JS functions can't return multiple values, but solidity functions can. In JS, these multiple return values come back as an array which makes sense. But logging that array during my tests reveals twice as many items in the array. I think the other half is meant to describe the first half of the array which is cool. I can only destructure the first half of the array, how did they do that? >.<

## Attribution

- [Sergei's Pethreon Smart Contract](https://github.com/s-tikhomirov/pethreon)

- [Cottonbro's Money Video - Aspect Ratio 256:135](https://www.pexels.com/video/hands-rich-green-money-3943962/)

- [Metamask Logo](https://github.com/MetaMask/brand-resources)

- [ionicons](https://ionic.io/ionicons)

- [Github logo](https://github.com/logos)

- [Artsy Cat's Cutesy Font](https://www.dafont.com/cutesy.font)

- [Sarah Fossheim's Loading Animation](https://fossheim.io/writing/posts/react-text-splitting-animations/)
