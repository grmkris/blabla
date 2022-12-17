import type { NextPage } from "next";
import Head from "next/head";
import { CreateSubgraphForm } from "../components/CreateSubgraphForm";
import { SubgraphsDashboard } from "../components/SubgraphsDashboard";

const Home: NextPage = () => {
  return (
      <>
        <Head>
          <title>Observer</title>
          <link rel="icon" href="/apps/subgraph-observer/public/favicon.ico" />
        </Head>

        <div className="flex flex-col space-y-5 items-center justify-center w-full">
          <div className="flex w-full space-y-8 flex-col lg:flex-row">
            <div className="lg:w-2/3 flex flex-col items-center justify-center">
              <h1 className="text-5xl md:text-6xl font-bold">
                Subgraph{" "}
                <a className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Observer
                </a>
                🧙‍
              </h1>
              <p className="mt-5 text-2xl text-slate-500">
                Realtime monitoring of subgraph health
              </p>
            </div>

            <div className="w-full lg:w-1/3">
              <CreateSubgraphForm />
            </div>
          </div>
          <SubgraphsDashboard />
        </div>
      </>
  );
};

export default Home;
