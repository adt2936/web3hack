import { ethers } from 'ethers';
import NarcChainABI from './NarcChainABI.json';

const CONTRACT_ADDRESS = '0xa90Db995c1912513969412dC4BDBCf0B7E578a22';

export const getContract = async () => {
  if (!window.ethereum) {
    alert('MetaMask is not installed!');
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, NarcChainABI, signer);
};

