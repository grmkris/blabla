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

  const getDataForChain = (chainId: number) =>
    chainList.data?.find((element) => {
      console.log("chainId", chainId);
      return element.chainId == chainId ?? "0";
    });

  return { chainList, getDataForChain };
};
