# Questions I had when developing this project

## Multiple testing frameworks?

React uses Jest, but Truffle uses Mocha and Chai? Should I keep all three?

## Recurring payments?

Not natively supported on Ethereum. There's a few solutions (hacks maybe).

## CSR? SSG? SSR?

I don't think I'll need a server.

## Caching (localstorage vs indexedDB)

The former can only store strings, but I think that's all I need.

## Does reading from the blockchain cost anything?

Maybe clients can't read all the creators from the blockchain.
