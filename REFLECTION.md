# Things I've ran into during development

## Issues

### Security, profanity and offensive content

Turns out my original idea was not very secure. I wanted creators to store their landing page details on the blockchain using my web-app. However, there's no server side validation for any of the inputs because there is no backend server (because the app is meant to be decentralized). This means a creator could store malicious scripts/links on their landing page and threaten users with persisted XSS attacks.

I could probably take a hybrid approach and introduce a server to validate input, but I decided to compromise and remove landing pages altogether in favour of only storing addresses instead (which are much easier to validate in solidity).

### Multiple testing frameworks

React uses Jest, but Truffle uses Mocha and Chai. I was planning on using all three in the same project, but I ran into issues where typechain would create conflicting type definitions (between Chai and Jest). I didn't want to [eject my CRA](https://create-react-app.dev/docs/available-scripts#npm-run-eject) to remove Jest, and I thought maybe I could use [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces) but I ended up settling on an even better typescipt-react setup using hardhat. It has stacktraces and console logging for solidity which will make it much easier for me to understand everything.

```ts
declare const: expect = Chai.ExpectStatic; // conflicts with...
declare const expect: jest.Expect;         // node.modules (from React)
```

## Questions

### Unipledge?

I was thinking it'd be cool to make type of pledge that would donate to all creators on the platform. There's a good chance that this will be abused and cause an influx of fake creators (and repeat creators) but I figured I'd play around with the idea anyways.

### Recurring payments?

[It seems they're not natively supported on Ethereum](https://ethereum.stackexchange.com/questions/49596). Smart contracts are automatic not "autonomous", all transactions have to be initiated from outside the blockchain. Smart contracts or CAs "Contract Accounts" can't create transactions, only an EOA "Externally Owned Account" or "human" can create a transaction (since all transactions are born from a private key, something CAs don't have). To make it work I think I have to use an Oracle or something hackey.

### CSR? SSG? SSR?

I think I'll serve the frontend on github pages, with the backend being ethereum. Whether it'll be a hybrid app is yet to be seen.

### Caching (localstorage vs indexedDB)

Localstorage can only store strings, but I think that's all I intend to store. that's all I need.

### How much data can I read from the blockchain?

Calls are free, but is there a limit to the amount of data I can read?

### Background Synchronization?

As a bonus, I could allow contributors to make donations offline using service workers and background synchronization.
