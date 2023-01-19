# Alternative Contract

I tried to get fancy using this alternative contract but it didn't work

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "hardhat/console.sol";

contract Pethreon {
    event ContributorDeposited(
        uint256 period,
        address contributor,
        uint256 amount
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
        DOES_NOT_EXIST,
        ACTIVE,
        CANCELLED,
        EXPIRED
    }

    /***** DATA STRUCTURES *****/
    struct Pledge {
        uint256 weiPerPeriod;
        uint256 duration;
        uint256 dateCreated;
        uint256 periodExpires;
        Status status;
    }

    // (contributorAddress + creatorAddress) => Pledge
    mapping(bytes32 => Pledge) pledges;

    // contributorAddress => ...
    mapping(address => uint256) contributorBalances;
    mapping(address => address[]) peopleIDonatedTo;

    // creatorAddress => ...
    mapping(address => Pledge[]) expiredPledges;
    mapping(address => address[]) peopleWhoDonatedToMe;
    mapping(address => uint256) lastWithdrawalPeriod;
    mapping(address => mapping(uint256 => uint256)) expectedPayments; // creatorAddress => (periodNumber => payment)

    function currentPeriod() public view returns (uint256 periodNumber) {
        // it rounds DOWN 9 / 10 -> 0!
        return (block.timestamp - startOfEpoch) / period; // how many periods (days) has it been since the beginning?
    }

    function getCreatorBalance() public view returns (uint256) {
        uint256 amount = 0;
        for (
            uint256 _period = lastWithdrawalPeriod[msg.sender]; // when was the last time they withdrew?
            _period < currentPeriod(); // keep going until you reach the currentPeriod
            _period++
        ) {
            amount += expectedPayments[msg.sender][_period]; // add up all the payments from every period since their lastWithdrawal
        }
        return amount;
    }

    function creatorWithdraw() public returns (uint256 newBalance) {
        uint256 amount = getCreatorBalance(); // add up all their pledges SINCE their last withdrawal period
        lastWithdrawalPeriod[msg.sender] = currentPeriod(); // set a new withdrawal period (re-entrancy)
        require(amount > 0, "Nothing to withdraw");
        (bool success, ) = payable(msg.sender).call{value: amount}(""); // send them money
        require(success, "withdrawal failed");
        emit CreatorWithdrew(currentPeriod(), msg.sender, amount);
        return amount;
    }

    function deposit() public payable returns (uint256 newBalance) {
        require(msg.value > 0, "Can't deposit 0");
        contributorBalances[msg.sender] += msg.value;
        emit ContributorDeposited(currentPeriod(), msg.sender, msg.value);
        return contributorBalances[msg.sender];
    }

    function getContributorBalance() public view returns (uint256) {
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

    function getPledgesForContributor()
        public
        pure
        returns (uint[] memory allPledges)
    {
        uint[] memory _pledges;
        _pledges[0] = 111111111;
        _pledges[1] = 222222222;

        return _pledges;
    }

    function getPledgesForCreator(bool grabExpiredPledgesToo)
        public
        view
        returns (Pledge[] memory allPledges)
    {
        address[] memory people = peopleWhoDonatedToMe[msg.sender];
        Pledge[] memory _pledges;

        // Grab all active pledges...
        for (uint256 i = 0; i < people.length; i++) {
            _pledges[i] = pledges[keccak256(abi.encode(msg.sender, people[i]))];
        }

        if (grabExpiredPledgesToo) {
            Pledge[] storage _expiredPledges = expiredPledges[msg.sender];
            for (uint256 i = _pledges.length; i < _expiredPledges.length; i++) {
                _pledges[i] = pledges[
                    keccak256(abi.encode(msg.sender, people[i]))
                ];
            }
        }

        return _pledges;
    }

    function getExpiredPledges()
        public
        view
        returns (Pledge[] memory allPledges)
    {
        return creatorExpiredPledges[msg.sender];
    }

    // This isn't going to scale well if the creator has a lot of people pledging to them
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

        if (
            pledges[keccak256(abi.encode(msg.sender, _creatorAddress))]
                .status == Status.DOES_NOT_EXIST
        ) {
            peopleIDonatedTo[msg.sender].push(_creatorAddress);
            peopleWhoDonatedToMe[_creatorAddress].push(msg.sender);
        } else {
            Pledge memory pledge = pledges[
                keccak256(abi.encode(msg.sender, _creatorAddress))
            ];
            require(
                currentPeriod() >= pledge.periodExpires,
                "You're only allowed to have one active Pledge at a time, cancel your existing pledge first or wait until it expires"
            );
            Pledge memory expiredPledge = pledge;
            expiredPledge.status = Status.EXPIRED;
            expiredPledges[_creatorAddress].push(expiredPledge);
            delete pledges[keccak256(abi.encode(msg.sender, _creatorAddress))];
        }

        // I pulled this out here because I was worried the currentPeriod might change while it's looping possibly?
        uint256 _currentPeriod = currentPeriod();

        // Update the CREATOR'S list of future payments
        for (
            uint256 _period = _currentPeriod;
            _period < (_currentPeriod + _periods);
            _period++
        ) {
            expectedPayments[_creatorAddress][_period] += _weiPerPeriod;
        }

        Pledge memory newPledge = Pledge({
            weiPerPeriod: _weiPerPeriod,
            duration: _periods,
            dateCreated: block.timestamp,
            periodExpires: currentPeriod() + _periods,
            status: Status.ACTIVE
        });

        pledges[keccak256(abi.encode(msg.sender, _creatorAddress))] = newPledge;

        emit PledgeCreated(
            currentPeriod(),
            _creatorAddress,
            msg.sender,
            _weiPerPeriod,
            _periods
        );
    }

    function cancelPledge(address _creatorAddress) public {
        Pledge memory pledge = pledges[
            keccak256(abi.encode(msg.sender, _creatorAddress))
        ];
        delete pledges[keccak256(abi.encode(msg.sender, _creatorAddress))]; // prevent re-entrancy

        for (
            uint256 _period = currentPeriod(); // grab the current period
            _period < pledge.periodExpires; // grab the period when it's supposed to expire
            _period++ // keep going until we reached the period when it's supposed to expire
        ) {
            expectedPayments[_creatorAddress][_period] -= pledge.weiPerPeriod;
        }

        pledge.periodExpires = currentPeriod();
        pledge.status = Status.CANCELLED;
        expiredPledges[_creatorAddress].push(pledge);

        contributorBalances[msg.sender] +=
            pledge.weiPerPeriod *
            (pledge.periodExpires - currentPeriod());

        emit PledgeCancelled(currentPeriod(), _creatorAddress, msg.sender);
    }
}
```