# Pethreon — bullet library entry

Paste the block below into the `projects:` list in the master bullet library.

Facts behind the numbers: 272-line Solidity contract, 27 React components,
10 contract tests, 62 frontend tests, 429 commits from Mar 2021 to May 2024.

```yaml
  - id: pethreon
    name: "Pethreon — Decentralized Recurring Payments"
    context: "Personal Project"
    stack: "Solidity, Hardhat, React, TypeScript, ethers.js"
    bullets:
      # working set
      - id: build
        track: both
        text: "Built and deployed a decentralized recurring-payment dapp to Ethereum, owning the Solidity contract, test suite, design, and React frontend."
      - id: escrow
        track: both
        text: "Designed a period-based escrow contract in Solidity that prepays a pledge and releases it across N daily periods, refunding the remainder on cancellation."
      - id: pull-payments
        track: both
        text: "Inverted subscriptions into a pull model to work around the absence of scheduled execution on-chain, recording per-period entitlements at pledge time."
      - id: contract-tests
        track: swe
        text: "Wrote Hardhat and Chai tests for pledge creation, cancellation refunds, and payout accounting, advancing the EVM clock to assert behavior across period boundaries."
      - id: frontend-tests
        track: swe
        text: "Built a 62-test Vitest and Testing Library suite covering routing, modal keyboard behavior, and transaction success and rejection paths."
      - id: animation
        track: swe
        text: "Implemented route-driven page transitions in Motion where shared background elements morph between layouts on navigation."
      - id: design-system
        track: both
        text: "Built a responsive design system with a fluid clamp() type scale, light and dark theming via CSS custom properties, and CSS Grid layouts."

      # pool
      - id: reentrancy
        track: swe
        text: "Applied checks-effects-interactions throughout the contract, debiting balances before external transfers to close reentrancy paths on withdrawal."
      - id: async-state
        track: swe
        text: "Modeled transaction lifecycles as useReducer state machines so a slow confirmation or rejected wallet prompt cannot wedge the interface."
      - id: typechain
        track: swe
        text: "Generated TypeScript bindings from the compiled contract ABI with TypeChain, giving the frontend compile-time checking against the deployed interface."
      - id: wallet
        track: both
        text: "Integrated browser wallet connection through Web3-Onboard and ethers.js, sharing a single provider and signer across the app via React context."
      - id: onchain-tradeoffs
        track: csa
        text: "Documented why gas costs, contract immutability, and the lack of on-chain scheduling ruled out a conventional subscription design."
      - id: figma
        track: csa
        text: "Translated Figma prototypes into a working interface and documented where the mockups under-specified modal, loading, and error states."

      # 2026 modernization pass
      - id: audit
        track: csa
        text: "Audited a three-year-dormant codebase and produced a prioritized findings document separating confirmed defects from stylistic debt."
      - id: security-finding
        track: csa
        text: "Found an unauthenticated state-corruption defect in the contract's cancellation path, proved it with a targeted test, and specified the fix."
      - id: dep-modernization
        track: swe
        text: "Upgraded the frontend across five majors — React 19, Vite 8, React Router 7, Vitest 5, Motion 13 — writing the regression suite first."
      - id: sass-removal
        track: swe
        text: "Removed the Sass dependency by porting 24 stylesheets to native CSS nesting, verifying equivalence by diffing the compiled output."
      - id: toolchain-repair
        track: swe
        text: "Repaired a toolchain that no longer installed or ran, resolving an ESLint peer conflict, migrating to flat config, and restoring a broken contract test suite."
      - id: latent-bugs
        track: swe
        text: "Fixed latent defects including a reducer that left the loading spinner stuck on error and a discarded validation result that let invalid input reach the contract."

      # sharper variants
      - id: build-alt
        track: both
        text: "Built a Patreon-style payment protocol on Ethereum across 429 commits: a 272-line Solidity contract, 10 contract tests, and a 27-component React frontend."
      - id: escrow-alt
        track: swe
        text: "Implemented pledge escrow as a per-period entitlement ledger, so cancellation reverses only unelapsed periods without iterating payment history."
      - id: frontend-tests-alt
        track: swe
        text: "Wrote a Vitest and jsdom regression suite as the precondition for a five-major dependency upgrade, catching an unmount crash in the animation code."

      # TODO — NOT TRUE YET. Never select these.
      - id: mainnet
        track: both
        text: "TODO: Deployed the contract to Ethereum mainnet (Sepolia testnet only)."
      - id: audit-external
        track: csa
        text: "TODO: Completed a third-party security audit of the smart contract (unaudited)."
      - id: cancel-fix
        track: swe
        text: "TODO: Fixed the cancelPledge state-corruption defect by requiring a matched pledge before popping the array (found and documented, not patched)."
      - id: constant-time-withdrawal
        track: swe
        text: "TODO: Replaced the unbounded withdrawal loop with an O(1) checkpoint accumulator, removing the gas ceiling that can strand a creator's funds."
      - id: ci
        track: both
        text: "TODO: Added GitHub Actions CI running contract tests, lint, typecheck, and build (no CI configured)."
      - id: gas-benchmarks
        track: swe
        text: "TODO: Benchmarked gas per operation and the pledge duration at which withdrawal exceeds the block gas limit (fill in measured numbers)."
```

## Selection notes

Four or five of these is plenty for one résumé. Default set: `build`, `escrow`,
`pull-payments`, `contract-tests`, `animation`.

**Non-crypto roles** — drop the chain-specific lines and lead with `animation`,
`design-system`, `async-state`, `frontend-tests`, `dep-modernization`. Call it a
React/TypeScript dapp; the frontend work stands on its own.

**CSA track** — `audit`, `security-finding`, `onchain-tradeoffs`, `figma`.

`security-finding` is the strongest line here and the best interview story:
finding a real defect in your own code, proving it, and specifying the fix.

## Never claim

- The contract is **adapted** from [Sergei Tikhomirov's Pethreon](https://github.com/s-tikhomirov/pethreon). Say "adapted and extended," never "authored."
- It is **unaudited and testnet-only**. Never call it production or say it handles real funds.
- Live defects are in `docs/KNOWN_ISSUES.md` — read before an interview.
