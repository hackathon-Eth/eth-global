import go from go.js

var accessControlConditions = [
  {
    contractAddress: "",
    standardContractType: "",
    chain: "ethereum",
    method: "go",
    parameters: ["0x742d35Cc6634C0532925a3b844Bc454e4438f44e", ":userAddress"],
    returnValueTest: {
      comparator: "=",
      value: "true",
    },
  },
];
export default accessControlConditions