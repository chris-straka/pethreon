# Things I've ran into during development

## Issues

### Multiple testing frameworks

React uses Jest, but Truffle uses Mocha and Chai. I was planning on using all three in the same project, but I ran into issues where typechain would create conflicting type definitions (between Chai and Jest). I didn't want to [eject my CRA](https://create-react-app.dev/docs/available-scripts#npm-run-eject) to remove Jest, and I thought maybe I could use [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces) but I ended up settling on an even better typescipt-react setup using hardhat. It has stacktraces and console logging for solidity which will make it much easier for me to understand everything.

```ts
declare const: expect = Chai.ExpectStatic; // conflicts with...
declare const expect: jest.Expect;         // node.modules (from React)
```

## Questions

### Recurring payments?

[It seems they're not natively supported on Ethereum](https://ethereum.stackexchange.com/questions/49596). Smart contracts are automatic not "autonomous", all transactions have to be initiated from outside the blockchain. Smart contracts or CAs "Contract Accounts" can't create transactions, only an EOA "Externally Owned Account" or "human" can create a transaction (since all transactions are born from a private key, something CAs don't have). To make it work I think I have to use an Oracle or something hackey.

### CSR? SSG? SSR?

I don't think I'll need a server. I think this will be a CSR with the client pulling data from the blockchain.

### Caching (localstorage vs indexedDB)

Localstorage can only store strings, but I think that's all I intend to store. that's all I need.

### How much data can I read from the blockchain?

Calls are free, but is there a limit to the amount of data I can read?

### Background Synchronization?

As a bonus, I could allow contributors to make donations offline using service workers and background synchronization.
