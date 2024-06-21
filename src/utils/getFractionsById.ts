import { graphql } from "gql.tada";
import { hypercertClient } from "../client/hypercerts.js";
import { indexerEnvironment } from "./constants.js";
import { CONSTANTS } from "@hypercerts-org/sdk";
import { urqlClient } from "../client/graphql.js";

const fractionsByIdQuery = graphql(`
  query fractionsById($fraction_id: String!) {
    fractions(where: { hypercert_id: { eq: $fraction_id } }) {
      data {
        creation_block_timestamp
        fraction_id
        last_block_update_timestamp
        owner_address
        units
      }
    }
  }
`);

export const getFractionsById = async (fractionId: string) => {
  const { data, error } = await urqlClient
    .query(fractionsByIdQuery, {
      fraction_id: fractionId,
    })
    .toPromise();

  if (error) {
    throw new Error(error.message);
  }

  return data?.fractions.data;
};
