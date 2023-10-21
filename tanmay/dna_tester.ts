import circuit from 'testerCircuit.json' assert { type: 'json' };

import { decompressSync } from 'fflate';

const acirBuffer = Buffer.from(circuit.bytecode, 'base64');
const acirBufferUncompressed = decompressSync(acirBuffer);

import { Crs, newBarretenbergApiAsync, RawBuffer } from '@aztec/bb.js/dest/node/index.js';

const api = await newBarretenbergApiAsync(4);

const [exact, circuitSize, subgroup] = await api.acirGetCircuitSizes(acirBufferUncompressed);
const subgroupSize = Math.pow(2, Math.ceil(Math.log2(circuitSize)));
const crs = await Crs.new(subgroupSize + 1);
await api.commonInitSlabAllocator(subgroupSize);
await api.srsInitSrs(new RawBuffer(crs.getG1Data()), crs.numPoints, new RawBuffer(crs.getG2Data()));

const acirComposer = await api.acirNewAcirComposer(subgroupSize);


// Custom inputs and generating their proofs
import { ethers } from 'ethers'; // I'm lazy so I'm using ethers to pad my input
import { executeCircuit, compressWitness } from '@noir-lang/acvm_js';

async function generateWitness(input: any, acirBuffer: Buffer): Promise<Uint8Array> {
  const initialWitness = new Map<number, string>();
  // Initial witness is the input to the circuit
  initialWitness.set(1, ethers.utils.hexZeroPad(`0x${input.x.toString(16)}`, 32));
  initialWitness.set(2, ethers.utils.hexZeroPad(`0x${input.y.toString(16)}`, 32));

  // Witness map is the output of the circuit
  const witnessMap = await executeCircuit(acirBuffer, initialWitness, () => {
    throw Error('unexpected oracle');
  });

  const witnessBuff = compressWitness(witnessMap);
  return witnessBuff;
}

async function generateProof(witness: Uint8Array) {
    const proof = await api.acirCreateProof(
      acirComposer,
      acirBufferUncompressed,
      decompressSync(witness),
      false,
    );
    return proof;
  }


// All of the above code was for just proving generating witness,etc. The below code is for verifying the proof on-chain (matlab decentralised and on blockchain)

import { ethers } from 'ethers'; // example using ethers v5
import artifacts from '../artifacts/circuits/contract/plonk_vk.sol/UltraVerifier.json'; // I compiled using Hardhat, so I'm getting my abi from here

const verifierAddress = '0x123455'; // your verifier address
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = this.provider.getSigner();

const contract = new ethers.Contract(verifierAddress, artifacts.abi, signer);

const publicInputs = proof.slice(0, 32);
const slicedProof = proof.slice(32);
await contract.verify(slicedProof, [publicInputs]);

// In the above code public inputs are in the proof and usko slice karna hai.