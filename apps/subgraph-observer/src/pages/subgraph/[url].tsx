import { useRouter } from "next/router";
import { useGetSubgraphStatus } from "../../hooks/useGetSubgraphStatus";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";
import "graphiql/graphiql.css";
import { SubgraphStatusLabel } from "../../components/subgraphs-table/SubgraphStatusLabel";
import { IoArrowBackSharp } from "react-icons/io5";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { base64Decode } from "../../utils/functions";

const SubgraphExplorer = () => {
  const { url } = useRouter().query;
  const subgraphUrl = useMemo(() => {
    try {
      const urlDecoded = base64Decode(url as string);
      return new URL(urlDecoded);
    } catch (error) {
      return undefined
    }
  }, [url]);
  console.log('subgraphUrl', subgraphUrl)
  const subgraphStatus = useGetSubgraphStatus(subgraphUrl);
  const fetcher = useQuery(['createGraphiQLFetcher', url], () => {
    if (!subgraphUrl) {
      throw new Error("No url");
    }
    return createGraphiQLFetcher({ url: subgraphUrl.href })
  }, {
    enabled: !!subgraphUrl,
  })
  if (subgraphStatus.isLoading || !url || !fetcher.data || !subgraphUrl) {
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
                <SubgraphStatusLabel chainId={80001} indexer={subgraphUrl} />
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
