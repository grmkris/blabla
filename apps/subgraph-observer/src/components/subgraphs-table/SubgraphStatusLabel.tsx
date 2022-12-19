import { useGetNodeLatestBlock } from "../../hooks/useGetNodeLatestBlock";
import { useGetSubgraphStatus } from "../../hooks/useGetSubgraphStatus";
import { clsx } from "clsx";

type Props = {
  chainId: number;
  indexer: URL;
};

export function SubgraphStatusLabel({ chainId, indexer }: Props) {
  const subgraphStatus = useGetSubgraphStatus(indexer);
  const latestBlock = useGetNodeLatestBlock(chainId);

  if (subgraphStatus.isLoading || latestBlock.isLoading)
    return <div className="badge-warning badge gap-2">Loading...</div>;

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
        <div className={`badge_primary`}>
          Latest block: {parseInt(latestBlock?.data.toString(), 16)}
        </div>
      ) : (
        <div className="badge-error badge gap-2 rounded px-3 py-4 font-semibold">
          Latest block: Not available
        </div>
      )}
    </>
  );
};

const SubgraphBlockLabel = ({ indexer }: { chainId: number; indexer: URL }) => {
  const { data } = useGetSubgraphStatus(indexer);

  return (
    <>
      {data?._meta?.block.number ? (
        <div className={`badge_primary`}>
          Subgraph: {data?._meta?.block.number}
        </div>
      ) : (
        <div className="badge-error badge gap-2 rounded  px-3 py-4 font-semibold">
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
  indexer: URL;
}) => {
  const { data } = useGetSubgraphStatus(indexer);

  const latestBlock = useGetNodeLatestBlock(chainId);

  const blockBehind =
    latestBlock.data &&
    data?._meta?.block.number &&
    latestBlock.data - data?._meta?.block.number;

  return (
    <>
      {(blockBehind !== undefined && (
        <div
          className={`badge w-48 rounded-lg px-3 py-4 font-semibold text-white ${clsx(
            { "badge-success": blockBehind < 10 },
            { "badge-warning": blockBehind > 10 && blockBehind < 100 },
            { "badge-error": blockBehind > 100 }
          )}`}
        >
          Blocks behind: {blockBehind}
        </div>
      )) ?? (
        <div className="badge-error badge gap-2">
          Blocks behind: Not available
        </div>
      )}
    </>
  );
};
