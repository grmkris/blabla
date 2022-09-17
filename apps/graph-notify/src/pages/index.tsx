import type { NextPage } from "next";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { SubgraphStatusIndicator } from "../components/SubgraphStatusIndicator";
import { useGraphNotifyStore } from "../store";
import { useChainListChains } from "../hooks/useChainListChains";
import { ComboBoxExample } from "../components/ComboBox";
import { trpc } from "../utils/trpc";

export type Inputs = { chainId: number; indexer: string };
const Home: NextPage = () => {
  const { inputs, addInput } = useGraphNotifyStore((state) => ({
    inputs: state.inputs,
    addInput: state.addInput,
  }));
  const { data: chainList, isLoading: isLoadingChainList } =
    useChainListChains();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addInput(data);
  };
  const hello = trpc.useQuery(['hello', { text: 'dsaf' }]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/apps/demo-app/public/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Subgraph {" "}
            <a className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
            Observer
          </a>
        </h1>
        <p className="mt-3 text-2xl">
          Get notified when your subgraph is synced! Enter subgraph url and
          chain to get started.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {chainList && (
            <ComboBoxExample
              {...register("chainId", { required: true })}
              className="select select-primary w-full max-w-xs"
              data={chainList}
            ></ComboBoxExample>
          )}
          <label className="label">
            <span className="label-text">Sugraph url?</span>
          </label>
          <input
            className="input input-bordered input-primary w-full max-w-xs"
            {...register("indexer", { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.indexer && <span>This field is required</span>}
          <input type="submit" className={"mt-2 btn"} />
        </form>
        <div className={"divider"}>Subgraphs</div>
        <div className={"mb-20 flex flex-col sm:flex-row"}>
          {inputs.map((subgraph, index) => {
            return (
              <SubgraphStatusIndicator
                chain={subgraph.chainId}
                indexer={subgraph.indexer}
                key={index}
                index={index}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;
