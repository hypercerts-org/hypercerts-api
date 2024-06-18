import {describe, test, vi} from "vitest";
import {expect} from "chai";
import {MarketplaceController} from "../../../src/controllers/MarketplaceController.js";
import {faker} from "@faker-js/faker";

const mocks = vi.hoisted(() => {
    return {
        storeOrder: vi.fn(),
    }
})


vi.mock('../../../src/services/SupabaseDataService', async () => {
    return {
        SupabaseDataService: {storeOrder: mocks.storeOrder}
    }
})

describe("Order storage at v1/marketplace/orders", async () => {
    const controller = new MarketplaceController();

    console.log(faker.string.hexadecimal({length: 32}))

    const order = {
        "quoteType": 1,
        "globalNonce": "0",
        "orderNonce": "2",
        "strategyId": 0,
        "collectionType": 2,
        "collection": "0xa16dfb32eb140a6f3f2ac68f41dad8c7e83c4941",
        "currency": "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
        "signer": "0x59266D85D94666D037C1e32dAa8FaC9E95CdaFEf",
        "startTime": 1704299563,
        "endTime": 1704385963,
        "price": "10000000000",
        "signature": "0x2532c5fb4fcf3211139951aa4d06eb81a63315bec95dda9a384bc5f5345be0131ca52df337545680c55eb56a14d93ff159115988a460a3590cd7d5b2a1bd842a1c",
        "additionalParameters": "0x",
        "chainId": 11155111,
        "subsetNonce": 0,
        "itemIds": ["23819765684465692442436222520223774801923"],
        "amounts": [1]
    }

    const storageResponse = {
        data: order
    }


    test("Submits a new order for validation and storage on the database.", async () => {
        mocks.storeOrder.mockResolvedValue(storageResponse);
        const response = await controller.storeOrder(order);

        console.log(response)
        expect(response?.success).to.be.true;
        expect(response?.data).to.not.be.undefined;
        expect(response?.data).to.eq({...order, status: "VALID", hash: "0x"});
    })
})
