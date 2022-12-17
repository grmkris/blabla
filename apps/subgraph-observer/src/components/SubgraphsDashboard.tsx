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
    <div className={"flex flex-col w-full pt-14 "}>
      <div
        onClick={onClickHandler}
        className="self-end flex cursor-pointer hover:text-primary items-center py-2 font-semibold capitalize text-lg text-secondary"
      >
        Share table
        <FiShare2 className="ml-2" />
      </div>

      {inputs.length ? <SubgraphTable inputs={inputs} /> : <NoDataAlert />}
    </div>
  );
};
