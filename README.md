# Features

- No fees (apart from ETH tx costs)

- No trusted third party

- Pseudoanonymous (only addresses)

## Design Doc

This app is all about "contributors" making payments to "creators".

A contributor can either make a one-time payment OR recurring payments (possibly).

Each creator gets their own "landing page" describing what they do and how much you can donate.

The information for each landing page will be stored on the blockchain. The creator must pay a tx fee to do this.

Clients will grab a list of all creators from the blockchain and cache them locally using localstorage.

Clients will use their metamask wallets to donate.
