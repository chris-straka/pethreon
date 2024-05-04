# Frontend Notes

These notes list _some_ of the many lessons I took away from building this project. I trimmed it down because I spend to much time editing it (I change it every time I look at it) and I don't want to spend any more time on it. But you're free to checkout my git history if you want to read more.

## Figma

### A good wireframe AND a good prototype is a good idea

[The final design mockups](https://www.figma.com/file/dwPfF2lhw84J4PZdZTIQvL/Pethreon?node-id=0%3A1) I made ignore a lot of detail. They don't include any modals and there are grey boxes everywhere. I ended up doing a lot more refactoring in development, and my modals don't look like they fit the application. It was an important lesson in building better drafts.

### I should view my designs in fullscreen more

When I worked in Figma, I didn't blowup any of my designs to fullscreen. So I only saw what my design looked like when it was the size of a letter envelope or a business card. I think that had a big effect on the final design for my website.

### I should use more colors, and I should be more aware of how to use them

I picked a color palette that I thought looked good, but it ended up not being enough once I started to use it in a variety of different ways. In my app, I end up switching the primary color for the secondary color to reflect a major shift in the UX (moving from the contributor portal to the creator portal). But when I saw it blown up in fullscreen, it didn't look as good as I thought it did in my design. It went from giant dark blue circles with light pink dots, to giant light pink dots with small dark blue circles. The pink was too light and the dark blue didn't look as great so I had to tweak a bit. The colors didn't look good when the circles overlapped either, which would ocassionally happen when the circles grew and moved around. The font colors also had to be different depending on how thin the font was. The thinner the font, the more dark the color had to be. I also needed more colors than I thought, and I also needed an entirely new color palette for my dark theme.

## React

### Components

Components made my code much more readable even if I NEVER reused them (the declarative style is nice). I'm still figuring out how to make some components reusable, and at the same time tailor them to my specific needs. I've experimented with things like spacer components, styles as props, and stuff like that.

### I fought the scrollbar and the scrollbar won

Originally, I didn't want the user to scroll on my app because I wanted a "native-app" single screen feel. I also positioned my circles relative to the screen and wasn't sure how I would position them if the user could scroll. I also used pixels for all my font sizes instead of REM to prevent scrolling as well. However, it ended up being too difficult for me because my TypewriterEffect created dynamic text that wrapped in unpredictable ways. Finding the font size for every possible screen without it looking too big on some and too small on others was also tricky. The media queries were too high maintenance so I gave up and allowed the user to scroll. It ended up not being such a big deal.

### Typewriter Issues

In hindsight, forcing the user to wait on a typewriter effect for the info they need (errors, instructions) seems like a really bad UX.
Having the metamask logo talk, the typewriter effect go off and the video play all at the same time seems ridiculous as well.
Printing a hyperlink char-by-char in a typewriter effect was also strange to implement, because the only way I could figure this out is by recreating the same link multiple times (once for every character) instead of using the same link and editing the text inside it. Any attempts to do the former would print the markup for the anchor tag as well.

## Tips

### CSS

Desktop-first is like writing CSS twice. You write complex CSS by default, and then you write CSS again to remove that complex CSS.
Mobile-first, is you write hardly any CSS for mobile screens because HTML is responsive by default, then you add complexity w/ @media.

CSS grid -> children live within the rigid grid that you create (top down enforcement)
Flexbox -> children keep their intrinsic sizing

Use min-height and max-height over height.
Use min-width and max-width over width.

[The login button should be primary color](https://ux.stackexchange.com/questions/104224)

[Certain animations can hurt a11y](https://developer.mozilla.org/en-US/docs/Web/CSS/animation#accessibility_concerns)

### Typography

[You can get fluid type scales from here](https://www.fluid-type-scale.com/)

[You have to use calc(vw + 1em) or clamp(vw + 1em)](https://www.youtube.com/watch?v=wARbgs5Fmuw) instead.

You can't zoom in/out on text that's been sized with viewport units (you need + 1 something)

### React

Child components don't rerender on new props. They only rerender when their state changes or the parent component changes.

### JS

innerHTML is (usually) only scary when it's in the user's hand, not yours

[window.opener() weirdness](https://stackoverflow.com/questions/57628890)

### Ethers

In ethers, to get a lower denomination you "parse" and to get a higher denomination you "format"