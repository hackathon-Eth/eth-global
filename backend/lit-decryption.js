import Lit from './lit-client'
import { chain, client } from './lit-client'
import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import accessControlConditions from './access-control';

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