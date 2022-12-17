import { ChainListSchema, SubgraphForm, SubgraphFormSchema } from "../types/types";


export const getDataForChain = (
  chainList: ChainListSchema[],
  chainId: number
) => chainList.find((element) => element.chainId == chainId ?? "0");


export const base64Encode = (str: string) => {
  return Buffer.from(str).toString("base64");
}

export const base64Decode = (str: string) => {
  return Buffer.from(str, "base64").toString("ascii");
}

export const base64DecodeToSubgraphFormData = (str: string): SubgraphForm[] => {
  const decoded = base64Decode(str);
  const arrays = JSON.parse(decoded);
  return arrays.map((a: unknown) => SubgraphFormSchema.parse(a));
};