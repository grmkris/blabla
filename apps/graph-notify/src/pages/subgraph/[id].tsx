import { useRouter } from "next/router";
import { useGetSubgraphStatus } from "../../hooks/useGetSubgraphStatus";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";
import "graphiql/graphiql.css";
import { decode } from "js-base64";
import { SubgraphStatusLabel } from "../../components/subgraphs-table/SubgraphStatusLabel";

const SubgraphExplorer = () => {
  const { id } = useRouter().query;
  const url = decode(id as string);
  const subgraphStatus = useGetSubgraphStatus(url);

  const fetcher = createGraphiQLFetcher({
    url: url,
  });

  return (
    <>
      {subgraphStatus.data && (
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <SubgraphStatusLabel chainId={80001} indexer={url} />
          </div>
        </div>
      )}
      <GraphiQL fetcher={fetcher} />
    </>
  );
};

export default SubgraphExplorer;
