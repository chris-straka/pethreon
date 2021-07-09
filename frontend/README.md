# Frontend

[This App](https://github.com/Chris56974/Pethreon)

[Create React App Docs](https://facebook.github.io/create-react-app/docs/getting-started)

[React Docs](https://reactjs.org/)

```bash
yarn start # localhost:3000
yarn test  # run tests (jest)
yarn build  
```

## Icons

```tsx
<ion-icon name="heart-circle-outline"></ion-icon>
<ion-icon name="construct-outline"></ion-icon>
```

### Cool Ideas

My metamask text animation is set to overflow: auto; so the user can scroll through the text if it gets too long (previously it just wrote over my login button). However, there's no indication on screen telling the user that they can scroll the text. I think I have to trigger a second animation letting them know whether or not they can [scroll](https://stackoverflow.com/questions/9333379). I haven't decided how I want it to look like yet but it'd go something like this.

```tsx
75 * message.length + 1 // to run the animation at the end of the typing
const isOverflown = (clientHeight, scrollHeight) => {
  return scrollHeight > clientHeight // 
}
```

### Notes

I want my circle animations to run infinitely, but do I really have to specify all eight properties in the css `animation: ;` shorthand for infinite playback? [>_<](https://youtu.be/AbnWq7F9o20?t=11)

There are [accessibility concerns](https://developer.mozilla.org/en-US/docs/Web/CSS/animation#accessibility_concerns) that I've never thought about before when it comes to animation that I should look into later. Strobe light effects was obvious but motion too?

I remember seeing rel="noreferrer noopener" in the wild, and wondered if rel="noreferrer" was sufficient? Looking at this [post](https://stackoverflow.com/questions/57628890), I realize I should look into window.opener.

I was wondering what color to use for my login button. [UX stack exchange](https://ux.stackexchange.com/questions/104224) says it should be my primary color, however this doesn't look good to me because my circles are also my primary color, and they float behind the login button occasionally.

I was worried about using innerHTML to render the metamask message. But after reading [this](https://www.reddit.com/r/learnjavascript/comments/9502x5/is_innerhtml_still_considered_bad/), it seems like it's only a major issue when it's innerHTML inserted from other users.

I think I could've done the typewriter effect using CSS only, but it might be tricky because I've only seen this done with single lines of text (I think it animates the width property?). I'm going to do something similar to [this](https://www.w3schools.com/howto/howto_js_typewriter.asp) instead, because I'm worried that the CSS animation might have me animating the width on multiple lines which gets weird with my responsive layout.

It's not as easy as I thought to slowly print out a hyperlink char-by-char (either that or I'm dumb)? When I try to print out the same link, I accidentally print out all the HTML markup for it. So my current implementation recreates the link 17 times, char-by-char. I might have to look into a better way later.

For my typewriter effect, I can't just loop through the entire string and do setTimeOut(3 secs) on each character, because then they'll ALL print at the same time 3 seconds later. So I have to do setTimeOut(3 secs * index) which gives each char its own unique timeOut(duration). I can't do `await new Promise(r => setTimeout(r, 2000))` because I need to run my sideEffect in useEffect() which can't be asynchronous.

Right now when the user clicks login and signs into their crypto wallet, metamask brings up a "sign-in" modal (that is under the control of metamask and not me) prompting them to login. If the user closes that modal, metamask will NOT error out. Instead, my application will behave as if the user is still logging in which is not a great UX. It seems like Aave and Uniswap do the same thing.

The contributor can deposit, withdrawal, view their balance, create a pledge, view an existing pledge and cancel a pledge.
