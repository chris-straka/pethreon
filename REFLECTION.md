# Things I've ran into during development

## Issues

### Multiple testing frameworks

React uses Jest, but Truffle uses Mocha and Chai. I was planning on using all three, but I ran into issues migrating my contracts. Typechain is a useful tool that creates type definitions for smart contracts and truffle (including Mocha and Chai). The problem is it created type definitions for Mocha and Chai that conflicted with Jest.

```ts
declare const: expect = Chai.ExpectStatic; // conflicts with...
declare const expect: jest.Expect; // node.modules (from React)
```

I'm assuming you can't use Typechain, Truffle and CRA "Create React App" all together? I could [eject](https://create-react-app.dev/docs/available-scripts/#npm-run-eject) and remove Jest but that would suck. I could try separating my React project (Jest) from Truffle (Mocha, Chai) using different [workspaces via yarn?](https://yarnpkg.com/features/workspaces) I don't know much about this though (or if my assumption is correct) so I'm going to save this to its own "truffle" branch, and look into hardhat or ethers.js instead of Truffle.

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

### Ropsten

    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR-PROJECT-ID`),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
