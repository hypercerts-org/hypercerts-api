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
 * Interface for creating a collection
 */
export interface HyperboardCreateRequest {
  name: string;
  description: string;
  collections: {
    hypercertId: string;
    chainId: string;
  }[];
  backgroundColor: string;
  backgroundImage?: string;
  borderColor: string;
}

/**
 * Response for a created collection
 */
export type HyperboardCreateResponse = ApiResponse<{
  id: string;
} | null>;
