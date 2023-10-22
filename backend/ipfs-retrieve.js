import IPFSclient from "./ipfs-client";
import decrypt from "./lit-decryption";

const getFileIPFS = async (cid) => {
  const res = await IPFSclient.get(cid);
  const files = await res.files(); // Web3File[]
  let DNA = "";
  for (const file of files) {
    console.log(await file.text());
    DNA = await file.text();
  }
  DNA = await decrypt(DNA);
  return DNA;
} 

export default getFileIPFS;