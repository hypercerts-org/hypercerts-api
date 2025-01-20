import { UploadResponse } from "../../types/api.js";

/**
 * Base class for file upload errors
 * @class FileUploadError
 * @extends Error
 *
 * @example
 * ```typescript
 * throw new FileUploadError(500, "Upload failed");
 * ```
 *
 * Response:
 * ```json
 * {
 *   "success": false,
 *   "message": "Upload failed",
 *   "uploadStatus": "none"
 * }
 * ```
 */
export class FileUploadError extends Error {
  code: number;
  public errors: UploadResponse["errors"];

  /**
   * @param code - HTTP status code
   * @param message - Error message
   */
  constructor(code: number, message: string) {
    super(message);
    this.name = "FileUploadError";
    this.code = code;
  }
}

/**
 * Error thrown when no files are provided in the upload request
 * @class NoFilesUploadedError
 * @extends FileUploadError
 *
 * @example
 * ```typescript
 * throw new NoFilesUploadedError();
 * ```
 *
 * Response:
 * ```json
 * {
 *   "success": false,
 *   "message": "No files uploaded",
 *   "uploadStatus": "none",
 *   "errors": {
 *     "upload": "No files uploaded"
 *   }
 * }
 * ```
 */
export class NoFilesUploadedError extends FileUploadError {
  constructor() {
    super(400, "No files uploaded");
    this.name = "NoFilesUploadedError";
    this.errors = { upload: "No files uploaded" };
  }
}

/**
 * Error thrown when some files uploaded successfully but others failed
 * @class PartialUploadError
 * @extends FileUploadError
 *
 * @example
 * ```typescript
 * throw new PartialUploadError("Some uploads failed", {
 *   results: [{ cid: "Qm...", fileName: "success.txt" }],
 *   failed: [{ fileName: "failed.txt", error: "Upload failed" }]
 * });
 * ```
 *
 * Response:
 * ```json
 * {
 *   "success": false,
 *   "message": "Some uploads failed",
 *   "uploadStatus": "some",
 *   "data": {
 *     "results": [
 *       { "cid": "Qm...", "fileName": "success.txt" }
 *     ],
 *     "failed": [
 *       { "fileName": "failed.txt", "error": "Upload failed" }
 *     ]
 *   }
 * }
 * ```
 */
export class PartialUploadError extends FileUploadError {
  constructor(
    message: string,
    public results: UploadResponse["data"],
  ) {
    super(207, message);
    this.name = "PartialUploadError";
  }
}

/**
 * Error thrown when a single file upload fails
 * @class SingleUploadFailedError
 * @extends FileUploadError
 *
 * @example
 * ```typescript
 * throw new SingleUploadFailedError("example.txt", "File too large");
 * ```
 *
 * Response:
 * ```json
 * {
 *   "success": false,
 *   "message": "Failed to upload example.txt",
 *   "uploadStatus": "none",
 *   "data": {
 *     "results": [],
 *     "failed": [
 *       { "fileName": "example.txt", "error": "File too large" }
 *     ]
 *   }
 * }
 * ```
 */
export class SingleUploadFailedError extends FileUploadError {
  constructor(
    public fileName: string,
    public errorDetail: string,
  ) {
    super(422, `Failed to upload ${fileName}`);
    this.name = "SingleUploadFailedError";
  }
}

/**
 * Error thrown when the upload service is unavailable or all uploads fail due to service issues
 * @class UploadFailedError
 * @extends FileUploadError
 *
 * @example
 * ```typescript
 * throw new UploadFailedError("Upload service unavailable", {
 *   results: [],
 *   failed: [
 *     { fileName: "file1.txt", error: "IPFS service unavailable" },
 *     { fileName: "file2.txt", error: "Storage service not responding" }
 *   ]
 * });
 * ```
 *
 * Response:
 * ```json
 * {
 *   "success": false,
 *   "message": "Upload service unavailable",
 *   "uploadStatus": "none",
 *   "errors": {
 *     "upload": "Upload service unavailable"
 *   },
 *   "data": {
 *     "results": [],
 *     "failed": [
 *       { "fileName": "file1.txt", "error": "IPFS service unavailable" },
 *       { "fileName": "file2.txt", "error": "Storage service not responding" }
 *     ]
 *   }
 * }
 * ```
 */
export class UploadFailedError extends FileUploadError {
  constructor(
    message: string,
    public results: UploadResponse["data"],
  ) {
    super(500, message);
    this.name = "UploadFailedError";
    this.errors = { upload: message };
  }
}
