import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import os from 'os';
import fileUpload from './ipfs-fileUpload.js'
import getFileIPFS from './ipfs-retrieve.js';
const app = express();
const port = 4000; 
dotenv.config();
import * as testCircuit from './testcircuiter.js';
import * as dnaChecker from './dna-checker.js';
import fs from 'fs';
app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());

const upload = multer({ dest: os.tmpdir() });

let CIDs = [];

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

const convertBack = async (s) => {
  let res = '';
  for(let i = 0; i < s.length; i++){
    if(s[i] === 1){
      res += 'a';
    }
    else if(s[i] === 2){
      res += 'c';
    }
    else if(s[i] === 3){
      res += 'g';
    }
    else if(s[i] === 4){
      res += 't';
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
  const commitment = await dnaChecker.verifyProof(proof);
  let cid;
  if(commitment){
    cid = fileUpload(s);
  }
  else {
    res.status(400).json({ error: 'Invalid DNA' });
  }
  api.destroy();
  res.status(200).json({ commitment, cid });
});

app.get('/downloadDNA', async (req, res) => {
  const cid = req.query.cid;
  const file = await getFileIPFS(cid);
  const s = convertBack(data);
  res.status(200).json({ s });
});

app.get('/findComparisions', async (req, res) => {
  const cid = req.query.cid;
  const commitment = req.query.commitment;
  const data = await getFileIPFS(cid);
  let percentages = [];
  for(let i = 0; i < CIDs.length; i++){
    const data2 = await getFileIPFS(CIDs[i]);
    const input = {dna1 : data, dna2 : data2, secret : commitment};
    const witness = await testCircuit.generateWitness(input, acirBuffer);
    const proof = await testCircuit.generateProof(witness);
    const result = await testCircuit.verifyProof(proof);
    percentages.push(result);
  }
  return res.status(200).json({ percentages });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


