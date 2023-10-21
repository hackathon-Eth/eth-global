import IPFSclient from "./ipfs-client";

const getFileIPFS = async (cid) => {
  const res = await IPFSclient.get(cid);
  const files = await res.files(); // Web3File[]
  let DNA = "";
  for (const file of files) {
    console.log(await file.text());
    DNA = await file.text();
  }
  return DNA;
} 

export default getFileIPFS;