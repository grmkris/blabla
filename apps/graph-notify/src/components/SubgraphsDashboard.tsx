import { useGraphNotifyStore } from "../store";
import { SubgraphTable } from "./subgraphs-table/SubgraphTable";

export const SubgraphsDashboard = () => {
  const { inputs } = useGraphNotifyStore((state) => ({
    inputs: state.subgraphs,
  }));

  return (
    <div className={"flex flex-col w-full pt-14"}>
      <SubgraphTable inputs={inputs} />
    </div>
  );
};
