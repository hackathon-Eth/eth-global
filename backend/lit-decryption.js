import Lit from './lit-client.js'
import { chain, client } from './lit-client.js'
import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import accessControlConditions from './access-control.js';

const decrypt = async (ciphertext, dataToEncryptHash) => { 
  const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: 'ethereum' })
  const decryptedString = LitJsSdk.decryptToString(
    {
      accessControlConditions,
      ciphertext,
      dataToEncryptHash,
      authSig,
      chain: 'ethereum',
    },
    Lit.litNodeClient,
  );
  return { decryptedString }
};

export default decrypt;