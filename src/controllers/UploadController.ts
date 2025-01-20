import {
  Controller,
  FormField,
  Post,
  Route,
  SuccessResponse,
  Tags,
  UploadedFiles,
} from "tsoa";
import { StorageService } from "../services/StorageService.js";
import type { UploadResponse } from "../types/api.js";
import {
  FileUploadError,
  NoFilesUploadedError,
  PartialUploadError,
  UploadFailedError,
} from "../lib/uploads/errors.js";

/**
 * Controller handling file uploads to IPFS storage
 * @class UploadController
 */
@Route("v1/upload")
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
   * curl -X POST http://api.example.com/v1/upload \
   *   -F "files=@/path/to/file1.txt" \
   *   -F "files=@/path/to/file2.txt" \
   *   -F "jsonData={\"key\":\"value\"}"
   * ```
   *
   * Using HTML Form:
   * ```html
   * <form action="/v1/upload" method="post" enctype="multipart/form-data">
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
   * fetch('/v1/upload', {
   *   method: 'POST',
   *   body: formData
   * });
   * ```
   *
   * Success Response (201):
   * ```json
   * {
   *   "success": true,
   *   "message": "Upload successful",
   *   "data": {
   *     "results": [
   *       { "cid": "Qm...", "fileName": "example.txt" }
   *     ],
   *     "failed": []
   *   }
   * }
   * ```
   *
   * Partial Success Response (207):
   * ```json
   * {
   *   "success": false,
   *   "message": "Some uploads failed",
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
   *
   * No Files Error Response (400):
   * ```json
   * {
   *   "success": false,
   *   "message": "No files uploaded",
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
      const storage = await StorageService.init();

      if (jsonData) {
        console.debug("Got JSON data for future use");
      }

      const blobs = files?.map(
        (file) => new Blob([file.buffer], { type: file.mimetype }),
      );

      if (!files || !blobs) {
        throw new NoFilesUploadedError();
      }

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
            throw new UploadFailedError(
              `Failed to upload file`,
              file.originalname,
              (error as Error).message,
            );
          }
        }),
      );

      const successful = uploadResults
        .filter(
          (
            result,
          ): result is PromiseFulfilledResult<{
            cid: string;
            fileName: string;
          }> => result.status === "fulfilled",
        )
        .map((result) => result.value);

      const failed = uploadResults
        .filter(
          (result): result is PromiseRejectedResult =>
            result.status === "rejected",
        )
        .map((result) => {
          const error = result.reason as UploadFailedError;
          return {
            fileName: error.fileName,
            error: error.errorDetail,
          };
        });

      if (failed.length > 0) {
        const data = {
          results: successful,
          failed: failed.map((f) => ({
            fileName: f.fileName,
            error: f.error,
          })),
        };

        if (failed.length === uploadResults.length) {
          throw new UploadFailedError(
            "All uploads failed",
            "multiple files",
            "None of the files could be uploaded",
          );
        }

        throw new PartialUploadError("Some uploads failed", data);
      }

      this.setStatus(201);
      return {
        success: true,
        message: "Upload successful",
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
          ...(error.errors && { errors: error.errors }),
          ...(error instanceof PartialUploadError && { data: error.results }),
        };
      }

      throw new UploadFailedError(
        "Upload failed",
        "unknown file",
        (error as Error).message,
      );
    }
  }
}
