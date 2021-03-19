# Stuff I thought about when creating the project

## Multiple testing frameworks?

React uses Jest, but Truffle uses Mocha and Chai? Should I keep all three?

## Recurring payments?

They're not natively supported on Ethereum. There's a few solutions (using an Oracle or a hack).

## CSR? SSG? SSR?

I don't think I'll need a server. I think this will be a CSR with the client pulling data from the blockchain.

## Caching (localstorage vs indexedDB)

Localstorage can only store strings, but I think that's all I intend to store. that's all I need.

## How much data can I read from the blockchain?

Calls are free, but is there a limit to the amount of data I can read?

## Background Synchronization?

As a bonus, I could allow contributors to make donations offline using service workers and background synchronization.

## Ropsten

    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR-PROJECT-ID`),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
