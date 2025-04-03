import { BaseResponse } from "../../types/api.js";

/**
 * Base error class for handling controller errors
 * @extends Error
 */
export class ControllerError extends Error {
  /**
   * HTTP status code for response
   */
  statusCode: number;

  /**
   * Any additional, more fine-grained error details
   */
  errors?: Record<string, unknown>;

  /**
   * Creates a new ControllerError
   * @param message - Error message
   * @param statusCode - HTTP status code for response
   */
  constructor(
    message = "Unknown error",
    statusCode = 500,
    errors?: Record<string, unknown>,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = errors;
    // This is needed for proper inheritance with built-in Error in TypeScript
    Object.setPrototypeOf(this, ControllerError.prototype);
  }

  toResponse(): BaseResponse {
    return {
      success: false,
      message: this.message,
      errors: this.errors,
    };
  }
}

export function isControllerError(error: unknown): error is ControllerError {
  return error instanceof ControllerError;
}
