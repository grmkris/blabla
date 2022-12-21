import type { NextPage } from "next";
import Head from "next/head";
import { CreateSubgraphForm } from "../components/form/CreateSubgraphForm";
import { SubgraphsDashboard } from "../components/SubgraphsDashboard";
import NonSSRWrapper from "../components/common/NonSSRWrapper";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Subgraph Observer</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧙‍</text></svg>"
        />
      </Head>

      <div className="flex w-full flex-col items-center justify-center space-y-5">
        <div className="flex w-full flex-col space-y-8 lg:flex-row">
          <div className="flex flex-col items-center justify-center lg:w-2/3">
            <h1 className="text-5xl font-bold md:text-6xl">
              Subgraph{" "}
              <a className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-extrabold text-transparent">
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
        <NonSSRWrapper>
          <SubgraphsDashboard />
        </NonSSRWrapper>
      </div>
    </>
  );
};

export default Home;
