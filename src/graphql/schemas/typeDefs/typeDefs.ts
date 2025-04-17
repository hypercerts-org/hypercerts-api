export const EntityTypeDefs = {
  Metadata: "Metadata",
  Hypercert: "Hypercert",
  Fraction: "Fraction",
  Contract: "Contract",
  Attestation: "Attestation",
  AttestationSchema: "AttestationSchema",
  AllowlistRecord: "AllowlistRecord",
  Blueprint: "Blueprint",
  SignatureRequest: "SignatureRequest",
  Collection: "Collection",
  Order: "Order",
  Sale: "Sale",
  Hyperboard: "Hyperboard",
  User: "User",
} as const;

export type EntityTypeDefs = keyof typeof EntityTypeDefs;
