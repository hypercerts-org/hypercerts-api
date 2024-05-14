// import type {Request, Response} from "express";
// import {type AllowlistEntry, validateAllowlist} from "@hypercerts-org/sdk";
// import {jsonToBlob} from "../../../utils/jsonToBlob.js";
// import {setup} from "../../../client/w3up.js";
// import {StandardMerkleTree} from "@openzeppelin/merkle-tree";
// import type {ResponseData} from "../../../types/api.js";
//
//
// export const allowlistHandler = async (
//     req: Request,
//     res: Response<ResponseData<{ cid: string }>>
// ) => {
//     if (req.method === "POST") {
//         const client = await setup();
//
//         const reqData = req.body;
//
//         // Check if object contains openzeppelin merkle tree dump and total units
//         if (!isAllowListPostRequest(reqData)) {
//             res
//                 .status(400)
//                 .json({success: false, message: "Not a valid merkle tree object"});
//             return;
//         }
//
//         let merkleTree;
//
//         // If allowlist was provided, check if allowlist is valid
//         if (reqData.allowList) {
//             try {
//                 // Parse allowlist as openzeppelin merkle tree
//                 const _merkleTree = StandardMerkleTree.load(
//                     JSON.parse(reqData.allowList)
//                 );
//
//                 // Get allowlist entries from merkle tree and validate values
//                 const merkleEntries = Array.from(_merkleTree.entries());
//                 const allowListEntries = merkleEntries
//                     .map((entry) =>
//                         isAllowListEntry(entry[1])
//                             ? ({address: entry[1][0], units: entry[1][1]} as AllowlistEntry)
//                             : null
//                     )
//                     .flatMap((entry) => (entry ? [entry] : []));
//
//                 const {valid, errors} = validateAllowlist(
//                     allowListEntries,
//                     BigInt(reqData.totalUnits)
//                 );
//
//                 if (!valid) {
//                     res.status(400).json({
//                         success: false,
//                         message: "Errors in submitted allowlist",
//                         errors,
//                     });
//                     return;
//                 }
//
//                 merkleTree = _merkleTree;
//             } catch (e) {
//                 console.log(e);
//                 res.status(400).json({
//                     success: false,
//                     message: "Allowlist should be a valid openzeppelin merkle tree",
//                     errors: {receivedAllowlist: reqData.allowList},
//                 });
//                 return;
//             }
//         }
//
//         if (!merkleTree) {
//             res.status(500).json({
//                 success: false,
//                 message: "Something went wrong parsing the allowlist",
//             });
//             return;
//         }
//
//         const blob = jsonToBlob(JSON.stringify(merkleTree.dump()));
//
//         try {
//             const result = await client.uploadFile(blob);
//
//             res.status(200).json({
//                 success: true,
//                 message: "Data uploaded succesfully",
//                 data: {cid: result.toString()},
//             });
//         } catch (e) {
//             const error = e as Error;
//
//             res.status(500).json({
//                 success: false,
//                 message: "Error uploading data",
//                 errors: {
//                     name: error.name,
//                     message: error.message,
//                 },
//             });
//         }
//     } else {
//         res.status(405).json({success: false, message: "Not allowed"});
//     }
// };
//
//
//
//
//
