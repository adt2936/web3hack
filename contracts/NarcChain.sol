// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract NarcChain {
    uint256 public constant RISK_THRESHOLD = 3; // Number of reports needed to mark as risky

    struct Report {
        uint256 reportCount;
        string[] reasons;
        mapping(address => bool) hasReported;
        bool isRisky;
    }

    mapping(address => Report) private reportedWallets;
    address[] public allReportedWallets;

    event WalletReported(address indexed wallet, address indexed reporter, string reason);
    event WalletMarkedRisky(address indexed wallet);

    modifier notSelfReport(address wallet) {
        require(msg.sender != wallet, "Cannot report your own wallet.");
        _;
    }

    function reportWallet(address wallet, string calldata reason)
        external
        notSelfReport(wallet)
    {
        Report storage r = reportedWallets[wallet];

        require(!r.hasReported[msg.sender], "You have already reported this wallet.");
        r.hasReported[msg.sender] = true;
        r.reportCount++;
        r.reasons.push(reason);

        if (r.reportCount == 1) {
            allReportedWallets.push(wallet);
        }

        emit WalletReported(wallet, msg.sender, reason);

        if (r.reportCount >= RISK_THRESHOLD && !r.isRisky) {
            r.isRisky = true;
            emit WalletMarkedRisky(wallet);
        }
    }

    function getWalletStatus(address wallet)
        external
        view
        returns (uint256 reportCount, bool isRisky, string[] memory reasons)
    {
        Report storage r = reportedWallets[wallet];
        return (r.reportCount, r.isRisky, r.reasons);
    }

    function getAllReportedWallets() external view returns (address[] memory) {
        return allReportedWallets;
    }

    function hasUserReported(address wallet, address user) external view returns (bool) {
        return reportedWallets[wallet].hasReported[user];
    }
}
