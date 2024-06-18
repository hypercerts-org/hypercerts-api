import {describe, test, vi} from "vitest";
import {expect} from "chai";
import {mock} from "vitest-mock-extended";
import {StorageService} from "../../../src/services/StorageService.js";
import {MetadataController} from "../../../src/controllers/MetadataController.js";
import {incorrectMetadata, mockMetadata} from "../../utils/mockMetadata.js";

const mocks = vi.hoisted(() => {
    return {
        init: vi.fn(),
    }
})


vi.mock('../../../src/services/StorageService', async () => {
    return {
        StorageService: {init: mocks.init}
    }
})

describe("Metadata upload at v1/metadata", async () => {
    const controller = new MetadataController();
    const mockStorage = mock<StorageService>();

    test("Stores a new metadata object and returns CID", async () => {
        mocks.init.mockResolvedValue(mockStorage);

        mockStorage.uploadFile.mockResolvedValue({cid: "TEST_CID"})
        const requestBody = mockMetadata;
        const response = await controller.storeMetadata(requestBody);
        expect(response.success).to.be.true;
        expect(response.data).to.not.be.undefined;
        expect(response.data?.cid).to.eq("TEST_CID");
    })

    test("Returns errors and message when metadata is invalid", async () => {

        mocks.init.mockResolvedValue(mockStorage);

        mockStorage.uploadFile.mockResolvedValue({cid: "TEST_CID"})
        const requestBody = incorrectMetadata;
        const response = await controller.storeMetadata(requestBody);

        expect(response.success).to.be.false;
        expect(response.data).to.be.undefined;
        expect(response.message).to.eq("Errors while validating allow list")
        expect(response.errors).to.deep.eq({
            "metadata": "Provided metadata is not a valid hypercert metadata object",
        });
    })

    test("Handles errors during upload", async () => {
        mocks.init.mockResolvedValue(mockStorage);

        const mockError = new Error("Error uploading data");

        mockStorage.uploadFile.mockRejectedValue(mockError)
        const requestBody = mockMetadata;
        const response = await controller.storeMetadata(requestBody);
        expect(response.success).to.be.false;
        expect(response.data).to.be.undefined;
        expect(response.errors).to.deep.eq({
            metadata: "Error uploading data"
        });
    })
})

describe("Metadata validation at v1/metadata/validate", async () => {
    const controller = new MetadataController();

    test("Validates a metadata set and returns results", async () => {

        const requestBody = mockMetadata;

        const response = await controller.validateMetadata(requestBody);

        expect(response.valid).to.be.true;
        expect(response.success).to.be.true;
        expect(response.message).to.be.eq("Metadata is valid hypercert metadata")
    })

    test("Returns errors and message when metadata is invalid", async () => {

        const requestBody = incorrectMetadata;

        const response = await controller.validateMetadata(requestBody);

        expect(response.success).to.be.true;
        expect(response.message).to.eq("Errors while validating metadata and/or allow list")
        expect(response.errors).to.deep.eq({
            "metadata": "Provided metadata is not a valid hypercert metadata object",
        });
    })
})

