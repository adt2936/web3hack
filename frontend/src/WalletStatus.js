import React, { useState } from 'react';
import { getContract } from './contract';

export default function WalletStatus() {
  const [wallet, setWallet] = useState('');
  const [data, setData] = useState(null);

  const fetchStatus = async () => {
    try {
      const contract = await getContract();
      const res = await contract.getWalletStatus(wallet);
      setData(res);
    } catch (err) {
      setData({ error: err.message });
    }
  };

  return (
    <div>
      <h3>Check Wallet Risk</h3>
      <input value={wallet} onChange={e => setWallet(e.target.value)} placeholder="Wallet address" />
      <button onClick={fetchStatus}>Check</button>

      {data && !data.error && (
        <div>
          <p>Reports: {data[0].toString()}</p>
          <p>Risky: {data[1] ? 'Yes 🚨' : 'No ✅'}</p>
          <p>Reasons:</p>
          <ul>{data[2].map((r, i) => <li key={i}>{r}</li>)}</ul>
        </div>
      )}
      {data?.error && <p>Error: {data.error}</p>}
    </div>
  );
}
