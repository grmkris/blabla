import { useGetSubgraphStatus } from "../hooks/useGetSubgraphStatus";


export const SubgraphStatusIndicator = (chain: string, indexer: string) => {

  const { data, isLoading, error } = useGetSubgraphStatus(chain, indexer);

  return (
    <div>
      <h1>Subgraph Status</h1>
      <p>Chain: {chain}</p>
      <p>Indexer: {indexer}</p>
      <p>Is Loading: {isLoading ? "true" : "false"}</p>
      <p>Error: {error ? JSON.stringify(error) : "none"}</p>
      <p>Subgraph: {data?._meta?.block.number}</p>
    </div>
  )
}