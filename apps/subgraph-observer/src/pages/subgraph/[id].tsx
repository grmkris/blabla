import { useRouter } from "next/router";
import { useGetSubgraphStatus } from "../../hooks/useGetSubgraphStatus";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";
import "graphiql/graphiql.css";
import { SubgraphStatusLabel } from "../../components/subgraphs-table/SubgraphStatusLabel";
import { IoArrowBackSharp } from "react-icons/io5";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { base64Decode } from "../../utils/functions";

const SubgraphExplorer = () => {
  const { id } = useRouter().query;
  const url = id && base64Decode(id as string);
  const subgraphStatus = useGetSubgraphStatus(url);
  const fetcher = useQuery(['createGraphiQLFetcher', url], () => {
    if (!url) {
      throw new Error("No url");
    }
    return createGraphiQLFetcher({ url })
  }, {
    enabled: !!url,
  })
  if (subgraphStatus.isLoading || !url || !fetcher.data) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <main className="flex flex-col">
        <div className="flex justify-between items-center p-2 flex-col md:flex-row space-y-2">
          <Link href="/">
            <button className="btn btn-sm btn-outline btn-secondary">
              <IoArrowBackSharp className="mr-2" />
              back
            </button>
          </Link>
          {subgraphStatus.data && (
            <div className="flex flex-col">
              <div className="flex flex-row gap-2">
                <SubgraphStatusLabel chainId={80001} indexer={url} />
              </div>
            </div>
          )}
        </div>
        {/** calculate screen-h - header - footer */}
        <div className="h-[calc(100vh-50px)]">
          <GraphiQL fetcher={fetcher.data} />
        </div>
      </main>
    </>
  );
};

export default SubgraphExplorer;
