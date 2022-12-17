import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSubgraphClient } from "./useSubgraphClient";

export const useGetSubgraphStatus = (indexer?: URL) => {
  const [refetchInterval, setRefetchInterval] = useState(1000);
  const subgraphClient = useSubgraphClient(indexer);
  return useQuery(
    ["useGetSubgraphStatus", { indexer }],
    async () => {
      if (!subgraphClient.data) {
        throw new Error("No subgraph client");
      }
      return subgraphClient.data.SubgraphMetadata();
    },
    {
      enabled: !!subgraphClient.data && !!indexer,
      refetchInterval: refetchInterval,
      retry: false,
      onError: (error) => {
        console.log(error);
        setRefetchInterval(10000);
      },
    }
  );
};
