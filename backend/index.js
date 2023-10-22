import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import os from 'os';
import fileUpload from './ipfs-fileUpload';
import getFileIPFS from './ipfs-retrieve';
const app = express();
const port = 4000; 
dotenv.config();
import * as testCircuit from './testCircuit';
import * as dnaChecker from './dna-checker';
import fs from 'fs';
app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());

const IPFSclient = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMzRkMxQ2E0RDU0RDBCOGVEMzAxOTQxQzdjMDY4MjlGNzY3NDg1NjYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTc4NDczODQzMjksIm5hbWUiOiJmaXJzdCJ9.EU--w-D0JoPr17f6f320ST6TRC2mGG9IGP4syTneNxE" })

const upload = multer({ dest: os.tmpdir() });

const convert = (s) => {
  let res = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'a') {
      res.push(1);
    } else if (s[i] === 'c') {
      res.push(2);
    } else if (s[i] === 'g') {
      res.push(3);
    } else if (s[i] === 't') {
      res.push(4);
    }
  }
  return res;
};

app.post('/uploadDNA', upload.single('file'),async (req, res) => {
  const uploadedFile = req.file;
  const sign = req.body.signature;

  if (!uploadedFile) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const data = fs.readFileSync(uploadedFile.path, 'utf8');
  const s = convert(data);
  // const cid = await fileUpload(uploadedFile);
  // const file = await getFileIPFS(cid);
  // return res.status(200).json({ cid });
  const input = {dna : s, secret : sign};
  const witness = await dnaChecker.generateWitness(input, acirBuffer);

  const proof = await dnaChecker.generateProof(witness);
  const result = await dnaChecker.verifyProof(proof);
  if(result){
    fileUpload(s);
  }
  api.destroy();
});

app.get('/downloadDNA', async (req, res) => {
  const cid = req.query.cid;
  const file = await getFileIPFS(cid);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


