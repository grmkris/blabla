import { useQuery } from "@tanstack/react-query";

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
}


export const useChainListChains = () => {
  return useQuery<ChainListSchema[]>(
    ['useChainListChains'],
    async () => {
      const data = await fetch('https://chainid.network/chains.json')
      return data.json()
    },{
    }
  );
};
