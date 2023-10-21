import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";

const client = new LitJsSdk.LitNodeClient({
  litNetwork: 'cayenne',
});
const chain = "ethereum";


const litSign = async (message) => {
  const signature = await client.signMessage(message, chain);
  return signature;
}

const litVerify = async (message, signature) => {
  const result = await client.verifyMessage(message, signature, chain);
  return result;
}

export { litSign, litVerify };