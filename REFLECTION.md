# Things I've ran into during development

## Issues

### Security, profanity and offensive content

Turns out my original idea might not be that secure. I originally wanted creators to store their landing page details on the blockchain using my web-app. However, it looks like server-side validation is going to be trickier without a server, ha! Solidity can validate some things, but I don't think it could handle nearly the breadth of input I originally intended to have on my application. It almost feels like I just given the key to the database in my client-side application. Some vulnerabilities I can think of are...

- People could impersonate creators and wrongfully claim donations
- Creators could post offensive content or malicioius links/scripts on their landing page

I could probably take a hybrid approach and introduce a server to validate input, but I've decided to compromise and stick to data that is easy to validate in solidity (like the address).

### Multiple testing frameworks?

React uses Jest, but Truffle uses Mocha and Chai. I was planning on using all three in the same project, but I ran into issues where typechain would create conflicting type definitions (between Chai and Jest). I didn't want to [eject my CRA](https://create-react-app.dev/docs/available-scripts#npm-run-eject) to remove Jest, and I thought maybe I could use [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces) but I ended up settling on an even better typescipt-react setup using hardhat. It has stacktraces and console logging for solidity which will make it much easier for me to understand everything.

```ts
declare const: expect = Chai.ExpectStatic; // conflicts with...
declare const expect: jest.Expect;         // node.modules (from React)
```

## Questions

### Charity application?

The contract from Sergei Tikhomirov et al, relies on contributors locking up their crypto upfront. From a user perspective, I'm not a fan of this for several reasons...

  1. The contributor has better places to lock up their funds (DeFi).

  2. If the contributor is already committed to donating that much upfront, then they would probably prefer to donate the full amount and pay one fee instead of several.

### Unipledge?

I was thinking it'd be cool to make type of pledge that would donate to all creators on the platform. This would be abused because it will likely create an influx of fake creators (and repeat creators) but maybe I'll play around with it anyways.

### Recurring payments?

[It seems they're not natively supported on Ethereum](https://ethereum.stackexchange.com/questions/49596). Smart contracts transactions are automatic not "autonomous", all transactions have to be initiated from outside the blockchain. Smart contracts or CAs "Contract Accounts" can't create transactions, only an EOA "Externally Owned Account" or "human" can create a transaction (all transactions are born from a private key, something CAs don't have). To make it work I think I have to use an Oracle or some other hack/compromise.

### CSR? SSG? SSR?

I think I'll serve the frontend on github pages, with the backend being ethereum. Whether it'll be a hybrid app I'm not so sure.

### Caching (localstorage vs indexedDB)

Localstorage can only store strings, but I think that's all I intend to store. that's all I need.

### How much data can I read from the blockchain?

Calls are free, but is there a limit to the amount of data I can read?

### Background Synchronization?

As a bonus, I could allow contributors to make donations offline using service workers and background synchronization.
