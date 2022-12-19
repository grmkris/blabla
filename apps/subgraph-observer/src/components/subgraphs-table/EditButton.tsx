import React from "react";
import { useAppStore } from "../../store";
import { RiEditLine } from "react-icons/ri";
import { SubgraphForm } from "../../types/types";

type Props = {
  rowId: number;
  setOpenModal: (open: boolean) => void;
  setModalData: (data: SubgraphForm) => void;
};

function EditButton({ rowId, setOpenModal, setModalData }: Props) {
  const { subgraphs } = useAppStore();

  const onEditHandler = (rowId: number) => {
    setModalData(subgraphs[rowId]!);
    setOpenModal(true);
  };

  return (
    <button
      className="btn-outline btn-square btn-sm btn flex items-center justify-center"
      onClick={() => onEditHandler(rowId)}
    >
      <RiEditLine className="h-5 w-5" />
    </button>
  );
}

export default EditButton;
