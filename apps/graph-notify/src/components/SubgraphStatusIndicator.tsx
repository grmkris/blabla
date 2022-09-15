import { useGetSubgraphStatus } from "../hooks/useGetSubgraphStatus";
import { useGraphNotifyStore } from "../store";


export const SubgraphStatusIndicator = (props: {chain: string, indexer: string, index:number}) => {

  const { data, isLoading, error } = useGetSubgraphStatus(props.chain, props.indexer);
  const {removeInput} = useGraphNotifyStore((state) => ({
    removeInput: state.removeInput
  }));
  return (

    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="card-actions justify-end">
          <button className="btn btn-square btn-sm" onClick={() => {removeInput(props.index)}}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <h2 className="card-title">Subgraph Status</h2>
        <p>Indexer: {props.indexer}</p>
        <p>Chain: {props.chain}</p>
        {isLoading && <p>Loading...</p>}
        {error ? <p>Error</p> : <></>}
        <p>Subgraph block: {data?._meta?.block.number}</p>
        <p>Blockchain block: {data?._meta?.block.number}</p>
        <div className="badge badge-success gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          Synced
        </div>
        <div className="badge badge-warning gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          Out of sync
        </div>
      </div>
    </div>
  )
}