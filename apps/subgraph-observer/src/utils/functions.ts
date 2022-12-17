import { ChainListSchema } from "../types/types";


export const getDataForChain = (
  chainList: ChainListSchema[],
  chainId: number
) => chainList.find((element) => element.chainId == chainId ?? "0");
