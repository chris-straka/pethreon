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

    /***** DATA STRUCTURES *****/
    struct Pledge {
        address creatorAddress;
        address contributorAddress;
        uint256 weiPerPeriod;
        uint256 duration;
        uint256 dateCreated;
        uint256 periodCreated;
        uint256 periodExpires;
    }
    // creatorAddress: _creatorAddress,
    // contributorAddress: msg.sender,
    // weiPerPeriod: _weiPerPeriod,
    // duration: _periods,
    // dateCreated: block.timestamp,
    // periodCreated: currentPeriod(),
    // periodExpires: currentPeriod() + _periods

    mapping(address => uint256) contributorBalances;
    mapping(address => Pledge[]) contributorPledges;

    mapping(address => Pledge[]) creatorPledges;
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
        lastWithdrawalPeriod[msg.sender] = currentPeriod(); // set a new withdrawal period (re-entrancy?)
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
        return creatorPledges[msg.sender];
    }

    function createPledge(
        address _creatorAddress,
        uint256 _weiPerPeriod,
        uint256 _periods
    ) public {
        require(
            contributorBalances[msg.sender] >= _weiPerPeriod * _periods,
            "insufficient funds"
        );

        contributorBalances[msg.sender] -= _weiPerPeriod * _periods; // subtract first to prevent re-entrancy

        uint256 _currentPeriod = currentPeriod(); // grab the # of periods its been since contract creation

        // Update the CREATOR'S list of future payments
        for (
            uint256 _period = _currentPeriod;
            _period < (_currentPeriod + _periods);
            _period++
        ) {
            expectedPayments[_creatorAddress][_period] += _weiPerPeriod;
        }

        Pledge memory pledge = Pledge({
            creatorAddress: _creatorAddress,
            contributorAddress: msg.sender,
            weiPerPeriod: _weiPerPeriod,
            duration: _periods,
            dateCreated: block.timestamp,
            periodCreated: currentPeriod(),
            periodExpires: currentPeriod() + _periods
        });

        contributorPledges[msg.sender].push(pledge);
        creatorPledges[_creatorAddress].push(pledge);

        emit PledgeCreated(
            currentPeriod(),
            _creatorAddress,
            msg.sender,
            _weiPerPeriod,
            _periods
        );
    }

    // This can get expensive but I doubt it will happen very often
    // I also doubt the contributor will be iterating over lots of pledges
    // I should come up with a better way to do this
    // There's also security concerns here if I'm not careful

    // 1. I want to remove the pledge from the contributor's mapping and give them the rest of their money
    // 2. I want to give the contributor the money he pledged for those two periods
    // 3. I want to edit the pledge from the creator's mappings so that it ends today
    function cancelPledge(address _creatorAddress) public {
        Pledge[] storage pledges = contributorPledges[msg.sender];
        Pledge memory pledge;

        for (uint256 i = 0; i < pledges.length; i++) {
            if (pledges[i].creatorAddress == _creatorAddress) {
                pledge = pledges[i]; // save the deleted pledge to a variable
                pledges[i] = pledges[pledges.length - 1]; // overwrite the current pledge with the last pledge
                pledges[pledges.length - 1] = pledge; // overwrite the last pledge with the current pledge
            }
        }

        pledges.pop(); // remove the pledge we want to cancel (done before payment to prevent re-entrancy)

        for (uint256 i = 0; i < pledges.length; i++) {
            if (pledges[i].creatorAddress == _creatorAddress) {
                pledge = pledges[i];
                delete pledges[i];
            }
        }

        require(
            currentPeriod() <= pledge.periodExpires,
            "It's too late to cancel this pledge"
        );

        for (
            uint256 _period = currentPeriod();
            _period < pledge.periodExpires;
            _period++
        ) {
            expectedPayments[_creatorAddress][_period] -= pledge.weiPerPeriod;
        }

        contributorBalances[msg.sender] +=
            pledge.weiPerPeriod *
            (pledge.periodExpires - currentPeriod());

        emit PledgeCancelled(currentPeriod(), _creatorAddress, msg.sender);
    }

    function deletePledge(address _creatorAddress) public {
        Pledge[] storage pledges = contributorPledges[msg.sender];
        Pledge memory pledge;

        if (pledges.length <= 1) {
            pledge = pledges[0];
        } else {
            for (uint256 i = 0; i < pledges.length; i++) {
                if (pledges[i].creatorAddress == _creatorAddress) {
                    pledge = pledges[i]; // save the deleted pledge to a variable
                    pledges[i] = pledges[pledges.length - 1]; // overwrite the current pledge with the last pledge
                    pledges[pledges.length - 1] = pledge; // overwrite the last pledge with the current pledge
                }
            }
        }

        pledges.pop(); // remove the last pledge
    }
}
