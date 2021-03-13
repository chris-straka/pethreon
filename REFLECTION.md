# Stuff I thought about when creating the project

## Multiple testing frameworks?

React uses Jest, but Truffle uses Mocha and Chai? Should I keep all three?

## Recurring payments?

They're not natively supported on Ethereum. There's a few solutions (or hacks).

## CSR? SSG? SSR?

I don't think I'll need a server. I think this will be a CSR with the client pulling data from the blockchain.

## Caching (localstorage vs indexedDB)

The former can only store strings, but I think that's all I need.

## Does reading from the blockchain cost anything?

Maybe clients can't read all the creators from the blockchain.
