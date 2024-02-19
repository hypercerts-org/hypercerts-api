import { stitchSchemas } from "@graphql-tools/stitch";

import { easSubschema } from "./eas";
import { hypercertsSubschema } from "./hypercerts";
import { metadataSubschema } from "./metadata";

const gatewaySchema = stitchSchemas({
  subschemas: [easSubschema, hypercertsSubschema, metadataSubschema],
});

export { gatewaySchema };
