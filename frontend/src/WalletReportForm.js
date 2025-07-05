import React, { useState } from 'react';
import { getContract } from './contract';

export default function WalletReportForm() {
  const [wallet, setWallet] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('');

  const handleReport = async () => {
    if (!wallet || !reason) {
      setStatus("Please enter both the wallet address and a reason for reporting.");
      return;
    }

    setStatus("Submitting your report...");

    try {
      const contract = await getContract();
      const tx = await contract.reportWallet(wallet.trim(), reason.trim());
      await tx.wait();
      setStatus("Wallet reported successfully.");
    } catch (err) {
      console.error(err);
      let message = "An unexpected error occurred.";

      if (err?.reason) {
        message = err.reason;
      } else if (err?.error?.message) {
        message = err.error.message;
      } else if (err?.message?.includes("user rejected")) {
        message = "Transaction was rejected.";
      }

      setStatus(message);
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>Report a Suspicious Wallet</h3>
      <input
        value={wallet}
        onChange={e => setWallet(e.target.value)}
        placeholder="Wallet address (0x...)"
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <textarea
        value={reason}
        onChange={e => setReason(e.target.value)}
        placeholder="Reason for reporting"
        rows={4}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button onClick={handleReport} style={{ padding: '0.5rem 1rem' }}>
        Submit Report
      </button>
      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </div>
  );
}
