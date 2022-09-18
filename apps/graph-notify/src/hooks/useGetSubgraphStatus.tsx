import { useQuery } from "@tanstack/react-query";
import { getBuiltGraphSDK } from "../../.graphclient";

export const useGetSubgraphStatus = (chainId: string, indexer: string) => {
  return useQuery(
    [chainId, indexer],
    () => {
      if (indexer.startsWith("http://")){
        indexer = indexer.replace("http://", "")
      }
      if (indexer.startsWith("https://")){
        indexer = indexer.replace("https://", "")
      }
      const client = getBuiltGraphSDK({
        chainName: chainId,
        indexer_url: indexer
      })
      return client.getSubgraphStatus()
    },{
      retry: false,
    }
  );
};
