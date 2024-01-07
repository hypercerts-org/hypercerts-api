import axios from "axios";

type IPFSResponse = {
  cid: string;
  data?: string;
  errors?: Record<string, string | string[]>;
};

const gateways = ["https://w3s.link/ipfs/{cid}", "https://ipfs.io/ipfs/{cid}"];

export const getFromIPFS = async (
  cid: string,
  timeout: number = 10000
): Promise<IPFSResponse> => {
  const res: IPFSResponse = { cid };
  const _errors: Record<string, string | string[]> = {};

  // TODO improve gateway calls by refactoring to Promise.race and cache IPFS responses
  const ipfsRes = await axios
    .get(parseGatewayAndCIDtoURL(gateways[0], cid), { timeout })
    .catch(async (e) => {
      if (e.code === "ECONNABORTED") {
        _errors[gateways[0]] = `${parseGatewayAndCIDtoURL(
          gateways[0],
          cid
        )} timed out.`;

        return await axios
          .get(parseGatewayAndCIDtoURL(gateways[1], cid), {
            timeout,
          })
          .catch(async (e) => {
            if (e.code === "ECONNABORTED") {
              _errors[gateways[1]] = `${parseGatewayAndCIDtoURL(
                gateways[1],
                cid
              )} timed out.`;
            } else {
              _errors[
                gateways[1]
              ] = `Error occurred while fetching from ${parseGatewayAndCIDtoURL(
                gateways[1],
                cid
              )}: ${e.message}`;
            }
          });
      } else {
        _errors[
          gateways[0]
        ] = `Error occurred while fetching from ${parseGatewayAndCIDtoURL(
          gateways[0],
          cid
        )}: ${e.message}`;
      }
    });

  if (!ipfsRes || !ipfsRes.data) {
    res.errors = _errors;

    return res;
  }

  return { ...res, data: ipfsRes.data };
};

const parseGatewayAndCIDtoURL = (gateway: string, cid: string): string => {
  return gateway.replace("{cid}", cid);
};
