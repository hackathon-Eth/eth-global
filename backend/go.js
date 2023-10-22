import { ethers } from 'ethers';

const go = async (contractAddress, userAddress) => {
  const provider = new ethers.providers.JsonRpcProvider("https://ropsten.infura.io/v3/7a2e1e9e8b4a4d9f9c6c7f7b1b0b7d5f");
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  return true;
};

export default go;