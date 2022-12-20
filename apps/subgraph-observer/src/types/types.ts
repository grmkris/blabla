import z from "zod";

export const SubgraphFormSchema = z.object({
  chainId: z.number({
    required_error: "Chain ID is required",
    invalid_type_error: "Chain ID must be a number",
  }),
  indexer: z.string(),
  name: z.string(),
  email: z.string().email({ message: "Enter correct email" }).nullish(),
  tag: z.string({ required_error: "Subgraph Tag is required" }),
});
export type SubgraphForm = z.infer<typeof SubgraphFormSchema>;

export const SubscriptionSchema = z.object({
  subgraphUrl: z.string().url(),
  email: z.string().email(),
  user: z.string(),
  interval: z.string(),
  chainId: z.string().optional(),
});
export type Subscription = z.infer<typeof SubscriptionSchema>;

export type ChainListSchema = {
  name: string;
  chain: string;
  icon: string;
  rpc: string[];
  faucets: any[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  infoURL: string;
  shortName: string;
  chainId: number;
  networkId: number;
  slip44: number;
  ens: {
    registry: string;
  };
  explorers: {
    name: string;
    url: string;
    standard: string;
  }[];
};

export type TableDataRow = {
  title: string;
  link: string;
  subgraphBlock: number;
  latestBlock: number;
  blocksBehind: number;
  subRows?: TableDataRow[];
};
