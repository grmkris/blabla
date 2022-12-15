import { useRouter } from "next/router";
import { useGetSubgraphStatus } from "../../hooks/useGetSubgraphStatus";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";
import "graphiql/graphiql.css";
import { decode } from "js-base64";
import { SubgraphStatusLabel } from "../../components/subgraphs-table/SubgraphStatusLabel";
import { IoArrowBackSharp } from "react-icons/io5";
import Link from "next/link";

const SubgraphExplorer = () => {
  const { id } = useRouter().query;
  const url = decode(id as string);
  const subgraphStatus = useGetSubgraphStatus(url);

  console.log(subgraphStatus.data);

  const fetcher = createGraphiQLFetcher({
    url: url,
  });

  return (
    <>
      <main className="flex flex-col space-y-5">
        <div className="flex justify-between items-center">
          <Link href="/">
            <button className="btn btn-sm btn-outline btn-secondary ">
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
        <div className="h-[calc(100vh-160px)]">
          <GraphiQL fetcher={fetcher} />
        </div>
      </main>
    </>
  );
};

export default SubgraphExplorer;
