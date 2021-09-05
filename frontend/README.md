# Frontend

[This App](https://github.com/Chris56974/Pethreon)

[Create React App Docs](https://facebook.github.io/create-react-app/docs/getting-started)

[React Docs](https://reactjs.org/)

```bash
yarn start # localhost:3000
yarn test  # run tests (jest)
yarn build  
```

### Frontend Blabbering (Notes)

I want my circle animations to run infinitely, but do I really have to specify eight properties in the css `animation: ;` just to get infinite playback? [>_<](https://youtu.be/AbnWq7F9o20?t=11)

There are [accessibility concerns](https://developer.mozilla.org/en-US/docs/Web/CSS/animation#accessibility_concerns) that I've never thought about before when it comes to animation that I should look into later. Strobe light effects was obvious but motion too?

I remember seeing rel="noreferrer noopener" in the wild, and wondered if rel="noreferrer" was sufficient? This [post](https://stackoverflow.com/questions/57628890) shed some light. TODO -> look into window.opener().

Some people recommend using the main tag on [every page](https://stackoverflow.com/questions/44308760). This probably doesn't apply to SPAs though I'm assuming? If I'm only serving one HTML page, there might be SEO issues if it sees "main" multiple times on the "same page".

I was wondering what color to use for my login button. [UX stack exchange](https://ux.stackexchange.com/questions/104224) says it should be my primary color, however this doesn't look good because my animated circles are the same color, and they float behind the login button occasionally. I'm wondering if I should use my secondary color or if it's "too pink" or if it should be the same color as my text.

I was worried about using innerHTML to render my metamask message because of XSS. But after reading [this](https://www.reddit.com/r/learnjavascript/comments/9502x5/is_innerhtml_still_considered_bad/), it seems like it's only a problem when _other_ users are inserting innerHTML and not the developer.

I probably could've done my typewriter effect (metamask message) with CSS only, but I think it could get tricky because I've only seen this done with people animating single lines of text. I think they do this by animating the width property? This could get ugly if I have multiple lines of text so I decided to do something similar to [this](https://www.w3schools.com/howto/howto_js_typewriter.asp) instead.

My typewriter effect was tricky. I couldn't loop through the entire string and do setTimeOut(3 secs) on each char, because then they'd ALL print at the same time 3 seconds later. I couldn't use `await new Promise(r => setTimeout(r, 2000))` either, because you can't run an asynchronous function inside useEffect() because it's expecting a cleanup function and not a promise. I found out later that people get around this by doing [this](https://stackoverflow.com/questions/53332321), but I ended up doing setTimeOut(3 secs * index) which gives each char its own unique timeOut(duration). Each char also checks a boolean to see whether or not it has been interrupted or not.

I also had issues printing a hyperlink char-by-char (either that or I'm dumb)? When I tried to do this initially, I accidentally printed out ALL the HTML markup as well `<a blah blah>download metamask<a>`, which I don't want. So my current implementation recreates the link 17 times, char-by-char. I might have to look into a better way later.

When the user clicks login and signs into metamask a "sign-in" modal popups (its under the control of metamask, not me). If the user closes it without signing in, metamask will NOT error out. Instead, my code behaves as if the user is still logging in which is not great UX. It looks like other popular sites like Aave and Uniswap behave the same?

🙅 onClick={function(arg)} 🙅 -> onClick(() => function(arg))

Turns out [React.FC<>](https://github.com/typescript-cheatsheets/react#function-components) is discouraged. It's better to use interfaces instead.

If you want to pass down useState's setState() handler as a prop in typescript, you need to import Dispatch and SetStateAction from React and use that for its type `Dispatch<SetStateAction>`

In ethers, you get wei by parsing and you get denominations greater than wei by formatting.

I was worried about the performance of my circle animations and found out that the opacity property slows down rendering by a [fair amount](https://stackoverflow.com/questions/38523826). I only used opacity to get the color I wanted, so I'm going to switch it to rgba instead.

I found out that window.alerts are very annoying for UX which is good to know. I'm going to use it for now so I don't have to make a third modal or a text-tooltip component

It's funny that Pledge is a verb and a noun and I've used both meanings when referencing stuff (Y I K E S).

I think the frontend is going to end up looking a lot better on mobile (because it was designed for mobile first), even though I'm not sure how smooth the metamask app experience is going to be.
