// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "hardhat/console.sol";

contract Pethreon {
    /***** EVENTS *****/
    event ContributorDeposited(
        uint256 period,
        address contributor,
        uint256 amount
    );
    event PledgeCreated(
        uint256 period,
        address creator,
        address contributor,
        uint256 weiPerPeriod,
        uint256 periods
    );
    event PledgeCancelled(uint256 period, address creator, address contributor);
    event ContributorWithdrew(
        uint256 period,
        address contributor,
        uint256 amount
    );
    event CreatorWithdrew(uint256 period, address creator, uint256 amount);

    /***** CONSTANTS *****/
    uint256 period;
    address owner;
    uint256 startOfEpoch;

    /***** DATA STRUCTURES *****/
    struct Pledge {
        address creator;
        uint256 weiPerPeriod;
        uint256 afterLastPeriod; // first period s.t. pledge makes no payment
        bool initialized;
    }

    mapping(address => uint256) contributorBalances;
    mapping(address => uint256) creatorBalances;
    mapping(address => uint256) lastWithdrawalPeriod;
    mapping(address => mapping(address => Pledge)) contributorPledges; // contributor => (creator => pledge)
    mapping(address => mapping(uint256 => uint256)) expectedPayments; // creator     => (periodNumber => payment)

    constructor(uint256 _period) {
        startOfEpoch = block.timestamp; // 1621619224...
        owner = msg.sender;
        period = _period;
    }

    function currentPeriod() internal view returns (uint256 periodNumber) {
        return (block.timestamp - startOfEpoch) / period;
    }

    function getContributorBalance() public view returns (uint256) {
        return contributorBalances[msg.sender];
    }

    function getCreatorBalance() public returns (uint256) {
        uint256 amount = 0;
        for (
            period = lastWithdrawalPeriod[msg.sender];
            period < currentPeriod();
            period++
        ) {
            amount += expectedPayments[msg.sender][period];
        }
        return amount;
    }

    function deposit() public payable returns (uint256 newBalance) {
        contributorBalances[msg.sender] += msg.value;
        emit ContributorDeposited(currentPeriod(), msg.sender, msg.value);
        return contributorBalances[msg.sender];
    }

    function withdraw(bool isContributor, uint256 amount)
        internal
        returns (uint256 newBalance)
    {
        mapping(address => uint256) storage balances = isContributor
            ? contributorBalances
            : creatorBalances;

        uint256 oldBalance = balances[msg.sender];

        if (balances[msg.sender] < amount) {
            return oldBalance; // insufficient funds
        }

        balances[msg.sender] -= amount; // withdraw first to prevent re-entrancy

        (bool success, ) = payable(msg.sender).call{value: amount}(""); // then send
        require(success, "withdrawal failed");

        return balances[msg.sender];
    }

    function withdrawAsContributor(uint256 amount) public {
        withdraw(true, amount);
        emit ContributorWithdrew(currentPeriod(), msg.sender, amount);
    }

    function withdrawAsCreator() public {
        uint256 amount = getCreatorBalance();
        lastWithdrawalPeriod[msg.sender] = currentPeriod();
        withdraw(false, amount);
        emit CreatorWithdrew(currentPeriod(), msg.sender, amount);
    }

    function canPledge(uint256 _weiPerPeriod, uint256 _periods)
        internal
        view
        returns (bool enoughFunds)
    {
        return (contributorBalances[msg.sender] >= _weiPerPeriod * _periods);
    }

    function createPledge(
        address _creator,
        uint256 _weiPerPeriod,
        uint256 _periods
    ) public {
        require(canPledge(_weiPerPeriod, _periods), "insufficient funds");
        require(
            !contributorPledges[msg.sender][_creator].initialized,
            "can't pledge twice to the same creator"
        );

        // update creator's mapping of future payments
        for (uint256 periodO = currentPeriod(); periodO < _periods; periodO++) {
            expectedPayments[_creator][periodO] += _weiPerPeriod;
        }

        // store the data structure so that contributor can cancel pledge
        Pledge memory pledge = Pledge({
            creator: _creator,
            weiPerPeriod: _weiPerPeriod,
            afterLastPeriod: currentPeriod() + _periods,
            initialized: true
        });

        contributorPledges[msg.sender][_creator] = pledge;
        contributorBalances[msg.sender] -= _weiPerPeriod * _periods;
        emit PledgeCreated(
            currentPeriod(),
            _creator,
            msg.sender,
            _weiPerPeriod,
            _periods
        );
    }

    function cancelPledge(address _creator) public {
        Pledge memory pledge = contributorPledges[msg.sender][_creator];
        require(pledge.initialized);
        contributorBalances[msg.sender] +=
            pledge.weiPerPeriod *
            (pledge.afterLastPeriod - currentPeriod());
        for (
            uint256 periodT = currentPeriod();
            periodT < pledge.afterLastPeriod;
            periodT++
        ) {
            expectedPayments[_creator][periodT] -= pledge.weiPerPeriod;
        }
        delete contributorPledges[msg.sender][_creator];
        emit PledgeCancelled(currentPeriod(), _creator, msg.sender);
    }

    function myPledgeTo(address _creator)
        public
        view
        returns (uint256 weiPerPeriod, uint256 afterLastPeriod)
    {
        Pledge memory pledge = contributorPledges[msg.sender][_creator];
        return (pledge.weiPerPeriod, pledge.afterLastPeriod);
    }
}
