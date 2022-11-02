import { SubgraphCard } from "./SubgraphCard";
import { useGraphNotifyStore } from "../store";
import NonSSRWrapper from "./common/NonSSRWrapper";

export const SubgraphsDashboard = () => {
  const { inputs } = useGraphNotifyStore((state) => ({
    inputs: state.subgraphs,
  }));
  return (
    <div className="lg:col-span-2 rounded-lg border-4 border-dashed border-gray-200 mt-4 lg:mt-0">
      <div className={"mb-20 flex flex-wrap flex-row justify-center"}>
        {inputs.map((subgraph, index) => {
          return (
            <div className={"m-2"} key={index}>
              <NonSSRWrapper>
                <SubgraphCard input={subgraph} key={index} index={index} />
              </NonSSRWrapper>
            </div>
          );
        })}
      </div>
    </div>
  );
};
