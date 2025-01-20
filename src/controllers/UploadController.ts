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
   * @returns Promise containing upload results with CIDs and any failed uploads
   *
   * @example
   * Request:
   * ```
   * POST /v1/upload
   * Content-Type: multipart/form-data
   *
   * files: [File, File, ...]
   * ```
   *
   * Success Response:
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
   * Partial Success Response:
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
