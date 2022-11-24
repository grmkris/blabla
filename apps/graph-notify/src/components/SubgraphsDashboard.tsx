import { SubgraphCard } from "./SubgraphCard";
import { useGraphNotifyStore } from "../store";
import NonSSRWrapper from "./common/NonSSRWrapper";

export const SubgraphsDashboard = () => {
  const { inputs } = useGraphNotifyStore((state) => ({
    inputs: state.subgraphs,
  }));
  return (
    <div className={"flex flex-row "}>
      {inputs.map((subgraph, index) => (
        <SubgraphCard input={subgraph} key={index} index={index} />
      ))}
    </div>
  );
};
