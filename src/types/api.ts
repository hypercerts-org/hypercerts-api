import type { HypercertMetadata } from "@hypercerts-org/sdk";

// Base response type for all API responses
export interface ApiResponse {
  success: boolean; // Whether the API call itself succeeded
  message?: string; // Human readable message about the operation
  errors?: Record<string, string | string[]>; // Any errors that occurred
}

// Response for operations that return data
export interface DataResponse<T> extends ApiResponse {
  data?: T;
}

// Response specifically for validation operations
export interface ValidationResponse extends ApiResponse {
  valid: boolean; // Whether the validated content is valid
  data?: unknown; // Optional validated/transformed data
}

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
 * Interface for a storage response.
 */
export interface StorageResponse extends DataResponse<{ cid: string }> {}

/**
 * Interface for a validation response.
 */
export interface ValidationResponse extends ApiResponse {
  valid: boolean; // Whether the validated content is valid
  data?: unknown; // Optional validated/transformed data
}

/**
 * Interface for a user add or update request.
 */

export interface AddOrUpdateUserRequest {
  display_name: string;
  avatar: string;
  signature: string;
  chain_id: number;
}

export interface UserResponse extends DataResponse<{ address: string }> {}

/**
 * Interface for a blueprint add or update request.
 */
export interface BlueprintResponse
  extends DataResponse<{ blueprint_id: number }> {}

export type BlueprintDeleteRequest = {
  signature: string;
  chain_id: number;
  admin_address: string;
};

/**
 * Response for a created hyperboard
 */
export interface HyperboardResponse extends DataResponse<{ id: string }> {}

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
