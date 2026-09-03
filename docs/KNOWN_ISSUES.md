# Known Issues

Found during a 2026 review. The contract is **unaudited and testnet-only** — these are
recorded so they aren't rediscovered, not because the deployed Sepolia instance matters.

---

## 1. `cancelPledge` corrupts unrelated pledges — CONFIRMED, HIGH

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

**Fix:** have the helpers return a "found" flag and `require` it, and only `pop()` on a
match:

```solidity
require(found, "No active pledge to that creator");
```

---

## 2. Unbounded loops make funds unwithdrawable — MEDIUM

`getCreatorBalanceInWei()` loops from the creator's last withdrawal period to the current
one, so gas grows linearly with elapsed time. A creator who doesn't withdraw for long
enough eventually can't: the loop exceeds the block gas limit and their funds are stuck.
`createPledge` has the same shape over `_periods` (capped only by a client-side check of
36,525 that anyone bypassing the UI can ignore).

**Fix:** replace the summation with a checkpoint/accumulator — store a running
`ratePerPeriod` and a `lastCheckpoint`, making withdrawal O(1).

---

## 3. `console.sol` ships in the deployed contract — LOW

`import "hardhat/console.sol";` is still at the top of `Pethreon.sol`. It inflates the
deployed bytecode and gas cost. Remove it before any real deployment.

---

## 4. Missing input validation — LOW

`createPledge` doesn't reject `_creatorAddress == address(0)`, `_creatorAddress ==
msg.sender`, `_weiPerPeriod == 0`, or `_periods == 0`. All validation currently lives in
the React frontend, which is not a trust boundary.

---

## 5. `period` and `startOfEpoch` should be `immutable` — LOW

Both are set once in the constructor and never change. Marking them `immutable` removes
a storage read from every call to `currentPeriod()`.
