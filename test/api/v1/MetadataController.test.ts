import { describe, test, vi } from "vitest";
import { expect } from "chai";
import { mock } from "vitest-mock-extended";
import { StorageService } from "../../../src/services/StorageService.js";
import { MetadataController } from "../../../src/controllers/MetadataController.js";
import {
  incorrectMetadata,
  mockMetadata,
} from "../../test-utils/mockMetadata.js";

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

describe("Metadata upload at v1/metadata", async () => {
  const controller = new MetadataController();
  const mockStorage = mock<StorageService>();

  test("Stores a new metadata object and returns CID", async () => {
    mocks.init.mockResolvedValue(mockStorage);

    mockStorage.uploadFile.mockResolvedValue({ cid: "TEST_CID" });
    const response = await controller.storeMetadata({ metadata: mockMetadata });
    expect(response.success).to.be.true;
    expect(response.data).to.not.be.undefined;
    expect(response.data?.cid).to.eq("TEST_CID");
  });

  test("Returns errors and message when metadata is invalid", async () => {
    mocks.init.mockResolvedValue(mockStorage);

    mockStorage.uploadFile.mockResolvedValue({ cid: "TEST_CID" });
    const response = await controller.storeMetadata({
      metadata: incorrectMetadata,
    });

    expect(response.success).to.be.false;
    expect(response.data).to.be.undefined;
    expect(response.message).to.eq("Metadata validation failed");
    expect(response.errors).to.deep.eq({
      metadata: "Provided metadata is not a valid hypercert metadata object",
    });
  });

  test("Handles errors during upload", async () => {
    mocks.init.mockResolvedValue(mockStorage);

    const mockError = new Error("Error uploading data");

    mockStorage.uploadFile.mockRejectedValue(mockError);
    const response = await controller.storeMetadata({ metadata: mockMetadata });
    expect(response.success).to.be.false;
    expect(response.data).to.be.undefined;
    expect(response.errors).to.deep.eq({
      metadata: "Error uploading data",
    });
  });
});

describe("Metadata validation at v1/metadata/validate", async () => {
  const controller = new MetadataController();

  test("Validates a metadata set and returns results", async () => {
    const response = await controller.validateMetadata({
      metadata: mockMetadata,
    });

    expect(response.success).to.be.true;
    expect(response.message).to.be.eq("Metadata is valid hypercert metadata");
  });

  test("Returns errors and message when metadata is invalid", async () => {
    const response = await controller.validateMetadata({
      metadata: incorrectMetadata,
    });

    expect(response.success).to.be.true;
    expect(response.message).to.eq("Metadata validation failed");
    expect(response.errors).to.deep.eq({
      metadata: "Provided metadata is not a valid hypercert metadata object",
    });
  });
});
