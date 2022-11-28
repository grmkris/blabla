import { useGraphNotifyStore } from "../store";
import NoDataAlert from "./subgraphs-table/NoDataAlert";
import { SubgraphTable } from "./subgraphs-table/SubgraphTable";
import { encode } from "js-base64";
import { useRouter } from "next/router";

export const SubgraphsDashboard = () => {
  const router = useRouter();

  const { inputs } = useGraphNotifyStore((state) => ({
    inputs: state.subgraphs,
  }));

  const onClickHandler = () => {
    const hash = encode(JSON.stringify(inputs));

    router.push(`/share/${hash}`);
  };

  return (
    <div className={"flex flex-col w-full pt-14"}>
      <button onClick={onClickHandler}>SHARE</button>
      {inputs.length ? <SubgraphTable inputs={inputs} /> : <NoDataAlert />}
    </div>
  );
};
