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

### Notes

I want my circle animations to run infinitely, but do I really have to specify all eight properties in the `animation: ;` shorthand for that? >_<

There are [accessibility concerns](https://developer.mozilla.org/en-US/docs/Web/CSS/animation#accessibility_concerns) that I've never thought about before when it comes to animation that I might have to look into.

I might want my circle animations to move like [Zach Saucier's](https://codepen.io/ZachSaucier/pen/rsvgK), and limit the rotation to 45 degress but the scale() seems to be working for me so far.

I remember seeing rel="noreferrer noopener" in the wild, and wondered if it was any different from rel="noreferrer"? This [post](https://stackoverflow.com/questions/57628890) shed some light on it. I'm not sure what window.opener is about (TODO) but I'm guessing I want it removed on firefox 33-35?
