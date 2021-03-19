# Features

- No fees (besides ETH tx costs)

- No trusted third party

- Pseudoanonymous (addresses only)

## Design Doc

This app is all about "contributors" making payments to "creators".

A contributor can either make a one-time payment OR recurring payments. They will use a metamask wallet to donate.

Each creator have their own "landing page" that describes what they do and how much you can donate. This information will be stored on the blockchain (the creator must pay a tx fee to put it there).

Clients then grab a list of all the creators from the blockchain and cache them locally via localstorage.

### Attributions

I used [Sergei Tikhomirov's Smart Contract](https://github.com/s-tikhomirov/pethreon) to help me with solidity.

[Patreon](https://www.patreon.com/) is the application my dapp is modeled off.
