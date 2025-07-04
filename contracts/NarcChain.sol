// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract NarcChain is AccessControl {
    bytes32 public constant POLICE_ROLE = keccak256("POLICE_ROLE");

    struct Flag {
        string reason;
        uint riskScore;
        uint timestamp;
    }

    mapping(address => Flag) public flaggedWallets;
    address[] public flaggedAddresses;

    event WalletFlagged(address indexed wallet, string reason, uint riskScore);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(POLICE_ROLE, msg.sender);
    }

    function flagWallet(address wallet, string memory reason) public onlyRole(POLICE_ROLE) {
        require(flaggedWallets[wallet].timestamp == 0, "Wallet already flagged");
        uint riskScore = 75;
        flaggedWallets[wallet] = Flag(reason, riskScore, block.timestamp);
        flaggedAddresses.push(wallet);
        emit WalletFlagged(wallet, reason, riskScore);
    }

    function getFlag(address wallet) public view returns (Flag memory) {
        return flaggedWallets[wallet];
    }

    function getAllFlaggedWallets() public view returns (address[] memory) {
        return flaggedAddresses;
    }
}
