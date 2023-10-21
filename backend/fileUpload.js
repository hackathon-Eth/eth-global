import IPFSclient from "./ipfs-client";
import fs from 'fs';

const fileUpload = async (file) => {
  const data = fs.readFileSync(uploadedFile.path, 'utf8');
  console.log(data);
  const obj = {DNA: data};
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
  const files = [
    new File([blob], 'dna.json', { type: "application/json" })
  ]
  const cid = await IPFSclient.put(files);
  return cid;
};

export default fileUpload;