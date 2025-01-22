import { describe, test, vi } from "vitest";
import { expect } from "chai";
import {
  incorrectMerkleTree,
  mockMerkleTree,
} from "../../test-utils/mockMerkleTree.js";
import { mock } from "vitest-mock-extended";
import { AllowListController } from "../../../src/controllers/AllowListController.js";
import { StorageService } from "../../../src/services/StorageService.js";

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

describe("Allow list upload at v1/allowlists", async () => {
  const controller = new AllowListController();
  const mockStorage = mock<StorageService>();

  test("Stores a new allowlist and returns CID", async () => {
    mocks.init.mockResolvedValue(mockStorage);

    mockStorage.uploadFile.mockResolvedValue({ cid: "TEST_CID" });
    const requestBody = {
      allowList: mockMerkleTree,
      totalUnits: "100000000",
    };
    const response = await controller.storeAllowList(requestBody);

    expect(response.success).to.be.true;
    expect(response.data).to.not.be.undefined;
    expect(response.data?.cid).to.eq("TEST_CID");
  });

  test("Returns errors and message when allowlist is invalid", async () => {
    mocks.init.mockResolvedValue(mockStorage);

    mockStorage.uploadFile.mockResolvedValue({ cid: "TEST_CID" });
    const requestBody = {
      allowList: incorrectMerkleTree,
      totalUnits: "100000000",
    };
    const response = await controller.storeAllowList(requestBody);

    expect(response.success).to.be.false;
    expect(response.data).to.be.undefined;
    expect(response.message).to.eq("Errors while validating allow list");
    expect(response.errors).to.deep.eq({
      allowListData: "Data could not be parsed to OpenZeppelin MerkleTree",
    });
  });

  test("Handles errors during upload", async () => {
    mocks.init.mockResolvedValue(mockStorage);

    const mockError = new Error("Error uploading data");
    mockStorage.uploadFile.mockRejectedValue(mockError);

    const requestBody = {
      allowList: mockMerkleTree,
      totalUnits: "100000000",
    };
    const response = await controller.storeAllowList(requestBody);

    expect(response.success).to.be.false;
    expect(response.data).to.be.undefined;
    expect(response.errors).to.deep.eq({
      allowList: "Error uploading data",
    });
  });
});

describe("Allow list validation at v1/allowlists/validate", async () => {
  const controller = new AllowListController();

  test("Validates correctness of allowlist and returns results", async () => {
    const requestBody = {
      allowList: mockMerkleTree,
      totalUnits: "100000000",
    };
    const response = await controller.validateAllowList(requestBody);
    expect(response.valid).to.be.true;
    expect(response.success).to.be.true;
  });

  test("Returns errors and message when allowlist is invalid", async () => {
    const requestBody = {
      allowList: incorrectMerkleTree,
      totalUnits: "100000000",
    };
    const response = await controller.validateAllowList(requestBody);

    expect(response.success).to.be.true;
    expect(response.valid).to.be.false;
    expect(response.message).to.eq("Errors while validating allow list");
    expect(response.errors).to.deep.eq({
      allowListData: "Data could not be parsed to OpenZeppelin MerkleTree",
    });
  });

  test("Returns errors and message when total units doesn't match allow list", async () => {
    const requestBody = {
      allowList: mockMerkleTree,
      totalUnits: "99",
    };
    const response = await controller.validateAllowList(requestBody);

    expect(response.success).to.be.true;
    expect(response.valid).to.be.false;
    expect(response.message).to.eq("Errors while validating allow list");
    expect(response.errors).to.deep.eq({
      totalUnits: "Total units do not match the sum of units in the allowlist",
    });
  });
});
