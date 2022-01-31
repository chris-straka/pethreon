# Lessons

### Tests were invaluable

A lot of my smart contract behaviour depends on what time it is, and how many days it's been. I don't want to wait days just to see if something works in my smart contract, so [being able to set the time programatically](https://ethereum.stackexchange.com/questions/86633) was a big help. The tests also made it a lot easier to understand the smart contract code.

### I'm learning a lot about components

When I started this project, I used to think components were mostly for reusing stuff (eliminating DRY code). But I think I underestimated how effective they are at making code more readable. I ended up breaking things down even if I didn't intend to reuse them and I think it made things look better in a couple cases.

I wasn't exactly sure where to put my CSS media queries. I could've put them in my components, or I could've passed them down as props. If I put them inside my components, then my media queries would apply everywhere I used the component. If I passed them down as props, then I could change them to look better in different places. I'm still finding the right balance of when to do what. I even tried using "spacer" components to add default padding and margin to things.

### The same colors can look great or bad depending on how they're used

I picked two colors that I really liked (my primary and secondary), but sometimes they don't mesh well and sometimes they do. In my contributor portal, I think the blue background looks great with the pink text. But in my creator portal, I think the pink background looks bad with blue text. I found that with a lighter font-weight a darker color looked better. I was juggling between light and dark theme as well, and the same colors don't look as good if they're on a dark background compared to a white one.

### I fought the scrollbar and the scrollbar won

Originally, I didn't want the user to scroll through the application because I wanted a "native-app" feel. I also positioned my circles relative to the screen, and I thought it would look bad if they moved together with the scrollbar. So I used pixels for all my font sizes instead of REM, because if the user increased the font size they could push my content off screen and force scrollbars. This made things very difficult in some cases because my TypewriterEffect was creating dynamic text content that would wrap in unpredictable ways. I also had to find the right font-size for every possible screen without it looking to big on some and too small on the others. It lead to so many media queries and made things really tricky. I think clamp() was giving me the false illusion that I could make it happen somehow but I ended up giving up and letting the app scroll in some cases.

One cool thing I learned along the way though, is that you can't zoom in/out on any text that's been sized with viewport units. You have to use[calc(vw + 1em) or clamp(vw + 1em)](https://www.youtube.com/watch?v=wARbgs5Fmuw) instead. I also learned how nice it is to use CSS variables for responsive design.

### My metamask typewriter effect can hurt UX if I'm not careful

My typewriter effect (the talking metamask logo) is giving a lot of crucial information to the user (errors, recommendations, install links). The user has to wait for him to finish talking before they can read any of it though, so I have to make him talk quickly. Also, my the metamask logo can be distracting when I have the video playing at the same time (the user's attention is divided).

### A wireframe AND a prototype is probably a good idea

In my design mockups, I ignored a lot of detail. I didn't create a design for any of the modals and I put a lot of grey boxes everywhere with the intention of filling in those details later. I mostly did this because I didn't fully understand Sergei's smart contract at the time. I ended up creating things on the fly, and designing things in isolation because I was only focused on getting things working at that point. It was harder to think about what components I would need and how I would reuse them because I didn't plan it before hand. I ended up refactoring later and made the modals much more homogenous but I think in the future I'm going to create a more flushed out wireframe and prototype. 

### I should occassionally view my designs in fullscreen to get a better idea of scale

When working on Figma, I would design for large screen sizes (like 1920x1080) using rectangles that were actually much smaller than that on my physical screen. I think I created layouts that would look great on a business card but not so great for a website. On my contributor & creator page, I left a ton of open space at the top left of the website. I used that space for my loading component but I underestimated just how much space I would leave open.
# Issues I've ran into during development

### How does the original Pethreon contract from Sergei et al work?

One of the cool things about Sergei's contract, is that you can choose over which time "period" payments should be processed in (i.e. daily, weekly or monthly). You do this by passing in the amount of seconds each period should last for in the smart contract's constructor (hourly 3600, daily 86400, weekly 604800). I'm pretty sure that's how it works but I got confused from the following snippet in his original contract.

```cpp
  // update creator's mapping of future payments
  for (uint period = currentPeriod(); period < _periods; period++) {
    expectedPayments[_creator][period] += _weiPerPeriod;
  }
```

The currentPeriod() method grabs the current number of periods (hours/days/weeks) it's been since the contract was created and "_periods" in this for-loop refers to the number of periods a contributor wants to donate for (donate X amount over 2 days, 3 days, etc). However, if the contract is 50 days old and the contributor wants to donate for 5 days, then how does this run? I think it should be `period < _periods + currentPeriod()` so it might be worth a pull request, either that or I've fundamentally misunderstood something. Also, It only hit me until really late in the project, but I'm wondering if contributors even need to lock in their money to the smart contract at all? I'll leave it for now because maybe I might do something cool with it later (use their balance for DeFi?).

I will make some other changes though. I'm going to make it easier for contributors & creators to see the pledges they've made. I came up with a really cool idea on the alternative_contract branch, but unfortunately it doesn't work. In my alternative smart contract, I needed to build a dynamic array in memory because that was the easiest way to return all the pledges to a user. But apparently it's [not allowed in Solidity](https://stackoverflow.com/questions/68010434). I could return a static array of pledges instead, and the user could keep calling that function in order to grab a different set of pledges each time, but I didn't really like this idea and it would result in a lot more API calls to my node at infura. I could be missing something painfully obvious to make my alternative_contract work but I'll have to look at it later. I liked the alternative contract because I think it's much more resource efficient, and I think if I'm not careful things can get really expensive (maps aren't iterable in solidity and iteration is costly) I think I ended up with something that works alright, but I'm going to need more sophisticated tests (that take into account gas fees) to get a better idea.

### Can the creator get locked out of their money?

After reading (and contributing to) [this answer on stack exchange](https://ethereum.stackexchange.com/questions/42207), it turns out there's a possibility that a user might not be able to call a function because it takes too much gas to run. I think in my case, this would only ever happen if the creator takes a really long time to withdraw their funds (i.e. the withdraw function had to iterate over so many periods that they couldn't withdraw). Or if a new contributor couldn't make a new pledge to a creator because they had to iterate over too many pledges that are already being made to that creator. You might be wondering why the contributor has to do this, and it's ultimately because that's how I've chosen to keep track of all the creators pledges in my smart contract.

### Does my monorepo structure make sense?

I fell in love with monorepos at first because I thought it was a really nice way of separating concerns. They also fixed a problem I was having (see below in "multiple testing frameworks"). My ideas on this are still developing, but I'm not sure if this was the best idea. To start with, my backend has to output two different directories into the frontend package which doesn't feel like they're very separated. And I think monorepos have their own unique set of challenges when it comes to deployment and maintenance that make things difficult. I couldn't use any of the cool stuff like [Plug'n Play](https://yarnpkg.com/features/pnp) so I basically had to configure my .yarnrc.yaml file to use a different node-linker instead. I also had issues when I hoisted all my node_modules to the root of the project so I had to again go to my .yarnrc.yaml file to hoist node_modules to each workspace. 

### Multiple testing frameworks?

CRA "Create React App" uses Jest, but Truffle uses Mocha and Chai. I wanted to use just one but ended up trying to use all three, but I ran into issues where typechain would create conflicting type definitions (between Chai and Jest). 

```ts
// node_modules

// chai.ts
declare const: expect = Chai.ExpectStatic; // this kept conflicting with...

// jest.ts
declare const expect: jest.Expect;         // this
```

I was using a single package.json for the whole project at the time, which I think was the issue. I ended up reading about different package managers (yarn, pnpm) and found a solution using workspaces. When I was looking around for ways to fix this, I ran into hardhat and realized that it was a much better tool for my purposes. It lets you right console logs in solidity which is indispensable as a learning tool in my opinion. 

### I actually ran into the "hey! it works on my machine!" problem that proponents of Docker talk about

I didn't think I would ever run into this issue, but sure enough I did. I primarily developed this dapp on windows, but when I went to go deploy it on [netlify](https://www.netlify.com/) (which uses an [ubuntu 20.04 focal image](https://releases.ubuntu.com/20.04/)) I ran into issues. There's four phases of the [yarn install command](https://yarnpkg.com/cli/install#gatsby-focus-wrapper), and my app would fail at the second phase (yarn fetch). It was trying to pull [ethereumjs-abi](https://github.com/ethereumjs/ethereumjs-abi) but failed. The dependency is deprecated and no longer maintained, so I ran `yarn info` to find out what was using it in my project because I didn't install it directly. I was thinking maybe I could update my dependency that used it and that would get rid of it. Turns out hardhat was the only thing that needed it, but my hardhat install was already at the latest version. So I went to check out the source code of hardhat to see if I could submit a pull request to remove ethereumjs-abi. Turns out Hardhat only used it in 4 instances (2 of them easily replaceable) the other 2 not so much. So I decided to try something else.

I ran my project on my fedora machine instead (I tripple boot windows/fedora/arch (btw)), and it turns out it doesn't work on my fedora machine either (despite it still working on my windows machine). I deleted the yarn.lock file on my windows machine and reinstalled everything on windows but it still didn't work. I did the same thing on fedora though, and everything works and the application deploys successfully. 

### Recurring payments

Implementing [recurring payments](https://ethereum.stackexchange.com/questions/49596) on Ethereum is not as easy as I thought it'd be. It's hard to create recurring transactions because in Ethereum, only EOAs "Externally Owned Accounts" (humans) can create transactions. A CA "Contract Account" (smart contract) can't. This means my smart contract can't automatically create a transaction every period (day/week/month), only a human can create a transaction every period (day/week/month) which sort of defeats the whole point of using this application. [There's a couple ways people have gotten around this though](https://ethereum.stackexchange.com/questions/42). Usually what happens is someone creates a single transaction, and then your Dapp evaluates that transaction "eagerly" or "lazily". Sergei solved this problem by evaluating that transaction lazily (and I take up after Sergei). So what happens is a contributor makes a donation and in order for that creator to get any money from that donation, the creator must call a function (creatorWithdraw()), which means the creator must know about my Dapp. This function then tallies up how much they're owed up until that point and then they cash out.

If I wanted to handle things eagerly (by calculating everyone's balance at the end of every period), I'd need to use a decentralized service like [Ethereum Alarm Clock](https://www.ethereum-alarm-clock.com/). If I did this, my users (contributors or creators) would have to pay and incentivize other people (strangers) to come in and call my function at the end of every period to settle everyone's balance. The advantage is there's a good chance the creator wouldn't even have to use my Dapp, they'd see money come straight into their wallet. I avoided this because I thought it would be too costly (especially if I chose a smaller time period like 1 second). I also thought it was more difficult to implement, maybe I'll look into it for a future project.

At one point I thought "why can't I just have the EVM run a callback function on some kind of setTimeInterval?". It doesn't work because you can't have a function linger in the EVM for that long, it would eat up too many resources and cost too much gas. The EVM doesn't have anything like an "asynchronous callback" that you can call at a later point in time (as far as I'm aware).

### Security, profanity and offensive content

I originally wanted creators to have their own unique landing page for a better UX. I was thinking creators could store pictures, youtube links, and other social media on the blockchain and the client could fetch those details on the frontend and cache it. Users could then browse creators and find one they like so that they can donate to them. Besides being a ton of work, there was a lot of pitfalls. Pictures are prohibitively expensive to store on the blockchain (which is why NFTs don't do this, they store links to pictures instead), for perspective a [1KB image](https://lh6.googleusercontent.com/D_4dsybsvBPG-gxULIw24WJT_bEHIQGTsrkNWeicdz_IBdD9FQz1tHXw0jS8lrYGenxcGWcARWxa88P7kwc9tQYCHPGhaKTvGT3k-EMbZyUjR-Hz7LSreaMnVF8A6DWoOzJKA6U3) [costs ~$20 depending on gas price](https://blog.chain.link/build-deploy-and-sell-your-own-dynamic-nft/). It's also tricky to validate anything in solidity that isn't a number/boolean. This creates a lot of problems...

- People could impersonate other creators and wrongfully claim donations on their behalf
- Creators could easily post links to offensive/malicious content that I could not remove

Ethereum development is weird because it's like you're giving people the keys to your database (because ethereum is sort of like a public database). I didn't want to introduce my own server for validation because then it'd be no different than something like Patreon, and I still wanted all the benefits of decentralization (censorship resistance, trustlessness, no third-party). 

### Typewriter Effect Problems

I probably could've done my TypewriterEffect using CSS only, but I've only ever seen this done with single lines of text (not dynamic text that can wrap across multiple lines). So I did it with JS instead but there's still a couple things I wonder about. I had issues printing the hyperlink char-by-char (either that or I'm dumb?) because it kept printing the HTML markup as well `<a href="" rel="" etc="">download<a>`. So I decided to recreat the same link ~17 times, char-by-char (feels like there should be an easier way to do this).

### Metamask Login Problems

When the user clicks the login button, metamask prompts them with a "sign-in" modal that I can't control. If the user closes it without signing in, metamask will NOT error out. Instead, my code behaves as if the user is STILL logging in which is not a great UX. It looks like other popular sites like Aave and Uniswap behave the same way. Also, when an error is thrown metamask throws an object, but sometimes the error message in that object is in different places (could be error.message or error.data.message). This may have changed since then.

### Circle Problems

My circles have been very tricky to deal with. I want them to appear on screen at all times and I want them to move between page transitions. Specifically, I want the page content to disappear first, then the circles to move, and then the new content to appear. I thought I could move the circles to their new locations and then replace them with new circles that are positioned in the exact same spot but it didn't look good (they would flicker whenever they got replaced). Maybe I was missing something and could've made it work, but I ended up not replacing the circles and moving the same circles around instead.

Framer-motion can animate css variables but it only takes their underlying value at that point in time (with that screen size). This meant my circles would refuse to move whenever the user resized the page. I thought about re-triggering my useEffect whenever the user resized the page (the same useEffect that would move the circles to the right position depending on what page they're on) and refreshing the CSS variables. But I ended up not relying on framer motion for this and instead decided to switch the CSS properties to different CSS variables depending on the route (using transitions). Finding a way to make this maintainable & customizable (in any implementation) was also quite difficult. The circles need to know about their future positions (which change depending on the page and screen size) but I also wanted to isolate the logic on a "per page" basis. I wasn't sure if I should've used CSS modules, or sass @use/forwards, etc. CircleA and CircleB are also very similar and they seem DRY, but it just seemed easier conceptually.

### Idea for a Charity Application? Unipledge?

When I was brainstorming stuff in the beginning, I thought it would be pretty cool to have a "unipledge" feature that would donate to every creator on the platform (this might create an influx of fake/repeat creators though). I also thought of up with a DeFi charity application, where users could pool their money into different charity pools and have that money locked in a DeFi protocol like [Aave](https://aave.com/), the accrued interest could then go towards a charity address like [the water project @ 0x54a465610d119ad28deafd4bce555834c38beeb9](https://thewaterproject.org/donate-ethereum). Users could then switch their funds to different pools whenever they felt like it, but some of their original contribution would stay in the pool so that it would continue to grow forever.

### A11y

There's this weird problem in my contributor & creator page where the keyboard navigation is messed up. My circleC should be the first element to receive focus, but it keeps skipping over it and jumping my actionBar. Clicking somewhere else on the page resets it to the proper order. I think this is because of how I set up my circles, but I really don't know why it's doing that. Another a11y problem, is that I think my application is going to be very hard for screen reader users to understand. I'd have to test it myself to find out. 

### My Choice of React

I originally chose React so I could use [this hardhat plugin](https://hardhat.org/plugins/hardhat-react.html) and resources for react seem more plentiful. The plugin is sort of like typechain, because it creates types that I can use in my frontend (which gives me autocomplete). The difference is that it makes everything accessible via a react context, which makes a lot of sense. However, I ended up scrapping the plugin altogether because it was giving me compatibility issues. I would have to downgrade stuff like solidity and bring in [SafeMath from @openzepplin/contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) because under/over flow can happen on older versions of solidity (< 0.8.0). Scrapping it also forced me to learn a lot more about ethers.js too.

I ended up using a single TS file instead of a react context. I did this because I didn't think I had any state to worry about. The only state that is worth storing in a react context is the contract instance, which I think never changes unless you're using a different smart contracts throughout your application? Or maybe there's other advantages that I don't know about yet (easier deployment?).

## Notes

### Passing ether around

There are a couple [exceptions](https://ethereum.stackexchange.com/questions/63987), but a smart contract MUST have a payable() function in order for it to have an ether balance. Any user can call its payable() function by specifying it in the input data of their transaction. This is something ethers.js does for us.

If you send ether to a smart contract via a transaction that has NO input data (i.e. a transaction that doesn't call anything) OR you call a function on that smart contract that doesn't exist, it's going to call that contract's "fallback function" which could take many forms (due to there being many versions of solidity).

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

In order to send a transaction with input data, you need to use a library like web3 or ethersJS. Normal human accounts (EOAs) don't have/need this libary, it's just used by decentralized applications as far as I'm aware. When you call a function using one of these libraries, you'll have the ability to pass in an additional "overrides object" into every payable function as an extra argument. The smart contract itself does not define this object in any of its functions, it's just something ethers/web3 lets you do so you can attach ether to a function call. If the contract method looks like `foo(arg1, arg2)`, the JS equivalent will look like `contract.foo(arg1, arg2, {overrides})`. You can also specify other stuff like gas in the overrides object.

If you want the smart contract to send ether to someone else, then you need to use send(), transfer() or call() functions. These days however, only [call()](https://ethereum.stackexchange.com/questions/78124/) is recommended. The address that you're sending money to must also be marked payable in the smart contract code i.e. payable(address). Every contract starts off at 0 balance, and your contract can see its own balance using address(this).balance. Sites like [Remix](https://remix.ethereum.org/) will also show you. In ethers.js lingo, a "provider" is a connection to Ethereum, a "signer" is an account.

## Misc

### Backend

Each smart contract uses [Unix Time](https://en.wikipedia.org/wiki/Unix_time) to keep track of things.

According to this [post](https://ethereum.stackexchange.com/questions/39723), it looks like there's no way to test the existence of a map in solidity. Sergei uses an "exists" boolean for this, I think I might have to do something similar.

You can't build a dynamic array in memory in solidity.

### Frontend 

- How do you use BEM (specifically the modifier part "--") in react with CSS modules?
- How do I preload and prefetch fonts in create-react-app?
- [Certain animations can hurt a11y](https://developer.mozilla.org/en-US/docs/Web/CSS/animation#accessibility_concerns)
- [window.opener() weirdness](https://stackoverflow.com/questions/57628890)
- Even though my "main" content is split between two pages, I should only use one main HTML tag.
- It's a good idea to make the login button the same color as [the primary color](https://ux.stackexchange.com/questions/104224)
- innerHTML is only scary when it's in the user's hand, not yours (don't quote me)
- In ethers, to get a lower denomination you "parse" and higher denomination via "format"
- The type of useState()'s setState handler is `Dispatch<SetStateAction<type>>` where type is the type of the state you're setting
- The type of an event handler is `(event: ChangeEvent<HTMLElement>) => type`
- [React.FC<>](https://github.com/typescript-cheatsheets/react#function-components) is discouraged, use interfaces instead.
- [Opacity slows down rendering](https://stackoverflow.com/questions/38523826) so use RGBA instead
- [Responsive screen sizes](https://www.browserstack.com/guide/ideal-screen-sizes-for-responsive-design)
- [All the new iphone sizes](https://stackoverflow.com/questions/58087446)