# Issues I've ran into during development

## How does the original Pethreon contract from Sergei et al work?

One of the cool things about Sergei's contract, is you can choose what time `period` payments should be processed in (i.e. daily, weekly or monthly). You do this by passing in the amount of seconds each period should last for in the smart contract's constructor (hourly 3600, daily 86400, weekly 604800). At least, that's how I understood the contract. What confuses me is the following...

```cpp
  // update creator's mapping of future payments
  for (uint period = currentPeriod(); period < _periods; period++) {
    expectedPayments[_creator][period] += _weiPerPeriod;
  }
```

I'm pretty sure currentPeriod() grabs the current number of periods (hours/days/weeks) it's been since the contract was created and `_periods` (in this context) is the number of periods a contributor would like to donate for (2 days, 3 days, etc). However, if the contract is 50 days old and the contributor wants to donate for 5 days, then how does this run? I think it should be `period < _periods + currentPeriod()` so it might be worth a pull request, either that or I've misunderstood something. Also, It only hit me until really late in the project, but I'm wondering if contributors even need to lock money into the smart contract at all? I'll leave it for now because I might want to do something cool with it later (DeFi?).

### The changes I'm going to make

I'm going to build in features that make it easier for contributors & creators to see the pledges they've made. There's a couple of ways to do this, and I even have one failed attempt at doing this in another branch (alternative_contract). I tried to be cautious with how I did this, because I think it can get expensive (maps aren't iterable in solidity and iteration is costly). I also want them to be cancellable as well. I think I ended up with something that works, but I'm going to need more sophisticated tests if I want get a better idea at gas costs.

### Can the creator get locked out of their money?

After reading (and contributing to) [this answer on stack exchange](https://ethereum.stackexchange.com/questions/42207), it turns out there's a possibility that a user might not be able to call a function because it takes too much gas to run. I think in my case, this would only ever happen if the creator takes a really long time to withdraw their funds (i.e. the withdraw function had to iterate over so many periods that they couldn't withdraw). Or if a new contributor couldn't make a new pledge because they had to iterate over too many of their existing pledges (which helps keep track of what's expired).

### Dynamic Arrays In Memory aren't allowed?

In my alternative smart contract, I needed to build a dynamic array in memory because that was the easiest way to return all the pledges to a user. But apparently it's not allowed in Solidity (I could be mistaken). I could return static arrays and just keep returning static arrays after incrementing a pointer but that would result in a lot more API calls to my node at infura (and it might be dumb). There might be something I'm missing, I'll figure it out with more experience.

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

I probably could've done my TypewriterEffect with CSS only, but I've only ever seen this done with single lines of text (not dynamic text that can wrap x times). So I did it with JS instead but there's still a couple things I wonder about. I had issues printing the hyperlink char-by-char (either that or I'm dumb?) because it kept printing the HTML markup as well `<a href="" rel="" etc="">download<a>`. So I decided to recreat the same link ~17 times, char-by-char (feels like there should be an easier way to do this).

### Metamask Problems

When the user clicks the login button, metamask prompts them with a "sign-in" modal that I can't control. If the user closes it without signing in, metamask will NOT error out. Instead, my code behaves as if the user is STILL logging in which is not a great UX. It looks like other popular sites like Aave and Uniswap behave the same. Also, when an error is thrown metamask gives back an object but sometimes the error message is tricky to find could be error.message or error.data.message.

### Circle Problems

My circles have been very tricky to deal with. I want them to appear on screen at all times and I want them to move between page transitions. Specifically, I want the page content to disappear first, then the circles to move, and then the new content to appear. I thought I could move the circles to their new locations and then replace them with new circles that are positioned in the exact same spot but it didn't look good (they would flicker whenever they got replaced). Maybe I was missing something and could've made it work, but I ended up not replacing the circles and moving the same circles around instead.

