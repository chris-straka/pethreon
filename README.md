# Design Doc

[This app](https://github.com/Chris56974/WeiBuddies) is a dapp frontend for [Sergei Tikhomirov's "Pethreon" Smart Contract](https://github.com/s-tikhomirov/pethreon/blob/master/pethreon.sol). It's a crowd funding platform, where users (contributors & creators) can sign in through their cryptowallet to contribute funds to each other in regular intervals. It's made under a mobile first approach using these mockups (Figma).

![Pethreon Mobile Mockup](https://github.com/Chris56974/Pethreon/blob/main/frontend/public/pethreon_mobile.png)
![Pethreon Desktoe 1](https://github.com/Chris56974/Pethreon/blob/main/frontend/public/pethreon_desktop_1.png)
![Pethreon Desktop 2](https://github.com/Chris56974/Pethreon/blob/main/frontend/public/pethreon_desktop_2.png)
![Pethreon Desktop 3](https://github.com/Chris56974/Pethreon/blob/main/frontend/public/pethreon_desktop_3.png)

## How it works

[Hardhat](https://hardhat.org/getting-started/) is a development environment/blockchain for ethereum, [Waffle](https://ethereum-waffle.readthedocs.io/en/latest/index.html) is a testing library for smart contracts (programs that run on the blockchain) and [ethers.js](https://docs.ethers.io/v5/getting-started/) is a frontend library for communicating with the blockchain (used to make smart contract calls from JS). My frontend is a react app that talks to an ethereum node running at [infura](https://infura.io/) (the AWS of Ethereum).

Essentially, I write smart contracts in solidity (Pethreon.sol) and then compile them to JSON (Pethreon.json). Inside that JSON file there is "bytecode" that I can deploy to Ethereum itself, and an "ABI" that describes the functions that exist on that smart contract. My React application (or any other application) can then use this ABI together with a library like ethersJS to make calls to this smart contract. I then direct those calls to an ethereum node (like the one I have running at Infura) to execute them. Some of these calls will require real money because they have to be verified by every other ethereum node in the network ([~5,000](https://www.ethernodes.org/history)), others are "free" (subject to my plan at Infura).

## How to develop

For this to work you need to [download metamask](https://metamask.io/). You might also want to use a different [browser profile](https://youtu.be/Ik8-xn4DyCo?t=15) for development so that you can keep your personal metamask account separate from your development one. Once metamask is installed, you need to import a new metamask account via "private key" and insert "test test test test test test test test test test test junk". This is a unique key used by hardhat for development, in which every account is given 1000 ether. After importing that private key, you might need to add a new network as well. Click on networks (mainnet), then on custom RPC and then add the following network if it's not there already...

```text
Network Name: Localhost 8545
New RPC URL:  http://localhost:8545
Chain ID:     1337
Currency:     ETH
```

You should then be able to run these commands and get started. If you need another account to test out the pledge feature, open up your metamask wallet and make the pledge to your other metamask accounts (they should also have 1000 ether).

```bash
yarn                      # install backend dependencies (or npm install)
npx hardhat node --watch  # bootup a development blockchain on port 8585
hh node --watch           # (shorthand for the above)[https://hardhat.org/guides/shorthand.html]

# Open another terminal
cd frontend
yarn                      # install frontend dependencies (react)
yarn start                # bootup react on port 3000

# To deploy the smart contract (TODO)
hh run scripts/Pethreon.ts                # deploy the contract to the ethereum provider
hh run --network <network> scripts/Pethreon.ts # deploy to a network specified in hardhat.config.ts
```

If you get an error that says "Nonce too high. Expected nonce to be X but got Y". Chances are you restarted the hardhat node, but Metamask is still using the old transaction data. I'm not sure how to _automatically_ refresh the transaction data everytime a new node kicks up, but you can do one of two things manually.

1. Go to your metamask accounts page and click on settings -> advanced -> customized transaction nonce and turn it ON. Then on your next transaction, insert the nonce that it's expecting.

2. Turn off the hardhat node and go to the same advanced settings in step 1 and "reset account". Then switch the metamask network to something else (something other than localhost:8545) and then back to localhost:8545. This should reset the transaction data in metamask and the nonce should now be back at 0. Turn on the hardhat node and you're good to go again.

## Issues

These are issues I've faced during development.

### Getting Expected Payments in Batch

Currently, the app forces creators to withdraw all their money at once. Sergei had plans to let the creator withdraw funds in batches instead of all at once.

```solidity
// TODO: get expected payments in batch (can't return uint[]?)
function getExpectedPayment(uint period) constant returns (uint expectedPayment) {
  return (period < afterLastWithdrawalPeriod[msg.sender]) ? 0 :
  expectedPayments[msg.sender][period];
}
```

### Recurring payments

Implementing [recurring payments](https://ethereum.stackexchange.com/questions/49596) on Ethereum is not as easy as I thought it'd be. Running contracts at a later point in time is also [non-trivial](https://ethereum.stackexchange.com/questions/42). It's hard to create recurring transactions because in Ethereum, only EOAs "Externally Owned Accounts" (humans) can create transactions and NOT CAs "Contract Accounts" (aka smart contracts). This means I can't have a contract create a transaction every month to bill a user, I need a human to create a transaction every month to bill a user which defeats the point. "Instead of creating a transaction every month, can't you create a _single_ transaction that bills them every month?" I don't think so, because that transaction would have to sit in the EVM for months and months (which would be prohibitively expensive becaue it would bog down the network). There is a decentralized way of creating a transaction every month using [Ethereum Alarm Clock](https://www.ethereum-alarm-clock.com/) but I didn't bother looking into it.

### Security, profanity and offensive content

I originally wanted creators to create their own landing page advertizing to doners, and store all the landing page details on the ethereum blockchain. The client would then fetch those details and cache them on the user's browser. I ran into a bunch of issues with this. I found that the data I wanted to store on the blockchain was far too expensive to store (images). It's also tricky to validate anything that isn't numbers in solidity (like text). There are also a whole host of security issues

- People could easily impersonate as creators and wrongfully claim donations on their behalf
- Creators could easily post links to offensive or malicious content

I could take a hybrid approach and introduce a server to validate input, but I've decided to compromise and stick to a decentralized approach (and it's much easier).

### Multiple testing frameworks?

CRA "Create React App" uses Jest, but Truffle uses Mocha and Chai. I was planning on using all three in the same project, but I ran into issues where typechain would create conflicting type definitions between Chai and Jest. Maybe there's an easy way around this, but at the time I didn't want to [eject my CRA](https://create-react-app.dev/docs/available-scripts#npm-run-eject) and remove Jest. I thought maybe I could separate dependencies via [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces) but I ended up settling on an even better typescipt-react setup using hardhat instead of Truffle. It comes with stacktraces and console logging for smart contracts which will make it much easier for me to understand everything.

```ts
// node_modules
declare const: expect = Chai.ExpectStatic; // this kept conflicting with...
declare const expect: jest.Expect;         // this
```

### Can't iterate over all the pledges

In Sergei's original contract, it wasn't possible to iterate over all of a user's pledges. But my application needs to do that so that I can show the user their current pledges (so they can view/cancel them). I have to figure out how to do this, because maps are not iterable in solidity. I think I have to do something like this

```cpp
contract Pethreon {
  mapping(address => uint) userTransactionNonce;
  mapping(address => mapping(uint => uint[])) userTransactions;

  function createPledge() public returns(uint) {
    userTransactions[msg.sender][userTransactionNonce[msg.sender]]
    // make the pledge and set it equal to the contibutor nonce
    // increment the contributor nonce
  }

  function getPledges() view {
    // iterate through all the transactions
    // Check each pledge at each transaction
    // Return them all back to the user
  }
}
```

## Features & Ideas

These are ideas for features that I thought about adding.

### Unipledge?

It'd be cool to make a pledge that would donate to all creators on the platform. It might create an influx of fake creators though (and repeat creators) but maybe I'll play around with it.

### Privacy?

Sergei's original implementation respects the privacy of contributors and creators (address only). There might be advantages to sacrificing more of the creator's privacy to improve the website for prospective contributors (include links to a creator's youtube page).

### CSR? SSG? SSR?

If I bring in a server and use something like SSR (Next.js), then my users won't have to download metamask to look at creators. The server can fetch the list of creators for them on their behalf and show them to the client. This is a much better UX, but for now I decided against SSR to make it more decentralized (to differentiate it more from Patreon).

### Caching (localstorage vs indexedDB)

I still have to figure out what I should store and how (localstorage can only store strings, but that should be fine I think?)

### How much data can I read from the blockchain?

Calls are free, but is there a limit to how much data I can read from the blockchain? Could people DDOS fullnodes with free calls? UPDATE: I think you're not allowed to ask any node you want. You have to talk to your own node (Geth or Infura), so you could only DDOS yourself.

### Background Synchronization?

As a bonus, I could allow contributors to make donations offline using service workers and then synchronizing them in the background once they come back online.

### Charity application idea?

Pethreon relies on contributions being locked up inside the smart contract. I'm not a fan of this because I think that money can be put to better uses (DeFi). So I thought about another idea for my next project. I was thinking users could donate money into different charity pools. The money in the pool could then be locked into a DeFi protocol like [Aave](https://aave.com/), the accrued interest could then go towards a charity address like [0x54a465610d119ad28deafd4bce555834c38beeb9](https://thewaterproject.org/donate-ethereum). Users could withdraw donations from the pool, but ~25% will remain in the pool so that it can continue to grow.

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

You can measure time using an oracle, but for simplicity Pethreon uses blocktime. There are [~6,400 blocks mined per day](https://ycharts.com/indicators/ethereum_blocks_per_day), or 192,000 blocks per month. I'm going to make it daily for now.

### How does Solidity's multiple return values transfer over to JS?

JS functions can't return multiple values, but solidity functions can. In JS, these multiple return values come back as an array which makes sense. But logging that array during my tests reveals twice as many items in the array. I think the other half is meant to describe the first half of the array which is cool. I can only destructure the first half of the array, how did they do that? >.<

## Attribution

- [Sergei's Pethreon Smart Contract](https://github.com/s-tikhomirov/pethreon)

- [Cottonbro's Money Video - Aspect Ratio 256:135](https://www.pexels.com/video/hands-rich-green-money-3943962/)

- [Metamask Logo](https://github.com/MetaMask/brand-resources)

- [ionicons](https://ionic.io/ionicons)

- [Github logo](https://github.com/logos)

- [Artsy Cat's Cutesy Font](https://www.dafont.com/cutesy.font)

- [Sora Sagano's Aileron Font](https://fontsarena.com/aileron-by-sora-sagano/)

- [Sarah Fossheim's Loading Animation](https://fossheim.io/writing/posts/react-text-splitting-animations/)
