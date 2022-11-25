import { BigNumber } from "ethers";
import React from "react";
import { useGetNodeLatestBlock } from "../hooks/useGetNodeLatestBlock";
import { useGetSubgraphStatus } from "../hooks/useGetSubgraphStatus";

type Props = {
  chainId: number;
  indexer: string;
  columnType: "latestBlock" | "subgraphBlock" | "blocksBehind";
};

function GraphBlockColumn({ chainId, indexer, columnType }: Props) {
  const { data, isLoading } = useGetSubgraphStatus(
    chainId?.toString(),
    indexer
  );

  const latestBlock = useGetNodeLatestBlock(chainId);

  const blockBehind =
    latestBlock.data &&
    data?._meta?.block.number &&
    latestBlock.data - data?._meta?.block.number;

  if (isLoading)
    return (
      <div
        className={`bg-slate-300 animate-pulse rounded-lg justify-around w-48 inline-flex items-center px-2 py-3 font-semibold`}
      >
        Loading
      </div>
    );

  let renderColumn;
  switch (columnType) {
    case "latestBlock":
      renderColumn = latestBlock.data ? (
        <div
          className={`bg-slate-200 shadow-xl rounded-lg justify-around w-48 inline-flex items-center px-2 py-3`}
        >
          Latest block: {BigNumber.from(latestBlock?.data).toString()}
        </div>
      ) : (
        <div className="badge badge-error gap-2">
          Latest block: Not available
        </div>
      );

      break;
    case "subgraphBlock":
      renderColumn = data?._meta?.block.number ? (
        <div
          className={`bg-slate-200 shadow-xl rounded-lg justify-around w-48 inline-flex items-center px-2 py-3`}
        >
          Subgraph: {data?._meta?.block.number}
        </div>
      ) : (
        <div className="badge badge-error gap-2">
          Subgraph block: Not available
        </div>
      );

      break;
    case "blocksBehind":
      renderColumn = blockBehind ? (
        <div
          className={`${
            blockBehind <= 10 ? "bg-green-300" : "bg-red-400"
          } rounded-lg justify-around w-48 inline-flex items-center px-2 py-3 font-semibold shadow-xl`}
        >
          Blocks behind:
          <div
            className={`badge badge-success ${
              blockBehind <= 10 ? "bg-green-600" : "bg-red-600"
            } gap-2`}
          >
            {blockBehind}
          </div>
        </div>
      ) : (
        <div
          className={`bg-slate-300 rounded-lg justify-around w-48 inline-flex items-center px-2 py-3 font-semibold shadow-xl`}
        >
          Block behind: {blockBehind}
        </div>
      );

      break;
    default:
      <></>;
  }

  return renderColumn ? renderColumn : <div>Data not found</div>;
}

export default GraphBlockColumn;
