import type { HypercertMetadata } from "@hypercerts-org/sdk";

/*
 * The types in this file somewhat replicate the zod schemas we use in our controllers.
 * Currently tsoa doesn't work with zod inferred types.
 * See https://github.com/lukeautry/tsoa/issues/1256.
 */
// Base response type for all API responses
export interface BaseResponse {
  success: boolean; // Whether the API call itself succeeded
  message?: string; // Human readable message about the operation
  errors?: Record<string, string | string[]>; // Any errors that occurred
}

// Response for operations that return data
export interface DataResponse<T> extends BaseResponse {
  data?: T;
}

// Response specifically for validation operations
export interface ValidationResponse extends BaseResponse {
  valid: boolean; // Whether the validated content is valid
  data?: unknown; // Optional validated/transformed data
}

// Storage-related interfaces
export interface StorageResponse extends DataResponse<{ cid: string }> {}

export type UploadStatus = "all" | "some" | "none";

export interface UploadResponse {
  success: boolean;
  message: string;
  uploadStatus: UploadStatus;
  data?: {
    results: Array<{
      cid: string;
      fileName: string;
    }>;
    failed: Array<{
      fileName: string;
      error: string;
    }>;
  };
  errors?: Record<string, string>;
}

// Data-related interfaces
export interface StoreDataRequest {
  data: unknown;
}

export interface StoreMetadataRequest {
  metadata: HypercertMetadata;
}

export interface StoreAllowListRequest {
  allowList: string;
  totalUnits?: string;
}

export interface StoreMetadataWithAllowlistRequest
  extends StoreMetadataRequest,
    StoreAllowListRequest {}

// Validation-related interfaces
export interface ValidateMetadataRequest {
  metadata: HypercertMetadata;
}

export interface ValidateAllowListRequest {
  allowList: string;
  totalUnits?: string;
}

export interface ValidateMetadataWithAllowlistRequest
  extends ValidateMetadataRequest,
    ValidateAllowListRequest {}

// User-related interfaces
interface BaseUserUpsertRequest {
  chain_id: number;
}

interface EOAUserUpsertRequest extends BaseUserUpsertRequest {
  type: "eoa";
  display_name?: string;
  avatar?: string;
  signature: string;
}

interface MultisigUserUpsertRequest extends BaseUserUpsertRequest {
  type: "multisig";
  messageHash: string;
}

export type AddOrUpdateUserRequest =
  | EOAUserUpsertRequest
  | MultisigUserUpsertRequest;

export interface UserResponse extends DataResponse<{ address: string }> {}

// Blueprint-related interfaces
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

export interface BlueprintDeleteRequest {
  signature: string;
  chain_id: number;
  admin_address: string;
}

export interface BlueprintResponse
  extends DataResponse<{ blueprint_id: number }> {}

// Hyperboard-related interfaces
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

export interface HyperboardUpdateRequest extends HyperboardCreateRequest {
  id: string;
}

export interface HyperboardResponse extends DataResponse<{ id: string }> {}
