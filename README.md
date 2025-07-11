﻿# Narc-Sissist: A Truecaller for Blockchain Transactions
NarcSissist is a decentralized Web3 platform that enables Ethereum users to report and flag suspicious wallet activity on-chain. It promotes transparency and public accountability by making all reports verifiable and accessible, allowing developers and platforms to assess wallet trustworthiness without relying on centralized systems.


Built for the **Web3SSH Hackathon**

## Problem Statement

In the current blockchain ecosystem, there is no reliable, decentralized way to track or report suspicious wallet behavior. Existing solutions rely on centralized authorities, limiting transparency and community involvement. NarcSissist addresses this gap by allowing anyone to flag wallets publicly, creating a transparent and trustless alert system.
## Our Solution

**NarcSissist** is a smart contract system that allows authorized entities (like enforcement agencies or dApps) to:

- Flag suspicious wallet addresses
- Assign risk scores and reasons for each flag
- Let any user query if a wallet is risky or not
- Store everything immutably and transparently on-chain

## Tech Stack

- **Smart Contract**: Solidity + Hardhat
- **Blockchain**: Ethereum (Sepolia Testnet via Infura)
- **Security**: OpenZeppelin AccessControl
- **Wallet**: MetaMask

## How it Works

1. Enforcement agencies are granted a `POLICE_ROLE` to flag wallet addresses.
2. Each flag stores:
   - The wallet address
   - A reason for flagging
   - A risk score (0–100)
   - Timestamp
3. All flagged wallets are publicly viewable for transparency and can be queried by any frontend app or explorer.

### Prerequisites

- Node.js
- Hardhat
- MetaMask wallet with Sepolia ETH
- Infura account

