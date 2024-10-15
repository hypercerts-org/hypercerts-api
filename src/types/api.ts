import type { HypercertMetadata } from "@hypercerts-org/sdk";

/**
 * Interface for storing metadata on IPFS.
 */
export interface StoreMetadataRequest {
  metadata: HypercertMetadata;
}

/**
 * Interface for storing an allow list dump on IPFS
 */
export interface StoreAllowListRequest {
  allowList: string;
  totalUnits?: string;
}

/**
 * Interface for storing metadata and allow list dump on IPFS.
 */
export interface StoreMetadataWithAllowlistRequest
  extends StoreMetadataRequest,
    StoreAllowListRequest {}

/**
 * Interface for validating metadata.
 */
export interface ValidateMetadataRequest {
  metadata: HypercertMetadata;
}

/**
 * Interface for validating an allow list dump.
 */
export interface ValidateAllowListRequest {
  allowList: string;
  totalUnits?: string;
}

/**
 * Interface for validating metadata and allow list dump.
 */
export interface ValidateMetadataWithAllowlistRequest
  extends ValidateMetadataRequest,
    ValidateAllowListRequest {}

/**
 * Interface for a generic API response.
 */
export type ApiResponse<T = void> = {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string | string[]> | Error[];
};

/**
 * Interface for a storage response.
 */
export type StorageResponse = ApiResponse<{ cid: string }>;

/**
 * Interface for a validation response.
 */
export type ValidationResult<T = void> = {
  valid: boolean;
  data?: T;
  errors?: Record<string, string | string[]>;
};

/**
 * Interface for a validation response.
 */
export type ValidationResponse = ApiResponse<ValidationResult>;

/**
 * Interface for a user add or update request.
 */

export interface AddOrUpdateUserRequest {
  display_name: string;
  avatar: string;
  signature: string;
  chain_id: number;
}

export type AddOrUpdateUserResponse = ApiResponse<{ address: string } | null>;

/**
 * Interface for a blueprint add or update request.
 */
export type AddOrCreateBlueprintResponse = ApiResponse<{
  blueprint_id: number;
} | null>;

export type BlueprintDeleteRequest = {
  signature: string;
  chain_id: number;
  admin_address: string;
};

/**
 * Response for a created hyperboard
 */
export type HyperboardCreateResponse = ApiResponse<{
  id: string;
} | null>;

/**
 * Interface for creating a hyperboard
 */
export interface HyperboardCreateRequest {
  chainIds: number[];
  title: string;
  collections: {
    id?: string;
    title: string;
    description: string;
    blueprints: {
      blueprintId: number;
      factor: number;
    }[];
    hypercerts: {
      hypercertId: string;
      factor: number;
    }[];
  }[];
  backgroundImg?: string;
  borderColor: string;
  adminAddress: string;
  signature: string;
}

/**
 * Interface for updating a hyperboard
 */
export interface HyperboardUpdateRequest extends HyperboardCreateRequest {
  id: string;
}

export interface BlueprintCreateRequest {
  form_values: unknown;
  minter_address: string;
  admin_address: string;
  signature: string;
  chain_id: number;
}

export interface BlueprintQueueMintRequest {
  signature: string;
  chain_id: number;
  minter_address: string;
  tx_hash: string;
}
