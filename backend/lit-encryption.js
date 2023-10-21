import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";
import { checkAndSignAuthMessage } from '@lit-protocol/lit-node-client';
import Lit from './lit-client'
import accessControlConditions from './access-control';
import { client, chain } from './lit-client'

const encrypt = async (dataToEncrypt) => {
  const authSig = await checkAndSignAuthMessage({
    chain: "ethereum",
  });
  const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
    {
      accessControlConditions,
      authSig,
      chain: 'ethereum',
      dataToEncrypt: dataToEncrypt,
    },
    Lit.litNodeClient,
  );
  return {
    ciphertext,
    dataToEncryptHash,
  }  
};

export default encrypt;