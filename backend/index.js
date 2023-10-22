import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import os from 'os';
import fileUpload from './fileUpload';
import getFileIPFS from './ipfs-retrieve';
const app = express();
const port = 4000; 
dotenv.config();
import * as testCircuit from './testCircuit';
import * as dnaChecker from './dna-checker';

app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());

const IPFSclient = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMzRkMxQ2E0RDU0RDBCOGVEMzAxOTQxQzdjMDY4MjlGNzY3NDg1NjYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTc4NDczODQzMjksIm5hbWUiOiJmaXJzdCJ9.EU--w-D0JoPr17f6f320ST6TRC2mGG9IGP4syTneNxE" })

const upload = multer({ dest: os.tmpdir() });

const convert = (s) => {
  for(i = 0; i < s.length; i++) {
    if(s[i] == 'a') {
      s[i] = '1';
    }
    else if(s[i] == 'c') {
      s[i] = '2';
    }
    else if(s[i] == 't') {
      s[i] = '4';
    }
    else if(s[i] == 'g') {
      s[i] = '3';
    }
  }
  return s;
};

app.post('/uploadDNA', upload.single('file'),async (req, res) => {
  const uploadedFile = req.file;

  if (!uploadedFile) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // const cid = await fileUpload(uploadedFile);
  // const file = await getFileIPFS(cid);
  // return res.status(200).json({ cid });
  
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// a - 1
// c - 2
// t - 4
// g - 3