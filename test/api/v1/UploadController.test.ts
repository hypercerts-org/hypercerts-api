import { expect } from "chai";
import { describe, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";
import { UploadController } from "../../../src/controllers/UploadController.js";
import { SingleUploadFailedError } from "../../../src/lib/uploads/errors.js";
import { StorageService } from "../../../src/services/StorageService.js";
import { createMockFile, mockTextFile } from "../../test-utils/mockFile.js";

const mocks = vi.hoisted(() => {
  return {
    init: vi.fn(),
  };
});

vi.mock("../../../src/services/StorageService", async () => {
  return {
    StorageService: { init: mocks.init },
  };
});

describe("File upload at v1/upload", async () => {
  const controller = new UploadController();
  const mockStorage = mock<StorageService>();

  test("Successfully uploads a single file and returns CID", async () => {
    mocks.init.mockResolvedValue(mockStorage);
    mockStorage.uploadFile.mockResolvedValue({ cid: "TEST_CID" });

    const response = await controller.upload([mockTextFile]);

    expect(response.success).to.be.true;
    expect(response.uploadStatus).to.equal("all");
    expect(response.data).to.not.be.undefined;
    expect(response.data?.results).to.have.lengthOf(1);
    expect(response.data?.results[0]).to.deep.equal({
      cid: "TEST_CID",
      fileName: "test.txt",
    });
    expect(response.data?.failed).to.have.lengthOf(0);
  });

  test("Successfully uploads multiple files and returns CIDs", async () => {
    mocks.init.mockResolvedValue(mockStorage);
    mockStorage.uploadFile
      .mockResolvedValueOnce({ cid: "TEST_CID_1" })
      .mockResolvedValueOnce({ cid: "TEST_CID_2" });

    const mockFiles = [
      createMockFile("content 1", "test1.txt"),
      createMockFile("content 2", "test2.txt"),
    ];

    const response = await controller.upload(mockFiles);

    expect(response.success).to.be.true;
    expect(response.uploadStatus).to.equal("all");
    expect(response.data?.results).to.have.lengthOf(2);
    expect(response.data?.results).to.deep.equal([
      { cid: "TEST_CID_1", fileName: "test1.txt" },
      { cid: "TEST_CID_2", fileName: "test2.txt" },
    ]);
    expect(response.data?.failed).to.have.lengthOf(0);
  });

  test("Handles partial upload failures", async () => {
    mocks.init.mockResolvedValue(mockStorage);
    mockStorage.uploadFile
      .mockResolvedValueOnce({ cid: "TEST_CID_1" })
      .mockRejectedValueOnce(new Error("Upload failed"));

    const mockFiles = [
      createMockFile("content 1", "test1.txt"),
      createMockFile("content 2", "test2.txt"),
    ];

    const response = await controller.upload(mockFiles);

    expect(response.success).to.be.false;
    expect(response.uploadStatus).to.equal("some");
    expect(response.data?.results).to.have.lengthOf(1);
    expect(response.data?.results[0]).to.deep.equal({
      cid: "TEST_CID_1",
      fileName: "test1.txt",
    });
    expect(response.data?.failed).to.have.lengthOf(1);
    expect(response.data?.failed[0]).to.deep.equal({
      fileName: "test2.txt",
      error: "Upload failed",
    });
  });

  test("Handles no files provided", async () => {
    mocks.init.mockResolvedValue(mockStorage);

    const response = await controller.upload(undefined);

    expect(response.success).to.be.false;
    expect(response.uploadStatus).to.equal("none");
    expect(response.message).to.equal("No files uploaded");
    expect(response.errors).to.deep.equal({
      upload: "No files uploaded",
    });
  });

  test("Handles complete upload failure", async () => {
    mocks.init.mockResolvedValue(mockStorage);
    const mockError = new Error("Storage service unavailable");
    mockStorage.uploadFile.mockRejectedValue(mockError);

    const response = await controller.upload([mockTextFile]);

    expect(response.success).to.be.false;
    expect(response.uploadStatus).to.equal("none");
    expect(response.data?.results).to.have.lengthOf(0);
    expect(response.data?.failed).to.have.lengthOf(1);
    expect(response.data?.failed[0]).to.deep.equal({
      fileName: "test.txt",
      error: "Storage service unavailable",
    });
  });

  test("Handles catastrophic failure", async () => {
    mocks.init.mockRejectedValue(new Error("Service initialization failed"));

    const response = await controller.upload([mockTextFile]);

    expect(response.success).to.be.false;
    expect(response.uploadStatus).to.equal("none");
    expect(response.message).to.include("Upload failed");
    expect(response.errors?.upload).to.include("Service initialization failed");
  });

  test("Handles different file types", async () => {
    mocks.init.mockResolvedValue(mockStorage);
    mockStorage.uploadFile
      .mockResolvedValueOnce({ cid: "TEST_CID_1" })
      .mockResolvedValueOnce({ cid: "TEST_CID_2" });

    const mockFiles = [
      createMockFile("text content", "doc.txt", "text/plain"),
      createMockFile("<html></html>", "page.html", "text/html"),
    ];

    const response = await controller.upload(mockFiles);

    expect(response.success).to.be.true;
    expect(response.uploadStatus).to.equal("all");
    expect(response.data?.results).to.have.lengthOf(2);
    expect(response.data?.results).to.deep.equal([
      { cid: "TEST_CID_1", fileName: "doc.txt" },
      { cid: "TEST_CID_2", fileName: "page.html" },
    ]);
  });

  test("Handles empty file array", async () => {
    mocks.init.mockResolvedValue(mockStorage);

    const response = await controller.upload([]);

    expect(response.success).to.be.false;
    expect(response.uploadStatus).to.equal("none");
    expect(response.message).to.equal("No files uploaded");
  });

  test("Handles file size validation", async () => {
    mocks.init.mockResolvedValue(mockStorage);
    mockStorage.uploadFile.mockRejectedValue(
      new SingleUploadFailedError("large.txt", "Failed to upload large.txt"),
    );

    const largeFile = createMockFile(
      Buffer.alloc(12 * 1024 * 1024),
      "large.txt",
      "text/plain",
    );

    const response = await controller.upload([largeFile]);

    expect(response.success).to.be.false;
    expect(response.uploadStatus).to.equal("none");
    expect(response.data?.failed[0]).to.deep.equal({
      fileName: "large.txt",
      error: "Failed to upload large.txt",
    });
  });

  test("Processes optional JSON metadata", async () => {
    mocks.init.mockResolvedValue(mockStorage);
    mockStorage.uploadFile.mockResolvedValue({ cid: "TEST_CID" });

    const response = await controller.upload(
      [mockTextFile],
      JSON.stringify({ key: "value" }),
    );

    expect(response.success).to.be.true;
    expect(response.data?.results[0].cid).to.equal("TEST_CID");
  });
});
