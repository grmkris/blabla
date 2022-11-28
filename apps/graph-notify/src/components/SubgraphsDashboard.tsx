import { useGraphNotifyStore } from "../store";
import NoDataAlert from "./subgraphs-table/NoDataAlert";
import { SubgraphTable } from "./subgraphs-table/SubgraphTable";
import { encode } from "js-base64";
import toast from "react-hot-toast";
import { FiShare2 } from "react-icons/fi";

export const SubgraphsDashboard = () => {
  const { inputs } = useGraphNotifyStore((state) => ({
    inputs: state.subgraphs,
  }));

  const onClickHandler = () => {
    const hash = encode(JSON.stringify(inputs));
    navigator.clipboard.writeText(`${window.location.href}share/${hash}`);

    toast.success(`URL copied to clipboard 👏`);
  };

  return (
    <div className={"flex flex-col w-full pt-14"}>
      <button
        onClick={onClickHandler}
        className="w-48 self-end btn btn-info btn-outline flex items-center my-2"
      >
        Share table
        <FiShare2 className="ml-2" />
      </button>

      {inputs.length ? <SubgraphTable inputs={inputs} /> : <NoDataAlert />}
    </div>
  );
};
