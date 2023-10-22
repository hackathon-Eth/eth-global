import { ethers } from 'ethers';
import config from './config.js';


const go = async (contractAddresses, userAddress) => {
  for(const contractAddress  in contractAddresses){
    const provider = new ethers.providers.JsonRpcProvider(`https://ropsten.infura.io/v3/${contractAddress}`);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const result = await contract.go(userAddress);
    if(result === false){
      return false;
    }
  }
  return true;
};


var accessControlConditions = [
  {
    contractAddress: "",
    standardContractType: "",
    chain: "ethereum",
    method: "go",
    parameters: [config, ":userAddress"],
    returnValueTest: {
      comparator: "=",
      value: "true",
    },
  },
];
export default accessControlConditions