import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";

const accessControlConditions = [
  {
    contractAddress: "",
    standardContractType: "",
    chain: "ethereum",
    method: "eth_getBalance",
    parameters: [":userAddress", "latest"],
    returnValueTest: {
      comparator: "<=",
      value: "1000000000000", // 0.000001 ETH
    },
  },
];

const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "ethereum" });

const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
  {
    accessControlConditions,
    authSig,
    chain: 'ethereum',
    dataToEncrypt: 'this is a secret message',
  },
  litNodeClient,
);  