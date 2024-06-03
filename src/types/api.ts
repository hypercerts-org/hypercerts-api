/**
 * Response object for a store request.
 *
 * @example {
 *     success: true,
 *     data: { cid: "QmXt3..."}, }
 * }
 */
export type StoreResponse<T = void> = {
    success: boolean;
    data?: T
    message: string;
    errors?: Record<string, string | string[]> | Error[];
};

/**
 * Response object for a validation request.
 *
 * @example {
 *     valid: true,
 *     message: "Metadata valid",
 * }
 *
 * @example {
 *     valid: false,
 *     message: "Metadata validation failed",
 *     data: { metadata: "No claim data provided"}, }
 * }
 */
export type ValidationResponse = {
    valid: boolean;
    message: string;
    errors?: Record<string, string | string[]>;
};


export type ValidationResult<T = void> = {
    data?: T;
    valid: boolean;
    errors: Record<string, string | string[]>;
};

export type ApiResponse<T = void> = {
    success: boolean;
    data?: T;
    message: string;
    errors?: Record<string, string | string[]> | Error[];
};