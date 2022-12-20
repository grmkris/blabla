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
    <div className={"flex w-full flex-col pt-5 md:pt-6 "}>
      <div
        onClick={() => copyToClipboard(inputs)}
        className="flex cursor-pointer items-center self-end py-2 text-lg font-semibold capitalize text-secondary hover:text-primary"
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
