import circuit from './dna_checker.json';
import { decompressSync } from 'fflate';
import { Crs, newBarretenbergApiAsync, RawBuffer } from '@aztec/bb.js/dest/node/index.js';
import { ethers } from 'ethers';
import { executeCircuit, compressWitness } from '@noir-lang/acvm_js';

const acirBuffer = Buffer.from(circuit.bytecode, 'base64');
const acirBufferUncompressed = decompressSync(acirBuffer);

const api = await newBarretenbergApiAsync(4);

const [exact, circuitSize, subgroup] = await api.acirGetCircuitSizes(acirBufferUncompressed);
const subgroupSize = Math.pow(2, Math.ceil(Math.log2(circuitSize)));
const crs = await Crs.new(subgroupSize + 1);
await api.commonInitSlabAllocator(subgroupSize);
await api.srsInitSrs(new RawBuffer(crs.getG1Data()), crs.numPoints, new RawBuffer(crs.getG2Data()));

const acirComposer = await api.acirNewAcirComposer(subgroupSize);

const generateWitness = async (input, acirBuffer) => {
  const initialWitness = new Map();

  // Initial witness is the input to the circuit
  initialWitness.set(1, ethers.utils.hexZeroPad(`0x${input.x.toString(16)}`, 32));
  initialWitness.set(2, ethers.utils.hexZeroPad(`0x${input.y.toString(16)}`, 32));
  
  // Witness map is the output of the circuit
  const witnessMap = await executeCircuit(acirBuffer, initialWitness, () => {
    throw Error('unexpected oracle');
  });
  
  const witnessBuff = compressWitness(witnessMap);
  return witnessBuff;
};

const generateProof = async(witness) => {
  const proof = await api.acirCreateProof(
    acirComposer,
    acirBufferUncompressed,
    decompressSync(witness),
    false,
  );
  return proof;
}


async function verifyProof(proof) {
  await api.acirInitProvingKey(acirComposer, acirBufferUncompressed);
  const verified = await api.acirVerifyProof(acirComposer, proof, false);
  return verified;
}

export { generateWitness, generateProof, verifyProof };
