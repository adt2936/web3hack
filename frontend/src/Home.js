import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page-container">
      <h1 className="home-title">NarcChain</h1>
      <p className="home-subtitle">Decentralized Suspicious Wallet Reporting on Ethereum</p>

      <div className="home-description">
        <p>
          NarcChain is a Web3-based reporting and analytics platform designed to bring transparency to the blockchain. 
          It allows users to anonymously report wallets that may be involved in illicit activities such as drug trafficking or black market trades.
        </p>
        <p>
          Powered by smart contracts and community consensus, each wallet receives a risk score based on the number of unique reports. 
          Once a threshold is crossed, the wallet is flagged as risky — helping platforms, regulators, and dApps identify potential threats in real time.
        </p>
        <p>
          You can:
          <ul>
            <li> Report a wallet with your reasoning.</li>
            <li> Check a wallet’s report count, reasons, and risk level.</li>
          </ul>
        </p>
        <p>
          Use the navigation above to begin exploring NarcChain.
        </p>
      </div>
    </div>
  );
}
