# Pethreon

For information on how to run this locally, please see [docs/CONTRIBUTING.md](https://github.com/chris56974/pethreon/blob/main/docs/CONTRIBUTING.md)

## Overview

[This dapp](https://github.com/chris56974/pethreon) is a decentralized crowdfunding application that runs on ethereum. It's similar to [Patreon](https://www.patreon.com/) except there's no third-parties. The backend is a modified/working version of [Sergei's Pethreon Smart Contract](https://github.com/s-tikhomirov/pethreon). The frontend is my own react project.

## Tech Stack

Backend uses [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/), [Typechain](https://github.com/dethcrypto/TypeChain), [Infura](https://infura.io/).

Frontend uses [React](https://reactjs.org/), [Ethers](https://docs.ethers.io/v5/), [Framer-motion](https://www.framer.com/motion/), [Typescript](https://www.typescriptlang.org/), [OnboardJS](https://onboard.blocknative.com/), [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/), [ESlint](https://eslint.org/)

The frontend was made with [these design mockups](https://www.figma.com/file/dwPfF2lhw84J4PZdZTIQvL/Pethreon?node-id=0%3A1).

## How does it work? 

### User Flow

In Pethreon, every user is a both "contributor" and a "creator". When a user signs in with their cryptowallet, they're immediately brought to the contributor page. From there, they can deposit funds into the Pethreon smart contract to accrue a balance. The user (as a contributor) can then "pledge" this balance to any creator of their choice so long as they know the creator's ethereum address. Each pledge is paid in full upfront by the contributor, payments are then spread out and sent to the creator periodically over a duration specified by the contributor. The contributor can cancel their pledge at any time to receive a refund for the remaining amount. 

To receive money as a creator, the user must navigate to the creator page. Unlike a traditional ethereum payment, the creator must know about this app to receive any payment. The advantages of using Pethreon are similar to that of Patreon, with a few twists. There is no personal data that you have to give up in order to use the app (besides your ethereum address). There are also no middle-men involved and no commissions (just gas fees). 

### How is it implemented?

I basically have a react app that talks to a remote server @ [Infura](https://infura.io/). This server is special in that it's also an "ethereum node", which means it can read and write data to the blockchain. Whenever my react app needs to do something with the Pethreon smart contract, it will reach out to this server to make it happen. 

My react app doesn't communicate via a library like axios though, it uses ethersJS which uses [JSON-RPC](https://en.wikipedia.org/wiki/JSON-RPC) (a protocol built on top of HTTP) under the hood. The "RPC" in JSON-RPC refers to the type of calls my react app can make when reaching out to my infura node `contract.example()`. And the JSON part refers to the output I get back whenever I compile my [Pethreon.sol](https://github.com/Chris56974/Pethreon/blob/main/packages/backend/contracts/Pethreon.sol) smart contract into a [Pethreon.json](https://github.com/Chris56974/Pethreon/blob/main/packages/backend/deployments/localhost/Pethreon.json) via the solc compiler (which is baked into hardhat). 

The pethreon.json file has two important pieces of information. The EVM "bytecode" for the smart contract, which is what I deploy to ethereum. And the "abi" for the smart contract, an instruction sheet that tells my react app how to use the smart contract (what functions exist). 

Some of those smart contract functions cost real money (like creating a pledge) because they require verification from every other node in the ethereum network ([~6,000 nodes](https://www.ethernodes.org/history)). Others require no verification at all and are otherwise free, subject to my agreement @ infura -> [I get 100,000 free calls a day](https://infura.io/pricing)). 

## [LICENSE](https://github.com/chris56974/pethreon/blob/main/LICENSE)

## Attribution

- [Sergei et al's Pethreon Smart Contract](https://github.com/s-tikhomirov/pethreon)

- [Cottonbro's Money Video - Aspect Ratio 256:135](https://www.pexels.com/video/hands-hand-rich-green-3943965/)

- [Artsy Cat's Cutesy Font](https://www.dafont.com/cutesy.font)

- [Sora Sagano's Aileron Font](https://fontsarena.com/aileron-by-sora-sagano/)

- [Sarah Fossheim's "Loading..." Animation](https://fossheim.io/writing/posts/react-text-splitting-animations/)

- [Fireship io's Framer Motion Modals](https://www.youtube.com/watch?v=SuqU904ZHA4&t=576s)

- [Håvard Brynjulfsen's Radio Button styles](https://codepen.io/havardob/pen/dyYXBBr)

- [Fluid Type Scale](https://www.fluid-type-scale.com/)

- [Metamask Logo](https://github.com/MetaMask/brand-resources)

- [Github logo](https://github.com/logos)

- [ionicons for the svgs](https://ionic.io/ionicons)
