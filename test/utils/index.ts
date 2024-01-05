import { mockMetadata } from "./mockMetadata";
import { mockClaimdata } from "./mockClaimdata";
import { mockData } from "./mockData";
import {
  mockCorrectMetadataCid,
  mockCorrectDataCid,
  mockSomeDataCid,
} from "./cids";

const data = {
  metadata: { data: mockMetadata, cid: mockCorrectMetadataCid },
  claimdata: { data: mockClaimdata, cid: mockCorrectDataCid },
  someData: { data: mockData, cid: mockSomeDataCid },
};

export { data };
