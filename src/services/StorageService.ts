import {setup} from "../client/w3up.js";
import type {Client} from "@web3-storage/w3up-client";

export type StorageUploadParameters = {
    file: Blob,
}

export class StorageService {
    private client: Client;

    private constructor(client: Client) {
        this.client = client;
    }


    public static async init() {
        const client = await setup();
        return new StorageService(client);
    }

    public async uploadFile({file}: StorageUploadParameters): Promise<{ cid: string }> {
        return await this.client.uploadFile(file).then(res => ({cid: res.toString()}));
    }
}