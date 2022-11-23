// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Novu } from "@novu/node";
import { getBuiltGraphSDK } from "../../../.graphclient";
import { ethers } from "ethers";
import { ChainListSchema } from "../../types/common";
type Data = {
  block: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("received request on check-subgraph");
  console.log(req.body);
  const client = getBuiltGraphSDK({
    chainName: "test123",
    indexer_url: req.body.subgraphUrl.replace("https://", ""),
  });
  const status = await client.getSubgraphStatus();
  console.log("subgraph block", status._meta?.block.number.toString());
  const blockNumberSubgraph = status._meta?.block.number.toString();

  try {
    if (!blockNumberSubgraph) {
      throw new Error("No block number");
    }
    const data = await fetch("https://chainid.network/chains.json");
    console.log("data", data);
    const chains: ChainListSchema[] = await data.json();
    const chainFromChainData = chains?.find((chain: ChainListSchema) => {
      return chain.networkId == req?.body?.chainId;
    });
    console.log("chainFromChainData", chainFromChainData);
    const provider = new ethers.providers.JsonRpcProvider(
      chainFromChainData?.rpc[0]
    );
    const blockChain = await provider.getBlockNumber();
    console.log("blockchain block", blockChain, blockNumberSubgraph);
    const payload = JSON.stringify(req.body);
    if (Number.parseInt(blockNumberSubgraph) < blockChain || true) {
      const novu = new Novu("d8e8b4bfd929281e293314ef544507be");
      await novu.subscribers.identify("kristjan.grm1@gmail.com", {
        email: "kristjan.grm1@gmail.com",
      });
      const response = await novu.trigger("subgraph-out-of-sync", {
        to: {
          subscriberId: "kristjan.grm1@gmail.com",
        },
        payload: {
          data: payload,
        },
      });
      console.log("novu-response", response.data);
    }
  } catch (error) {
    console.log("error", error);
  }

  res.status(200).json({ block: blockNumberSubgraph?.toString() || "0" });
}
