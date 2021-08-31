# Design Doc

[This dapp](https://github.com/Chris56974/WeiBuddies) (decentralized application) is a modified version of [Sergei Tikhomirov et al's "Pethreon" Smart Contract](https://github.com/s-tikhomirov/pethreon/blob/master/pethreon.sol). It's a crowd funding platform, where users (contributors & creators) can sign in through their cryptowallet to contribute funds to each other in regular intervals. It's made under a mobile first approach using these mockups (Figma).

![Pethreon Mobile Mockup](https://github.com/Chris56974/Pethreon/blob/main/frontend/public/pethreon_mobile.png)
![Pethreon Desktoe 1](https://github.com/Chris56974/Pethreon/blob/main/frontend/public/pethreon_desktop_1.png)
![Pethreon Desktop 2](https://github.com/Chris56974/Pethreon/blob/main/frontend/public/pethreon_desktop_2.png)
![Pethreon Desktop 3](https://github.com/Chris56974/Pethreon/blob/main/frontend/public/pethreon_desktop_3.png)

## How it works (high level)

[Hardhat](https://hardhat.org/getting-started/) is a development environment/blockchain for ethereum, [Waffle](https://ethereum-waffle.readthedocs.io/en/latest/index.html) is a testing library for smart contracts (programs that run on the blockchain) and [ethers.js](https://docs.ethers.io/v5/getting-started/) is a frontend JS library for communicating with the ethereum network. Basically, I'm creating a react app that talks to an ethereum node that I have running at [infura](https://infura.io/) (~AWS for Ethereum).

To create a smart contract, you have to write a solidity file (Pethreon.sol) and compile it to JSON (Pethreon.json). Inside that JSON file, there's some smart contract "bytecode" that you can deploy to Ethereum, and an "ABI" that describes what functions exist on that smart contract. My React application (or any other frontend application) can then use this ABI together with a library (like ethersJS/Web3) to make calls to that smart contract after it's been deployed. The calls have to be carried out by an ethereum node (like the one I have running at Infura). Some of these calls require real money (creating a pledge) because they require verification from every other node in the ethereum network ([~5,000 nodes](https://www.ethernodes.org/history)). The costs for these types of calls are delegated to the user in the form of "gas fees". Other calls are free (subject to my agreement @ infura, I currently get [100,000 free calls a day](https://infura.io/pricing)) and usually involve grabbing smart contract data, like grabbing all the existing pledges for a user.

## How to develop

For this to work you need to [download metamask](https://metamask.io/). You might also want to use a different [browser profile](https://youtu.be/Ik8-xn4DyCo?t=15) for development so that you can keep your personal metamask account separate from your development environment. Once metamask is installed, you need to import a new metamask wallet via "private key" and type in "test test test test test test test test test test test junk". This is a unique key used by hardhat for development, in which every account in that wallet is given 1000 ether for use in the development network. You might also need to add the development network to metamask as well (if it's not on there already). Click on networks (mainnet), then on custom RPC and add the following network...

```text
Network Name: Localhost 8545
New RPC URL:  http://localhost:8545
Chain ID:     1337
Currency:     ETH
```

You should then be able to run these commands and get started. If you need another account to pledge to, open up your metamask wallet and use one of your other accounts (they should also have 1000 ETH).

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

If you get an error that says "Nonce too high. Expected nonce to be X but got Y". Chances are you restarted the hardhat node, but your Metamask is still using the old transaction data. I'm not sure how to _automatically_ refresh the transaction data in metamask everytime a new node kicks up in your terminal, but you can do one of these two things manually.

1. Go to your metamask accounts page and click on settings -> advanced -> customized transaction nonce and switch it ON. Then on your next transaction, insert the nonce that it's expecting.

2. Turn off the hardhat node in your terminal and go to the advanced settings in step 1 and "reset account". Then switch the metamask network to something else (something other than localhost:8545) and then back to localhost:8545 to invalidate the cache. This should reset the transaction data in metamask and the nonce should now be set back at 0. Turn the hardhat node back on in your terminal and you should be good to go again.

## Issues (that I've faced during development)

### Original Pethreon contract from Sergei et al doesn't work?

One of the cool things from Sergei's contract is you can choose over what time "period" the payments should be made in, i.e. daily, weekly or monthly? You do this by passing in how many seconds a period should last for into the smart contract's constructor (hourly (3600), daily (86400), weekly (604800)). I'm pretty sure this is how it works, but I ran into some confusion on lines 152-155...

```cpp
  // update creator's mapping of future payments
  for (uint period = currentPeriod(); period < _periods; period++) {
    expectedPayments[_creator][period] += _weiPerPeriod;
  }
```

currentPeriod() grabs the number of periods (days/seconds/weeks) it's been since the contract was created. And `_periods` represents the number of periods a contributor would like to donate for (2 days, 3 days, etc). However, if the contract is 50 days old and the contributor wants to donate for 5 days, then this loop never runs and the creator doesn't get any money? I think it should be `_periods + currentPeriod()`. It might be worth a pull request, or I've fundamentally misunderstood something.

### Recurring payments

Implementing [recurring payments](https://ethereum.stackexchange.com/questions/49596) on Ethereum is not as easy as I thought it'd be. It's hard to create recurring transactions because in Ethereum, only EOAs "Externally Owned Accounts" (humans) can create transactions, a smart contract or CA "Contract Account" can't. This means my smart contract can't create a transaction every day/month/week to bill the user, only a human can do that which defeats the point (no longer decentralized - unless I use Ethereum Alarm Clock, see below...). People normally get around this by evaluating the transaction [eagerly or lazily](https://ethereum.stackexchange.com/questions/42). Sergei solved this problem for me by handling this problem lazily.

The contributor updates the creator's list of future payments by adding their donation amount to the creator's hashmap (called expectedPayments). Each future payment in that hashmap is timestamped ([Unix Time](https://en.wikipedia.org/wiki/Unix_time) to some date in the future along with the money they're owed. In order for the creator to get any money, they must call a withdraw() function in the future that tallies up everything they're owed from all previous expectedPayments.

I thought about doing this eagerly using a decentralized service called [Ethereum Alarm Clock](https://www.ethereum-alarm-clock.com/). This would incentivize random people to call my smart contract every time there needs to be a payment, the creator wouldn't have to do anything (they wouldn't even have to use my app) and still have money come into their account. But I avoided this approach because I think it could prove too costly (especially if I set my contract to make daily payments).

You might be wondering, "instead of creating a transaction every month, or handling things lazily, why don't we just create a _single_ transaction that stays in the EVM and bills the user every month?". This wouldn't work because that transaction would be prohibitively expensive (since it would bog down the ethereum network and eat up too much resources).

### Security, profanity and offensive content

I originally wanted creators to create their own unique landing page so that contributors would have a better UX. I was thinking they could store pictures, youtube links, and other social media on the blockchain and the client could then fetch those details on the frontend, browse through featured creators and cache that data locally. Besides being a ton of work, there was a lot of pitfalls. Pictures are prohibitively expensive to store on the blockchain (which is why NFTs don't do this, they store links instead), for some perspective, a [1KB image](https://lh6.googleusercontent.com/D_4dsybsvBPG-gxULIw24WJT_bEHIQGTsrkNWeicdz_IBdD9FQz1tHXw0jS8lrYGenxcGWcARWxa88P7kwc9tQYCHPGhaKTvGT3k-EMbZyUjR-Hz7LSreaMnVF8A6DWoOzJKA6U3) [costs about $20](https://blog.chain.link/build-deploy-and-sell-your-own-dynamic-nft/). I also underestimated how tricky it is to validate user input in solidity. It was like giving people the keys to the database (because ethereum is sort of like a public database). This brought on a whole host of security related issues.

- People could easily impersonate as other creators and wrongfully claim donations on their behalf
- Creators could easily post links to offensive or malicious content
- There was no way to take down anyone (spammers, repeat creators, etc)

I could take a hybrid approach and introduce a server to validate input, but I've decided to compromise and stick to a decentralized approach. It's much easier to do this, and I think there would be very little point to using my application over Patreon if I decided to centralize it.

### Do contributors even need to lock in their money into the contract?

It only hit me until really late in the project, but I'm wondering if contributors even need to lock their money into the smart contract? Also creator is confusing because the contributor "creates" pledges, maybe I should come up with a different name.

### Can the creator get locked out of their money?

After reading (and contributing to) [this answer on stack exchange](https://ethereum.stackexchange.com/questions/42207), there's an interesting possibility where the withdraw() function might take up so much gas that user can no longer withdraw. I think in my case, this would only happen if the creator takes a really long time to withdraw their funds (i.e. the withdraw function had to iterate over too many periods). If I chose a smaller period I would be much more concerned (like if payments were processed every 15 seconds), because then there'd be more periods to iterate over.

### Multiple testing frameworks?

CRA "Create React App" uses Jest, but Truffle uses Mocha and Chai. I was planning on using all three in the same project, but I ran into issues where typechain would create conflicting type definitions between Chai and Jest. Maybe there's an easy way around this, but at the time I didn't want to [eject my CRA](https://create-react-app.dev/docs/available-scripts#npm-run-eject) and remove Jest for just Mocha and Chai. I also didn't want to fiddle around with [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces) to see if I could get it working that way.

```ts
// node_modules
declare const: expect = Chai.ExpectStatic; // this kept conflicting with...
declare const expect: jest.Expect;         // this
```

I ended up switching away from Truffle because I wasn't happy with their typescript support. I moved to hardhat which I think is much more robust with typescript (I also got console.logging and stack traces in solidity which was invaluable). I based my project off of the boilerplate project in [this plugin](https://hardhat.org/plugins/hardhat-react.html) which actually ended up biting me later on. The boiler plate project was incompatible with my version of solidity/hardhat and I wanted my project to use the latest everything #CrazyZoomer. I think the only thing I needed to solve my typescript issue, was to separate my frontend into its own package.json instead of using the same package.json for both? So I think I could've gotten away with Truffle but hardhat rocks, so I don't think I'll go back (despite having Truffle having a cool migrations feature).

### Can't iterate over any of the pledges

In Sergei's original contract, it wasn't possible for a contributor/creator to see _all_ their pledges. I think that would make for a much better UX so I added that in. I have to be careful how I do it because it can get really expensive (maps aren't iterable in solidity and iteration can get very costly in calls that require validation from other ethereum nodes). I still need to be able to cancel them too.

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

### Getting Expected Payments in Batch

Currently, the app forces creators to withdraw all their money at once. Sergei had plans to let the creator withdraw funds in batches instead of all at once.

```solidity
// TODO: get expected payments in batch (can't return uint[]?)
function getExpectedPayment(uint period) constant returns (uint expectedPayment) {
  return (period < afterLastWithdrawalPeriod[msg.sender]) ? 0 :
  expectedPayments[msg.sender][period];
}
```

## Features & Ideas

These are ideas for features that I thought about adding.

### Tests look awful

I think I can make my tests look a lot better by breaking them into functions. I'll have to look into this sometime.

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

### Allow the creator to create a CSV with all the pledge data

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

Sergei's contract lets you decide what time increments or "periods" you want to use for your contract (hourly, daily, monthly). In solidity you can get the time (in seconds) since the [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time) using `block.timestamp`. So to set a period, we use seconds (3600 = hourly, 86400 daily). You can create time dependent tests with [this](https://ethereum.stackexchange.com/questions/86633).

### How does Solidity's multiple return values transfer over to JS?

JS functions can't return multiple values, but solidity functions can. In JS, these multiple return values come back as an array which makes sense. But logging that array during my tests reveals twice as many items in the array. I think the other half is meant to describe the first half of the array which is cool. I can only destructure the first half of the array, how did they do that? >.<

### Using other people's stuff

I've been bit twice already using other people's stuff (despite not having that many dependencies imo).

## Lessons

### I should've been more thoughtful about relative units in CSS (mobile layout)

My vertical layout isn't designed for scrolling because it's split into different view heights (top ~15vh, middle ~60vh, bottom ~25v) and the bottom part is occupied by circles positioned relative to the screen (instead of the content). This meant my circles couldnt move down to accommadate for any size increases above it. I used rem for all my font-sizes which meant any sizes above the default would mess with my circles.

### A wireframe AND a prototype is probably a good idea

I put a lot of grey boxes in my mockups and ignored a lot of detail (modals) in the short term because I didn't fully understand Sergei's contract. I decided to make stuff up as I went a long, but I think this made my modals look a bit more "tacked on". My pledge modal is totally alien from the other two because I had different space requirements that I didn't take into account. I also had a hard time figuring out what to do sometimes, so it would be easier if I at least an attempt at what something should look like (i.e. less grey boxes). In the end I'm pretty happy with what I came up with though (like the "Extract to CSV").

## Attribution

- [Sergei's Pethreon Smart Contract](https://github.com/s-tikhomirov/pethreon)

- [Cottonbro's Money Video - Aspect Ratio 256:135](https://www.pexels.com/video/hands-rich-green-money-3943962/)

- [Metamask Logo](https://github.com/MetaMask/brand-resources)

- [ionicons](https://ionic.io/ionicons)

- [Github logo](https://github.com/logos)

- [Artsy Cat's Cutesy Font](https://www.dafont.com/cutesy.font)

- [Sora Sagano's Aileron Font](https://fontsarena.com/aileron-by-sora-sagano/)

- [Sarah Fossheim's Loading Animation](https://fossheim.io/writing/posts/react-text-splitting-animations/)
