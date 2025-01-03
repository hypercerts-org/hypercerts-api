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
    const storage = await StorageService.init();

    try {
      if (jsonData) {
        console.debug("Got JSON data for future use");
      }

      const blobs = files?.map(
        (file) => new Blob([file.buffer], { type: file.mimetype }),
      );

      if (!files || !blobs) {
        this.setStatus(400);
        return {
          success: false,
          message: "No files uploaded",
          errors: { upload: "No files uploaded" },
        };
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
            throw {
              fileName: file.originalname,
              error: (error as Error).message,
            };
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
        .map((result) => result.reason as { fileName: string; error: string });

      if (failed.length > 0) {
        this.setStatus(failed.length === uploadResults.length ? 500 : 207);
        return {
          success: false,
          message: "Some uploads failed",
          data: {
            results: successful,
            failed: failed.map((f) => ({
              fileName: f.fileName,
              error: f.error,
            })),
          },
        };
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
      this.setStatus(400);
      return {
        success: false,
        message: "Upload failed",
        errors: { upload: (error as Error).message },
      };
    }
  }
}
