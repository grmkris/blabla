import type { NextPage } from "next";
import Head from "next/head";
import z from "zod";
import { CreateSubgraphFrom } from "../components/CreateSubgraphFrom";
import { SubgraphCardsDashboard } from "../components/SubgraphCardsDashboard";

export const inputSchema = z.object({
  chainId: z.number(),
  indexer: z.string(),
  name: z.string(),
  email: z.string().email().nullish(),
});
export type Inputs = z.infer<typeof inputSchema>;

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Observer</title>
        <link rel="icon" href="/apps/graph-notify/public/favicon.ico" />
      </Head>
      <main className="p-14">
        <div className="p-8 sm:px-0">
          <h1 className="text-6xl font-bold">
            Subgraph
            <a className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
              Observer
            </a>
            🧙‍
          </h1>
          <p className="mt-3 text-2xl">
            Realtime monitoring of subgraph health
          </p>
        </div>
        <div className="lg:grid lg:grid-cols-3 lg:gap-6 text-center">
          <CreateSubgraphFrom />
          <SubgraphCardsDashboard />
        </div>
      </main>
    </div>
  );
};

export default Home;
