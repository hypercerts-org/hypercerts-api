import {
  HyperboardOwner,
  Section,
} from "../graphql/schemas/typeDefs/hyperboardTypeDefs.js";
import _ from "lodash";

export const processSectionsToHyperboardOwnership = (
  sections: Section[],
): HyperboardOwner[] => {
  const numberOfSectionsWithOwners = sections.filter(
    (section) => !!section.owners?.length,
  ).length;

  if (numberOfSectionsWithOwners === 0) {
    return [];
  }

  return _.chain(sections)
    .flatMap((section) => section.owners)
    .groupBy((owner) => owner?.address)
    .mapValues((values) => ({
      ...values[0],
      percentage_owned:
        values.reduce((acc, owner) => acc + (owner?.percentage_owned || 0), 0) /
        numberOfSectionsWithOwners,
    }))
    .values()
    .value();
};
