import { useQuery } from "@tanstack/react-query";
import { getDataForChain } from "../utils/functions";
import { useGetChainData } from "./useGetChainData";

export const useGetNodeLatestBlock = (chainId: number | undefined) => {
  const chainList = useGetChainData();
  const chainData = chainList.data && getDataForChain(chainList.data, chainId!);
  const rpcs = chainData?.rpc;

  return useQuery<number>(
    ["useGetNodeLatestBlock", chainId],
    async () => {
      if (!rpcs || rpcs.length === 0) {
        throw new Error("No RPC");
      }
      for (const rpc of rpcs) {
        try {
          const result = await fetch(rpc, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              jsonrpc: "2.0",
              method: "eth_blockNumber",
              params: [],
              id: 1,
            }),
          });
          const json = await result.json();
          return json.result;
        } catch (e) {
          console.warn(`Request to ${rpc} failed, trying new one`);
        }
      }
      throw new Error("Failed to retrieve latest block for " + chainId);
    },
    {
      enabled: !!chainId && !!rpcs,
      refetchInterval: 1000,
    }
  );
};
