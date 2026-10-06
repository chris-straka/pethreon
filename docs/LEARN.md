# Learning from Pethreon

## 1. The problem

Subscriptions (Patreon, Substack, SaaS billing) are recurring payments: money
moves every period with no action from the payer. On Ethereum that is
surprisingly hard. A contract can't wake itself up, because only externally
owned accounts (people) start transactions. So "pay this creator 1 wei per day
for a year" can't be a cron job.

Pethreon turns the problem around. The contributor pays the whole pledge up
front into escrow. The contract records *how much vests per period*, and the
creator **pulls** whatever has vested whenever they choose. The interesting
engineering is in the bookkeeping. Each withdrawal has to stay cheap no matter
how long the creator waits or how long a pledge lasts, and a cancellation has
to split vested and unvested funds exactly. Streaming-payment protocols such as
Sablier and Superfluid, payroll vesting contracts, and staking reward
distributors all solve versions of this.

The contract is adapted from Sergei Tikhomirov's Pethreon and extended here.
It is unaudited and testnet-only.

## 2. Concepts you need

**Periods from block time.** `currentPeriod()` is `(block.timestamp -
startOfEpoch) / period` (`contracts/Pethreon.sol:76`). Both inputs are
`immutable`, so the call doesn't read storage. A pledge created in period `p`
for `n` periods vests once at the end of each period `p … p+n-1`.

**Pull payments and checks-effects-interactions.** Nothing is ever pushed to a
creator. `creatorWithdraw` (`Pethreon.sol:137`) settles, zeroes
`accruedPayments`, and only *then* calls out to send ether.
`contributorWithdraw` (`Pethreon.sol:159`) debits before sending in the same
way. If the recipient re-enters, it finds its balance already gone.

**Checkpoint/accumulator accounting.** The original contract wrote one storage
slot per future period at pledge time and summed them at withdrawal. That made
gas O(pledge length) and O(time idle). Now each creator has a checkpoint
`lastWithdrawalPeriod`, a settled-but-unpaid `accruedPayments`, and a list of
active pledges (`Pethreon.sol:72`). `_settleCreator` (`Pethreon.sol:105`) adds
`weiPerPeriod × (min(expiry, now) − checkpoint)` for every active pledge,
retires matured pledges exactly once, and advances the checkpoint.
`getCreatorBalanceInWei` (`Pethreon.sol:81`) does the same calculation as a
read-only `view`.

**Settle before you mutate.** `createPledge` (`Pethreon.sol:201`) and
`cancelPledge` (`Pethreon.sol:272`) both call `_settleCreator` *before* they
change the creator's pledge set. Otherwise the new pledge would be credited for
periods before it existed, or a cancelled pledge would lose periods it had
already earned. This is the same invariant as `updateReward()` modifiers in
staking contracts.

**Swap-and-pop deletion.** Removing from a Solidity storage array in O(1)
means swapping the last element into the gap and calling `pop()`
(`Pethreon.sol:315`). The original helpers popped even when nothing matched,
which destroyed unrelated pledges (known issue 1). Both helpers now return a
`found` flag.

**Never trust the client.** The React app validates pledge inputs, but any
account can call the contract directly. `createPledge` now rejects the zero
address, self-pledges, zero amounts and zero-length pledges
(`Pethreon.sol:207`).

**Testing time-dependent code.** The tests move the chain clock with
`evm_increaseTime` + `evm_mine` (`test/pledge_creation.test.ts:47`), so
"wait five years" takes milliseconds. `test/pledge_withdrawal_bounds.test.ts`
asserts that gas after 5,000 idle periods stays within 3× the gas after 3.

**Typed contract bindings.** TypeChain generates `frontend/typechain-types`
from the ABI. One `PethreonProvider` (`frontend/src/hooks/PethreonProvider.tsx`)
builds the provider, signer and contract once, and the pages use them through
context. Each transaction's lifecycle is a `useReducer` state machine
(`frontend/src/reducers/UIReducer.ts`).

## 3. Reading order

1. `contracts/Pethreon.sol:1-80`: events, the `Pledge` struct, storage layout.
2. `deposit` / `contributorWithdraw`: the simplest money flow.
3. `createPledge`, then `_settleCreator`, then `getCreatorBalanceInWei`.
4. `cancelPledge` and the two `deletePledgeFor*` helpers.
5. `docs/KNOWN_ISSUES.md`: each defect, with its fix and its test.
6. Tests in this order: `transfer`, `pledge_creation`, `pledge_cancellation`,
   `pledge_cancellation_guards`, `pledge_withdrawal_bounds`,
   `pledge_input_validation`.
7. `scripts/gas.ts`: how the README's gas table is produced.
8. Frontend: `frontend/src/hooks/PethreonProvider.tsx` →
   `frontend/src/pages/Contribute/Contribute.tsx` →
   `frontend/src/pages/Contribute/components/PledgeModal/PledgeModal.tsx` →
   `frontend/src/pages/Create/Create.tsx`.
9. `docs/BACKEND.md` and `docs/ALT_CONTRACT.md`: the design notes on
   lazy vs eager payouts.

## 4. Exercises

Run `npm install` once, then use `npm test` and `npm run gas`.

