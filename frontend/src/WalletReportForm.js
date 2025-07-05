import React, { useState } from 'react';
import { getContract } from './contract';
import { toast } from 'react-toastify';

export default function WalletReportForm() {
  const [wallet, setWallet] = useState('');
  const [reason, setReason] = useState('');

  const handleReport = async () => {
    if (!wallet || !reason) {
      toast.error("Please enter both the wallet address and a reason.");
      return;
    }

    try {
      const contract = await getContract();
      const tx = await contract.reportWallet(wallet.trim(), reason.trim());
      await tx.wait();
      toast.success("Wallet reported successfully.");
    } catch (err) {
      console.error(err);
      let message = "An error occurred.";

      if (err?.reason) message = err.reason;
      else if (err?.error?.message) message = err.error.message;
      else if (err?.message?.includes("user rejected")) message = "Transaction was rejected.";

      toast.error(message);
    }
  };

  return (
    <div>
      <h3>Report a Suspicious Wallet</h3>
      <input
        value={wallet}
        onChange={e => setWallet(e.target.value)}
        placeholder="Wallet address"
      />
      <textarea
        value={reason}
        onChange={e => setReason(e.target.value)}
        placeholder="Reason for reporting"
        rows={4}
      />
      <button onClick={handleReport}>Submit Report</button>
    </div>
  );
}
