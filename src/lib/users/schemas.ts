import { z } from "zod";

export const USER_UPDATE_REQUEST_BASE_SCHEMA = z.object({
  chain_id: z.number(),
});

export const EOA_UPDATE_REQUEST_SCHEMA = USER_UPDATE_REQUEST_BASE_SCHEMA.extend(
  {
    type: z.literal("eoa"),
    display_name: z.string().optional(),
    avatar: z.string().optional(),
    signature: z.string(),
  },
);

export const MULTISIG_UPDATE_REQUEST_SCHEMA =
  USER_UPDATE_REQUEST_BASE_SCHEMA.extend({
    type: z.literal("multisig"),
    messageHash: z.string(),
  });

export const USER_UPDATE_REQUEST_SCHEMA = z.union([
  EOA_UPDATE_REQUEST_SCHEMA,
  MULTISIG_UPDATE_REQUEST_SCHEMA,
]);

export type EOAUpdateRequest = z.infer<typeof EOA_UPDATE_REQUEST_SCHEMA>;

export type MultisigUpdateRequest = z.infer<
  typeof MULTISIG_UPDATE_REQUEST_SCHEMA
>;
