import * as Signer from "@ucanto/principal/ed25519"; // Agents on Node should use Ed25519 keys
import { importDAG } from "@ucanto/core/delegation";
import { CarReader } from "@ipld/car";
import * as Client from "@web3-storage/w3up-client";
import { StoreMemory } from "@web3-storage/access/stores/store-memory";
import { web3upKey, web3upProof } from "../utils/constants.js";

export const setup = async () => {
  const KEY = web3upKey;
  const PROOF = web3upProof;
  // from "bring your own Agent" example in `Creating a client object" section`
  // used command line to generate KEY and PROOF (stored in env variables)
  // KEY: `npx ucan-key ed --json` in command line, which returns private key and DID for Agent (the private key is stored in KEY)
  // PROOF: w3cli used to run `w3 delegation create <did_from_ucan-key_command_above> --can 'store/add' --can 'upload/add' | base64`, which returns the delegation from Space to the Agent we're using (stored in PROOF)
  const principal = Signer.parse(KEY);
  const client = await Client.create({ principal, store: new StoreMemory() });

  // now give Agent the delegation from the Space
  const proof = await parseProof(PROOF);
  const space = await client.addSpace(proof);
  await client.setCurrentSpace(space.did());

  // READY to go!
  return client;
};

/** @param {string} data Base64 encoded CAR file */
const parseProof = async (data: string) => {
  const blocks = [];
  const reader = await CarReader.fromBytes(Buffer.from(data, "base64"));
  for await (const block of reader.blocks()) {
    if (block.cid.version === 1) {
      blocks.push(block);
    }
  }

  // TODO fix CAD Block CID.Version mismatch
  // @ts-ignore
  return importDAG(blocks);
};
