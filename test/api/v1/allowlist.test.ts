import { describe, it, afterEach, afterAll } from "vitest";
import { expect } from "chai";
import { createMocks, RequestMethod } from "node-mocks-http";
import { Request, Response } from "express";

import sinon from "sinon";

import { data } from "../../utils";
import { Client } from "@web3-storage/w3up-client";
import { allowlistHandler } from "@/handlers/v1/web3up/allowlist";
import { Link } from "@web3-storage/access";

describe("W3Up Client allowlist", async () => {
  const { metadata, merkleTree, someData } = data;

  const storeBlobMock = sinon
    .stub(Client.prototype, "uploadFile")
    .resolves({ "/": merkleTree.cid } as unknown as Link); //TODO better Link object creation

  const mockRequestResponse = (method: RequestMethod = "POST") => {
    const { req, res }: { req: Request; res: Response } = createMocks({
      method,
    });
    req.headers = {
      "Content-Type": "application/json",
    };
    req.body = { allowList: merkleTree.data, totalUnits: 100n };
    return { req, res };
  };

  afterEach(() => {
    sinon.resetHistory();
  });

  afterAll(() => {
    sinon.resetBehavior();
  });

  it("POST valid allowList - 200", async () => {
    const { req, res } = mockRequestResponse();
    await allowlistHandler(req, res);

    expect(res.statusCode).to.eq(200);
    expect(res.getHeaders()).to.deep.eq({ "content-type": "application/json" });
    expect(res.statusMessage).to.eq("OK");

    //TODO better typing and check on returned CID
    // @ts-ignore
    expect(res._getJSONData().message).to.eq("Data uploaded succesfully");
    // @ts-ignore
    expect(res._getJSONData().cid).to.not.be.undefined;

    expect(storeBlobMock.callCount).to.eq(1);
  });

  it("GET allowlist not allowed - 405", async () => {
    const { req, res } = mockRequestResponse();
    req.method = "GET";
    await allowlistHandler(req, res);

    expect(res.statusCode).to.eq(405);
    expect(res.getHeaders()).to.deep.eq({ "content-type": "application/json" });
    expect(res.statusMessage).to.eq("OK");

    //TODO better typing and check on returned CID
    // @ts-ignore
    expect(res._getJSONData().message).to.eq("Not allowed");

    expect(storeBlobMock.callCount).to.eq(0);
  });

  it("POST incorrect allowlist - 400", async () => {
    const { req, res } = mockRequestResponse();
    req.body = { allowList: data.someData.data, totalUnits: 100n };
    await allowlistHandler(req, res);

    expect(res.statusCode).to.eq(400);
    expect(res.getHeaders()).to.deep.eq({ "content-type": "application/json" });
    expect(res.statusMessage).to.eq("OK");

    //TODO better typing and check on returned CID
    // @ts-ignore
    expect(res._getJSONData().message).to.eq("Not a valid merkle tree object");
  });

  it("POST upload allowlist fails - 500", async () => {
    const { req, res } = mockRequestResponse();
    storeBlobMock.rejects();
    await allowlistHandler(req, res);

    expect(res.statusCode).to.eq(500);
    expect(res.getHeaders()).to.deep.eq({ "content-type": "application/json" });
    expect(res.statusMessage).to.eq("OK");

    //TODO better typing and check on returned CID
    // @ts-ignore
    expect(res._getJSONData().message).to.eq("Error uploading data");

    expect(storeBlobMock.callCount).to.eq(1);
  });
});
