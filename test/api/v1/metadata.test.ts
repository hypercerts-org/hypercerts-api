import { describe, it, afterEach, afterAll } from "vitest";
import { expect } from "chai";
import { createMocks, RequestMethod } from "node-mocks-http";

import sinon from "sinon";

import { data } from "../../utils";
import { Client } from "@web3-storage/w3up-client";
import handler from "../../../src/pages/api/v1/web3up/metadata";
import { NextApiRequest, NextApiResponse } from "next/types";

describe("W3Up Client metadata", async () => {
  const { metadata } = data;

  const storeBlobMock = sinon
    .stub(Client.prototype, "uploadFile")
    .resolves({ "/": metadata.cid }); //TODO better Link object creation

  const mockRequestResponse = (method: RequestMethod = "POST") => {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } =
      createMocks({ method });
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

  it("POST metadata - 200", async () => {
    const { req, res } = mockRequestResponse();
    await handler(req, res);

    console.log(res);

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

  it("GET metadata - 405", async () => {
    const { req, res } = mockRequestResponse();
    req.method = "GET";
    await handler(req, res);

    console.log(res);

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
    await handler(req, res);

    console.log(res);

    expect(res.statusCode).to.eq(400);
    expect(res.getHeaders()).to.deep.eq({ "content-type": "application/json" });
    expect(res.statusMessage).to.eq("OK");

    //TODO better typing and check on returned CID
    // @ts-ignore
    expect(res._getJSONData().message).to.eq("Errors in submitted data");
    // @ts-ignore
    expect(res._getJSONData().errors).to.not.be.undefined;

    expect(storeBlobMock.callCount).to.eq(0);
  });
});
