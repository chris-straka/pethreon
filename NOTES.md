# Notes

## Passing ether around

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