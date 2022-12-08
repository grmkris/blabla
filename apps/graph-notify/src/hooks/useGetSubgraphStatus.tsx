import { useQuery } from "@tanstack/react-query";
import { getBuiltGraphSDK } from "../../.graphclient";
import { useState } from "react";

export const useGetSubgraphStatus = (indexer: string) => {
  const [refetchInterval, setRefetchInterval] = useState(1000);
  return useQuery(
    ["useGetSubgraphStatus", { indexer }],
    async () => {
      if (indexer.startsWith("http://")) {
        indexer = indexer.replace("http://", "");
      }
      if (indexer.startsWith("https://")) {
        indexer = indexer.replace("https://", "");
      }
      const client = getBuiltGraphSDK({
        indexer_url: indexer,
      });
      return client.getSubgraphStatus();
    },
    {
      enabled: !!indexer && indexer.length > 5,
      refetchInterval: refetchInterval,
      retry: false,
      onError: (error) => {
        console.log(error);
        setRefetchInterval(10000);
      },
    }
  );
};
