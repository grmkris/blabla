import { decode } from "js-base64";
import { useGraphNotifyStore } from "../store";
import { SubgraphFormSchema } from "../types/common";

type Props = {
  hash: string;
};

export const useSetDataFromHash = ({ hash }: Props) => {
  const { setSubgraphs } = useGraphNotifyStore();

  const arrays = JSON.parse(decode(hash));
  const mappedSubgraphForms = arrays.map((a: unknown) =>
    SubgraphFormSchema.parse(a)
  );

  setSubgraphs(mappedSubgraphForms);
};
