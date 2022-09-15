import { useGetSubgraphStatus } from "../hooks/useGetSubgraphStatus";
import { useGraphNotifyStore } from "../store";
import Link from "next/link";
import { allChains, useProvider } from "wagmi";
import { useQuery } from "@tanstack/react-query";

export const SubgraphStatusIndicator = (props: {
  chain: number;
  indexer: string;
  index: number;
}) => {
  const { data, isLoading } = useGetSubgraphStatus(
    props.chain?.toString(),
    props.indexer
  );
  const { removeInput } = useGraphNotifyStore((state) => ({
    removeInput: state.removeInput,
  }));
  const chain = allChains.find((element) => {
    console.log(element.id, props.chain, element.id == props.chain);
    return (element.id == props.chain)
  });
  const provider = useProvider({ chainId: chain?.id });
  const { data: blockNumber, isLoading: isLoadingBlockNumber } = useQuery(
    [props.chain],
    () => {
      return provider?.getBlockNumber();
    }
  );

  if (isLoading || isLoadingBlockNumber || !data || !blockNumber) {
    return <div className="text-gray-500">Loading...</div>;
  }
  console.log({ chainId: props.chain, indexer: props.indexer, data , chain});
  console.log('provider', provider)
  return (
    <div className="card w-80 bg-base-100 shadow-xl m-5">
      <div className="card-body">
        <div className="card-actions justify-end">
          <button
            className="btn btn-square btn-sm"
            onClick={() => {
              removeInput(props.index);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h2 className="card-title">Subgraph Status</h2>
        <p>
          Subgraph:{" "}
          <Link href={props.indexer}>
            <span className={"link link-primary"}>Subgraph</span>
          </Link>{" "}
        </p>
        <div>
          Chain:{" "}
          {chain?.blockExplorers?.default.url ? (
            <Link href={chain?.blockExplorers?.default.url}>
              <span className={"link link-primary"}>{chain?.name}</span>
            </Link>
          ) : (
            chain?.name
          )}
        </div>
        <p>Subgraph block: {data?._meta?.block.number}</p>
        <p>Blockchain block: {blockNumber}</p>
        <div className="badge badge-success gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-4 h-4 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          Synced
        </div>
        <div className="badge badge-warning gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-4 h-4 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          Out of sync
        </div>
      </div>
    </div>
  );
};
