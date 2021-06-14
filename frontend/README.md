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

### TODO

I should maybe change the metamask message depending on whether the user already has metamask installed or not.

### Notes

I want my circle animations to run infinitely, but do I really have to specify all eight properties in the `animation: ;` shorthand just for that? Isn't there a smaller shorthand? >_<

There are [accessibility concerns](https://developer.mozilla.org/en-US/docs/Web/CSS/animation#accessibility_concerns) that I've never thought about before when it comes to animation that I might have to look into later.

I might want my circles to move in a circular motion like [Zach Saucier's Codepen](https://codepen.io/ZachSaucier/pen/rsvgK). I could then limit the rotation to so it doesn't go off the screen. At the momemnt, scale() seems to be working fine for me so far though.

I remember seeing rel="noreferrer noopener" in the wild, and wondered if it was any different from rel="noreferrer"? This [post](https://stackoverflow.com/questions/57628890) shed some light on it. I'm not sure what window.opener is about (TODO) but I'm guessing I want it removed on firefox 33-35?

I was wondering what color to use for my login button. [UX stack exchange](https://ux.stackexchange.com/questions/104224) says it should be my primary color, however this doesn't look good to me because I already have my primary color floating around behind it. I think I need something with stronger contrast for a11y reasons.

I was worried about using innerHTML to render the metamask message. But after reading [this](https://www.reddit.com/r/learnjavascript/comments/9502x5/is_innerhtml_still_considered_bad/), it seems fine.

I think I could've done the typewriter effect with CSS only, but it might be tricky because I've only seen this done with one liners (I think it animates using the width property?). I'm going to do something similar to [this](https://www.w3schools.com/howto/howto_js_typewriter.asp).

It's not as easy as I thought to slowly print out a link char-by-char (either that or I'm dumb)? I can't use the same link and slowly print it out, I have to create 17 links I think lol.

It's tough to figure out where I want to put stuff. When I switch routes, the only thing I want to stay on the screen are the circles.

A provider represents a connection to the Ethereum blockchain.
