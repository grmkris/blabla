import type { NextPage } from "next";
import Head from "next/head";
import { CreateSubgraphForm } from "../components/CreateSubgraphForm";
import { SubgraphsDashboard } from "../components/SubgraphsDashboard";
import NonSSRWrapper from "../components/common/NonSSRWrapper";

const Home: NextPage = () => {
  return (
    <NonSSRWrapper>
      <Head>
        <title>Observer</title>
        <link rel="icon" href="/apps/graph-notify/public/favicon.ico" />
      </Head>
      <main className="md:p-14 p-4">
        <div className="md:p-8 sm:px-0">
          <h1 className="text-6xl font-bold">
            Subgraph{" "}
            <a className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
              Observer NLAqqqqq BLAqqqq
            </a>
            🧙‍
          </h1>
          <p className="mt-3 text-2xl">
            Realtime monitoring of subgraph health sdf
          </p>
        </div>
        <div className="lg:grid lg:grid-cols-3 lg:gap-6 text-center">
          <CreateSubgraphForm />
          <SubgraphsDashboard />
        </div>
      </main>
    </NonSSRWrapper>
  );
};

export default Home;
