import { Request } from "express";
import { fileTypeFromBuffer } from "file-type";
import { lookup } from "mime-types";
import multer from "multer";

// Allowed file types
const ALLOWED_MIMES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "text/plain",
  "application/json",
]);

// File validation error types
export enum FileValidationError {
  INVALID_TYPE = "INVALID_TYPE",
  CONTENT_MISMATCH = "CONTENT_MISMATCH",
  SIZE_EXCEEDED = "SIZE_EXCEEDED",
}

// File validation middleware
export const validateFile = async (
  req: Request,
  file: Express.Multer.File,
): Promise<void> => {
  // Check if buffer exists
  if (!file.buffer) {
    throw new Error(FileValidationError.INVALID_TYPE);
  }

  // 1. Check file size
  if (file.size > 11 * 1024 * 1024) {
    throw new Error(FileValidationError.SIZE_EXCEEDED);
  }

  // 2. Verify mime type
  const detectedType = await fileTypeFromBuffer(file.buffer);
  const declaredMime = lookup(file.originalname) || file.mimetype;

  if (!ALLOWED_MIMES.has(declaredMime)) {
    throw new Error(FileValidationError.INVALID_TYPE);
  }

  // 3. Check if declared type matches actual content
  if (detectedType && detectedType.mime !== declaredMime) {
    throw new Error(FileValidationError.CONTENT_MISMATCH);
  }
};

// Configure multer with validation
export const upload = multer({
  limits: {
    fileSize: 11 * 1024 * 1024, // 11MB
    files: 5,
  },
  storage: multer.memoryStorage(),
  fileFilter: async (req, file, cb) => {
    try {
      await validateFile(req, file);
      cb(null, true);
    } catch (error) {
      cb(error as Error);
    }
  },
});
