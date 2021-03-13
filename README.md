# Features

- No fees (apart from ETH tx costs)

- No trusted third party

- Pseudoanonymous (addresses only)

## Design Doc

This app is all about "contributors" making payments to "creators".

A contributor can either make a one-time payment OR they can opt for recurring payments (possibly).

Each creator gets their own "landing page" describing what they do and how much you can donate.

Each landing page will be stored on the blockchain. The creator must pay a tx fee for this.

Clients will grab a list of all creators from the blockchain and cache them locally using localstorage.

Clients will use their metamask wallets to donate.

### Other ideas

I could allow contributors to make donations offline using service workers and background synchronization.
