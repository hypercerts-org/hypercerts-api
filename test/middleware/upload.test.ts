import { describe, test, expect, vi } from "vitest";
import { createMockFile } from "../test-utils/mockFile";
import { FileValidationError, validateFile } from "../../src/middleware/upload";
import { fileTypeFromBuffer, type FileTypeResult } from "file-type";
import { Request } from "express";
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
      mime: "text/plain" as const,
      ext: "txt",
    } satisfies FileTypeResult);

    await expect(validateFile(mockReq, mockFile)).resolves.not.toThrow();
  });

  test("rejects oversized file", async () => {
    const largeContent = "x".repeat(11 * 1024 * 1024); // 11MB
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
      mime: "text/html" as const,
      ext: "html",
    } satisfies FileTypeResult);

    await expect(validateFile(mockReq, mockFile)).rejects.toThrow(
      FileValidationError.CONTENT_MISMATCH,
    );
  });

  test("handles different allowed file types", async () => {
    const testCases = [
      { content: "test", name: "test.txt", type: "text/plain" as const },
      { content: "{}", name: "test.json", type: "application/json" as const },
      { content: "PDF", name: "test.pdf", type: "application/pdf" as const },
    ];

    for (const testCase of testCases) {
      const mockFile = createMockFile(
        testCase.content,
        testCase.name,
        testCase.type,
      );
      vi.mocked(fileTypeFromBuffer).mockResolvedValue({
        mime: testCase.type,
        ext: testCase.name.split(".")[1],
      } satisfies FileTypeResult);

      await expect(validateFile(mockReq, mockFile)).resolves.not.toThrow();
    }
  });

  test("handles null file type detection", async () => {
    const mockFile = createMockFile("test", "test.txt", "text/plain");
    vi.mocked(fileTypeFromBuffer).mockResolvedValue(null);

    await expect(validateFile(mockReq, mockFile)).resolves.not.toThrow();
  });

  test("handles file type detection errors", async () => {
    const mockFile = createMockFile("test", "test.txt", "text/plain");
    vi.mocked(fileTypeFromBuffer).mockRejectedValue(
      new Error("Detection failed"),
    );

    await expect(validateFile(mockReq, mockFile)).rejects.toThrow();
  });
});
