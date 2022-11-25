import { useGetSubgraphStatus } from "../hooks/useGetSubgraphStatus";
import { useGraphNotifyStore } from "../store";
import Link from "next/link";
import { useGetNodeLatestBlock } from "../hooks/useGetNodeLatestBlock";
import { BigNumber } from "ethers";
import React from "react";
import { ImCross } from "react-icons/all";
import { SubgraphForm } from "../types/common";

export const SubgraphCard = (props: { input: SubgraphForm; index: number }) => {
  const { data, isLoading } = useGetSubgraphStatus(
    props.input.chainId?.toString(),
    props.input.indexer
  );
  const latestBlock = useGetNodeLatestBlock(props.input.chainId);
  const removeInput = useGraphNotifyStore((state) => state.removeSubgraph);

  const blockBehind =
    latestBlock.data &&
    data?._meta?.block.number &&
    latestBlock.data - data?._meta?.block.number;

  return (
    <div className="card w-80 bg-base-100 shadow-xl">
      <div className="drawer drawer-end max-h-80">
        <input
          id={props.index.toString()}
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <div className="card-body">
            <div className="card-actions justify-end">
              <button
                className="btn btn-square btn-sm"
                onClick={() => {
                  removeInput(props.index);
                }}
              >
                <ImCross />
              </button>
            </div>
            <h2 className="card-title">{props.input.name}</h2>
            <Link
              href={props.input.indexer}
              target="_blank"
              rel="noopener noreferrer"
              className={"link link-primary truncate text-clip max-w-sm"}
            >
              {props.input.indexer}
            </Link>{" "}
            <div className="flex flex-col text-left">
              <div>Subgraph block: {data?._meta?.block.number}</div>
              {!data?._meta?.block.number && (
                <div className="badge badge-error gap-2">
                  Subgraph block: Not available
                </div>
              )}
              {latestBlock.isLoading && <div>Latest block: Loading...</div>}
              {!latestBlock.isLoading && (
                <>
                  {latestBlock.data ? (
                    <div>
                      Latest block:{" "}
                      {BigNumber.from(latestBlock?.data).toString()}
                    </div>
                  ) : (
                    <div className="badge badge-error gap-2">
                      Latest block: Not available
                    </div>
                  )}
                  {blockBehind !== undefined && (
                    <div>
                      Blocks behind:
                      {blockBehind <= 10 && (
                        <div className="badge badge-success m-2">
                          {blockBehind}
                        </div>
                      )}
                      {blockBehind >= 10 && (
                        <div className="badge badge-warning gap-2">
                          {blockBehind}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
