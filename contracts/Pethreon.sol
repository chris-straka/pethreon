// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.30;

contract Pethreon {
    event ContributorDeposited(
        uint256 indexed newBalance
    );
    event PledgeCreated(
        uint256 period,
        address creatorAddress,
        address contributor,
        uint256 weiPerPeriod,
        uint256 periods
    );
    event PledgeCancelled(
        uint256 period,
        address creatorAddress,
        address contributor
    );
    event ContributorWithdrew(
        uint256 period,
        address contributor,
        uint256 amount
    );
    event CreatorWithdrew(
        uint256 period,
        address creatorAddress,
        uint256 amount
    );

    /***** CONSTANTS *****/
    uint256 period;
    uint256 public startOfEpoch;

    constructor(uint256 _period) {
        startOfEpoch = block.timestamp; // 1621619224... contract creation date in Unix Time
        period = _period; // hourly (3600), daily (86400), or weekly (604800)? (seconds)
    }

    enum Status {
        ACTIVE,
        CANCELLED,
        EXPIRED
    }

    /***** DATA STRUCTURES *****/
    struct Pledge {
        address creatorAddress;
        address contributorAddress;
        uint256 weiPerPeriod;
        uint256 duration;
        uint256 dateCreated;
        uint256 periodExpires;
        Status status;
    }

    mapping(address => uint256) contributorBalances;
    mapping(address => Pledge[]) contributorPledges;

    mapping(address => Pledge[]) creatorActivePledges;
    mapping(address => Pledge[]) creatorExpiredPledges;

    // Checkpoint/accumulator accounting. `lastWithdrawalPeriod` is the last
    // settled period, `ratePerPeriod` the wei vesting per period across the
    // creator's active pledges, and `accruedPayments` the settled-but-
    // unwithdrawn balance. Settling scales with the active-pledge count,
    // never with elapsed periods, so withdrawal gas stays bounded no matter
    // how long a creator goes without withdrawing.
    mapping(address => uint256) lastWithdrawalPeriod;
    mapping(address => uint256) ratePerPeriod;
    mapping(address => uint256) accruedPayments;

    function currentPeriod() public view returns (uint256 periodNumber) {
        // it rounds down i.e. 9 / 10 -> 0
        return (block.timestamp - startOfEpoch) / period; // how many periods (days) has it been since the beginning?
    }

    function getCreatorBalanceInWei() public view returns (uint256) {
        uint256 _currentPeriod = currentPeriod();
        uint256 _checkpoint = lastWithdrawalPeriod[msg.sender];
        uint256 amount = accruedPayments[msg.sender];
        if (_currentPeriod <= _checkpoint) {
            return amount;
        }
        // O(active pledges): each pledge vests only up to its expiry.
        Pledge[] storage pledges = creatorActivePledges[msg.sender];
        for (uint256 i = 0; i < pledges.length; i++) {
            uint256 _end = pledges[i].periodExpires < _currentPeriod
                ? pledges[i].periodExpires
                : _currentPeriod;
            if (_end > _checkpoint) {
                amount += pledges[i].weiPerPeriod * (_end - _checkpoint);
            }
        }
        return amount;
    }

    /// @dev Credits everything vested up to `currentPeriod()` into
    /// `accruedPayments`, retires matured pledges from the active list (each
    /// pledge is moved at most once), and advances the checkpoint. Cost
    /// scales with the creator's active-pledge count, never with elapsed time.
    function _settleCreator(address _creatorAddress) internal {
        uint256 _currentPeriod = currentPeriod();
        uint256 _checkpoint = lastWithdrawalPeriod[_creatorAddress];
        if (_currentPeriod <= _checkpoint) {
            return;
        }
        Pledge[] storage pledges = creatorActivePledges[_creatorAddress];
        uint256 _accrued = accruedPayments[_creatorAddress];
        uint256 _rate = ratePerPeriod[_creatorAddress];
        uint256 i = 0;
        while (i < pledges.length) {
            uint256 _end = pledges[i].periodExpires < _currentPeriod
                ? pledges[i].periodExpires
                : _currentPeriod;
            if (_end > _checkpoint) {
                _accrued += pledges[i].weiPerPeriod * (_end - _checkpoint);
            }
            if (pledges[i].periodExpires <= _currentPeriod) {
                _rate -= pledges[i].weiPerPeriod;
                pledges[i].status = Status.EXPIRED;
                creatorExpiredPledges[_creatorAddress].push(pledges[i]);
                pledges[i] = pledges[pledges.length - 1];
                pledges.pop();
            } else {
                i++;
            }
        }
        accruedPayments[_creatorAddress] = _accrued;
        ratePerPeriod[_creatorAddress] = _rate;
        lastWithdrawalPeriod[_creatorAddress] = _currentPeriod;
    }

    function creatorWithdraw() public returns (uint256 newBalance) {
        _settleCreator(msg.sender); // credit everything vested so far; state is updated before the call below
        uint256 amount = accruedPayments[msg.sender];
        require(amount > 0, "Nothing to withdraw");
        accruedPayments[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: amount}(""); // send them money
        require(success, "withdrawal failed");
        emit CreatorWithdrew(currentPeriod(), msg.sender, amount);
        return amount;
    }

    function deposit() public payable returns (uint256 newBalance) {
        require(msg.value > 0, "Can't deposit 0");
        contributorBalances[msg.sender] += msg.value;
        emit ContributorDeposited(contributorBalances[msg.sender]);
        return contributorBalances[msg.sender];
    }

    function getContributorBalanceInWei() public view returns (uint256) {
        return contributorBalances[msg.sender];
    }

    function contributorWithdraw(uint256 amount)
        public
        returns (uint256 newBalance)
    {
        require(
            amount <= contributorBalances[msg.sender],
            "Insufficient funds"
        );
        contributorBalances[msg.sender] -= amount; // subtract their balance first to prevent re-entrancy
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Withdrawal failed");
        emit ContributorWithdrew(currentPeriod(), msg.sender, amount);
        return contributorBalances[msg.sender];
    }

    function getContributorPledges()
        public
        view
        returns (Pledge[] memory allPledges)
    {
        return contributorPledges[msg.sender];
    }

    function getCreatorPledges()
        public
        view
        returns (Pledge[] memory allPledges)
    {
        return creatorActivePledges[msg.sender];
    }

    function getExpiredPledges()
        public
        view
        returns (Pledge[] memory allPledges)
    {
        return creatorExpiredPledges[msg.sender];
    }

    // Creator accounting is O(1) in elapsed time via the checkpoint/accumulator
    // (_settleCreator + ratePerPeriod); only the per-contributor duplicate
    // check below scales with that contributor's own pledge count.
    function createPledge(
        address _creatorAddress,
        uint256 _weiPerPeriod,
        uint256 _periods
    ) public {
        require(
            contributorBalances[msg.sender] >= _weiPerPeriod * _periods,
            "Insufficient funds"
        );

        contributorBalances[msg.sender] -= _weiPerPeriod * _periods; // subtract first to prevent re-entrancy

        // Settle first: credit this creator's vested balance (including any
        // matured pledge being replaced below) and advance the checkpoint so
        // the new pledge starts exactly at it.
        _settleCreator(_creatorAddress);

        Pledge[] memory _contributorPledges = contributorPledges[msg.sender];

        for (uint256 i = 0; i < _contributorPledges.length; i++) {
            if (_contributorPledges[i].creatorAddress == _creatorAddress) {
                require(
                    currentPeriod() >= _contributorPledges[i].periodExpires,
                    "You're only allowed to have one active pledge at at time, cancel your existing one first or wait until it expires"
                );
                Pledge memory expiredPledge = _contributorPledges[i];
                expiredPledge.status = Status.EXPIRED;
                deletePledgeForContributor(_creatorAddress);
                (, bool creatorFound) = deletePledgeForCreator(_creatorAddress);
                // _settleCreator above already moved matured pledges to the
                // expired list; only push when the entry is still present.
                if (creatorFound) {
                    creatorExpiredPledges[_creatorAddress].push(expiredPledge);
                }
            }
        }

        uint256 _currentPeriod = currentPeriod();

        // O(1): credit the running rate instead of writing one slot per period.
        ratePerPeriod[_creatorAddress] += _weiPerPeriod;

        Pledge memory pledge = Pledge({
            creatorAddress: _creatorAddress,
            contributorAddress: msg.sender,
            weiPerPeriod: _weiPerPeriod,
            duration: _periods,
            dateCreated: block.timestamp,
            periodExpires: currentPeriod() + _periods,
            status: Status.ACTIVE
        });

        contributorPledges[msg.sender].push(pledge);
        creatorActivePledges[_creatorAddress].push(pledge);

        emit PledgeCreated(
            currentPeriod(),
            _creatorAddress,
            msg.sender,
            _weiPerPeriod,
            _periods
        );
    }

    // Cancellation settles via the checkpoint/accumulator: O(active pledges),
    // never O(remaining periods).
    function cancelPledge(address _creatorAddress) public {
        (Pledge memory pledge, bool found) = deletePledgeForContributor(
            _creatorAddress
        ); // (re-entrancy)

        // Without this the helper popped the array even when nothing matched,
        // destroying an unrelated pledge and stranding its escrowed funds.
        require(found, "No active pledge to that creator");

        uint256 _currentPeriod = currentPeriod();

        // Previously this reverted by arithmetic underflow further down.
        require(
            pledge.periodExpires > _currentPeriod,
            "That pledge has already expired"
        );

        // Settle vested amounts up to now (including this pledge's share),
        // then drop this pledge's rate. O(1) in elapsed time: no per-period
        // writes. The creator copy is still in the active list, so the
        // settle above credits exactly what it earned.
        _settleCreator(_creatorAddress);
        ratePerPeriod[_creatorAddress] -= pledge.weiPerPeriod;

        (Pledge memory cancelledPledge, bool creatorFound) = deletePledgeForCreator(
            _creatorAddress
        );
        require(creatorFound, "Pledge missing from the creator's list");

        cancelledPledge.periodExpires = _currentPeriod;
        cancelledPledge.status = Status.CANCELLED;

        creatorExpiredPledges[_creatorAddress].push(cancelledPledge);

        contributorBalances[msg.sender] +=
            pledge.weiPerPeriod *
            (pledge.periodExpires - _currentPeriod);

        emit PledgeCancelled(_currentPeriod, _creatorAddress, msg.sender);
    }

    /// @return pledge the removed pledge, zeroed when `found` is false
    /// @return found whether a pledge to `_creatorAddress` actually existed
    function deletePledgeForContributor(address _creatorAddress)
        internal
        returns (Pledge memory pledge, bool found)
    {
        Pledge[] storage pledges = contributorPledges[msg.sender];

        for (uint256 i = 0; i < pledges.length; i++) {
            if (pledges[i].creatorAddress == _creatorAddress) {
                pledge = pledges[i];
                pledges[i] = pledges[pledges.length - 1];
                pledges[pledges.length - 1] = pledge;
                found = true;
                break; // at most one active pledge per creator
            }
        }

        // Only pop on a match. Popping unconditionally removed whichever
        // pledge happened to be last.
        if (found) pledges.pop(); // early removal prevents re-entrancy
        return (pledge, found);
    }

    /// @return deletedPledge the removed pledge, zeroed when `found` is false
    /// @return found whether this contributor had a pledge to `_creatorAddress`
    function deletePledgeForCreator(address _creatorAddress)
        internal
        returns (Pledge memory deletedPledge, bool found)
    {
        Pledge[] storage pledges = creatorActivePledges[_creatorAddress];

        for (uint256 i = 0; i < pledges.length; i++) {
            if (pledges[i].contributorAddress == msg.sender) {
                deletedPledge = pledges[i];
                pledges[i] = pledges[pledges.length - 1];
                pledges[pledges.length - 1] = deletedPledge;
                found = true;
                break;
            }
        }

        if (found) pledges.pop();
        return (deletedPledge, found);
    }
}
