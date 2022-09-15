import type { NextPage } from "next";
import Head from "next/head";
import { useImmer } from "use-immer";
import { SubmitHandler, useForm } from "react-hook-form";

export type Inputs = {chain: string, indexer: string}
const Home: NextPage = () => {

  const [subgraphs, setSubgraphs] = useImmer<Inputs[]>([]);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {
    setSubgraphs(draft => {
      draft.push(data);
    })
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/apps/demo-app/public/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            Graph Notify!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Get notified when your subgraph is synced!
          Enter subgraph url and chain to get started.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input defaultValue="" {...register("chain")} />
          <input {...register("indexer", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.indexer && <span>This field is required</span>}
          <input type="submit" className={"btn"} />
        </form>
      </main>
    </div>
  );
};

export default Home;
