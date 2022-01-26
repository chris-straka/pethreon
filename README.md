# Overview

[This dapp](https://github.com/Chris56974/Pethreon) is a decentralized crowdfunding application that runs on ethereum. It's similar to [Patreon](https://www.patreon.com/) except there aren't any third-parties involved. The backend is a modified version of [Sergei's Pethreon Smart Contract](https://github.com/s-tikhomirov/pethreon), and the frontend is my own react project.

## Backend

- [Solidity](https://docs.soliditylang.org/)
  - programming language for creating smart contracts (programs that run on ethereum)
- [Hardhat](https://hardhat.org/)
  - dev blockchain for running smart contracts locally on your computer
- [Waffle](https://getwaffle.io/)
  - testing library for smart contracts
- [Infura](https://infura.io/)
  - hosting provider for ethereum nodes (~AWS of ethereum)
- [Typechain](https://github.com/dethcrypto/TypeChain)
  - creates type definitions for my smart contracts so I can get autocomplete in my frontend code

## Frontend

- [React](https://reactjs.org/)
  - library for building client-facing web apps
- [Ethers](https://docs.ethers.io/v5/)
  - library for interacting with a smart contract from a frontend
- [Framer-motion](https://www.framer.com/motion/)
  - declarative animation library
- [Typescript](https://www.typescriptlang.org/)
  - superset of javascript

### What does the user flow look like?

In Pethreon, every user is both a "contributor" and a "creator". A user signs into the app using their cryptowallet and is immediately brought to the contributor page. As a contributor, they can deposit money into the pethreon smart contract so that they can "pledge" it to someone else later. When creating a pledge, a user can choose how many days their donation should last for. They can also cancel their current pledge and be refunded the remaining amount should they choose to. 

As a creator, the user will be able to withdraw money from the creator page. This means the creator has to know about the app, they can't receive the money directly to their wallet unlike you would for a normal ethereum donation. A creator doesn't have to know about the app to start acruing a balance in Pethreon. The advantages of using Pethreon are similar to that of Patreon, with a few twists. There is no personal data that you have to give up in order to use the app (besides your ethereum address). There are no middle-men involved and therefore no censorship or commissions (just gas fees). 

### How does it all work?

I basically have a react app that talks to a server @ Infura. This server is special because it's also an "ethereum node", which means it can read and write to the blockchain. My react app talks to this server whenever it wants to do something with the smart contract. It doesn't use a library like axios though, it uses a library like ethers.js which is a library that communicates over [JSON-RPC](https://en.wikipedia.org/wiki/JSON-RPC) (a protocol built on top of HTTP). The RPC part refers to the type of calls that my react app can make when reaching out to my ethereum node foo.example(). And the JSON part refers to the output I get back whenever I compile my [Pethreon.sol](https://github.com/Chris56974/Pethreon/blob/main/packages/backend/contracts/Pethreon.sol) file into a [Pethreon.json](https://github.com/Chris56974/Pethreon/blob/main/packages/backend/deployments/localhost/Pethreon.json) file. The compiler I use is solc which is bundled into hardhat, and the pethreon.json file it generates has two important pieces of information. It has an EVM "bytecode" which is basically just the smart contract itself (which is the thing I deploy to ethereum), and the "abi" which is basically just an instruction sheet that tells a frontend how to use the smart contract. The abit lists stuff like all the functions that exist on the smart contract as well as their arguments.

Some of those smart contract functions cost real money (like creating a pledge) because they require verification from every other node in the ethereum network ([~6,000 nodes](https://www.ethernodes.org/history)). Others are free (subject to my agreement @ infura -> [I get 100,000 free calls a day](https://infura.io/pricing)) because they don't require any verification from the network (like reading data from the blockchain).

### Misc 

The react app was made under a mobile first approach using these design mockups (Figma). 

![Pethreon Mobile Mockup](https://github.com/Chris56974/Pethreon/design/pethreon_mobile.png)
![Pethreon Desktop 1](https://github.com/Chris56974/Pethreon/design/pethreon_desktop_1.png)
![Pethreon Desktop 2](https://github.com/Chris56974/Pethreon/design/pethreon_desktop_2.png)
![Pethreon Desktop 3](https://github.com/Chris56974/Pethreon/design/pethreon_desktop_3.png)

- For more information on how to run this locally, please refer to [CONTRIBUTING.md](https://github.com/Chris56974/Pethreon/blob/main/CONTRIBUTING.md)
- If you want to see what I've learned while making this project, please refer to [LEARNING.md](https://github.com/Chris56974/Pethreon/blob/main/LEARNING.md) 
- If you want to see the license for this project, please refer to [LICENSE](https://github.com/Chris56974/Pethreon/blob/main/LICENSE)

## Attribution

- [Sergei et al's Pethreon Smart Contract](https://github.com/s-tikhomirov/pethreon)

- [Cottonbro's Money Video - Aspect Ratio 256:135](https://www.pexels.com/video/hands-hand-rich-green-3943965/)

- [Artsy Cat's Cutesy Font](https://www.dafont.com/cutesy.font)

- [Sora Sagano's Aileron Font](https://fontsarena.com/aileron-by-sora-sagano/)

- [Sarah Fossheim's "Loading..." Animation](https://fossheim.io/writing/posts/react-text-splitting-animations/)

- [Fireship io's Framer Motion Modals](https://www.youtube.com/watch?v=SuqU904ZHA4&t=576s)

- [Håvard Brynjulfsen's Radio Button styles](https://codepen.io/havardob/pen/dyYXBBr)

- [Metamask Logo](https://github.com/MetaMask/brand-resources)

- [Github logo](https://github.com/logos)

- [ionicons](https://ionic.io/ionicons)