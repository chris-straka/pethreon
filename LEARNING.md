# Learning 
## Issues I've ran into during development

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

### Recurring payments

Implementing [recurring payments](https://ethereum.stackexchange.com/questions/49596) on Ethereum is not as easy as I thought it'd be. It's hard to create recurring transactions because in Ethereum, only EOAs "Externally Owned Accounts" (humans) can create transactions. A CA "Contract Account" (smart contract) can't. This means my smart contract can't automatically create a transaction every period (day/week/month), only a human can create a transaction every period (day/week/month) which sort of defeats the whole point of using this application. [There's a couple ways people have gotten around this though](https://ethereum.stackexchange.com/questions/42). Usually what happens is someone creates a single transaction, and then your Dapp evaluates that transaction "eagerly" or "lazily". Sergei solved this problem by evaluating that transaction lazily (and I take up after Sergei). So what happens is a contributor makes a donation and in order for that creator to get any money from that donation, the creator must call a function (creatorWithdraw()), which means the creator must know about my Dapp. This function then tallies up how much they're owed up until that point and then they cash out.

If I wanted to handle things eagerly (by calculating everyone's balance at the end of every period), I'd need to use a decentralized service like [Ethereum Alarm Clock](https://www.ethereum-alarm-clock.com/). If I did this, my users (contributors or creators) would have to pay and incentivize other people (strangers) to come in and call my function at the end of every period to settle everyone's balance. The advantage is there's a good chance the creator wouldn't even have to use my Dapp, they'd see money come straight into their wallet. I avoided this because I thought it would be too costly (especially if I chose a smaller time period like 1 second). I also thought it was more difficult to implement, maybe I'll look into it for a future project.

At one point I thought "why can't I just have the EVM run a callback function on some kind of setTimeInterval?". It doesn't work because you can't have a function linger in the EVM for that long, it would eat up too many resources and cost too much gas. The EVM doesn't have anything like an "asynchronous callback" that you can call at a later point in time (as far as I'm aware).

### Security, profanity and offensive content

I originally wanted creators to have their own unique landing page for a better UX. I was thinking creators could store pictures, youtube links, and other social media on the blockchain and the client could fetch those details on the frontend and cache it. Users could then browse creators and find one they like so that they can donate to them. Besides being a ton of work, there was a lot of pitfalls. Pictures are prohibitively expensive to store on the blockchain (which is why NFTs don't do this, they store links to pictures instead), for perspective a [1KB image](https://lh6.googleusercontent.com/D_4dsybsvBPG-gxULIw24WJT_bEHIQGTsrkNWeicdz_IBdD9FQz1tHXw0jS8lrYGenxcGWcARWxa88P7kwc9tQYCHPGhaKTvGT3k-EMbZyUjR-Hz7LSreaMnVF8A6DWoOzJKA6U3) [costs ~$20 depending on gas price](https://blog.chain.link/build-deploy-and-sell-your-own-dynamic-nft/). It's also tricky to validate anything in solidity that isn't a number/boolean. This creates a lot of problems...

- People could impersonate other creators and wrongfully claim donations on their behalf
- Creators could easily post links to offensive/malicious content that I could not remove

Ethereum development is weird because it's like you're giving people the keys to your database (because ethereum is sort of like a public database). I didn't want to introduce my own server for validation because then it'd be no different than something like Patreon, and I still wanted all the benefits of decentralization (censorship resistance, trustlessness, no third-party). 

### Multiple testing frameworks?

CRA "Create React App" uses Jest, but Truffle uses Mocha and Chai. I wanted to use just one but ended up trying to use all three, but I ran into issues where typechain would create conflicting type definitions (between Chai and Jest). 

```ts
// node_modules
declare const: expect = Chai.ExpectStatic; // this kept conflicting with...
declare const expect: jest.Expect;         // this
```

I was using a single package.json for the whole project at the time, which I think was the issue. I ended up reading about different package managers (yarn, pnpm) and found a solution using workspaces. When I was looking around for ways to fix this, I ran into hardhat and realized that it was a much better tool for my purposes. It lets you right console logs in solidity which is indispensable as a learning tool in my opinion. 

### Typewriter Effect Problems

I probably could've done my TypewriterEffect using CSS only, but I've only ever seen this done with single lines of text (not dynamic text that can wrap across multiple lines). So I did it with JS instead but there's still a couple things I wonder about. I had issues printing the hyperlink char-by-char (either that or I'm dumb?) because it kept printing the HTML markup as well `<a href="" rel="" etc="">download<a>`. So I decided to recreat the same link ~17 times, char-by-char (feels like there should be an easier way to do this).

### Metamask Problems

When the user clicks the login button, metamask prompts them with a "sign-in" modal that I can't control. If the user closes it without signing in, metamask will NOT error out. Instead, my code behaves as if the user is STILL logging in which is not a great UX. It looks like other popular sites like Aave and Uniswap behave the same. Also, when an error is thrown metamask gives back an object but sometimes the error message is tricky to find could be error.message or error.data.message.

### Circle Problems

My circles have been very tricky to deal with. I want them to appear on screen at all times and I want them to move between page transitions. Specifically, I want the page content to disappear first, then the circles to move, and then the new content to appear. I thought I could move the circles to their new locations and then replace them with new circles that are positioned in the exact same spot but it didn't look good (they would flicker whenever they got replaced). Maybe I was missing something and could've made it work, but I ended up not replacing the circles and moving the same circles around instead.

Framer-motion can animate css variables but it only takes their underlying value at that point in time (with that screen size). This meant my circles would refuse to move whenever the user resized the page. I thought about re-triggering my useEffect whenever the user resized the page (the same useEffect that would move the circles to the right position depending on what page they're on) and refreshing the CSS variables. But I ended up not relying on framer motion for this and instead decided to switch the CSS properties to different CSS variables depending on the route (using transitions). Finding a way to make this maintainable & customizable (in any implementation) was also quite difficult. The circles need to know about their future positions (which change depending on the page and screen size) but I also wanted to isolate the logic on a "per page" basis. I wasn't sure if I should've used CSS modules, or sass @use/forwards, etc. CircleA and CircleB are also very similar and they seem DRY, but it just seemed easier conceptually.

### Idea for a Charity Application? Unipledge?

I thought it'd be pretty cool to have a "unipledge" feature that would donate to every creator on the platform (this might create an influx of fake/repeat creators though). I also came up with a DeFi charity application, in which users could pool their money into different charity pools and have that money locked in a DeFi protocol like [Aave](https://aave.com/), the accrued interest could then go towards a charity address like [the water project @ 0x54a465610d119ad28deafd4bce555834c38beeb9](https://thewaterproject.org/donate-ethereum). Users could then switch their funds to different pools whenever they felt like it, except some of their original contribution would stay in the pool so that it would continue to grow forever.

### A11y

There's this weird problem in my contributor & creator page where the keyboard navigation is messed up. My circleC should be the first element to receive focus, but it keeps skipping over it. Clicking somewhere else on the page resets it to the proper order. I think this is because of how I set up my circles, but I really don't know why it's doing that. 

Another a11y problem, is that I think my application is going to be very hard for screen reader users to understand. I'd have to test it myself to find out.

### My Choice of React

I originally chose React so I could use [this hardhat plugin](https://hardhat.org/plugins/hardhat-react.html) and resources for react seem more plentiful. That hardhat plugin is kind of like typechain because it creates types that I can use in my frontend (which gives me nice autocompletion). The difference is that it makes everything accessible via a react context, which makes a lot of sense. However, I ended up scrapping the plugin altogether though because it was giving me compatibility issues. I would have to downgrade stuff like solidity and bring in [SafeMath from @openzepplin/contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) because under/over flow can happen on older versions of solidity (< 0.8.0). 

Scrapping it also forced me to learn a lot more about ethers.js too. I opted for a single TS file instead of react context. I did this because I didn't think I had any state to worry about. The only state that is worth storing in a react context is the contract instance, which I think never changes unless you're using a different smart contracts throughout your application? Or maybe there's other advantages that I don't know about yet (easier deployment?).

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

### Contract Misc

Each smart contract uses [Unix Time](https://en.wikipedia.org/wiki/Unix_time) to keep track of things.

According to this [post](https://ethereum.stackexchange.com/questions/39723), it looks like there's no way to test the existence of a map in solidity. Sergei uses an "exists" boolean for this, I think I might have to do something similar.

You can't build a dynamic array in memory in solidity.


## Lessons

### Tests were invaluable

A lot of my smart contract behaviour depends on what time it is, and how many days it's been. I don't want to wait days just to see if something works in my contract, so [being able to set the time programatically](https://ethereum.stackexchange.com/questions/86633) was a big help. The tests also made it a lot easier to understand the smart contract code.

### I fought the scrollbar and the scrollbar won

I originally didn't want to use any REM units for my font-sizes because I didn't want my app to have any scrollbars. If I used REM, the user could set a bigger font-size and push my content off-screen and force scrollbars. I didn't want any scrollbars because my circles are positioned relative to the screen, and I didn't my circles to move with the scrollbar. However, I found it too cumbersome to avoid scrollbars because my TypewriterEffect was creating dynamic text content and it would wrap in unpredictable ways. It made responsive design tricky, because I was trying to find the right font-size that worked on every possible screen for every possible arrangement of text from my TypeWriterEffect (which was crazy hard). I think clamp() was giving me the false illusion that I could make it happen somehow but I ended up giving up and throwing in scrollbars.

One cool thing I learned along the way though, is that you can't zoom in/out on any text that's been sized with viewport units. You have to use[calc(vw + 1em) or clamp(vw + 1em)](https://www.youtube.com/watch?v=wARbgs5Fmuw) instead. I also learned how nice it is to use CSS variables for responsive design.

### I'm learning a lot about components

When I started this project, I used to think components were mostly for reusing stuff (eliminating DRY code). But I think I underestimated how effective they are at making code more readable. I looked at other projects, and it seems like they would break things down into components even if they never intended to reuse them. I think there were a couple times where I would avoid making components, because I didn't want to nest them that much (I think it adds more complexity and slows down performance).

When looking at other projects, I also noticed that they defined media queries inside of components and not in the container that defined the overall layout. I wasn't a fan of this originally, because I thought it would make components less reusable (different pages could have different breakpoints/requirements) and I didn't like clicking between multiple different files to make tweaks. Maybe this was a problem with how I built my components (needed more inherit? more responsive units?). For my next project, I'm going to try and take this approach instead.

I also felt a couple times that CSS didn't mesh as nicely with components (or React) as I'd like. I think CSS has an "imperative" feel that clashes a bit with React's "declarative" code-style. For example, framer-motion is a declarative framework that handles animations for you and you're not really supposed to write CSS outside of motion components. However, once you get particular about the type of animation you want to see, it tends to rely more on CSS and doesn't feel that declarative anymore (even though you can get a lot of mileage out of easing functions and stuff).

Another instance of CSS not meshing as nicely as I'd liked was was when I when I tried to create reusable components. I had to be careful of adding default margins because then it could look out of place depending on where I put it. My options for adding margins kind of sucked. I could've bloated my JSX with Spacer components (un-semantic divs), or I could've selected the underlying HTML element of that react component via "first-child" using css (which would break whenever I changed or moved it). The best option I found was to pass in additional style props which seemed overkill sometimes.

### A wireframe AND a prototype is probably a good idea

In my design mockups, I ignored a lot of detail (like I didn't create any design mockups for my modals and put a lot of grey boxes everywhere) because I didn't fully understand Sergei's smart contract at the time. I ended up creating things on the fly and there's a lot interesting observations that about from this. My modals ended up looking a bit different from each other, because they all required different information. Initially, some of the components that I used in one modal weren't reusable in another so they all ended up having a slightly different style. I ended up refactoring my application after the fact to make them much more homogenous but it was something that caught me off guard. In the future I'm going to design for a lot more stuff (even if I have a bad idea of how it will turn out) just so I can understand the overall style of the application.
### My typewriter effect isn't that great for UX as I thought it'd be

I put a lot of crucial information inside my typewriter effect (errors, recommondations, install links), and the user has to wait for him to finish talking before they can see any of it. I thought it would make the application seem more interactive and fun, but I think it's more important that the user has that information immediately as soon as it becomes available. I'm keeping it up

## Misc

### Frontend Stuff

- [Certain animations can hurt a11y](https://developer.mozilla.org/en-US/docs/Web/CSS/animation#accessibility_concerns)
- [window.opener() weirdness](https://stackoverflow.com/questions/57628890)
- Even though my "main" content is split between two pages, I should only use one main HTML tag.
- It's a good idea to make the login button the same color as [the primary color](https://ux.stackexchange.com/questions/104224)
- innerHTML is only scary when it's in the user's hand, not yours (don't quote me)
- In ethers, to get a lower denomination you "parse" and higher denomination via "format"
- 🙅 onClick={function(arg)} 🙅 -> onClick(() => function(arg))
- The type of useState()'s setState handler is `Dispatch<SetStateAction<type>>` where type is the type of the state you're setting
- The type of an event handler is `(event: ChangeEvent<HTMLElement>) => type`
- [React.FC<>](https://github.com/typescript-cheatsheets/react#function-components) is discouraged, use interfaces instead.
- [Opacity slows down rendering](https://stackoverflow.com/questions/38523826) so use RGBA instead
- [Responsive screen sizes](https://www.browserstack.com/guide/ideal-screen-sizes-for-responsive-design)
- [All the new iphone sizes](https://stackoverflow.com/questions/58087446)