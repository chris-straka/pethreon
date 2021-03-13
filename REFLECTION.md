# Stuff I thought about when creating the project

## Multiple testing frameworks?

React uses Jest, but Truffle uses Mocha and Chai? Should I keep all three?

## Recurring payments?

They're not natively supported on Ethereum. There's a few solutions (using an Oracle or a hack).

## CSR? SSG? SSR?

I don't think I'll need a server. I think this will be a CSR with the client pulling data from the blockchain.

## Caching (localstorage vs indexedDB)

The former can only store strings, but I think that's all I need.

## How much data can I read from the blockchain?

I wonder if it'll play a role in how big the creator page has to be. I wonder if I'll end up making multiple calls.

## Background Synchronization?

I could allow contributors to make donations offline using service workers and background synchronization.
