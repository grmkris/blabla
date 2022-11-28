import { useQuery } from "@tanstack/react-query";
import { ChainListSchema } from "../types/common";

export const useGetChainData = () => {
  const chainList = useQuery<ChainListSchema[]>(
    ["useChainListChains"],
    async () => {
      const data = await fetch("https://chainid.network/chains.json");
      return data.json();
    },
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      retry: 10,
    }
  );

  return chainList;
};
