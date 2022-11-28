import { BigNumber } from "ethers";
import React from "react";
import { useGetNodeLatestBlock } from "../../hooks/useGetNodeLatestBlock";
import { useGetSubgraphStatus } from "../../hooks/useGetSubgraphStatus";
import { clsx } from "clsx";

type Props = {
  chainId: number;
  indexer: string;
};

export function SubgraphStatusLabel({ chainId, indexer }: Props) {
  const subgraphStatus = useGetSubgraphStatus(chainId?.toString(), indexer);
  const latestBlock = useGetNodeLatestBlock(chainId);

  if (subgraphStatus.isLoading || latestBlock.isLoading)
    return <div className="badge badge-warning gap-2">Loading...</div>;

  return (
    <>
      <div className={`flex flex-row gap-2`}>
        <LatestBlockLabel chainId={chainId} />
        <SubgraphBlockLabel chainId={chainId} indexer={indexer} />
        <BlocksBehindLabel chainId={chainId} indexer={indexer} />
      </div>
    </>
  );
}

const LatestBlockLabel = ({ chainId }: { chainId: number }) => {
  const latestBlock = useGetNodeLatestBlock(chainId);

  return (
    <>
      {latestBlock.data ? (
        <div className={`badge badge-primary badge-outline`}>
          Latest block: {BigNumber.from(latestBlock?.data).toString()}
        </div>
      ) : (
        <div className="badge badge-error gap-2">
          Latest block: Not available
        </div>
      )}
    </>
  );
};

const SubgraphBlockLabel = ({
  chainId,
  indexer,
}: {
  chainId: number;
  indexer: string;
}) => {
  const { data, isLoading } = useGetSubgraphStatus(
    chainId?.toString(),
    indexer
  );

  return (
    <>
      {data?._meta?.block.number ? (
        <div className={`badge badge-primary badge-outline`}>
          Subgraph: {data?._meta?.block.number}
        </div>
      ) : (
        <div className="badge badge-error gap-2">
          Subgraph block: Not available
        </div>
      )}
    </>
  );
};

const BlocksBehindLabel = ({
  chainId,
  indexer,
}: {
  chainId: number;
  indexer: string;
}) => {
  const { data, isLoading } = useGetSubgraphStatus(
    chainId?.toString(),
    indexer
  );

  const latestBlock = useGetNodeLatestBlock(chainId);

  const blockBehind =
    latestBlock.data &&
    data?._meta?.block.number &&
    latestBlock.data - data?._meta?.block.number;

  return (
    <>
      {(blockBehind !== undefined && (
        <div
          className={`badge ${clsx(
            { "badge-success": blockBehind < 10 },
            { "badge-warning": blockBehind > 10 && blockBehind < 100 },
            { "badge-error": blockBehind > 100 }
          )}`}
        >
          Blocks behind: {blockBehind}
        </div>
      )) ?? (
        <div className="badge badge-error gap-2">
          Blocks behind: Not available
        </div>
      )}
    </>
  );
};
