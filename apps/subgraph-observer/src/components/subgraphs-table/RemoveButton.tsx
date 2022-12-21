import React from "react";
import { useAppStore } from "../../store";
import { RiDeleteBinLine } from "react-icons/ri";

type Props = {
  rowId: number;
};

function RemoveButton({ rowId }: Props) {
  const { removeSubgraph } = useAppStore();

  return (
    <button
      className="btn-outline btn-error btn-square btn-sm btn flex items-center justify-center"
      onClick={() => removeSubgraph(rowId)}
    >
      <RiDeleteBinLine className="h-5 w-5" />
    </button>
  );
}

export default RemoveButton;
