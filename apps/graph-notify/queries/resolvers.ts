import { Resolvers } from "../.graphclient";

export const resolvers: Resolvers = {
  _Meta_: {
    subgraphUrl: (root, args, context) =>
      "https://" + context.indexer_url ||
      "https://api.thegraph.com/subgraphs/name/airswap/airswap", // The value we provide in the config
  },
};
