// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import "hardhat/console.sol";

/*
An Ethereum version of recurring payments.
Creator:
    1. publishes address (via website, etc)
    2. can withdraw a certain amount once every PERIOD
    
Contributor:
    1. Deposits ether
    2. Pledges to give N wei to Creator once a PERIOD
    3. Can unsubscribe any time (pledges for earlier periods not refunded)
*/

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
    // Time is processed in steps of 1 PERIOD
    // Period 0 is the Start of epoch (contract creation)
    uint256 period;
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

    // contributor => (creator => pledge)
    mapping(address => mapping(address => Pledge)) pledges;

    // creator => (periodNumber => payment)
    mapping(address => mapping(uint256 => uint256)) expectedPayments;
    mapping(address => uint256) afterLastWithdrawalPeriod;

    /***** HELPER FUNCTIONS *****/
    constructor(uint256 _period) {
        startOfEpoch = block.timestamp; // 1621619224...
        period = _period; // 0
    }

    function currentPeriod() internal view returns (uint256 periodNumber) {
        console.log(
            "currentPeriod() is being called by ",
            msg.sender,
            "the blockstamp is",
            block.timestamp
        );
        console.log(
            "the contract was created at",
            startOfEpoch,
            "the current period is ",
            period
        ); // since contract creation
        return (block.timestamp - startOfEpoch) / period;
    }

    /*
    // TODO: get expected payments in batch (can't return uint[]?)
    function getExpectedPayment(uint period) constant returns (uint expectedPayment) {
        return (period < afterLastWithdrawalPeriod[msg.sender]) ? 0 :
            expectedPayments[msg.sender][period];
    }
    */

    /***** DEPOSIT & WITHDRAW *****/

    function getContributorBalance() public view returns (uint256) {
        console.log(
            "getContributorBalance() is being called by",
            msg.sender,
            "and their balance is",
            contributorBalances[msg.sender]
        );
        return contributorBalances[msg.sender];
    }

    function getCreatorBalance() public returns (uint256) {
        uint256 amount = 0;
        for (
            period = afterLastWithdrawalPeriod[msg.sender];
            period < currentPeriod();
            period++
        ) {
            amount += expectedPayments[msg.sender][period];
        }
        console.log(
            "getCreatorBalance() is being called by ",
            msg.sender,
            "and their balance is ",
            amount
        );
        return amount;
    }

    function deposit() public payable returns (uint256 newBalance) {
        console.log(
            "deposit() -> msg.sender contributorBalances[msg.sender] msg.value |",
            msg.sender,
            contributorBalances[msg.sender],
            msg.value
        );

        contributorBalances[msg.sender] += msg.value;
        emit ContributorDeposited(currentPeriod(), msg.sender, msg.value);
        return contributorBalances[msg.sender];
    }

    function withdraw(bool isContributor, uint256 amount)
        internal
        returns (uint256 newBalance)
    {
        console.log(
            "withdraw() by",
            msg.sender,
            isContributor
                ? "and they're withdrawing from their contributor balance"
                : "and they're withdrawing their creator balance"
        );

        // are they withdrawing as a contributor or as a creator?
        mapping(address => uint256) storage balances =
            isContributor ? contributorBalances : creatorBalances;

        uint256 oldBalance = balances[msg.sender];

        if (balances[msg.sender] < amount) {
            console.log("insufficient funds");
            return oldBalance;
        }

        // Make sure you always subtract first as a best practice against re-entrancy
        balances[msg.sender] -= amount;

        // If I can't send the amount to them, then increment their balance in the smart contract
        if (!payable(msg.sender).send(amount)) {
            balances[msg.sender] += amount;
            return oldBalance;
        }

        console.log(
            "their old balance is",
            oldBalance,
            "their new balance is",
            balances[msg.sender]
        );

        return balances[msg.sender];
    }

    function withdrawAsContributor(uint256 amount) public {
        withdraw(true, amount);
        emit ContributorWithdrew(currentPeriod(), msg.sender, amount);
    }

    function withdrawAsCreator() public {
        uint256 amount = getCreatorBalance();
        afterLastWithdrawalPeriod[msg.sender] = currentPeriod();
        withdraw(false, amount);
        emit CreatorWithdrew(currentPeriod(), msg.sender, amount);
    }

    /***** PLEDGES *****/

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
        // must have enough funds
        require(canPledge(_weiPerPeriod, _periods));

        // can't pledge twice for same creator (for simplicity)
        // to change pledge parameters, cancel it and create a new one
        require(!pledges[msg.sender][_creator].initialized);

        // update creator's mapping of future payments
        for (uint256 periodO = currentPeriod(); periodO < _periods; periodO++) {
            expectedPayments[_creator][periodO] += _weiPerPeriod;
        }

        // store the data structure so that contributor can cancel pledge
        Pledge memory pledge =
            Pledge({
                creator: _creator,
                weiPerPeriod: _weiPerPeriod,
                afterLastPeriod: currentPeriod() + _periods,
                initialized: true
            });

        pledges[msg.sender][_creator] = pledge;
        contributorBalances[msg.sender] -= _weiPerPeriod * _periods;
        PledgeCreated(
            currentPeriod(),
            _creator,
            msg.sender,
            _weiPerPeriod,
            _periods
        );
    }

    function cancelPledge(address _creator) public {
        Pledge memory pledge = pledges[msg.sender][_creator];
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
        delete pledges[msg.sender][_creator];
        PledgeCancelled(currentPeriod(), _creator, msg.sender);
    }

    function myPledgeTo(address _creator)
        public
        view
        returns (uint256 weiPerPeriod, uint256 afterLastPeriod)
    {
        Pledge memory pledge = pledges[msg.sender][_creator];
        return (pledge.weiPerPeriod, pledge.afterLastPeriod);
    }
}
