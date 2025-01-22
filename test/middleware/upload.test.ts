import { describe, test, expect, vi } from "vitest";
import { Request } from "express";
import {
  FileExtension,
  fileTypeFromBuffer,
  type FileTypeResult,
  type MimeType,
} from "file-type";
import { createMockFile } from "../test-utils/mockFile";
import { FileValidationError, validateFile } from "../../src/middleware/upload";
import { mock } from "vitest-mock-extended";

// Mock file-type
vi.mock("file-type", () => ({
  fileTypeFromBuffer: vi.fn(),
}));

describe("Upload Middleware", () => {
  const mockReq = mock<Request>();

  test("accepts valid file", async () => {
    const mockFile = createMockFile("test content", "test.txt", "text/plain");
    vi.mocked(fileTypeFromBuffer).mockResolvedValue({
      mime: "text/plain" as MimeType,
      ext: "txt" as FileExtension,
    } satisfies FileTypeResult);

    await expect(validateFile(mockReq, mockFile)).resolves.not.toThrow();
  });

  test("rejects oversized file", async () => {
    const largeContent = "x".repeat(12 * 1024 * 1024); // 12MB
    const mockFile = createMockFile(largeContent, "large.txt", "text/plain");

    await expect(validateFile(mockReq, mockFile)).rejects.toThrow(
      FileValidationError.SIZE_EXCEEDED,
    );
  });

  test("rejects file with invalid mime type", async () => {
    const mockFile = createMockFile(
      "test",
      "test.exe",
      "application/x-msdownload",
    );

    await expect(validateFile(mockReq, mockFile)).rejects.toThrow(
      FileValidationError.INVALID_TYPE,
    );
  });

  test("rejects file with mismatched content type", async () => {
    const mockFile = createMockFile("<html></html>", "fake.txt", "text/plain");
    vi.mocked(fileTypeFromBuffer).mockResolvedValue({
      mime: "text/html" as MimeType,
      ext: "html" as FileExtension,
    } satisfies FileTypeResult);

    await expect(validateFile(mockReq, mockFile)).rejects.toThrow(
      FileValidationError.CONTENT_MISMATCH,
    );
  });

  test("handles different allowed file types", async () => {
    const testCases = [
      { content: "test", name: "test.txt", type: "text/plain" as MimeType },
      { content: "{}", name: "test.json", type: "application/json" },
      { content: "PDF", name: "test.pdf", type: "application/pdf" as MimeType },
    ];

    for (const testCase of testCases) {
      const mockFile = createMockFile(
        testCase.content,
        testCase.name,
        testCase.type,
      );
      vi.mocked(fileTypeFromBuffer).mockResolvedValue(
        testCase.type === "application/json"
          ? undefined // JSON files typically return undefined
          : ({
              mime: testCase.type as MimeType,
              ext: testCase.name.split(".")[1] as FileExtension,
            } satisfies FileTypeResult),
      );

      await expect(validateFile(mockReq, mockFile)).resolves.not.toThrow();
    }
  });

  test("handles null file type detection", async () => {
    const mockFile = createMockFile("test", "test.txt", "text/plain");
    vi.mocked(fileTypeFromBuffer).mockResolvedValue(undefined);

    await expect(validateFile(mockReq, mockFile)).resolves.not.toThrow();
  });

  test("handles file type detection errors", async () => {
    const mockFile = createMockFile("test", "test.txt", "text/plain");
    vi.mocked(fileTypeFromBuffer).mockRejectedValue(
      new Error("Detection failed"),
    );

    await expect(validateFile(mockReq, mockFile)).rejects.toThrow();
  });

  test("accepts valid image files", async () => {
    const mockFile = createMockFile(
      "fake-image-data",
      "photo.jpg",
      "image/jpeg",
    );
    vi.mocked(fileTypeFromBuffer).mockResolvedValue({
      mime: "image/jpeg" as MimeType,
      ext: "jpg",
    } satisfies FileTypeResult);

    await expect(validateFile(mockReq, mockFile)).resolves.not.toThrow();
  });

  test("accepts valid JSON file", async () => {
    const mockFile = createMockFile(
      JSON.stringify({ test: "data" }),
      "data.json",
      "application/json",
    );
    // For JSON files, fileTypeFromBuffer typically returns undefined
    vi.mocked(fileTypeFromBuffer).mockResolvedValue(undefined);

    await expect(validateFile(mockReq, mockFile)).resolves.not.toThrow();
  });

  test("accepts file at exact size limit", async () => {
    const content = Buffer.alloc(11 * 1024 * 1024); // Exactly 11MB
    const mockFile = createMockFile(content, "at-limit.txt", "text/plain");
    vi.mocked(fileTypeFromBuffer).mockResolvedValue({
      mime: "text/plain" as MimeType,
      ext: "txt" as FileExtension,
    } satisfies FileTypeResult);

    await expect(validateFile(mockReq, mockFile)).resolves.not.toThrow();
  });

  test("accepts empty file with valid type", async () => {
    const mockFile = createMockFile("", "empty.txt", "text/plain");
    vi.mocked(fileTypeFromBuffer).mockResolvedValue(undefined);

    await expect(validateFile(mockReq, mockFile)).resolves.not.toThrow();
  });

  test("handles file without extension", async () => {
    const mockFile = createMockFile("content", "readme", "text/plain");
    vi.mocked(fileTypeFromBuffer).mockResolvedValue({
      mime: "text/plain" as MimeType,
      ext: "txt" as FileExtension,
    } satisfies FileTypeResult);

    await expect(validateFile(mockReq, mockFile)).resolves.not.toThrow();
  });

  test("rejects file with missing buffer", async () => {
    const mockFile = createMockFile("test", "test.txt", "text/plain");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockFile.buffer = undefined as any;

    await expect(validateFile(mockReq, mockFile)).rejects.toThrow();
  });
});
