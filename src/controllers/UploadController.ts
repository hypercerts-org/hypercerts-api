import {
  Controller,
  FormField,
  Post,
  Route,
  SuccessResponse,
  Tags,
  UploadedFiles,
} from "tsoa";
import {
  FileUploadError,
  NoFilesUploadedError,
  PartialUploadError,
  SingleUploadFailedError,
  UploadFailedError,
} from "../lib/uploads/errors.js";
import { StorageService } from "../services/StorageService.js";
import type { UploadResponse } from "../types/api.js";

// Type definitions and guards at module scope
type UploadResult = {
  cid: string;
  fileName: string;
};

function isSuccessfulUpload(
  result: PromiseSettledResult<UploadResult>,
): result is PromiseFulfilledResult<UploadResult> {
  return result.status === "fulfilled";
}

function isFailedUpload(
  result: PromiseSettledResult<UploadResult>,
): result is PromiseRejectedResult {
  return result.status === "rejected";
}

/**
 * Controller handling file uploads to IPFS storage
 * @class UploadController
 */
@Route("v2/upload")
@Tags("Upload")
export class UploadController extends Controller {
  /**
   * Upload one or more files to IPFS storage.
   *
   * @summary Upload files to IPFS
   * @param files - Array of files to upload (max 5 files, 10MB each)
   * @param jsonData - Optional JSON string with additional metadata
   * @returns Promise containing upload results with CIDs and any failed uploads
   *
   * @example
   * Using curl:
   * ```bash
   * curl -X POST http://api.example.com/v2/upload \
   *   -F "files=@/path/to/file1.txt" \
   *   -F "files=@/path/to/file2.txt" \
   *   -F "jsonData={\"key\":\"value\"}"
   * ```
   *
   * Using HTML Form:
   * ```html
   * <form action="/v2/upload" method="post" enctype="multipart/form-data">
   *   <input type="file" name="files" multiple>
   *   <input type="hidden" name="jsonData" value='{"key":"value"}'>
   *   <button type="submit">Upload</button>
   * </form>
   * ```
   *
   * Using Fetch API:
   * ```javascript
   * const formData = new FormData();
   * formData.append('files', fileInput.files[0]);
   * formData.append('files', fileInput.files[1]);
   * formData.append('jsonData', JSON.stringify({key: 'value'}));
   *
   * fetch('/v2/upload', {
   *   method: 'POST',
   *   body: formData
   * });
   * ```
   *
   * Full Success Response (201):
   * ```json
   * {
   *   "success": true,
   *   "message": "Upload successful",
   *   "uploadStatus": "all",
   *   "data": {
   *     "results": [
   *       { "cid": "Qm...", "fileName": "example1.txt" },
   *       { "cid": "Qm...", "fileName": "example2.txt" }
   *     ],
   *     "failed": []
   *   }
   * }
   * ```
   *
   * Multi-Status Response (207):
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
   *       {
   *         "fileName": "failed.txt",
   *         "error": "File exceeds size limit"
   *       }
   *     ]
   *   }
   * }
   * ```
   *
   * No Files Error Response (400):
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
   *
   * Upload Failed Error Response (500):
   * ```json
   * {
   *   "success": false,
   *   "message": "Upload failed",
   *   "errors": {
   *     "upload": "Failed to upload file"
   *   }
   * }
   * ```
   */
  @Post()
  @SuccessResponse(201, "Upload successful")
  public async upload(
    @UploadedFiles("files") files?: Express.Multer.File[],
    @FormField() jsonData?: string,
  ): Promise<UploadResponse> {
    try {
      if (!files?.length) {
        throw new NoFilesUploadedError();
      }

      const storage = await StorageService.init();

      if (jsonData) {
        console.debug("Got JSON data for future use");
      }

      const blobs = files.map(
        (file) => new Blob([file.buffer], { type: file.mimetype }),
      );

      const uploadResults = await Promise.allSettled(
        files.map(async (file, index) => {
          try {
            const result = await storage.uploadFile({
              file: blobs[index],
            });
            return {
              cid: result.cid,
              fileName: file.originalname,
            };
          } catch (error) {
            throw new SingleUploadFailedError(
              file.originalname,
              (error as Error).message,
            );
          }
        }),
      );

      const successful = uploadResults
        .filter(isSuccessfulUpload)
        .map((result) => result.value);

      const failed = uploadResults.filter(isFailedUpload).map((result) => {
        const error = result.reason as SingleUploadFailedError;
        return {
          fileName: error.fileName,
          error: error.errorDetail,
        };
      });

      if (failed.length > 0) {
        const data = {
          results: successful,
          failed: failed,
        };

        if (failed.length === uploadResults.length) {
          throw new UploadFailedError("All uploads failed", {
            results: [],
            failed: failed, // Preserve all failed upload details
          });
        }

        throw new PartialUploadError("Some uploads failed", data);
      }

      this.setStatus(201);
      return {
        success: true,
        message: "Upload successful",
        uploadStatus: "all",
        data: {
          results: successful,
          failed: [],
        },
      };
    } catch (error) {
      if (error instanceof FileUploadError) {
        this.setStatus(error.code);
        return {
          success: false,
          message: error.message,
          uploadStatus: error instanceof PartialUploadError ? "some" : "none",
          errors: error.errors,
          data:
            error instanceof PartialUploadError ||
            error instanceof UploadFailedError
              ? error.results
              : {
                  results: [],
                  failed: [
                    {
                      fileName:
                        error instanceof SingleUploadFailedError
                          ? error.fileName
                          : "unknown",
                      error:
                        error instanceof SingleUploadFailedError
                          ? error.errorDetail
                          : error.message,
                    },
                  ],
                },
        };
      }

      const uploadError = new UploadFailedError(
        `Upload failed: ${(error as Error).message}`,
        {
          results: [],
          failed: [
            {
              fileName: "unknown",
              error: (error as Error).message,
            },
          ],
        },
      );

      this.setStatus(uploadError.code);
      return {
        success: false,
        message: uploadError.message,
        uploadStatus: "none",
        errors: uploadError.errors,
        data: uploadError.results,
      };
    }
  }
}
