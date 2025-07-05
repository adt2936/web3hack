import React, { useState } from 'react';
import { getContract } from './contract';
import { toast } from 'react-toastify';

export default function WalletStatus() {
  const [wallet, setWallet] = useState('');
  const [reportData, setReportData] = useState(null);

  const handleCheck = async () => {
    if (!wallet) {
      toast.error("Please enter a wallet address.");
      return;
    }

    try {
      const contract = await getContract();
      const [count, isRisky, reasons] = await contract.getWalletStatus(wallet.trim());

      setReportData({
        count: Number(count), // FIXED HERE
        isRisky,
        reasons,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch wallet status.");
    }
  };

  const getRiskLabel = (count, isRisky) => {
    if (count === 0) return { label: "No Risk", color: "green" };
    if (isRisky) return { label: "High Risk", color: "red" };
    return { label: "Mild Risk", color: "orange" };
  };

  return (
    <div className="status-check-container">
      <h3>Check Wallet Risk</h3>
      <input
        type="text"
        value={wallet}
        onChange={e => setWallet(e.target.value)}
        placeholder="Enter wallet address"
      />
      <button onClick={handleCheck}>Check</button>

      {reportData && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Reports:</strong> {reportData.count}</p>
          <p style={{ color: getRiskLabel(reportData.count, reportData.isRisky).color }}>
            <strong>Status:</strong> {getRiskLabel(reportData.count, reportData.isRisky).label}
          </p>
          {reportData.reasons.length > 0 && (
            <>
              <strong>Reasons:</strong>
              <ul>
                {reportData.reasons.map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
