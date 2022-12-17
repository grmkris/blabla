import { useQuery } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";
import { getSubgraphMetadataSdk } from "subgraph-client/src";

export const useSubgraphClient = (indexer?: string) => {

  return useQuery(
    ["useSubgraphClient", { indexer }],
    async () => {
        if (!indexer) {
          throw new Error("No indexer");
        }
        if (indexer.startsWith("http://")) {
          indexer = indexer?.replace("http://", "");
        }
        if (indexer.startsWith("https://")) {
          indexer = indexer?.replace("https://", "");
        }
        const subgraphClient = new GraphQLClient(indexer);
      return getSubgraphMetadataSdk(subgraphClient);
      }, {
        enabled: !!indexer && indexer.length > 5,
      }
  );
}