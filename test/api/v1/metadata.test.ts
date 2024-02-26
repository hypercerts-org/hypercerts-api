import { describe, it, afterEach, afterAll } from "vitest";
import { expect } from "chai";
import { createMocks, RequestMethod } from "node-mocks-http";
import { Request, Response } from "express";

import sinon from "sinon";

import { data } from "../../utils";
import { Client } from "@web3-storage/w3up-client";
import axios from "axios";
import { metadataHandler } from "@/handlers/v1/web3up/metadata";
import { AnyLink } from "@web3-storage/w3up-client/dist/src/types";

describe("W3Up Client metadata", async () => {
  const { metadata, merkleTree, someData } = data;

  const storeBlobMock = sinon
    .stub(Client.prototype, "uploadFile")
    .resolves({ "/": metadata.cid } as unknown as AnyLink); //TODO better Link object creation

  const getAllowlistMock = sinon.stub(axios, "get");

  const mockRequestResponse = (method: RequestMethod = "POST") => {
    const { req, res }: { req: Request; res: Response } = createMocks({
      method,
    });
    req.headers = {
      "Content-Type": "application/json",
    };
    req.body = metadata.data;
    return { req, res };
  };

  afterEach(() => {
    sinon.resetHistory();
  });

  afterAll(() => {
    sinon.resetBehavior();
  });

  it("POST valid metadata without allowList - 200", async () => {
    const { req, res } = mockRequestResponse();
    await metadataHandler(req, res);

    expect(res.statusCode).to.eq(200);
    expect(res.getHeaders()).to.deep.eq({ "content-type": "application/json" });
    expect(res.statusMessage).to.eq("OK");

    //TODO better typing and check on returned CID

    console.log(res);
    // @ts-ignore
    expect(res._getJSONData().message).to.eq("Data uploaded succesfully");
    // @ts-ignore
    expect(res._getJSONData().cid).to.not.be.undefined;

    expect(storeBlobMock.callCount).to.eq(1);
    expect(getAllowlistMock.callCount).to.eq(0);
  });

  it("POST valid metadata with allowList - 200", async () => {
    const { req, res } = mockRequestResponse();
    req.body = { ...req.body, allowList: someData.cid };
    getAllowlistMock.resolves(Promise.resolve({ data: merkleTree.data }));

    await metadataHandler(req, res);

    expect(res.statusCode).to.eq(200);
    expect(res.getHeaders()).to.deep.eq({ "content-type": "application/json" });
    expect(res.statusMessage).to.eq("OK");

    //TODO better typing and check on returned CID
    // @ts-ignore
    expect(res._getJSONData().message).to.eq("Data uploaded succesfully");
    // @ts-ignore
    expect(res._getJSONData().cid).to.not.be.undefined;

    expect(storeBlobMock.callCount).to.eq(1);
    expect(getAllowlistMock.callCount).to.eq(1);
  });

  it("GET metadata not allowed - 405", async () => {
    const { req, res } = mockRequestResponse();
    req.method = "GET";
    await metadataHandler(req, res);

    expect(res.statusCode).to.eq(405);
    expect(res.getHeaders()).to.deep.eq({ "content-type": "application/json" });
    expect(res.statusMessage).to.eq("OK");

    //TODO better typing and check on returned CID
    // @ts-ignore
    expect(res._getJSONData().message).to.eq("Not allowed");

    expect(storeBlobMock.callCount).to.eq(0);
  });

  it("POST incorrect metadata - 400", async () => {
    const { req, res } = mockRequestResponse();
    req.body = data.someData.data;
    await metadataHandler(req, res);

    expect(res.statusCode).to.eq(400);
    expect(res.getHeaders()).to.deep.eq({ "content-type": "application/json" });
    expect(res.statusMessage).to.eq("OK");

    //TODO better typing and check on returned CID
    // @ts-ignore
    expect(res._getJSONData().message).to.eq(
      "Not a valid hypercert metadata object"
    );
  });

  it("POST correct metadata with incorrect allowlist - 400", async () => {
    const { req, res } = mockRequestResponse();
    req.body = { ...req.body, allowList: someData.cid };
    getAllowlistMock.resolves(Promise.resolve({ data: "not a merkle tree" }));
    await metadataHandler(req, res);

    expect(res.statusCode).to.eq(400);
    expect(res.getHeaders()).to.deep.eq({
      "content-type": "application/json",
    });
    expect(res.statusMessage).to.eq("OK");

    //TODO better typing and check on returned CID
    // @ts-ignore
    expect(res._getJSONData().message).to.eq(
      "Allowlist should be a valid openzeppelin merkle tree"
    );

    expect(storeBlobMock.callCount).to.eq(0);
    expect(getAllowlistMock.callCount).to.eq(1);
  });

  it("POST upload metadata fails - 500", async () => {
    const { req, res } = mockRequestResponse();
    storeBlobMock.rejects();
    await metadataHandler(req, res);

    expect(res.statusCode).to.eq(500);
    expect(res.getHeaders()).to.deep.eq({ "content-type": "application/json" });
    expect(res.statusMessage).to.eq("OK");

    //TODO better typing and check on returned CID
    // @ts-ignore
    expect(res._getJSONData().message).to.eq("Error uploading data");

    expect(storeBlobMock.callCount).to.eq(1);
    expect(getAllowlistMock.callCount).to.eq(0);
  });
});
