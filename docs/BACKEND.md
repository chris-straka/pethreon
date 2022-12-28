# Backend Notes

## Recurring payments

Implementing [recurring payments](https://ethereum.stackexchange.com/questions/49596) on Ethereum is not as easy as I thought it'd be. It's hard to create recurring payments because in Ethereum, only EOAs "Externally Owned Accounts" (humans) can create transactions. A CA "Contract Account" like Pethreon, can't create a transaction. In ethereum, a "transaction" is any action from an EOA that changes the state of the ethereum network. Sending ethereum from one person to another is the simplest form of transaction. The more complicated form of transaction is when an EOA sends a transaction to a CA. 

This means Pethreon can't create a transaction every period (day/week/month), only a human can create a transaction every period (day/week/month) which sort of defeats the whole point of using this application. [There's a couple ways people have gotten around this though](https://ethereum.stackexchange.com/questions/42). You can have an EOA create a single transaction, and then your Dapp (smart contract / CA) can evaluate that transaction "eagerly" or "lazily". Sergei solved this problem by evaluating that transaction lazily (and I take up after Sergei). So what happens is a contributor makes a donation, and in order for that creator to get their money, they themselves must create a transaction that triggers a withdraw function in my smart contract. This function then tallies up how much they're owed up until that point from all their contributors and then they cash out. If the creator doesn't know about the app or withdraw from it, they don't get paid.

If I wanted to handle things eagerly, I would need to use a decentralized service like [Ethereum Alarm Clock](https://www.ethereum-alarm-clock.com/) to pay EOAs (strangers) to make transactions for me to pay everyone out at the end of every period. The creator would no longer have to know about my app. I thought this would be too costly for people, and more difficult to implement.

You might ask yourself "why can't we just give the EVM a callback function that it runs on some kind of time interval?". It doesn't work because you can't have a function linger in the EVM for that long, it would eat up too many resources and cost too much gas. The EVM doesn't have anything like an "asynchronous callback" that you can call at a later point in time (as far as I'm aware).

### The DB is public in ethereum

I originally wanted creators to have their own unique landing page for a better UX. I was thinking creators could store links to pictures, youtube videos and other social media on the blockchain. Users could then fetch that data from the blockchain and have it show up in their browser. The reason why it has to be links is because pictures and videos are prohibitively expensive to store on the blockchain (which is why NFTs don't do this, they also store links). For perspective a [1KB image](https://lh6.googleusercontent.com/D_4dsybsvBPG-gxULIw24WJT_bEHIQGTsrkNWeicdz_IBdD9FQz1tHXw0jS8lrYGenxcGWcARWxa88P7kwc9tQYCHPGhaKTvGT3k-EMbZyUjR-Hz7LSreaMnVF8A6DWoOzJKA6U3) [costs ~$20 depending on the gas price](https://blog.chain.link/build-deploy-and-sell-your-own-dynamic-nft/). This is because that image has to be replicated on every ethereum node that exists out there. 

The weird thing about ethereum, is it's like you're giving people the key to your database (because it's all public and everyone can write to it). Creators could post links to offensive content and you wouldn't be able to filter that out in your smart contract. People could also impersonate other people wrongfully and claim donations on their behalf. There are ways around all of this that I'm still learning about. For example, in my frontend app I could filter all the bad stuff that I get back from the blockchain so that the use doesn't see it. 

Ultimately, I decided against giving creators their own profile page for my application. But maybe in the future I'll change my mind.

## Testing is essential for smart contracts

My smart contract is meant to hold other people's money, so the need for testing is far greater than any other app I've built thus far. The tests were also critical for understanding the contract at all, because it was all based around [unix time](https://en.wikipedia.org/wiki/Unix_time). I'm obviously not going to wait in real life for any of my contract functions to see if they're working correctly, so being able to manipulate unix time in my tests programmatically was crucially important.

## Payable() function

There are a couple [exceptions](https://ethereum.stackexchange.com/questions/63987), but a smart contract MUST have a payable() function in order for it to hold Ether. User's can then call that payable function to deposit ether in the smart contract. 

## Fallback() function 

If you send ether to a smart contract via a transaction that has NO input data (i.e. a transaction that doesn't call anything) OR you call a function on a smart contract that doesn't exist, it's going to call that contract's "fallback function". This function can take many forms depending on what version of solidity the smart contract developer used.

```solidity
// BEFORE v0.6.0
contract foo {
  // You can only have ONE of the following, 
  // They each run 2300 gas worth of computation
  // They both often emit events

  // this runs and throws an exception (reverting the entire transaction)
  // use this if you don't want to deposit the sender's ether into the smart contract
  // if they send a transaction with no input data, or call a function that doesn't exist
  function() external {}         

  // runs, and then deposits all the ether into the smart contract
  // keep in mind, this is a fallback function (a special kind of payable function that has no name)
  function() external payable {}
}

// AFTER v0.6.0
contract foo {
  // You can have one OR both

  
  fallback() external {}         // same as before but receive() prevails
  fallback() external payable {} // same as before but receive() prevails

  // In most cases you should only implement the receive() function
  // It's called whenever there's no input data and it puts all the ether into the smart contract
  receive() external payable {}  
}
```

## How to send ether to someone else using the smart contract's balance

If you want the smart contract to send ether to someone else, then you need an EOA to send it a transaction and that transaction must have input data that calls a smart contract function which sends ether to someone else via the send(), transfer() or call() functions. These days however, [only call() is recommended](https://ethereum.stackexchange.com/questions/78124/). The address that you're sending money to must be marked "payable" in the smart contract code too via `payable(address)`. Every contract starts off at 0 balance, and your contract can see its own balance using `address(this).balance`. 

## Getting the return value of a payable function

When the user calls a payable function in a smart contract via a transaction, all you get back is the transaction result (its id).
You won't get the return value of the payable function. If you want to get something else back, you're going to have to emit an event
from the blockchain inside that payable function.

## EthersJS

In order to send a transaction to a smart contract with input data, you need to use a library like web3 or ethersJS. If a contract has a function that looks like `foo(a, b)` in solidity, you'll be able to call it in ethersJS via `contract.foo(a, b, {overrides})`. The overrides object will let you specify input data, like how much ether you're sending to execute that function with, or the amount of gas you want to use.

### Solidity Limitations

In solidity, you can't build a dynamic array in memory. Iteration can also get expensive, so you have to be careful. You can't iterate over maps, only arrays. According to this [post](https://ethereum.stackexchange.com/questions/39723), it looks like there's no way to test the existence of a map in solidity either. Sergei uses a separate boolean called "exists" to do this.

## Can the creator get locked out of their money?

After reading (and contributing to) [this answer on stack exchange](https://ethereum.stackexchange.com/questions/42207), it turns out there's a possibility that a user might not be able to call a function because it takes too much gas to run. I think in my case, this would only ever happen if the creator takes a really long time to withdraw their funds (i.e. the withdraw function had to iterate over so many periods that they couldn't withdraw). Or if a new contributor couldn't make a new pledge to a creator because they had to iterate over too many pledges that are already being made to that creator. You might be wondering why the contributor has to do this, and it's ultimately because of how I've chosen to architect the smart contract and keep track of all the creators pledges.

## The original Pethreon contract from Sergei et al doesn't work?

The original pethreon contract lets the developer choose what "period" payments should be processed in (daily, weekly or monthly). You do this by passing in the amount of seconds each period should last for in the smart contract's constructor function (hourly 3600, daily 86400, weekly 604800). The tricky part from the original contract is this part.

```cpp
  // update creator's mapping of future payments
  for (uint period = currentPeriod(); period < _periods; period++) {
    expectedPayments[_creator][period] += _weiPerPeriod;
  }
```

currentPeriod() grabs the current number of periods (hours/days/weeks) it's been since the contract was created and "_periods" refers to the number of periods a contributor wants to donate for. However, if the contract is 50 days old and the contributor wants to donate for 5 days, then how does this run? I think it should be `period < _periods + currentPeriod();` so it might be worth a pull request, either that or I've misunderstood. Also, It only hit me until late in the project, but I'm wondering if contributors even need to lock in their money at all? 

## Why I chose to work on top of Sergei et al's contract

I thought it would be a good idea to read and understand other people's code and thought that was an important skill. I also thought that would save me from having to learn too much about ethereum since the contract is already finished. I ended up learning a lot about solidity anyways.

## My additions to the original smart contract

I'm going to make it easier for contributors & creators to see the pledges they've made by showing their current pledges in the UI as well as extracting data in excel spreadsheets. 

## My alternate contract idea

I came up with a cool idea on the alternative_contract branch, but unfortunately it doesn't work. In my alternative smart contract, I needed to build a dynamic array in memory because that was the easiest way to return all the pledges to a user. But apparently it's [not allowed in Solidity](https://stackoverflow.com/questions/68010434). I could return a static array of pledges instead, and the user could keep calling that function with different pointers each time like a sliding window, but this would result in a lot more API calls to my node at infura. There might be another thing I'm missing that's painfully obvious that would have made it possible, but I couldn't figure it out. 