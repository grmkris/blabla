import { useQuery } from "@tanstack/react-query";
import { getBuiltGraphSDK } from "../../.graphclient";

export const useGetSubgraphStatus = (chainId: string, indexer: string) => {
  return useQuery(
    [chainId, indexer],
    () => {
      const client = getBuiltGraphSDK({
        chainName: chainId,
        indexer_url: indexer
      })
      return client.getSubgraphStatus()
    },
    {
      enabled: false,
    }
  );
};
