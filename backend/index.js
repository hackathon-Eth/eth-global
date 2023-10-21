import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import os from 'os';
import fs from 'fs';
import { Web3Storage, File, filesFromPath } from 'web3.storage'
const app = express();
const port = 4000; 
dotenv.config();

app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());

const IPFSclient = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMzRkMxQ2E0RDU0RDBCOGVEMzAxOTQxQzdjMDY4MjlGNzY3NDg1NjYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTc4NDczODQzMjksIm5hbWUiOiJmaXJzdCJ9.EU--w-D0JoPr17f6f320ST6TRC2mGG9IGP4syTneNxE" })

const upload = multer({ dest: os.tmpdir() });

app.post('/uploadDNA', upload.single('file'),async (req, res) => {
  const uploadedFile = req.file;
  console.log(uploadedFile);
  if (!uploadedFile) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const data = fs.readFileSync(uploadedFile.path, 'utf8');
  console.log(data);
  const uploadFile = new File([uploadedFile.buffer], uploadedFile.originalname, { type: uploadedFile.mimetype });
  const cid = await IPFSclient.put([uploadFile]);
  console.log(cid);
  return res.status(200).json({ cid });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});