// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

/*
An Ethereum version of recurring payments.

Creator:
    1. publishes address (via website, etc)
    2. can withdraw a certain amount once every PERIOD
    
Supporter:
    1. Deposits ether
    2. Pledges to give N wei to Creator once a PERIOD
    3. Can unsubscribe any time (pledges for earlier periods not refunded)
*/

contract Pethreon {
    /***** EVENTS *****/
    event SupporterDeposited(uint256 period, address supporter, uint256 amount);
    event PledgeCreated(
        uint256 period,
        address creator,
        address supporter,
        uint256 weiPerPeriod,
        uint256 periods
    );
    event PledgeCancelled(uint256 period, address creator, address supporter);
    event SupporterWithdrew(uint256 period, address supporter, uint256 amount);
    event CreatorWithdrew(uint256 period, address creator, uint256 amount);

    /***** CONSTANTS *****/
    // Time is processed in steps of 1 PERIOD
    // Period 0 is the Start of epoch -- i.e., contract creation
    uint256 period;
    uint256 startOfEpoch;

    /***** DATA STRUCTURES *****/
    struct Pledge {
        address creator;
        uint256 weiPerPeriod;
        uint256 afterLastPeriod; // first period s.t. pledge makes no payment
        bool initialized;
    }

    mapping(address => uint256) supporterBalances;
    mapping(address => uint256) creatorBalances;

    // supporter => (creator => pledge)
    mapping(address => mapping(address => Pledge)) pledges;

    // creator => (periodNumber => payment)
    mapping(address => mapping(uint256 => uint256)) expectedPayments;
    mapping(address => uint256) afterLastWithdrawalPeriod;

    /***** HELPER FUNCTIONS *****/
    constructor(uint256 _period) {
        startOfEpoch = block.timestamp;
        period = _period;
    }

    function currentPeriod() internal view returns (uint256 periodNumber) {
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

    // Get your (yet unpledged) balance as a supporter
    function balanceAsSupporter() public view returns (uint256) {
        return supporterBalances[msg.sender];
    }

    function balanceAsCreator() public returns (uint256) {
        // sum up all expected payments from all pledges from all previous periods
        uint256 amount = 0;
        for (
            period = afterLastWithdrawalPeriod[msg.sender];
            period < currentPeriod();
            period++
        ) {
            amount += expectedPayments[msg.sender][period];
        }
        return amount;
    }

    // deposit ether to be used in future pledges
    function deposit() public payable returns (uint256 newBalance) {
        supporterBalances[msg.sender] += msg.value;
        emit SupporterDeposited(currentPeriod(), msg.sender, msg.value);
        return supporterBalances[msg.sender];
    }

    // withdraw ether (generic function)
    function withdraw(bool isSupporter, uint256 amount)
        internal
        returns (uint256 newBalance)
    {
        mapping(address => uint256) storage balances = isSupporter ? supporterBalances : creatorBalances;
        uint256 oldBalance = balances[msg.sender];
        if (balances[msg.sender] < amount) return oldBalance;
        balances[msg.sender] -= amount;
        if (!payable(msg.sender).send(amount)) {
            balances[msg.sender] += amount;
            return oldBalance;
        }
        return balances[msg.sender];
    }

    // Supporter can choose how much to withdraw
    function withdrawAsSupporter(uint256 amount) public {
        withdraw(true, amount);
        SupporterWithdrew(currentPeriod(), msg.sender, amount);
    }

    // Creator can only withdraw the full amount available (keeping it simple!)
    function withdrawAsCreator() public {
        uint256 amount = balanceAsCreator();
        afterLastWithdrawalPeriod[msg.sender] = currentPeriod();
        withdraw(false, amount);
        CreatorWithdrew(currentPeriod(), msg.sender, amount);
    }

    /***** PLEDGES *****/

    function canPledge(uint256 _weiPerPeriod, uint256 _periods)
        internal
        view
        returns (bool enoughFunds)
    {
        return (supporterBalances[msg.sender] >= _weiPerPeriod * _periods);
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

        // store the data structure so that supporter can cancel pledge
        Pledge memory pledge =
            Pledge({
                creator: _creator,
                weiPerPeriod: _weiPerPeriod,
                afterLastPeriod: currentPeriod() + _periods,
                initialized: true
            });

        pledges[msg.sender][_creator] = pledge;
        supporterBalances[msg.sender] -= _weiPerPeriod * _periods;
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
        supporterBalances[msg.sender] +=
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
