# Design Doc

[This dapp](https://github.com/Chris56974/WeiBuddies) (decentralized application) is a modified version of [Sergei Tikhomirov et al's "Pethreon" Smart Contract](https://github.com/s-tikhomirov/pethreon/blob/master/pethreon.sol). It's a crowd funding platform, where users (contributors & creators) can sign in through their cryptowallet to contribute funds to each other in regular intervals. It's made under a mobile first approach using these mockups (Figma).

![Pethreon Mobile Mockup](https://github.com/Chris56974/Pethreon/blob/main/frontend/public/pethreon_mobile.png)
![Pethreon Desktoe 1](https://github.com/Chris56974/Pethreon/blob/main/frontend/public/pethreon_desktop_1.png)
![Pethreon Desktop 2](https://github.com/Chris56974/Pethreon/blob/main/frontend/public/pethreon_desktop_2.png)
![Pethreon Desktop 3](https://github.com/Chris56974/Pethreon/blob/main/frontend/public/pethreon_desktop_3.png)

## How it works (high level)

[Hardhat](https://hardhat.org/getting-started/) is a development environment/blockchain for ethereum, [Waffle](https://ethereum-waffle.readthedocs.io/en/latest/index.html) is a testing library for smart contracts (programs that run on the blockchain) and [ethers.js](https://docs.ethers.io/v5/getting-started/) is a frontend JS library for communicating with the ethereum network. Basically, I'm creating a [react app](https://reactjs.org/) that talks to an ethereum node that I have running at [infura](https://infura.io/) (the ~AWS for Ethereum).

[This App](https://github.com/Chris56974/Pethreon)

[Create React App Docs](https://facebook.github.io/create-react-app/docs/getting-started)

To create a smart contract, you have to write a solidity file (Pethreon.sol) and compile it to JSON (Pethreon.json). The JSON file will then have "bytecode" that you can deploy to Ethereum, as well as an "ABI" that describes what that bytecode (smart contract) can do. My React application (or any other frontend application) can then use this ABI together with a library (like ethersJS/Web3) to make calls to it after it's been deployed. The calls have to be carried out by an ethereum node (like the one I have running at Infura). Some of these calls require real money (like creating a pledge) because they require verification from every other node in the ethereum network ([~5,000 nodes](https://www.ethernodes.org/history)). Other calls are free (subject to my agreement @ infura -> [100,000 free calls a day](https://infura.io/pricing)) because they don't require any verification from other nodes (reading data from the blockchain).

In my app, every user is both a "contributor" AND a "creator". They can donate (or "pledge") money to other creators as a _contributor_, OR receive money as a _creator_. The contributor can choose how many days they want their pledge to last.

## How to develop

For this to work you need to [download the metamask extension](https://metamask.io/). You might also want to use a different [browser profile](https://youtu.be/Ik8-xn4DyCo?t=15) for development so that you can keep your development metamask account separate from your real one. Once metamask is installed, you need to go to the login screen and click on "import using Secret Recovery Phrase". The secret recovery phrase you need to use is "test test test test test test test test test test test junk". This is a unique key used by hardhat for development, in which every account (in that wallet) is given 1000 (fake) ether for use in the development network/blockchain on port 8545. If metamask doesn't have that network, you will need to add it by clicking on networks, -> custom RPC...

```bash
# You might need to run this first in a terminal...
yarn                      # install backend dependencies (or npm install)
npx hardhat node --watch  # bootup a development blockchain on port 8545

# Then add this as a custom RPC to metamask...
Network Name: Localhost 8545
New RPC URL:  http://localhost:8545
Chain ID:     1337  # if it doesn't work try 31337
Currency:     ETH
```

You should then be able to run these commands and get started. If you need another account to pledge to, open up your metamask wallet and use one of your other accounts (they should also have 1000 ETH).

```bash
yarn                      # install backend dependencies (or npm install)
npx hardhat node --watch  # bootup a development blockchain on port 8545
hh node --watch           # (shorthand for the above)[https://hardhat.org/guides/shorthand.html]
hh test                   # you need to run hh node first to compile the types for my tests

# Open another terminal
cd frontend
yarn                      # install frontend dependencies (react)
yarn start                # bootup react on port 3000

# To deploy the smart contract (TODO)
hh run scripts/Pethreon.ts                # deploy the contract to the ethereum provider
hh run --network <network> scripts/Pethreon.ts # deploy to a network specified in hardhat.config.ts
```

If you get an error that says "Nonce too high. Expected nonce to be X but got Y". Chances are you restarted the hardhat node, but your Metamask is still using the old transaction data. I'm not sure how to _automatically_ refresh the transaction data in metamask everytime a new node kicks up in your terminal, but you can do one of these two things manually.

1. Go to your metamask accounts page and click on settings -> advanced -> customized transaction nonce and switch it ON. Then on your next transaction, insert the nonce that it's expecting.

2. Turn off the hardhat node in your terminal and go to the advanced settings in step 1 and "reset account". Then switch the metamask network to something else (something other than localhost:8545) and then back to localhost:8545 to invalidate the cache. This should reset the transaction data in metamask and the nonce should now be set back at 0. Turn the hardhat node back on in your terminal and you should be good to go again.

## Issues (I've faced during development)

### How does the original Pethreon contract from Sergei et al work?

One of the cool things from Sergei's contract, is you can choose over what time "period" the payments should be made in (i.e. daily, weekly or monthly). You do this by passing in the amount of seconds each period should last for in the smart contract's constructor (hourly (3600), daily (86400), weekly (604800)). Each smart contract uses [Unix Time](https://en.wikipedia.org/wiki/Unix_time) to keep track of things. The part I'm stuck at is on lines 152-155..

```cpp
  // update creator's mapping of future payments
  for (uint period = currentPeriod(); period < _periods; period++) {
    expectedPayments[_creator][period] += _weiPerPeriod;
  }
```

As I understand it, currentPeriod() grabs the number of periods (hours/days/weeks) it's been since the contract was created and `_periods` is the number of periods a contributor would like to donate for (2 days, 3 days, etc). However, if the contract is 50 days old and the contributor wants to donate for 5 days, then I'm not sure how this loop runs? I think it should be `_periods + currentPeriod()`, so it might be worth a pull request, either that or I've misunderstood something.

### Original Pethreon contract continued

It only hit me until really late in the project, but I'm wondering if contributors even need to lock their money into the smart contract? I'll leave it for now because I might want to do something cool with it later (DeFi?). I might also change the word "creator" to something else because contributors can "create" pledges, which might be confusing.

In Sergei's original contract, it wasn't possible for a contributor/creator to see how many pledges they made. I think that would make for a pretty cool UX so I'm going to add that in. I tried to be cautious with how I did this, because I think it can get really expensive (maps aren't iterable in solidity and iteration can get costly). I also need them to be cancellable as well. I won't have any real idea for how pricey things are until I write more sophisticated tests (that take into account gas & gasprices).

Currently, the app forces creators to withdraw all their money at once. Sergei had plans to let the creator withdraw funds in batches as well. Might be worth looking into later.

```solidity
// TODO: get expected payments in batch (can't return uint[]?)
function getExpectedPayment(uint period) constant returns (uint expectedPayment) {
  return (period < afterLastWithdrawalPeriod[msg.sender]) ? 0 :
  expectedPayments[msg.sender][period];
}
```

According to this [post](https://ethereum.stackexchange.com/questions/39723), it looks like there's no way to test for the existence of something in a mapping. Sergei used an "exists" boolean, I think I might do something similar with an enum.

### Can the creator get locked out of their money?

After reading (and contributing to) [this answer on stack exchange](https://ethereum.stackexchange.com/questions/42207), it turns out there's a possibility that a user might not be able to call a function because it takes up so much gas to run. I think in my case, this would only happen if the creator takes a really long time to withdraw their funds (i.e. the withdraw function had to iterate over so many periods they couldn't withdraw). Or if so many contributors are pledging to a creator that they can't create a new pledge because they would have to iterate through too many pledges inside createPledge(). I tried to alleviate the second problem by doing a rewrite of the smart contract (on a branch called "alternative"), but it was flawed because I couldn't build a dynamic array in memory. I needed to build a dynamic array in memory because that was the easiest way to return all my pledges to the user. I could return a static array in memory, but this would result in much more calls to my node at infura. There might be something I'm missing and maybe this is still the best approach but I decided to stick with my contract for now.

### Recurring payments

Implementing [recurring payments](https://ethereum.stackexchange.com/questions/49596) on Ethereum is not as easy as I thought it'd be. It's hard to create recurring transactions because in Ethereum, only EOAs "Externally Owned Accounts" (humans) can create transactions, a CA "Contract Account" (smart contract) can't. This means my smart contract can't automatically create a transaction every period (day/week/month) to bill the user, only a human can do that which defeats the point (no longer decentralized - unless I use Ethereum Alarm Clock, see below...). People normally get around this by evaluating the transaction [eagerly or lazily](https://ethereum.stackexchange.com/questions/42). Sergei solved this problem for me by handling it lazily.

In order for the creator to get any money they MUST call creatorWithdraw(), otherwise they won't get anything. It's "lazy" because this function calculates the creator's balance right when they withdraw instead of at the end of every payment (or period). If I handled it eagerly (calculating their balance at the end of every period), I'd need to use a decentralized service like [Ethereum Alarm Clock](https://www.ethereum-alarm-clock.com/). If I did this, my users would have to pay and incentivize people (strangers) to come and call my function at every period. There's a good chance the creator wouldn't even have to use my app, they'd see money come straight into their wallet. I avoided this because I thought it would be too costly (especially if I chose a smaller period like 1 second). There's a good chance it's also pretty difficult to implement, maybe I'll look into it for a different project.

You might be wondering, "instead of creating transactions every period, or handling stuff lazily, why don't we just run a single function that does something every period?". This wouldn't work because that function would have to linger in the EVM and eat up resources (which would cost too much). I don't think the EVM has anything like an "asynchronous callback" that can run whenever "the callstack is empty".

### Security, profanity and offensive content

I originally wanted creators to have their own unique landing page so that contributors would have a better UX. I was thinking creators could store pictures, youtube links, and other social media on the blockchain and the client could fetch those details on the frontend and cache it. Users could could browse creators and find one they like so that they can donate to them. Besides being a ton of work, there was a lot of pitfalls. Pictures are prohibitively expensive to store on the blockchain (which is why NFTs don't do this, they store links to pictures instead), for perspective a [1KB image](https://lh6.googleusercontent.com/D_4dsybsvBPG-gxULIw24WJT_bEHIQGTsrkNWeicdz_IBdD9FQz1tHXw0jS8lrYGenxcGWcARWxa88P7kwc9tQYCHPGhaKTvGT3k-EMbZyUjR-Hz7LSreaMnVF8A6DWoOzJKA6U3) [costs ~$20 depending on the gas price](https://blog.chain.link/build-deploy-and-sell-your-own-dynamic-nft/). It's also tricky to validate things in solidity without using a centralized server, a lot of bad stuff could happen.

- People could easily impersonate as other creators and wrongfully claim donations on their behalf
- Creators could easily post links to offensive/malicious content
- Spammers would have complete immunity from getting taken down

It's like giving people the keys to the database (because ethereum is sort of like a public database). I didn't want to introduce a server because then it's no different than something like Patreon, and I wanted all the benefits of decentralization (censorship resistance, trustless, no third-party fees).

### Multiple testing frameworks?

CRA "Create React App" uses Jest, but Truffle uses Mocha and Chai. I was planning on using all three in the same project, but I ran into issues where typechain would create conflicting type definitions between Chai and Jest. Typechain is a package that creates type definitions for your smart contract, so your frontend typescript code can have autocompletion. Maybe there's an easy way around this, but at the time I didn't want to [eject my CRA](https://create-react-app.dev/docs/available-scripts#npm-run-eject) and remove Jest. And I also didn't want to fiddle around with [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces) to see if that would work.

```ts
// node_modules
declare const: expect = Chai.ExpectStatic; // this kept conflicting with...
declare const expect: jest.Expect;         // this
```

I think the issue was I was using one package.json file for the whole project, when I should've been using two? I think I needed my frontend to use its own set of dependencies? Not sure. I was thinking of using docker but I ended up copying a boilerplate project from [this plugin](https://hardhat.org/plugins/hardhat-react.html). The plugin ended up being outdated for my version of solidity so I ended up removing it, but the hardhat framework was a huge win. Unlike Truffle, hardhat has console logging and stack traces for solidity which was a big help.

### Typewriter Effect Problems

I probably could've done my typewriter animation in the login screen using CSS only, but it might be tricky because I've only seen this done with single lines of static text (not dynamic wrapping lines of text). So I did it through JS instead but there was a couple issues. I wanted to interrupt effect but JS is only single threaded so I had to check a boolean everytime it printed a character. I also had issues printing a hyperlink char-by-char (either that or I'm dumb?) because it kept printing the HTML markup as well `<a href="" rel="" etc="">download<a>`. So my current implementation recreates the link ~17 times, by incrementally building it on each iteration. I should look into this later in case I'm missing something obvious. The hyperlink was needed for people who don't have an ethereum wallet installed and need to download metamask.

### Metamask Problems

When the user clicks my login button, they're prompted with a "sign-in" modal from metamask (and not me). If the user closes that modal without signing in, metamask will NOT error out. Instead, my code behaves as if the user is STILL logging in which is not a great UX. It looks like other popular sites like Aave and Uniswap behave the same though. Also, when an error is thrown metamask will give back an object but sometimes the error is tricky to find. It might be in error.message or it might be in error.data.message which is frustating.

## Todo

### PWA features?

So far, I was thinking of caching the last page users visited (localstorage) so that creators could jump straight into the creator portal instead of forcing them to the contributor page. I was also thinking it'd be cool if contributors could make donations offline using service workers and then synchronizing them in the background once they come back online again. It'd also be cool if I could use IndexedDB for the pledges on the creator side, because there will be a lot of arrays (large data).

### Scroll animation popup

My metamask text animation is set to overflow: auto; so the user can scroll through the text if it overflows. However, there's no indication on screen telling the user that they can scroll the text. I think I have to trigger a second animation letting them know whether or not they can [scroll](https://stackoverflow.com/questions/9333379). I haven't decided how I want to do this yet though, maybe like this?

```tsx
75 * message.length + 1; // to run the animation at the end of the typing
const isOverflown = (clientHeight, scrollHeight) => {
  return scrollHeight > clientHeight;
};
```

### UX

My circles animate slowly but my content loads instantly which is jarring. I should use framer-motion or react-transition-group to transition content more smoothly. I also use a lot of window.alert() for my form validation when I should use my own toasts that don't create an additional step for the user.

### A11y

On my contributor/creator page, the keyboard navigation is messed up. Hitting tab skips over Circle_B. I think it's because Circle_B starts off in the middle of the screen and gets brought over to the top of the screen via an animation. I tried messing with the tabIndex but it didn't seem to work. Hitting ESC on the keyboard should also close any modal. I'm wondering if my application should use the main tag for HTML or if it should use a div/section marked with the [ARIA: application role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Application_Role).

## Notes

### Passing ether around

There are a couple [exceptions](https://ethereum.stackexchange.com/questions/63987), but a smart contract MUST have a payable function in order for it to have an ether balance. If the smart contract does have a payable function, the user can call it by specifying it in the input data of their transaction (via ethers.js). If you send ether to a smart contract via a transaction with NO input data (i.e. a transaction that doesn't call anything) OR you call a function that doesn't exist, it's going to call that contract's "fallback function" which could take many forms.

```solidity
// Pre solidity v0.6.0
contract foo {
  // You can only have ONE of the following, they can each run 2300 gas worth of computation, and are usually used to emit an event
  function() external {}         // runs, throws an exception, and reverts the entire transaction
  function() external payable {} // runs, and then deposits all the ether into the smart contract
}

// Solidity v0.6.0+
contract foo {
  // You can have one OR both
  fallback() external {}         // fallback works EXACTLY like before (just like function() external or function() external payable {})
  fallback() external payable {} // however, receive() will always prevail over fallback() if receive() is defined
  receive() external payable {}  // called whenever there's no input data, puts all ether into the smart contract
}
```

In order to send a transaction with input data, you need to use a library like web3 or ethersJS. Normal human accounts (EOAs) don't have/need this libary, it's just used by decentralized applications as far as I'm aware. When you call a function using one of these libraries, you'll have the ability to pass in an "overrides object" into every payable function as an extra argument. The contract method looks like this `method(arg1, arg2)`, the JS equivalent will look like this `contract.method(arg1, arg2, {overrides})`. You can specify how much ether to send in the overrides as well as other stuff like gas.

If you want the smart contract to send ether to someone else, then you need to use send(), transfer() or call() functions. These days however, only [call()](https://ethereum.stackexchange.com/questions/78124/) is recommended. The address that you're sending money to must also be marked payable in the smart contract code i.e. payable(address). Every contract starts off at 0 balance, and your contract can see its own balance using address(this).balance. Sites like [Remix](https://remix.ethereum.org/) will also show you I think. A provider is a connection to Ethereum, a signer is an account.

### Idea for a Charity Application? Unipledge?

I thought it'd be pretty cool to have a "unipledge" feature that would donate to every creator on the platform (this might create an influx of fake/repeat creators though). I also came up with a DeFi charity application, in which users could pool their money into different charity pools and have that money locked in a DeFi protocol like [Aave](https://aave.com/), the accrued interest could then go towards a charity address like [the water project @ 0x54a465610d119ad28deafd4bce555834c38beeb9](https://thewaterproject.org/donate-ethereum). Users could then switch their funds to different pools whenever they felt like it, except some of their original contribution would stay in the pool so that it would continue to grow forever.

### Using AI to find the right responsive design

I spent a lot of time playing around with font-sizes. I was tweaking the same stuff over and over again passing in different numbers each time. It almost felt like I could train a model to pass in the numbers for me until it finds the right allocation.

### My Choice of React

I originally chose React so I could use [this plugin](https://hardhat.org/plugins/hardhat-react.html) to turn my smart contract abi into a react context. I was much more familiar with react context than ethers.js, so I thought it was a good choice. I ended up scrapping the plugin altogether though because it wasn't compatibile with my version of solidity and I didn't feel like downgrading (I would've had to downgrade my other dependencies too like typechain/hardhat and bring in an older version of SafeMath from [@openzepplin/contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) to prevent under/over flow since that can happen in < 0.8.0). I think it ended up being a good choice though because I learned some bare essentials about ethers.js that I really should know.

Instead of creating my own react context, I decided to use a single ts file instead. The only state that is worth storing in react context is the contract instance, which never changes unless you're using a different smart contract entirely. Or maybe there's other advantages that I don't know about yet (deployment?).

### Frontend Stuff

- I designed everything around the iPhone 6/7/8 because iPhone 4 seems obsolete.
- Mobile first made my desktop UX kind of sparse I think.
- For a11y, motion can also be [problematic](https://developer.mozilla.org/en-US/docs/Web/CSS/animation#accessibility_concerns)
- I need to look into window.opener() and this interesting [post](https://stackoverflow.com/questions/57628890)
- Main tag should only show up once in SPA's
- The login button should have the same color as [your primary color](https://ux.stackexchange.com/questions/104224)
- I could be wrong, but innerHTML only gets scary once other users are adding the markup
- In ethers you get lower denominations by parsing and higher denominations by formatting
- [Opacity slows down rendering](https://stackoverflow.com/questions/38523826) so use RGBA instead
- 🙅 onClick={function(arg)} 🙅 -> onClick(() => function(arg))
- [React.FC<>](https://github.com/typescript-cheatsheets/react#function-components) is discouraged, use interfaces instead.
- The type of useState()'s setState handler is `Dispatch<SetStateAction<type>>` where type is the type of the state you're setting
- The type of an event handler is `(event: ChangeEvent<HTMLElement>) => type`
- Pledge is a verb and a noun and I've used both meanings when naming stuff which could get bothersome.
- [Responsive screen sizes](https://www.browserstack.com/guide/ideal-screen-sizes-for-responsive-design)
- [All the new iphone size](https://stackoverflow.com/questions/58087446)

## Lessons

### Tests were invaluable

A lot of my contract behaviour depends on what time it is, and how many days it's been. I don't want to wait a couple of days just to see if something works as intended, so [being able to set the time](https://ethereum.stackexchange.com/questions/86633) was a big help. The tests also made it a lot easier to understand my contract.

### Component Reuse is not as "free" as I thought

I was able to reuse a lot of components, but there were some downsides I didn't see coming. For components to be reusable, I had to make sure they didn't have any default margin because that would make them harder to use. So I had to add margin in later which would bloat the JSX in some way, like litter it with Spacers, or add more props (className/style). The more reusable I tried to make my components, the less readable they became.

There also wasn't a nice way to manipulate React components using CSS either in my opinion. CSS Modules would isolate styles to each component, but I didn't want to write media queries inside my component files (they're too spread out). So I had to manipulate their styles by wrapping them in a container that had the desired styles OR I had to select that component's underlying HTMLElement in the parent component (like I did with my typewriter effect).

### A wireframe AND a prototype is probably a good idea

I put a lot of grey boxes in my mockups and ignored a lot of detail (including the modals) in the short term mostly because I didn't fully understand Sergei's contract and decided to figure it out as I went a long. The result is I think it made my pledge modal look a bit "tacked on" since it doesn't fit in with the other two (due to different space requirements). I also think I would've saved more time if I made a half-hazard guess at what stuff should look like.

### Viewport Sized Typography

It's common to use 62.5% for the root font size and rem for all the other font-sizes. This lets the user change their default font-size to something else, while your content still maintains the same proportions. However, I didn't do this because increasing the default font-size would force scrollbars in my application and I didn't want that. My decorative circles are positioned relative to the screen and I think it would look janky if they moved along with the scrollbar. I was even considering dropping rem completely for pixels but I ended up using viewport units instead. I did this because I thought I would end up with less media queries, but I actually ended up with a ton of simple media queries to fit the specifications of my layout. I learned that viewport sized typography breaks the user's ability to zoom (a staple in modern UX) but luckily it looks like calc() can fix this.

## Attribution

- [Sergei's Pethreon Smart Contract](https://github.com/s-tikhomirov/pethreon)

- [Cottonbro's Money Video - Aspect Ratio 256:135](https://www.pexels.com/video/hands-rich-green-money-3943962/)

- [Metamask Logo](https://github.com/MetaMask/brand-resources)

- [Github logo](https://github.com/logos)

- [ionicons](https://ionic.io/ionicons)

- [Sarah Fossheim's Loading Animation](https://fossheim.io/writing/posts/react-text-splitting-animations/)

- [Artsy Cat's Cutesy Font](https://www.dafont.com/cutesy.font)

- [Sora Sagano's Aileron Font](https://fontsarena.com/aileron-by-sora-sagano/)
