# Known Issues

Found during a 2026 review. The contract is **unaudited and testnet-only** — these are
recorded so they aren't rediscovered, not because the deployed Sepolia instance matters.

---

## 1. `cancelPledge` corrupts unrelated pledges — FIXED

`cancelPledge(address)` never checks that the caller actually has a pledge to that
creator. Both delete helpers call `pledges.pop()` **outside** the loop that searches for
a match, so when nothing matches they still remove the last element:

```solidity
for (uint256 i = 0; i < pledges.length; i++) {
    if (pledges[i].creatorAddress == _creatorAddress) { /* swap to end */ }
}
pledges.pop();   // <-- runs even when nothing matched
```

**Reproduction** (verified against `contracts/Pethreon.sol` at 0.8.30):

1. `victim` pledges to `creatorB`.
2. `attacker` pledges to `creatorA` only.
3. `attacker` calls `cancelPledge(creatorB)` — a creator they never pledged to.

Result, with **no revert**:

- the attacker's own unrelated pledge to `creatorA` is destroyed, while
  `expectedPayments[creatorA]` still holds the escrowed funds — the pledge can no longer
  be cancelled, so that ether is permanently unrecoverable;
- the victim's pledge is removed from `creatorB`'s active list, corrupting that creator's
  bookkeeping;
- a zeroed `Pledge` struct is pushed into `creatorExpiredPledges[creatorB]`.

It only escapes notice because two *other* conditions usually revert first: `.pop()` on
an empty array (panic `0x31`) when the creator has no pledges at all, and an arithmetic
underflow on `pledge.periodExpires - currentPeriod()` once `currentPeriod() > 0`. Neither
is a real guard — the corruption above happens within the first period after deployment.

**Fixed.** Both helpers now return a `found` flag, `pop()` only on a match, and
`cancelPledge` requires it:

```solidity
require(found, "No active pledge to that creator");
```

An already-expired pledge now reverts with an explicit
`"That pledge has already expired"` rather than by arithmetic underflow.
Covered by `test/pledge_cancellation_guards.test.ts`.

---

## 2. Unbounded loops make funds unwithdrawable — FIXED

`getCreatorBalanceInWei()` looped from the creator's last withdrawal period to the current
one, so gas grew linearly with elapsed time. A creator who didn't withdraw for long
enough eventually couldn't: the loop exceeded the block gas limit and their funds were stuck.
`createPledge`/`cancelPledge` had the same shape over per-period `expectedPayments` slots
(`_periods` capped only by a client-side check of 36,525 that anyone bypassing the UI
could ignore).

**Fixed.** Replaced the per-period slots with a checkpoint/accumulator: a running
`ratePerPeriod` plus `accruedPayments`, settled into by `_settleCreator()` against the
`lastWithdrawalPeriod` checkpoint. `createPledge`/`cancelPledge`/`creatorWithdraw` all
settle first and then adjust the rate in O(1); settling itself scans only the creator's
*active* pledges (each pledge is retired at most once, and every entry required a paid
transaction to create), so gas is bounded by pledge count and never by elapsed time.
`getCreatorBalanceInWei()` is the same computation as a view. The `expectedPayments`
mapping is gone. Covered by `test/pledge_withdrawal_bounds.test.ts`, which withdraws
after 5,000 elapsed periods for less than 3x the gas of a 3-period withdrawal, plus
partial-withdrawal and late-cancel exactness cases.

---

## 3. `console.sol` ships in the deployed contract — FIXED

**Fixed.** The import is gone; deployed bytecode dropped from 6,279 to 5,940 bytes.

---

## 4. Missing input validation — FIXED

`createPledge` didn't reject `_creatorAddress == address(0)`, `_creatorAddress ==
msg.sender`, `_weiPerPeriod == 0`, or `_periods == 0`. All validation lived in the React
frontend, which is not a trust boundary.

**Fixed.** `createPledge` now `require`s all four, and the constructor rejects a zero
period length (which would make `currentPeriod()` divide by zero). Covered by
`test/pledge_input_validation.test.ts`.

---

## 5. `period` and `startOfEpoch` should be `immutable` — FIXED

**Fixed.** Both are `immutable`, so `currentPeriod()` reads them from bytecode instead
of storage. Measured with `scripts/gas.ts`: about 3,500 gas less per `creatorWithdraw`
and 4,700 less per `createPledge`.

---

## 6. Settlement still scales with the number of active pledges — MEDIUM

Item 2 removed the dependence on elapsed time. `_settleCreator` still walks the
creator's *active* pledges: each one costs about 5,400 gas per withdrawal
(`scripts/gas.ts`: 68,052 gas with 1 pledge, 331,725 with 50). At a 30M block gas
limit, a creator with roughly 5,500 simultaneous active pledges could no longer
withdraw. The pledges don't have to come from real fans: an attacker could open
1-wei pledges from throwaway addresses. That costs the attacker about 366k gas per
pledge, so about 2 billion gas to lock one creator out. The attack is expensive
but possible.

**Fix options:** let a creator settle in bounded batches (a `settle(maxPledges)`
that keeps a cursor), or bucket rate changes by expiry period and sweep the
buckets lazily. Either way, set a minimum pledge size so spam costs real money.

