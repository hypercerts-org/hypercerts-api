import { mockMetadata } from "./mockMetadata";
import { mockClaimdata } from "./mockClaimdata";
import { mockData } from "./mockData";
import {
  mockCorrectMetadataCid,
  mockCorrectDataCid,
  mockSomeDataCid,
  mockMerkleTreeCid,
} from "./cids";
import { mockMerkleTree } from "./mockMerkleTree";

const data = {
  merkleTree: { data: mockMerkleTree, cid: mockMerkleTreeCid },
  claimdata: { data: mockClaimdata, cid: mockCorrectDataCid },
  metadata: { data: mockMetadata, cid: mockCorrectMetadataCid },
  someData: { data: mockData, cid: mockSomeDataCid },
};

export { data };
