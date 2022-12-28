# Issues

I should list these in github because they're current issues with the project, but I'm putting them here for now

### A11y

A11y is broken on my contributor page and my creator page. CircleC should be the first element to receive focus, but it keeps skipping over it and jumping to the actionBar. I tried fixing this by setting a different tabIndex but it still didn't work for me. Clicking somewhere on the page resets it to the proper order. I think this is because of how I set up my circles, but I really don't know why it's doing that. 

Another a11y problem, is that I think my application is going to be impossible for screen reader users to understand. It's a UX that assumes a lot of stuff on the user's behalf and doesn't really explain itself. 

### Metamask Problems

These issues may have likely been resolved by now and this info is probably outdated.

When the user clicks the login button, metamask prompts them with a "sign-in" modal that I can't control. If the user closes it without signing in, metamask will NOT error out. Instead, my code behaves as if the user is STILL logging in which is not a great UX. It looks like other popular sites like Aave and Uniswap have the same problem. This problem has likely been fixed since then. 

When metamask throws an error, it's tricky to find the message. Sometimes its error.message, and other times its error.data.message.