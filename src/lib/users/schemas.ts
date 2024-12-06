import { z } from "zod";

// This is the message schema that is signed by the multisig
export const USER_UPDATE_MESSAGE_SCHEMA = z.object({
  metadata: z.object({
    timestamp: z.number(),
  }),
  user: z.object({
    displayName: z.string().optional(),
    avatar: z.string().optional(),
  }),
});

export type MultisigUserUpdateMessage = z.infer<
  typeof USER_UPDATE_MESSAGE_SCHEMA
>;

// API request schemas for user updates
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
