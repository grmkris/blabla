import { useAppStore } from "../store";
import NoDataAlert from "./subgraphs-table/NoDataAlert";
import { SubgraphTable } from "./subgraphs-table/SubgraphTable";
import toast from "react-hot-toast";
import { FiShare2 } from "react-icons/fi";
import { base64Encode } from "../utils/functions";

export const SubgraphsDashboard = () => {
  const { inputs } = useAppStore((state) => ({
    inputs: state.subgraphs,
  }));

  return (
    <div className={"flex flex-col w-full pt-14 "}>
      <div
        onClick={() => copyToClipboard(inputs)}
        className="self-end flex cursor-pointer hover:text-primary items-center py-2 font-semibold capitalize text-lg text-secondary"
      >
        Share table
        <FiShare2 className="ml-2" />
      </div>

      {inputs.length ? <SubgraphTable inputs={inputs} /> : <NoDataAlert />}
    </div>
  );
};


export const copyToClipboard = async (inputs: unknown) => {
  try {
    const hash = base64Encode(JSON.stringify(inputs));
    await navigator.clipboard.writeText(`${window.location.href}share/${hash}`);
    toast.success(`URL copied to clipboard 👏`);
  } catch (e) {
    toast.error(`Error copying URL to clipboard`);
  }
};