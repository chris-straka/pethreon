# Things I've ran into during development

## Issues

### Multiple testing frameworks

React uses Jest, but Truffle (like all other ethereum frameworks) uses Mocha and Chai. I was planning on using all three in the same package.json, but I ran into issues migrating my contracts because typechain would create conflicting type definitions between Chai and Jest. As I looked into restructuring my project, I found an even better setup that I decided to switch to instead.

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
