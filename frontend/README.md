# Frontend

[This App](https://github.com/Chris56974/Pethreon)

[Create React App Docs](https://facebook.github.io/create-react-app/docs/getting-started)

[React Docs](https://reactjs.org/)

```bash
yarn start # localhost:3000
yarn test  # run tests (jest)
yarn build  
```

## Cool Ideas

My metamask text animation is set to overflow: auto; so the user can scroll through the text if it gets too long (previously it just wrote over my login button). However, there's no indication on screen telling the user that they can scroll the text. I think I have to trigger a second animation letting them know whether or not they can [scroll](https://stackoverflow.com/questions/9333379). I haven't decided how I want it to look like yet but it'd go something like this.

```tsx
75 * message.length + 1 // to run the animation at the end of the typing
const isOverflown = (clientHeight, scrollHeight) => {
  return scrollHeight > clientHeight 
}
```

### TODO

My circles animate slowly but my content loads instantly. I need to use framer-motion or react-transition-group.

Keyboard navigation on my contributor/creator page is messed up. I tried changing the tabIndex but it didn't work.

My modal and circleB are not keyboard a11y

### Useful Links

- [Ethers.js Display Logic](https://docs.ethers.io/v5/api/utils/display-logic/#display-logic)
- [Ethers.js Conversion Logic](https://docs.ethers.io/v5/api/utils/display-logic/#unit-conversion)
- [cool styles](https://codepen.io/havardob/pen/dyYXBBr)

### Notes

I want my circle animations to run infinitely, but do I really have to specify eight properties in the css `animation: ;` just to get infinite playback? [>_<](https://youtu.be/AbnWq7F9o20?t=11)

There are [accessibility concerns](https://developer.mozilla.org/en-US/docs/Web/CSS/animation#accessibility_concerns) that I've never thought about before when it comes to animation that I should look into later. Strobe light effects was obvious but motion too?

I remember seeing rel="noreferrer noopener" in the wild, and wondered if rel="noreferrer" was sufficient? This [post](https://stackoverflow.com/questions/57628890) shed some light. TODO -> look into window.opener().

I was wondering what color to use for my login button. [UX stack exchange](https://ux.stackexchange.com/questions/104224) says it should be my primary color, however this doesn't look good because my circles are the same color, and they float behind the login button occasionally.

I was worried about using innerHTML to render the metamask message for XSS. But after reading [this](https://www.reddit.com/r/learnjavascript/comments/9502x5/is_innerhtml_still_considered_bad/), it seems like it's only a major issue when it's innerHTML coming from other users.

I probably could've done the typewriter effect with CSS only, but I think it could get tricky because I've only seen this done with single lines of text. I think they do this by animating the width property, which might get ugly with multiple lines of text. I'm going to do something similar to [this](https://www.w3schools.com/howto/howto_js_typewriter.asp) instead.

My typewriter effect was tricky. I couldn't loop through the entire string and do setTimeOut(3 secs) on each character, because then they'd ALL print at the same time 3 seconds later. I couldn't use `await new Promise(r => setTimeout(r, 2000))` because I couldn't run an asynchronous function inside useEffect() because it's expecting a cleanup function and not a promise (normally it would work though). So I ended up doing setTimeOut(3 secs * index) which gives each char its own unique timeOut(duration). Each character then runs a function that checks a boolean to see whether or not it should print.

It's not as easy as I thought to slowly print out a hyperlink char-by-char (either that or I'm dumb)? When I try to print out the same link, I accidentally print out all the HTML markup as well, which I don't want. So my current implementation recreates the link 17 times, char-by-char. I might have to look into a better way later.

When the user clicks login and signs into metamask a "sign-in" modal popups (its under the control of metamask, not me). If the user closes it without signing in, metamask will NOT error out. Instead, my code behaves as if the user is still logging in which is not great UX. It looks like other popular sites like Aave and Uniswap behave the same?

🙅 onClick={function(arg)} 🙅 -> onClick(() => function(arg))

[React.FC<>](https://github.com/typescript-cheatsheets/react#function-components) is discouraged.

If you want to pass useState down as a prop, you need to import Dispatch and SetStateAction from React and use that for its type `Dispatch<SetStateAction>`

In ethers, you get wei by parsing and you get greater than wei higher by formatting.

I was worried about the performance of my circle animations and found out that the opacity property slows down rendering by a [fair margin](https://stackoverflow.com/questions/38523826). I only used opacity to get the color I wanted, so I'm going to switch it to rgba instead.