1. **Vesting arithmetic.** A contributor pledges 10 wei/period for 3 periods.
   After 1.5 periods, what does `getCreatorBalanceInWei` return for the creator?
   And after 7 periods?
   <details><summary>Answer</summary>10, then 30. Only *completed* periods vest
   (`currentPeriod()` rounds down), and vesting stops at `periodExpires`.</details>

2. **Cancel split.** Same pledge, cancelled at period 1. How much goes back to
   the contributor, and how much can the creator still withdraw?
   <details><summary>Answer</summary>The contributor gets 10 × (3 − 1) = 20 wei
   back. The creator keeps the 10 that vested in period 0, because `cancelPledge`
   settles before it drops the pledge.</details>

3. **Remove "settle first".** Comment out `_settleCreator(_creatorAddress)` in
   `cancelPledge`. Predict which test fails, then run `npm test`.
   <details><summary>Answer</summary>Only the late-cancel case in
   `pledge_withdrawal_bounds` fails. When the pledge is deleted before settling,
   the creator loses the periods it had already earned. `pledge_cancellation`
   still passes, because it cancels before any period has vested. That gap is
   worth closing with a test of your own.</details>

4. **Measure the old design.** Run `git worktree add /tmp/old bc1c0d9`, link
   `node_modules`, copy `scripts/gas.ts` in, and run it there. Fit a line to
   withdrawal gas vs idle periods. At what idle time does withdrawal stop fitting
   in a 30M-gas block with daily periods? With hourly ones?
   <details><summary>Answer</summary>About 2,735 gas per idle period, so about
   11,000 periods: roughly 30 years with daily periods, roughly 15 months with
   hourly ones. `createPledge` was the tighter limit at about 22,500 gas per
   pledged period, so no pledge could last more than about 1,300 periods.</details>

5. **Re-entrancy thought experiment.** Swap the order in `creatorWithdraw` so
   the `call` happens before `accruedPayments[msg.sender] = 0`. Write a creator
   contract whose `receive()` calls `creatorWithdraw` again. What happens?
   <details><summary>Answer</summary>Each nested call still sees the full
   `accruedPayments` and pays it out again until the contract runs out of ether.
   This is the classic DAO bug. Zeroing before the call (or adding a
   `nonReentrant` guard) stops it.</details>

6. **(Hard) Known issue 6.** Settling still costs about 5,400 gas per *active*
   pledge. Implement `settle(uint256 maxPledges)`, which processes at most
   `maxPledges` pledges and keeps a cursor. Which invariant gets harder, given
   that the checkpoint is a single number per creator?
   <details><summary>Answer</summary>A partial settle can't advance
   `lastWithdrawalPeriod`, because some pledges haven't been credited up to it
   yet. You need a checkpoint per pledge (credit each one from its own
   last-settled period), or you must only advance the shared checkpoint once
   the cursor wraps. Another option is to bucket rate changes by expiry period
   and sweep the buckets lazily, the way staking contracts track
   reward-per-token.</details>

## 5. Interview questions

1. **Why can't a contract pay subscribers automatically?** The EVM has no
   timers, and only EOAs start transactions. You either pay a keeper network to
   poke the contract (eager) or let the payee pull (lazy). Pethreon is lazy,
   which also means the creator pays the gas.

2. **How do you keep withdrawal gas bounded?** Never loop over time. Keep a
   checkpoint and an accumulator, and settle in O(state that changed) instead
   of O(time elapsed). Here that is O(active pledges). Removing that last
   dependence too needs per-pledge checkpoints or expiry buckets.

3. **What is checks-effects-interactions?** Validate, update your own state,
   and only then call external code. A re-entrant call then sees the updated
   state. `creatorWithdraw` zeroes `accruedPayments` before the `call`.

4. **Describe a bug you found in this contract.** `cancelPledge(address)`
   popped the last element of both pledge arrays even when the caller had no
   pledge to that creator. Anyone could destroy other contributors' pledge
   records and strand escrowed ether. I proved it with a test, added a `found`
   flag, popped only on a match, and added `require(found)`.

5. **Why use `immutable` for `period`?** The value is fixed at construction and
   stored in the bytecode, so reading it is a cheap code read instead of a
   2,100-gas cold `SLOAD`. That saved about 3,500 gas per withdrawal here.

6. **How do you test code that depends on time?** Control the clock. Hardhat's
   `evm_increaseTime` and `evm_mine` move block time forward, so tests can cover
   period boundaries and years of idle time in milliseconds.

7. **What would you need before putting real money in this?** An external
   audit, a fix for the active-pledge DoS (known issue 6), a minimum pledge
   size, fuzz and invariant tests (for example, total escrow equals contributor
   balances plus unvested pledges plus accrued payments), and probably
   OpenZeppelin's `ReentrancyGuard`.

## 6. Connections

- **stable-rail** and **chain-index** bring on-chain money into the fintech
  thread. Pethreon is the "write a contract" side of the same world. Compare
  pull-based settlement here with the push-based payout rails there.
- **Ledger** (Java) uses double-entry accounting. The invariant in question 7
  is a ledger invariant written for a contract.
- **tiny-evm** implements the machine this contract runs on. Read its
  `SLOAD`/`SSTORE` gas rules to see where the numbers in the README come from.
- **durable** (workflow engine) is the off-chain answer to "run this every
  period". It is exactly the scheduler the EVM lacks.
