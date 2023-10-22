import IPFSclient from "./ipfs-client";
import encrypt from "./lit-encryption";

const fileUpload = async (data) => {
  const encryptedStore = await encrypt(data);
  const obj = {DNA: data};
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
  const files = [
    new File([blob], 'dna.json', { type: "application/json" })
  ]
  const cid = await IPFSclient.put(files);
  return cid;
};

export default fileUpload;