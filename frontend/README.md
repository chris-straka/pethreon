# Frontend

[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)

[React documentation](https://reactjs.org/)

There was an index.css and an app.css I deleted

```bash
yarn start # start a dev server on port 3000
yarn test  # run your tests (jest)
yarn build # build a production app
```

## Design Doc

- Landing page with CSS grid.
  - video on the right.
  - short description on the left.
  - animated Metamask logo with sign in button.

- Once signed-in, they will have a contributor portal and a creator portal.
  - There will be a button to switch between the two.
  - There will be a cookie remembering which portal the user last left off at.
  - Contributor portal will have ethereum address, balance, pledge stuff.
  - Creator portal will have withdraw, balance, pledge stuff.

### Icons

```tsx
<ion-icon name="heart-circle-outline"></ion-icon>
<ion-icon name="construct-outline"></ion-icon>
```

### Issues

- The user can't click the link to download metamask while metamask is talking

### TODO

- I should be able to interrupt the speak animation so he can say something else

- Setup authenticated routes and make sure they trigger the circle shift animation

### Notes

I want my circle animations to run infinitely, but do I really have to specify all eight properties in the css `animation: ;` shorthand for infinite playback? [>_<](https://youtu.be/AbnWq7F9o20?t=11)

There are [accessibility concerns](https://developer.mozilla.org/en-US/docs/Web/CSS/animation#accessibility_concerns) that I've never thought about before when it comes to animation that I should look into later. Strobe light was obvious but motion too?

I remember seeing rel="noreferrer noopener" in the wild, and wondered if rel="noreferrer" was sufficient? Looking at this [post](https://stackoverflow.com/questions/57628890), I should do some more research on window.opener.

I was wondering what color to use for my login button. [UX stack exchange](https://ux.stackexchange.com/questions/104224) says it should be my primary color, however this doesn't look good to me because my primary color sometimes floats behind it. I'm also concerned about a11y here.

I was worried about using innerHTML to render the metamask message. But after reading [this](https://www.reddit.com/r/learnjavascript/comments/9502x5/is_innerhtml_still_considered_bad/), it seems like it's only a major issue when it's from other users?

I think I could've done the typewriter effect with CSS only, but it might be tricky because I've only seen this animate single lines (I think it animates using the width property?). I'm going to do something similar to [this](https://www.w3schools.com/howto/howto_js_typewriter.asp) instead in fear of animating the width on multiple lines and stuff moving around from my responsive layout.

It's not as easy as I thought to slowly print out a link char-by-char (either that or I'm dumb)? I can't print out the same link using my JS strat, it keeps printing the full HTML version of the anchortag. I might have to recreate the link 17 times, char-by-char until I can think of something better.

When the user clicks the button to sign into metamask, a modal (metamask's modal not mine) will pop up prompting them to login. If they close that modal, metamask will NOT error out. Instead, my code will behave as if the user is still logging in which is not great UX. It seems like a common issue (Aave and Uniswap are the same).

For my typewriter effect, I can't just loop through the entire string and do setTimeOut(3 secs) on each character, because then they'll ALL print at the same time 3 seconds later. So I have to do setTimeOut(3 secs * index) which gives all the chars their own unique timeOut(duration). I can't do `await new Promise(r => setTimeout(r, 2000))` because I can't use await inside useEffect(). This way works by putting a bunch of async functions on the callback queue, and then each of them one at a time. It can't start another one right away because of the await.
