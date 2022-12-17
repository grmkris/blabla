import { useQuery } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";
import { getSubgraphMetadataSdk } from "subgraph-client/src";

export const useSubgraphClient = (indexer?: URL) => {

  return useQuery(
    ["useSubgraphClient", { indexer }],
    async () => {
        if (!indexer) {
          throw new Error("No indexer");
        }
        const subgraphClient = new GraphQLClient(indexer.toString());
      return getSubgraphMetadataSdk(subgraphClient);
      }, {
        enabled: !!indexer
      }
  );
}