Framer-motion can animate css variables but it only takes their underlying value at that point in time (with that screen size). This meant my circles would refuse to move whenever the user resized the page. I thought about re-triggering my useEffect whenever the user resized the page (the same useEffect that would move the circles to the right position depending on what page they're on) and refreshing the CSS variables. But I ended up not relying on framer motion for this and instead decided to switch the CSS properties to different CSS variables depending on the route (using transitions). Finding a way to make this maintainable & customizable (in any implementation) was also quite difficult. The circles need to know about their future positions (which change depending on the page and screen size) but I also wanted to isolate the logic on a "per page" basis. I wasn't sure if I should've used CSS modules, or sass @use/forwards, etc. CircleA and CircleB are also very similar and they seem DRY, but it just seemed easier conceptually.

### Idea for a Charity Application? Unipledge?

I thought it'd be pretty cool to have a "unipledge" feature that would donate to every creator on the platform (this might create an influx of fake/repeat creators though). I also came up with a DeFi charity application, in which users could pool their money into different charity pools and have that money locked in a DeFi protocol like [Aave](https://aave.com/), the accrued interest could then go towards a charity address like [the water project @ 0x54a465610d119ad28deafd4bce555834c38beeb9](https://thewaterproject.org/donate-ethereum). Users could then switch their funds to different pools whenever they felt like it, except some of their original contribution would stay in the pool so that it would continue to grow forever.

### Using AI to find the right responsive design

I spent a lot of time playing around with font-sizes. I was tweaking the same stuff over and over again passing in different numbers each time. It almost felt like I could train a model to pass in the numbers for me until it finds the right allocation. I seen some examples online use this...

```scss
/* Uses vh and vm with calc */
@media screen and (min-width: 25em) {
  html {
    font-size: calc(16px + (24 - 16) * (100vw - 400px) / (800 - 400));
  }
}

/* Safari <8 and IE <11 */
@media screen and (min-width: 25em) {
  html {
    font-size: calc(16px + (24 - 16) * (100vw - 400px) / (800 - 400));
  }
}

@media screen and (min-width: 50em) {
  html {
    font-size: calc(16px + (24 - 16) * (100vw - 400px) / (800 - 400));
  }
}
```

### A11y

I used to have this problem on my contributor & creator page where the keyboard navigation was messed up. My circleC was the last element to receive focus even though it should've been the first. I tried changing this by messing around with the tabIndex attribute but it didn't seem to work. I made a bunch of huge refactors in my project and that somehow fixed it. I still don't know why this was happening, I think it's because circleC was at the bottom of the page and then got moved to the top later. I think this was happening despite CircleC being listed above all the other elements.

I also had a problem with modals and a11y. My first implementation used React portals which I think gave me some issues with handling focus (it was a while ago). I ended up refactoring to use [Fireship's Framer Motion Modals](https://www.youtube.com/watch?v=SuqU904ZHA4&t=576s) instead, I figured it was worthwhile since I already decided to use framer-motion for page transitions.

### My Choice of React

I originally chose React so I could use [this plugin](https://hardhat.org/plugins/hardhat-react.html) which turns my smart contract abi into a react context. I was much more familiar with using react context than ethers.js, so I thought it was a good choice. I ended up scrapping the plugin altogether though because it wasn't compatibile with my version of solidity and I didn't feel like downgrading (I would've had to downgrade several other dependencies too like typechain/hardhat and bring in an older version of SafeMath from [@openzepplin/contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) to prevent under/over flow since that can happen in < 0.8.0). I think it ended up being a good choice in the end because I learned the bare essentials of ethers.js which I really should know about.

Instead of creating my own react context file, I decided to use an ordinary TS file instead. The only state that is worth storing in react context is the contract instance, which I think never changes unless you're using a different smart contracts throughout your application? Or maybe there's other advantages that I don't know about yet (easier deployment?).

## Lessons

### Tests were invaluable

A lot of my smart contract behaviour depends on what time it is, and how many days it's been. I don't want to wait days just to see if something works in my contract, so [being able to set the time programatically](https://ethereum.stackexchange.com/questions/86633) was a big help. The tests also made it a lot easier to understand the smart contract code.

### I fought the scrollbar and the scrollbar won

I originally didn't want to use rem units for any of my font-size because I didn't want my app to have scrollbars in the overall layout (they could set a font-size so big that it would push my content off screen and create scrollbars). I didn't want scrollbars because I wanted my webapp to fit on all on one page and have it to look like a mobile app (PWA). I also positioned my circles relative to the screen, and I thought it would look janky if my decorative circles moved together with the scrollbar. However, I found it too cumbersome to avoid scrollbars because I had dynamic text content. It would wrap differently depending on which message they got and it was tought to find a responsive font-size that made sense. There were too many media queries which was hard to maintain and read.

One cool thing I learned along the way though, is that you can't zoom in/out on any text that's been sized with viewport units. You can use[calc(vw + 1em) or clamp(vw + 1em)](https://www.youtube.com/watch?v=wARbgs5Fmuw) though and it will work. I also learned how nice it is to use CSS variables for responsive design.

### I'm learning a lot about components

When I started this project, I used to think components were mostly for reusing stuff (eliminating DRY code). But I think I underestimated how effective they are at making code more readable. I looked at other projects, and it seems like they would break things down into components even if they never intended to reuse them. I think there were a couple times where I would avoid making components, because I didn't want to nest them that much (I think it adds more complexity and slows down performance).

When looking at other projects, I also noticed that they defined media queries inside of components and not in the container that defined the overall layout. I wasn't a fan of this originally, because I thought it would make components less reusable (different pages could have different breakpoints/requirements) and I didn't like clicking between multiple different files to make tweaks. Maybe this was a problem with how I built my components (needed more inherit? more responsive units?). For my next project, I'm going to try and take this approach instead.

I also felt a couple times that CSS didn't mesh as nicely with components (or React) as I'd like. I think CSS has an "imperative" feel that clashes a bit with React's "declarative" code-style. For example, framer-motion is a declarative framework that handles animations for you and you're not really supposed to write CSS outside of motion components. However, once you get particular about the type of animation you want to see, it tends to rely more on CSS and doesn't feel that declarative anymore (even though you can get a lot of mileage out of easing functions and stuff).

Another instance of CSS not meshing as nicely as I'd liked was was when I when I tried to create reusable components. I had to be careful of adding default margins because then it could look out of place depending on where I put it. My options for adding margins kind of sucked. I could've bloated my JSX with Spacer components (un-semantic divs), or I could've selected the underlying HTML element of that react component via "first-child" using css (which would break whenever I changed or moved it). The best option I found was to pass in additional style props which seemed overkill sometimes.

### A wireframe AND a prototype is probably a good idea

I put a lot of grey boxes in my mockups and ignored a lot of detail (including the modals) in the short term mostly because I didn't fully understand Sergei's contract and decided to figure it out as I went a long. The result is I think it made my pledge modal look a bit "tacked on" since it doesn't fit in with the other two (due to different space requirements). I also think I would've saved more time if I made a half-hazard guess at what stuff should look like.
