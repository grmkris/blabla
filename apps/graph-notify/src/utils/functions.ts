import { ChainListSchema } from "../types/common";

export const getDataForChain = (
  chainList: ChainListSchema[],
  chainId: number
) => chainList.find((element) => element.chainId == chainId ?? "0");
